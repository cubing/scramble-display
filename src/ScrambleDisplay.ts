import { EventID } from "./events";

import { SVG2DView } from "./scramble-view/SVG2DScrambleView";
import { ScrambleView } from "./scramble-view/ScrambleView";
import { Cube3DScrambleView } from "./scramble-view/Cube3DScrambleView";
import { mainStyleText, checkeredStyleText, invalidScrambleStyleText } from "./css";
import { PG3DScrambleView } from "./scramble-view/PG3DScrambleView";
import { SVGPGScrambleView } from "./scramble-view/SVGPGScrambleView";

export type Visualization = "2D" | "3D";

export type ScrambleDisplayAttributes = {
  event?: EventID,
  scramble?: string,
  visualization?: Visualization;
  checkered?: boolean;
}

export type CachedAttributes = {
  event: string | null,
  scramble: string | null,
  visualization: string | null;
  checkered: string | null;
}

export class ScrambleDisplay extends HTMLElement {
  #shadow: ShadowRoot;
  #wrapper: HTMLDivElement = document.createElement("div");
  #currentAttributes: CachedAttributes = {
    event: null,
    scramble: null,
    visualization: null,
    checkered: null,
  }
  #checkeredStyleElem: HTMLStyleElement;
  #invalidScrambleStyleElem: HTMLStyleElement;
  #scrambleView: ScrambleView;
  #hasRendered: boolean = false;

  // TODO: Accept ScrambleDisplayAttributes arg?
  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "closed" });
    this.#wrapper.classList.add("wrapper");
    this.#shadow.appendChild(this.#wrapper);

    // TODO: change style depending on event/view type?
    const style = document.createElement("style");
    style.textContent = mainStyleText;
    this.#shadow.appendChild(style);
  }

  private attributeChanged(attributeName: keyof ScrambleDisplayAttributes): boolean {
    return this.#currentAttributes[attributeName] !== this.getAttribute(attributeName);
  }

  private render(): void {
    if (this.attributeChanged("checkered")) {
      this.#currentAttributes.checkered = this.getAttribute("checkered");
      const checkered = this.#currentAttributes.checkered !== null;
      if (checkered) {
        if (!this.#checkeredStyleElem) {
          this.#checkeredStyleElem = document.createElement("style");
          this.#checkeredStyleElem.textContent = checkeredStyleText;
        }
        this.#shadow.appendChild(this.#checkeredStyleElem);
      } else if (this.#shadow.contains(this.#checkeredStyleElem)) {
        this.#shadow.removeChild(this.#checkeredStyleElem)
      }
    }
    // TODO: Avoid false positives if event changed from `null` to (explicit) default value.
    if (!this.#hasRendered || this.attributeChanged("event") || this.attributeChanged("visualization")) {
      // TODO: validate new values.
      this.#currentAttributes.event = this.getAttribute("event");
      const event: EventID = (this.#currentAttributes.event ?? "333") as EventID;
      this.#currentAttributes.visualization = this.getAttribute("visualization");
      const visualization: Visualization = (this.#currentAttributes.visualization ?? "2D") as Visualization;
      this.#currentAttributes.scramble = this.getAttribute("scramble") || "";
      const scramble = this.#currentAttributes.scramble;

      switch (visualization) {
        case "3D":
          if (PG3DScrambleView.eventImplemented(event)) {
            this.setScrambleView(new PG3DScrambleView(event), scramble);
          } else if (event === "333") {
            this.setScrambleView(new Cube3DScrambleView(), scramble);
          } else {
            console.warn(`3D view is not implemented for this event yet (${event}). Falling back to 2D.`);
            this.render2D(event, scramble);
          }
          break;
        case "2D":
        default:
          this.render2D(event, scramble);
      }
      this.#hasRendered = true;
    } else {
      if (this.attributeChanged("scramble")) {
        this.#currentAttributes.scramble = this.getAttribute("scramble") || "";
        const scramble = this.#currentAttributes.scramble;
        if (scramble) {
          this.setScramble(scramble);
        } else {
          this.#scrambleView.resetScramble();
        }
      }
    }
  }

  // We break out the 2D implementation so that the 3D implementation can call it as a fallback without overly clever break/continue hacks.
  private render2D(event: EventID, scramble: string): void {
    if (SVGPGScrambleView.eventImplemented(event)) {
      const svgPGView = new SVGPGScrambleView(event);
      this.setScrambleView(svgPGView, scramble);
    } else if (SVG2DView.eventImplemented(event)) {
      const svg2DView = new SVG2DView(event);
      this.setScrambleView(svg2DView, scramble);
    } else {
      this.clearScrambleView();
      throw new Error(`2D view is not implemented for this event (${event}).`);
    }
  }

  public get event(): EventID | null { return this.getAttribute("event") as EventID | null; }
  public get scramble(): string | null { return this.getAttribute("scramble"); }
  public get visualization(): Visualization | null { return this.getAttribute("visualization") as Visualization | null; }
  public get checkered(): boolean { return this.getAttribute("checkered") !== null; }
  public set event(s: EventID | null) { s ? this.setAttribute("event", s) : this.removeAttribute("event"); }
  public set scramble(s: string | null) { s ? this.setAttribute("scramble", s) : this.removeAttribute("scramble"); }
  public set visualization(s: Visualization | null) { s ? this.setAttribute("visualization", s) : this.removeAttribute("visualization"); }
  public set checkered(s: boolean) { s ? this.setAttribute("checkered", "") : this.removeAttribute("checkered"); }

  private setScramble(s: string): void {
    try {
      this.#scrambleView.setScramble(s);
      if (this.#shadow.contains(this.#invalidScrambleStyleElem)) {
        this.#shadow.removeChild(this.#invalidScrambleStyleElem)
      }
    } catch (e) {
      if (!this.#invalidScrambleStyleElem) {
        this.#invalidScrambleStyleElem = document.createElement("style");
        this.#invalidScrambleStyleElem.textContent = invalidScrambleStyleText;
      }
      debugger;
      this.#shadow.appendChild(this.#invalidScrambleStyleElem);
    }
    this.#wrapper.setAttribute("title", s);
  }

  private clearScrambleView(): void {
    if (this.#scrambleView) {
      this.#wrapper.removeChild(this.#scrambleView.element);
    }
    this.#wrapper.removeAttribute("title");
  }

  private setScrambleView(scrambleView: ScrambleView, scramble?: string): void {
    this.clearScrambleView();
    this.#scrambleView = scrambleView;
    this.#wrapper.appendChild(scrambleView.element);

    if (scramble) {
      this.setScramble(scramble);
    }
  }

  protected connectedCallback() {
    this.render();
  }

  protected attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
  }

  protected static get observedAttributes(): Array<keyof ScrambleDisplayAttributes> {
    return ["event", "scramble", "visualization", "checkered"];
  }
}

customElements.define("scramble-display", ScrambleDisplay);
