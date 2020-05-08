import { ScrambleView } from "./ScrambleView";
import { Twisty } from "cubing/twisty";
import { parse, Sequence } from "cubing/alg";

export class Cube3DScrambleView implements ScrambleView {
  public element: HTMLElement;
  private twisty: Twisty;
  constructor() {
    this.element = document.createElement("twisty");
    this.twisty = new Twisty(this.element, {
      playerConfig: {
        experimentalShowControls: false
      }
    });
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
}
