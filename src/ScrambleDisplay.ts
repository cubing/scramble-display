import { Alg } from "cubing/alg";
import { AlgWithIssues } from "cubing/dist/types/twisty/model/depth-0/AlgProp";
import { PuzzleID } from "cubing/dist/types/twisty/old/dom/TwistyPlayerConfig";
import {
  experimentalSetShareAllNewRenderers,
  TwistyPlayer,
} from "cubing/twisty";
import { mainStyleText } from "./css/main.css";
import { invalidScrambleStyleText } from "./css/invalid-scramble.css";
import { EventID, eventInfo } from "./events";

experimentalSetShareAllNewRenderers(true);

export type Visualization = "2D" | "3D";

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
    checkered: true,
  };
  #twistyPlayer: TwistyPlayer = new TwistyPlayer({
    controlPanel: "none",
    hintFacelets: "none",
    visualization: "2D",
  });

  #invalidScrambleStyleElem: HTMLElement | null = null;
  #invalid = false;
  #setInvalidStyle(invalid: boolean): void {
    if (this.#invalid === invalid) {
      return;
    }
    this.#invalid = invalid;
    console.log("invalid", invalid);
    if (invalid) {
      if (!this.#invalidScrambleStyleElem) {
        this.#invalidScrambleStyleElem = document.createElement("style");
        this.#invalidScrambleStyleElem.textContent = invalidScrambleStyleText;
      }
      this.#shadow.appendChild(this.#invalidScrambleStyleElem);
    } else {
      this.#invalidScrambleStyleElem?.remove();
    }
  }

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

    this.#twistyPlayer.experimentalModel.puzzleAlgProp.addFreshListener(
      (algWithIssues: AlgWithIssues) => {
        if (algWithIssues.issues.errors.length > 0) {
          this.#setInvalidStyle(true);
        } else {
          this.#setInvalidStyle(false);
        }
      }
    );
  }

  connectedCallback(): void {
    this.#wrapper.appendChild(this.#twistyPlayer);
  }

  public set event(eventID: EventID | null) {
    const puzzleID = (
      eventInfo[eventID ?? DEFAULT_EVENT] ?? { puzzleID: DEFAULT_EVENT }
    ).puzzleID as PuzzleID;
    this.#twistyPlayer.puzzle = puzzleID;
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
        this.checkered = newValue !== "";
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
