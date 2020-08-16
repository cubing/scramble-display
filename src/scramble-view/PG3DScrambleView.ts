import { Sequence } from "cubing/alg";
import { TwistyPlayer, TwistyPlayerInitialConfig } from "cubing/twisty";
import { EventID, eventInfo } from "../events";
import { parseForEvent } from "../parsers";
import { puzzles } from "./vendor/DisplayablePG3D";
import { LegacyExperimentalPG3DViewConfig } from "cubing/dist/esm/src/twisty/dom/TwistyPlayer";

export class PG3DScrambleView {
  public element: HTMLElement;
  private twisty: TwistyPlayer;
  constructor(private eventID: EventID) {
    const pgID = eventInfo[eventID].pg3dID;
    if (!pgID) {
      throw "Unknown PG3D puzzle.";
    }
    const displayablePuzzle = puzzles[pgID];

    const twistyParams: TwistyPlayerInitialConfig = {
      alg: new Sequence([]),
    };
    let legacyExperimentalPG3DViewConfig:
      | LegacyExperimentalPG3DViewConfig
      | undefined = undefined;
    switch (displayablePuzzle.type) {
      case "kpuzzle": // TODO
        break;
      case "pg3d":
        twistyParams.puzzle = "custom";
        twistyParams.visualization = "PG3D";
        twistyParams.controls = "none";
        legacyExperimentalPG3DViewConfig = {
          def: displayablePuzzle.kpuzzleDefinition(),
          stickerDat: displayablePuzzle.stickerDat(),
          showFoundation: true,
        };
        break;
      default:
        throw new Error("Not a displayable puzzle type.");
    }
    this.element = this.twisty = new TwistyPlayer(
      twistyParams,
      legacyExperimentalPG3DViewConfig
    );
  }

  public resetScramble(): void {
    this.twisty.alg = new Sequence([]);
  }

  public setScramble(scramble: string): void {
    try {
      this.twisty.alg = parseForEvent(this.eventID, scramble);
      this.twisty.timeline?.jumpToEnd();
    } catch (e) {
      throw new Error("invalid scramble");
    }
  }

  private static pg3dID(eventID: EventID): string | undefined {
    return eventInfo[eventID]?.pg3dID;
  }

  public static eventImplemented(eventID: EventID): boolean {
    return !!this.pg3dID(eventID);
  }

  public setCheckered(checkered: boolean): void {
    this.twisty.background = checkered ? "checkered" : "none";
  }
}
