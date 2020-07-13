import { ScrambleView } from "./ScrambleView";
import { TwistyPlayer } from "cubing/twisty";
import { parse, Sequence } from "cubing/alg";

export class Cube3DScrambleView implements ScrambleView {
  public element: HTMLElement;
  private twisty: TwistyPlayer;
  constructor() {
    this.element = this.twisty = new TwistyPlayer({
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

  public setCheckered(checkered: boolean): void {
    this.twisty.experimentalGetPlayer().experimentalSetCheckered(checkered);
  }
}
