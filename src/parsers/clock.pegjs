start = SEQUENCE

DIRECTION = "+" { return 1; } /
            "-" { return -1; }

NUMBER = characters:[0-6] { return parseInt(characters, 10); }

WHITESPACE = characters:" "

Y2 = "y2"

FAMILY = "UL" / "UR" / "DR" / "DL" / "U" / "R" / "D" / "L" / "ALL"
            
MOVE = family:FAMILY number:NUMBER direction:DIRECTION { return {family: family, amount: number * direction, type: "blockMove"}; } /
       Y2 { return {type: "blockMove", family: "FLIP", amount: 1} } /
       family:FAMILY { return {"type": "pause"}; }

MOVE_LIST = move:MOVE WHITESPACE moveList:MOVE_LIST { return [move].concat(moveList); } /
            move:MOVE { return [move]; }
            
SEQUENCE = moveList:MOVE_LIST { return {"type": "sequence", "nestedUnits": moveList.filter((move) => move.type !== "pause" && move.amount !== 0)}; }
