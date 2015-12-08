$( document ).ready(function() {
    // activates fancy box
    $(".fancybox").fancybox();

	// scroll functionality
	var percent = 0.05;
	var header = $('#banner');
	var title = $('#title');
	
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

    $.fn.moveIt = function(){
        var $window = $(window);
        var instances = [];
  
        $(this).each(function(){
            instances.push(new moveItItem($(this)));
        });
  
        window.onscroll = function(){
        var scrollTop = $window.scrollTop();
        instances.forEach(function(inst){
            inst.update(scrollTop);
            });
            }
        }

    var moveItItem = function(el){
        this.el = $(el);
        this.speed = parseInt(this.el.attr('data-scroll-speed'));
    };

    moveItItem.prototype.update = function(scrollTop){
    var pos = scrollTop / this.speed;
        this.el.css('transform', 'translateY(' + -pos + 'px)');
    };

    $(function(){
        $('[data-scroll-speed]').moveIt();
    });

});

