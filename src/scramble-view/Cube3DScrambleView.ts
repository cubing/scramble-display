import { ScrambleView } from "./ScrambleView";
import { parse, Sequence } from "cubing/alg";

const twistyModule = import("cubing/twisty");

export class Cube3DScrambleView implements ScrambleView {
  public element: HTMLElement;
  private twisty: Promise<any>; // TODO
  constructor() {
    this.element = document.createElement("twisty");
    this.twisty = (async () => {
      return new (await twistyModule).Twisty(this.element, {
        playerConfig: {
          experimentalShowControls: false
        }
      });
    })();
  }

  public resetScramble(): void {
    (async () => {
      (await this.twisty).experimentalSetAlg(new Sequence([]));
    })();
  }

  public setScramble(s: string): void {
    (async () => {
      try {
        const seq = parse(s);
        (await this.twisty).experimentalSetAlg(seq);
      } catch (e) {
        throw new Error("invalid scramble");
      }
    })();
  }
}
