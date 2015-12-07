$( document ).ready(function() {

	// scroll functionality
	var percent = 0.05;
	var header = $('#banner');
	var title = $('#title');
	// scroll functionality
	$(window).scroll(function(){
    		var scrollTop = $(this).scrollTop();
    		var height = $(document).height();

    var calc = 1 - (5*scrollTop/height);

    if(calc +0.4 < percent){
    	title.addClass('smaller');
    }else if(calc >= percent){
    	title.removeClass('smaller');
    }

    header.css({ 'opacity': calc });  
    if ( calc > '1' ) {
      header.css({ 'opacity': 1 });
    } else if ( calc < '0' ) {
      header.css({ 'opacity': 0 });
    }

    }); 

});

