import { ScrambleView } from "./ScrambleView";
import { TwistyPlayer } from "cubing/twisty";
import { Alg } from "cubing/alg";

export class Cube3DScrambleView implements ScrambleView {
  public element: HTMLElement;
  private twisty: TwistyPlayer;
  constructor(scramble: string = "") {
    this.element = this.twisty = new TwistyPlayer({
      controlPanel: "none",
      alg: Alg.fromString("R U R'"),
    });
  }

  public resetScramble(): void {
    this.twisty.alg = new Alg();
  }

  public setScramble(s: string): void {
    try {
      const seq = Alg.fromString(s);
      this.twisty.alg = seq;
      this.twisty.timeline?.jumpToEnd();
    } catch (e) {
      throw new Error("invalid scramble");
    }
  }

  public setCheckered(checkered: boolean): void {
    this.twisty.background = checkered ? "checkered" : "none";
  }
}
