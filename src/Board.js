// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {
  window.Board = Backbone.Model.extend({
    initialize: function(params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log(
          "Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:"
        );
        console.log(
          "\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: grey;"
        );
        console.log(
          "\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: grey;"
        );
      } else if (params.hasOwnProperty("n")) {
        this.set(makeEmptyMatrix(this.get("n")));
      } else {
        this.set("n", params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get("n"))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger("change");
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(
          this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)
        ) ||
        this.hasMinorDiagonalConflictAt(
          this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)
        )
      );
    },

    hasAnyQueensConflicts: function() {
      return (
        this.hasAnyRooksConflicts() ||
        this.hasAnyMajorDiagonalConflicts() ||
        this.hasAnyMinorDiagonalConflicts()
      );
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex &&
        rowIndex < this.get("n") &&
        0 <= colIndex &&
        colIndex < this.get("n")
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    // how many different ways can you plane n queens, such that none of them are attack each other.
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // this.get(0); // first row of Board);
      // this.rows(); //board in nest array
      // this.rows()[0]; // first column

      // create variable called "total" equal to 0
      var total = 0;
      var currentRow = this.get(rowIndex);
      // iterate over currentRow;
      for (var i = 0; i < currentRow.length; i++) {
        // create  a variable currentRow  equal to this.rows()[rowIndex]
        if (currentRow[i] === 1) {
          // increment variable "total";
          total++;
        }
      }
      // if total > 1 return true, meaning there is a conflict
      if (total > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate over this.rows() using the for loop
      for (var index = 0; index < this.rows().length; index++) {
        //if hasRowConflictAt(index), because hasRowConflict takes in a number, then return true;
        if (this.hasRowConflictAt(index)) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // create variable called "total" equal to 0
      var total = 0;
      var currentRow = this.rows();
      // iterate over currentRow;
      for (var i = 0; i < currentRow.length; i++) {
        // increment variable "total"; if currentRow[i][colIndex]
        total += currentRow[i][colIndex];
      }
      // if total > 1 return true, meaning there is a conflict
      if (total > 1) {
        return true;
      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //iterate over this.rows() using the for loop
      for (var index = 0; index < this.rows().length; index++) {
        //if hasAnyColConflicts(index), because hasAnyColConflicts takes in a number, then return true;
        if (this.hasColConflictAt(index)) {
          return true;
        }
      }

      return false; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    //
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var total = 0;
      var row = this.rows();
      var columnVariable = majorDiagonalColumnIndexAtFirstRow;
      for (var index = 0; index < row.length; index++) {
        if (row[index][columnVariable + index] !== undefined) {
          total += row[index][columnVariable + index];
        }
      }
      // // for (
      // //   var index = majorDiagonalColumnIndexAtFirstRow;
      // //   index < this.rows().length;
      // //   index++
      // // ) {
      // //   console.log(index);
      // //   if (this.rows()[index][] === 1) {
      // //     //(this.rows()[2][1]=== 1)
      // //     total++;
      // //   }
      // // }
      // // // two for loops to iterate over row /column
      // // //iterate over this.rows()
      if (total > 1) {
        return true;
      }
      return false; // fixme
      //I typeof === "number"
      //O boolean
      //C
      //E majorDiagonalColumnIndexAtFirstRow = 3
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      console.log(this.rows());
      var _n = this.get("n");
      var start = -(_n - 2);
      for (var index = start; index <= 2 * _n - 3; index++) {
        console.log(index);
        //if hasAnyColConflicts(index), because hasAnyColConflicts takes in a number, then return true;
        if (this.hasMajorDiagonalConflictAt(index)) {
          return true;
        }
      }
      return false; // fixme
    },
    // [
    //   [0, 0, 0, 0],
    //   [1, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 1, 0]
    // ]
    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var total = 0;
      var row = this.rows().reverse(); // this is pretty hilarious
      var columnVariable = minorDiagonalColumnIndexAtFirstRow;
      for (var index = 0; index < row.length; index++) {
        if (row[index][columnVariable + index] !== undefined) {
          total += row[index][columnVariable + index];
        }
      }
      // // for (
      // //   var index = majorDiagonalColumnIndexAtFirstRow;
      // //   index < this.rows().length;
      // //   index++
      // // ) {
      // //   console.log(index);
      // //   if (this.rows()[index][] === 1) {
      // //     //(this.rows()[2][1]=== 1)
      // //     total++;
      // //   }
      // // }
      // // // two for loops to iterate over row /column
      // // //iterate over this.rows()
      if (total > 1) {
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      console.log(this.rows());
      var _n = this.get("n");
      var start = -(_n - 2);
      for (var index = start; index <= 2 * _n - 3; index++) {
        console.log(index);
        //if hasAnyColConflicts(index), because hasAnyColConflicts takes in a number, then return true;
        if (this.hasMinorDiagonalConflictAt(index)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/
  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
})();
