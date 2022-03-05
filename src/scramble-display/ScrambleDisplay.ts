import { Alg } from "cubing/alg";
import { eventInfo } from "cubing/puzzles";
import { TwistyPlayer } from "cubing/twisty";
import { mainStyleText } from "./css";

export type Visualization = "2D" | "3D";

type EventID = string;

const CUBE_333: EventID = "333";
const DEFAULT_EVENT: EventID = CUBE_333;

export type ScrambleDisplayAttributes = {
  event?: EventID;
  scramble?: string;
  visualization?: Visualization;
  checkered?: boolean;
};

export type CachedAttributes = {
  eventID: EventID | null;
  scramble: Alg;
  visualization: Visualization | null;
  checkered: boolean;
};

export class ScrambleDisplay extends HTMLElement {
  #shadow: ShadowRoot;
  #wrapper: HTMLDivElement = document.createElement("div");
  #currentAttributes: CachedAttributes = {
    eventID: null,
    scramble: new Alg(),
    visualization: null,
    checkered: false,
  };
  #twistyPlayer: TwistyPlayer = new TwistyPlayer({
    controlPanel: "none",
    hintFacelets: "none",
    visualization: "2D",
    background: "none"
  });

  // Note: You should avoid setting properties like `alg` or `visualization`
  // directly on the twisty player, since `<scramble-display>` may overwrite
  // them again. However, we make the player available this way in case you may
  // find it convenient to have access for other purposes.
  get player(): TwistyPlayer {
    return this.#twistyPlayer;
  }

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

  connectedCallback(): void {
    this.#wrapper.appendChild(this.#twistyPlayer);
  }

  public set event(eventID: EventID | null) {
    const info = eventInfo(eventID ?? DEFAULT_EVENT);
    this.#twistyPlayer.puzzle = info?.puzzleID ?? "3x3x3";
    this.#currentAttributes.eventID = eventID;
  }
  public get event(): EventID | null {
    return this.#currentAttributes.eventID;
  }

  public set scramble(scramble: Alg | string | null) {
    const alg = new Alg(scramble ?? "");
    this.#twistyPlayer.alg = alg;
    this.#currentAttributes.scramble = alg;

    this.#wrapper.setAttribute("title", alg.toString());
  }

  public get scramble(): Alg {
    return this.#currentAttributes.scramble;
  }

  public set visualization(visualization: Visualization | null) {
    this.#twistyPlayer.visualization = visualization ?? "2D";
    this.#currentAttributes.visualization = visualization;
  }
  public get visualization(): Visualization | null {
    return this.#currentAttributes.visualization;
  }

  public set checkered(checkered: boolean) {
    const checkeredBoolean = !!checkered;
    this.#twistyPlayer.background = checkeredBoolean ? "checkered" : "none";
    this.#currentAttributes.checkered = checkeredBoolean;
  }
  public get checkered(): boolean {
    return this.#currentAttributes.checkered;
  }

  protected attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    switch (name) {
      case "event": {
        this.event = newValue as EventID;
        break;
      }
      case "scramble": {
        this.scramble = newValue;
        break;
      }
      case "visualization": {
        this.visualization = newValue as any;
        break;
      }
      case "checkered": {
        this.checkered = newValue !== null;
        break;
      }
    }
  }

  protected static get observedAttributes(): Array<
    keyof ScrambleDisplayAttributes
  > {
    return ["event", "scramble", "visualization", "checkered"];
  }
}

customElements.define("scramble-display", ScrambleDisplay);
