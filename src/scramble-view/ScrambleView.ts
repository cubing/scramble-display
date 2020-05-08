export interface ScrambleView {
  element: HTMLElement;
  resetScramble(): void;
  setScramble(scramble: string): void;
}
