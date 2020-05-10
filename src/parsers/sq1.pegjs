start = SEQUENCE

NUMBER = zero:"0" { return 0; } /
         characters:("-"?[1-6]) { return parseInt(characters.join(""), 10); }

WHITESPACE = characters:" "

U_D_MOVE_LIST = "(" uAmount:NUMBER "," WHITESPACE dAmount:NUMBER ")" { return [{type: "blockMove", family: "U", amount: uAmount}, {type: "blockMove", family: "D", amount: dAmount}]; }

SLICE_MOVE_LIST = "/" { return [{type: "blockMove", family: "SLICE", amount: 1}]; }

MOVE_LIST = U_D_MOVE_LIST / SLICE_MOVE_LIST

MOVE_LIST_LIST = move:MOVE_LIST WHITESPACE seq:MOVE_LIST_LIST { if (move[0].family === seq[0].family) throw new Error("Adjacent Square-1 moves of the same type are not supported.") ; return move.concat(seq); }   /
           move:MOVE_LIST { return move; }

SEQUENCE = moveList:MOVE_LIST_LIST { return {"type": "sequence", "nestedUnits": moveList.filter((move) => move.amount !== 0)}; }
