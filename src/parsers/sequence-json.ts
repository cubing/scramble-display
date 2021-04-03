export interface BlockMoveJSON {
  type: "blockMove";
  family: string;
  innerLayer?: number;
  outerLayer?: number;
  amount: number;
}

export interface SequenceJSON {
  nestedUnits: BlockMoveJSON[];
}
