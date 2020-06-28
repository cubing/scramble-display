import { AlgPart, BlockMove, Comment, Commutator, Conjugate, Group, modifiedBlockMove, NewLine, Pause, Sequence, TraversalUp } from "cubing/alg";

class WideMovesToSign extends TraversalUp<AlgPart> {
  public traverseSequence(sequence: Sequence): Sequence {
    return new Sequence(
      sequence.nestedUnits.map((a) => this.traverseIntoUnit(a)),
    );
  }
  public traverseGroup(group: Group): AlgPart {
    return new Group(this.traverseSequence(group.nestedSequence), group.amount);
  }
  public traverseBlockMove(blockMove: BlockMove): AlgPart {
    if (blockMove.family.endsWith("w")) {
      return modifiedBlockMove(blockMove, {
        family: blockMove.family.slice(0, blockMove.family.length - 1).toLowerCase()
      })
    } else {
      return blockMove;
    }
  }
  public traverseCommutator(commutator: Commutator): AlgPart {
    return new Conjugate(
      this.traverseSequence(commutator.A),
      this.traverseSequence(commutator.B),
      commutator.amount,
    );
  }
  public traverseConjugate(conjugate: Conjugate): AlgPart {
    return new Conjugate(
      this.traverseSequence(conjugate.A),
      this.traverseSequence(conjugate.B),
      conjugate.amount,
    );
  }
  public traversePause(pause: Pause): AlgPart {
    return pause;
  }
  public traverseNewLine(newLine: NewLine): AlgPart {
    return newLine;
  }
  public traverseComment(comment: Comment): AlgPart {
    return comment;
  }
}

const wideMovesToSiGNInstance = new WideMovesToSign();
export const wideMovesToSiGN = wideMovesToSiGNInstance.traverseSequence.bind(
  wideMovesToSiGNInstance,
) as (a: Sequence) => Sequence;
