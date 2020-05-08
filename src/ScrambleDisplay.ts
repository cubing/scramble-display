import { EventID } from "./events";

import { SVG2DView } from "./scramble-view/SVG2DScrambleView";
import { ScrambleView } from "./scramble-view/ScrambleView";
import { Cube3DScrambleView } from "./scramble-view/Cube3DScrambleView";
import { styleText, checkeredStyleText } from "./css";
import { PG3DScrambleView } from "./scramble-view/PG3DScrambleView";
import { SVGPGScrambleView } from "./scramble-view/SVGPGScrambleView";

export type Visualization = "2D" | "3D";

export type ScrambleDisplayAttributes = {
  event?: EventID,
  scramble?: string,
  visualization?: Visualization;
  checkered?: boolean;
}

export class ScrambleDisplay extends HTMLElement {
  #shadow: ShadowRoot;
  #wrapper: HTMLDivElement = document.createElement("div");
  #currentAttributes: ScrambleDisplayAttributes = {
    event: undefined,
    scramble: undefined,
    visualization: undefined,
    checkered: undefined,
  }
  #checkeredStyleElem: HTMLStyleElement;
  #scrambleView: ScrambleView;

  // TODO: Accept ScrambleDisplayAttributes arg?
  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "closed" });
    this.#wrapper.classList.add("wrapper");
    this.#shadow.appendChild(this.#wrapper);

    // TODO: change style depending on event/view type?
    const style = document.createElement("style");
    style.textContent = styleText;
    this.#shadow.appendChild(style);
  }

  private attributeChanged(attributeName: keyof ScrambleDisplayAttributes): boolean {
    return this.#currentAttributes[attributeName] !== this.getAttribute(attributeName);
  }

  private render(): void {
    if (this.attributeChanged("checkered")) {
      if (this.getAttribute("checkered") !== null) {
        if (!this.#checkeredStyleElem) {
          this.#checkeredStyleElem = document.createElement("style");
          this.#checkeredStyleElem.textContent = checkeredStyleText;
        }
        this.#shadow.appendChild(this.#checkeredStyleElem);
      } else if (this.#shadow.contains(this.#checkeredStyleElem)) {
        this.#shadow.removeChild(this.#checkeredStyleElem)
      }
    }
    if (this.attributeChanged("event") || this.attributeChanged("visualization")) {
      // TODO: validate new values.
      this.#currentAttributes.event = (this.getAttribute("event") ?? "333") as EventID;
      this.#currentAttributes.visualization = (this.getAttribute("visualization") ?? "2D") as Visualization;
      this.#currentAttributes.scramble = (this.getAttribute("scramble")) as string;
      switch (this.#currentAttributes.visualization) {
        case "3D":
          if (PG3DScrambleView.eventImplemented(this.#currentAttributes.event)) {
            this.setScrambleView(new PG3DScrambleView(this.#currentAttributes.event), this.#currentAttributes.scramble);
          } else if (this.#currentAttributes.event === "333") {
            this.setScrambleView(new Cube3DScrambleView(), this.#currentAttributes.scramble);
          } else {
            this.clearScrambleView();
            throw new Error(`3D view is not implemented for this event (${this.#currentAttributes.event}).`);
          }
          break;
        case "2D":
        default:
          if (!this.#currentAttributes.event) {
            this.clearScrambleView();
            throw new Error("Unspecified event.");
          }
          if (SVGPGScrambleView.eventImplemented(this.#currentAttributes.event)) {
            const svgPGView = new SVGPGScrambleView(this.#currentAttributes.event);
            this.setScrambleView(svgPGView, this.#currentAttributes.scramble);
            break;
          } else if (SVG2DView.eventImplemented(this.#currentAttributes.event)) {
            const svg2DView = new SVG2DView(this.#currentAttributes.event);
            this.setScrambleView(svg2DView, this.#currentAttributes.scramble);
            break;
          } else {
            this.clearScrambleView();
            throw new Error(`2D view is not implemented for this event (${this.#currentAttributes.event}).`);
          }
      }
    } else {
      if (this.attributeChanged("scramble")) {
        this.#currentAttributes.scramble = this.getAttribute("scramble") ?? "";
        if (this.#currentAttributes.scramble) {
          this.setScramble(this.#currentAttributes.scramble);
        } else {
          this.#scrambleView.resetScramble();
        }
      }
    }
  }

  public get event(): EventID | null { return this.getAttribute("event") as EventID | null; }
  public get scramble(): string | null { return this.getAttribute("scramble"); }
  public get visualization(): Visualization | null { return this.getAttribute("visualization") as Visualization | null; }
  public get checkered(): boolean | null { return this.getAttribute("checkered") as boolean | null; }
  public set event(s: EventID | null) { s ? this.setAttribute("event", s) : this.removeAttribute("event"); }
  public set scramble(s: string | null) { s ? this.setAttribute("scramble", s) : this.removeAttribute("scramble"); }
  public set visualization(s: Visualization | null) { s ? this.setAttribute("visualization", s) : this.removeAttribute("visualization"); }
  public set checkered(s: boolean | null) { s ? this.setAttribute("checkered", s.toString()) : this.removeAttribute("checkered"); }

  private setScramble(s: string): void {
    this.#scrambleView.setScramble(s);
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
