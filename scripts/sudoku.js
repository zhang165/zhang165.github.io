$(document).ready(function() {
  // sudoku logic
  var matrix = [[,,,,,,,,],
                [,,,,,,,,],
                [,,,,,,,,],
                [,,,,,,,,],
                [,,,,,,,,],
                [,,,,,,,,],
                [,,,,,,,,],
                [,,,,,,,,],
                [,,,,,,,,]];

  // clearing the matrix
  var clear = function(matrix){
    for(var i=0; i<9; i++){ // clears matrix
      matrix[i] = [];
      for(var j=0; j<9; j++){
        matrix[i][j]=undefined;
      }
    }
    $.each($("#playfield span"), function( key, value ) {
        $(this).empty();
    });
  }

  // renders the matrix on the board
  var renderMatrix = function(matrix){
    for(var i=0; i<9; i++){ 
      var row = matrix[i];
      for(var j=0; j<9; j++){
        var that = $("#"+i+j);
        if(that.is(':empty')){
          // that.append("<font color='green'>"+row[j]+"</font>");
          that.append(row[j]);
        }
      }
    }
  }

  // solves the board
  var solve = function(matrix){
      var rows = 9;
      var cols = 9;
        var nums = [1,2,3,4,5,6,7,8,9];
        for(var i=0; i<rows; i++){
            for(var j=0; j<cols; j++){
                if(matrix[i][j]==undefined){ // try to fill this with a value
                    for(var k=0; k<nums.length; k++){
                        if(isValid(matrix, i, j, nums[k])){ // it is valid to fill this board with this value
                            matrix[i][j]=nums[k];
                            if(solve(matrix)) return true; // recursive call
                            else matrix[i][j]=undefined;
                        }
                    }
                    return false; // we cannot fill square with any value, return and backtrack;
                }
            }
        }
        return true; // got to the end, we're good
  }

  // checks validity of the matrix
  var isValid = function(matrix, row, col, k){
      var rows = matrix.length;
        var cols = matrix[0].length;
        // check if any rows contain k
        for(var i=0; i<rows; i++){
            if(matrix[i][col]==k) return false;
        }
        //check if any cols contain k
        for(var j=0; j<cols; j++){
            if(matrix[row][j]==k) return false;
        }
        // check 3x3        
        for(var r = Math.floor(row / 3) * 3; r < Math.floor(row / 3) * 3 + 3; r++)
            for(var c = Math.floor(col / 3) * 3; c < Math.floor(col / 3) * 3 + 3; c++)
                if(matrix[r][c]==k) return false;

        return true;
  }

  // updates matrix on click
  $("#playfield span").on('click', function(){
    var that = $(this);
    var row = that.attr('id')[0];
    var col = that.attr('id')[1];
    matrix[row][col]=undefined; // clear the current number
    that.empty(); 
    var number = prompt("New number: ");
    if(isValid(matrix, row, col, number)){ // cannot start with an invalid matrix
      matrix[row][col] = number;  
      that.append(number);
    }
  });

  // solves the matrix
  $("#solve").on('click',function(event){
      solve(matrix);
      renderMatrix(matrix);
  });
  // clears matrix
  $("#clear").on('click',function(event){
      clear(matrix);
  });
});