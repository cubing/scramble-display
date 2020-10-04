import { KPuzzleDefinition, Puzzles as KPuzzles } from "cubing/kpuzzle";
import { getPuzzleGeometryByDesc, StickerDat } from "cubing/puzzle-geometry";
import { PuzzleName, Puzzles as PGPuzzles } from "./pg-puzzles";

class DisplayableKPuzzle {
  public type: "kpuzzle" = "kpuzzle";
  // TODO: push display name into the KSolve defition.
  constructor(private kpuzzleName: string) {}

  public displayName(): string {
    return KPuzzles[this.kpuzzleName].name;
  }

  public puzzleName(): string {
    return this.kpuzzleName;
  }

  public kpuzzleDefinition(): KPuzzleDefinition {
    return KPuzzles[this.kpuzzleName];
  }

  public svg(): string {
    return this.kpuzzleDefinition().svg!; // TODO
  }
}

class DisplayablePG3D {
  public type: "pg3d" = "pg3d";
  constructor(
    private displayNameStr: string,
    private name: PuzzleName,
    private desc: string,
    public polarVantages: boolean
  ) {}

  public displayName(): string {
    return this.displayNameStr;
  }

  public puzzleName(): string {
    return this.name as string;
  }

  public kpuzzleDefinition(): KPuzzleDefinition {
    const pg = getPuzzleGeometryByDesc(this.desc, ["orientcenters", "true"]);
    const kpuzzleDef = pg.writekpuzzle();
    return kpuzzleDef;
  }

  public stickerDat(): StickerDat {
    // TODO: Remove `as` cast.
    const pg = getPuzzleGeometryByDesc(this.desc, ["orientcenters", "true"]);
    return pg.get3d();
  }

  public kPuzzleDefinition(): KPuzzleDefinition {
    // TODO: deduplicate
    const pg = getPuzzleGeometryByDesc(this.desc, ["orientcenters", "true"]);
    return pg.writekpuzzle() as KPuzzleDefinition;
  }

  public svg(): string {
    // TODO: deduplicate
    const pg = getPuzzleGeometryByDesc(this.desc, ["orientcenters", "true"]);
    return pg.generatesvg();
  }
}

export type DisplayablePuzzle = DisplayableKPuzzle | DisplayablePG3D;

const puzzles: { [s: string]: DisplayablePuzzle } = {};
for (const key in KPuzzles) {
  puzzles[key as any] = new DisplayableKPuzzle(key);
}
puzzles.megaminx = new DisplayablePG3D(
  "Megaminx",
  "megaminx",
  PGPuzzles.megaminx,
  false
);
puzzles.skewb = new DisplayablePG3D("Skewb", "skewb", PGPuzzles.skewb, true);
puzzles.fto = new DisplayablePG3D(
  "FTO",
  "FTO",
  "o f 0.333333333333333 v -2",
  true
);
puzzles["2x2x2"] = new DisplayablePG3D("2x2x2", "2x2x2", "c f 0", true);
puzzles["3x3x3"] = new DisplayablePG3D(
  "3x3x3",
  "3x3x3",
  "c f 0.333333333333333",
  true
);
puzzles["4x4x4"] = new DisplayablePG3D("4x4x4", "4x4x4", "c f 0.5 f 0", true);
puzzles["5x5x5"] = new DisplayablePG3D("5x5x5", "5x5x5", "c f 0.6 f 0.2", true);
puzzles["6x6x6"] = new DisplayablePG3D(
  "6x6x6",
  "6x6x6",
  "c f 0.666666666666667 f 0.333333333333333 f 0",
  true
);
puzzles["7x7x7"] = new DisplayablePG3D(
  "7x7x7",
  "7x7x7",
  "c f 0.714285714285714 f 0.428571428571429 f 0.142857142857143",
  true
);

export { puzzles };
