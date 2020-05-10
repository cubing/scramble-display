start = SEQUENCE

AMOUNT = "++" { return 2; } /
         "--" { return -2; }

WIDE_FAMILY = "R" { return "l" } /
              "D" { return "u" }
            
U_MOVE = "U'" { return {family: "U", amount: -1, type: "blockMove"}; } /
         "U" { return {family: "U", amount: 1, type: "blockMove"}; }
            
MOVE = wideFamily:WIDE_FAMILY amount:AMOUNT { return {family: wideFamily, amount: -amount, type: "blockMove", innerLayer: 3, outerLayer: 2} } /
       U_MOVE

WHITESPACE = " " /
             "\n"

MOVE_LIST = move:MOVE WHITESPACE moveList:MOVE_LIST { return [move].concat(moveList); } /
            move:MOVE { return [move]; }
            
SEQUENCE = moveList:MOVE_LIST { return {"type": "sequence", "nestedUnits": moveList}; }
