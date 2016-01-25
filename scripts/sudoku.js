'use strict';

$(document).ready(function() {
  if(mobilecheck()){
        // we're on mobile
        $(".playfield div").css({'width':'110px', 'height':'110px'});
        $(".playfield span").css({'width':'34px', 'height':'34px','line-height':'34px','font-size':'140%'});
        $("#sudokudesc").hide();
    }

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
  var nums = [1,2,3,4,5,6,7,8,9];    
  var rows = 9;
  var cols = 9;            

  // clearing the matrix
  var clear = function(){
    for(var i=0; i<9; i++){ // clears matrix
      matrix[i] = [];
      for(var j=0; j<9; j++){
        matrix[i][j]=null;
      }
    }
    $.each($(".playfield span"), function( key, value ) {
        $(this).empty();
    });
  }

  // renders the matrix on the board
  var renderMatrix = function(){
    for(var i=0; i<9; i++){ 
      var row = matrix[i];
      for(var j=0; j<9; j++){
        var that = $("#"+i+j);
        if(that.is(':empty')){
          if(row[j]!=null){
            that.append("<font>"+row[j]+"</font>");
          }
            // that.append(row[j]);   
        }
      }
    }
  }
  // solves the board
   var solve = function(){
        for(var i = 0; i < rows; i++){
            for(var j = 0; j < cols; j++){
                if(matrix[i][j]==null){
                    for(var k=0; k<nums.length; k++){ // try 1-9
                        if(isValid(i, j, nums[k])){
                            matrix[i][j] = nums[k]; 
                            if(solve(matrix)) return true; //If it's the solution return true
                            else matrix[i][j] = null; 
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

  // checks validity of the matrix
  var isValid = function(row, col, k){
      if(!isNumeric(k)) return false;
        // check if any rows contain k
        for(var i=0; i<rows; i++){
            if(matrix[i][col]==k) return false;
        }
        //check if any cols contain k
        for(var j=0; j<cols; j++){
            if(matrix[row][j]==k) return false;
        }
        // check 3x3        
        var xrow = parseInt(row/3)*3;
        var xcol = parseInt(col/3)*3;
        for(var i=xrow; i<xrow+3; i++)
            for(var j=xcol; j<xcol+3; j++)
                if(matrix[i][j]==k) return false;
        return true;
  }

$(document).keypress(throttle(function(e) { // listens to key clicks
  if(e.which == 115){
    $("#solve").click();
  }
  if(e.which == 99){
    $("#clear").click(); 
  }    
  var that = $('.active');
  var row = that.attr('id')[0];
  var col = that.attr('id')[1];
  var number = (e.which-48);
   if(isValid(row, col, number)){ // cannot start with an invalid matrix
      matrix[row][col]=null; // clear the current number
      that.empty(); // empty the row
      matrix[row][col] = number;  
      that.append(number);
    }
},200));

  // updates matrix on click
  $(".playfield span").on('click', function(){
    var that = $(this);

    var row = that.attr('id')[0];
    var col = that.attr('id')[1];

    var number = prompt("New number: ");
    if(isValid(row, col, number)){ // cannot start with an invalid matrix
      matrix[row][col]=null; // clear the current number
      that.empty(); // empty the row
      matrix[row][col] = number;  
      that.append(number);
    }
  });

// hover functionality
$('.playfield span').hover(function(event){
    $(this).toggleClass('active');
});

function throttle(func, interval) { // limits calls
    var lastCall = 0;
    return function() {
        var now = Date.now();
        if (lastCall + interval < now) {
            lastCall = now;
            return func.apply(this, arguments);
        }
    };
}

  // solves the matrix
  $("#solve").on('click',function(event){
      var now = Date.now();
      $("#timer").empty();
      if(solve()){
        $("#timer").append((Date.now()-now)/1000 + "s");
        renderMatrix();
      }else{
        $("#timer").append("<font>Unsolvable</font>");  
      }
  });

  // clears matrix
  $("#clear").on('click',function(event){
      clear();
  });
});

var isNumeric = function (n) { // checks to insure our number is between [1,9]
  var num = parseFloat(n);
  return !isNaN(num) && isFinite(n) && num > 0 && num < 10;
}

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}