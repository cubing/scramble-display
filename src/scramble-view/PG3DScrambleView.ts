import { parse, Sequence } from "cubing/alg";
import { Twisty, TwistyParams } from "cubing/twisty";
import { puzzles } from "./vendor/DisplayablePG3D";
import { eventInfo, EventID } from "../events";

export class PG3DScrambleView {
  public element: HTMLElement;
  private twisty: Twisty;
  constructor(eventID: EventID) {
    const pgID = eventInfo[eventID].pg3dID;
    if (!pgID) {
      throw "Unknown PG3D puzzle.";
    }
    const displayablePuzzle = puzzles[pgID];

    this.element = document.createElement("twisty");

    const twistyParams: TwistyParams = {
      alg: new Sequence([]),
    };
    twistyParams.puzzle = displayablePuzzle.kpuzzleDefinition();
    switch (displayablePuzzle.type) {
      case "kpuzzle": // TODO
        break;
      case "pg3d":
        twistyParams.playerConfig = {
          visualizationFormat: "PG3D",
          experimentalShowControls: false,
          experimentalPG3DViewConfig: {
            experimentalPolarVantages: displayablePuzzle.polarVantages,
            stickerDat: displayablePuzzle.stickerDat(),
            showFoundation: true,
          },
        };
        break;
      default:
        throw new Error("Not a displayable puzzle type.");
    }
    this.twisty = new Twisty(this.element, twistyParams);
  }

  public resetScramble(): void {
    this.twisty.experimentalSetAlg(new Sequence([]));
  }

  public setScramble(s: string): void {
    try {
      const seq = parse(s);
      this.twisty.experimentalSetAlg(seq);
    } catch (e) {
      throw new Error("invalid scramble");
    }
  }

  private static pg3dID(eventID: EventID): string | undefined {
    return eventInfo[eventID].pg3dID;
  }

  public static eventImplemented(eventID: EventID): boolean {
    return !!this.pg3dID(eventID);
  }
}

