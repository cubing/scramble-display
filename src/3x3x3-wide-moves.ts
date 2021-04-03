import {
  Alg,
  Move,
  LineComment,
  Commutator,
  Conjugate,
  Grouping,
  Pause,
  TraversalUp,
  Unit,
  AlgBuilder,
  Newline,
} from "cubing/alg";

class WideMovesToSign extends TraversalUp<Alg, Unit> {
  public traverseAlg(alg: Alg): Alg {
    const builder = new AlgBuilder();
    for (const unit of alg.units()) {
      builder.push(this.traverseUnit(unit));
    }
    return builder.toAlg();
  }
  public traverseGrouping(grouping: Grouping): Grouping {
    return new Grouping(
      this.traverseAlg(grouping.experimentalAlg),
      grouping.experimentalEffectiveAmount
    );
  }
  public traverseMove(move: Move): Move {
    if (move.family.endsWith("w")) {
      return move.modified({
        family: move.family.slice(0, move.family.length - 1).toLowerCase(),
      });
    } else {
      return move;
    }
  }
  public traverseCommutator(commutator: Commutator): Commutator {
    return new Commutator(
      this.traverseAlg(commutator.A),
      this.traverseAlg(commutator.B),
      commutator.experimentalEffectiveAmount
    );
  }
  public traverseConjugate(conjugate: Conjugate): Conjugate {
    return new Conjugate(
      this.traverseAlg(conjugate.A),
      this.traverseAlg(conjugate.B),
      conjugate.experimentalEffectiveAmount
    );
  }
  public traversePause(pause: Pause): Pause {
    return pause;
  }
  public traverseNewline(newLine: Newline): Newline {
    return newLine;
  }
  public traverseLineComment(lineComment: LineComment): LineComment {
    return lineComment;
  }
}

const wideMovesToSiGNInstance = new WideMovesToSign();
export const wideMovesToSiGN = wideMovesToSiGNInstance.traverseAlg.bind(
  wideMovesToSiGNInstance
) as (a: Alg) => Alg;
