/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var newBoard = new Board({ n: n });
  var inner = function(row) {
    //there's going to be a existing rows or a fresh new board
    row = row || 0;
    //  if n===rows return newBoard.rows()
    if (n === row) {
      return newBoard.rows();
    } else {
      for (var column = 0; column < n; column++) {
        newBoard.togglePiece(row, column);
        if (!newBoard.hasAnyRooksConflicts()) {
          return inner(row + 1);
        }
        newBoard.togglePiece(row, column);
      }
    }
    // else for (var column = 0 )
  };
  var solution = inner(0);
  console.log("Single solution for " + n + " rooks:", JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var newBoard = new Board({ n: n });
  var totalCount = 0;
  var inner = function(row) {
    //there's going to be a existing rows or a fresh new board
    row = row || 0;
    //  if n===rows return newBoard.rows()
    if (n === row) {
      totalCount++;
    } else {
      for (var column = 0; column < n; column++) {
        newBoard.togglePiece(row, column);
        if (!newBoard.hasAnyRooksConflicts()) {
          inner(row + 1);
        }
        newBoard.togglePiece(row, column);
      }
    }
    // else for (var column = 0 )
  };
  inner(0);
  console.log("Single solution for " + n + " rooks:", totalCount);

  return totalCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // contain all the possible boards
  var solution = [];
  // new Board ({n:4})
  var newBoard = new Board({ n: n });
  var inner = function(row) {
    //there's going to be a existing rows or a fresh new board
    row = row || 0;
    //  if n does equal 4, this is where we start counting how many pieces we have by iterating over the matrix and rows.
    if (n === row) {
      var possibleBoard = newBoard.rows();
      // create a total
      var total = 0;
      // iterate over the matrix
      for (var index = 0; index < possibleBoard.length; index++) {
        //iterate over the column
        for (var column = 0; column < possibleBoard[index].length; column++) {
          // add to total
          total += possibleBoard[index][column];
        }
      }
      // so far our board is filled with 1's and 0's, if the total count equals to 4, means we have a valid board
      // push to solution array.
      if (total === n || total === 0) {
        solution.push(newBoard.rows());
      }
    } else {
      // same concept here.
      //ex [0][0] if no conflict. piece will be placed at that "coordinate"
      //else recurse inner ( row +1 ) ===> [1][0], [1][1],[1][2]etc
      for (var column = 0; column < n; column++) {
        newBoard.togglePiece(row, column);
        if (!newBoard.hasAnyQueenConflictsOn(row, column)) {
          inner(row + 1);
          if (solution.length === 1) {
            return solution;
          }
        }
        newBoard.togglePiece(row, column);
      }
    }
    // else for (var column = 0 )
  };
  inner();
  // no possible boards, just set 1st element to inital this.rows()
  if (solution[0] === undefined) {
    solution[0] = newBoard.rows();
  }

  console.log(
    "Single solution for " + n + " queens:",
    JSON.stringify(solution[0])
  );
  return solution[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var newBoard = new Board({ n: n });
  var solutionCount = 0;
  var inner = function(row) {
    //there's going to be a existing rows or a fresh new board
    row = row || 0;
    //  if n does equal 4, this is where we start counting how many pieces we have by iterating over the matrix and rows.
    if (n === row) {
      var possibleBoard = newBoard.rows();
      // create a total
      var total = 0;
      // iterate over the matrix
      for (var index = 0; index < possibleBoard.length; index++) {
        //iterate over the column
        for (var column = 0; column < possibleBoard[index].length; column++) {
          // add to total
          total += possibleBoard[index][column];
        }
      }
      if (total === n) {
        solutionCount++;
      }
    } else {
      for (var column = 0; column < n; column++) {
        newBoard.togglePiece(row, column);
        if (!newBoard.hasAnyQueenConflictsOn(row, column)) {
          inner(row + 1);
        }
        newBoard.togglePiece(row, column);
      }
    }
  };
  inner();
  console.log("Number of solutions for " + n + " queens:", solutionCount);
  return solutionCount;
};
