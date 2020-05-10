start = SEQUENCE

DIRECTION = "'" { return -1; }
          / "" { return 1; }

WHITESPACE = characters:" "

FAMILY = "R" { return "RBD"; }
       / "L" { return "LFD"; }
       / "U" { return "ULB"; }
       / "B" { return "DBL"; }
            
MOVE = family:FAMILY direction:DIRECTION { return {family: family, amount: direction, type: "blockMove"}; }

MOVE_LIST = move:MOVE WHITESPACE moveList:MOVE_LIST { return [move].concat(moveList); } /
            move:MOVE { return [move]; }
            
SEQUENCE = moveList:MOVE_LIST { return {"type": "sequence", "nestedUnits": moveList.filter((move) => move.type !== "pause" && move.amount !== 0)}; }
