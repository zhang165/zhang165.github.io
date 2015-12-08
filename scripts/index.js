$(window).load(function() {
    $(".content").fadeIn('slow');
    updateHeight();
});

$(window).resize(function(){
    updateHeight();
});

$(document).ready(function() {
    // sets height of wrapper to fixed divs
    updateHeight();

    // activates fancy box
    $(".fancybox").fancybox({helpers : { overlay : { locked : false } }});

	var percent = 0.05;
	var header = $('#banner');
	var title = $('#title');

    // stolen scroll functionality
     $.fn.moveIt = function(){
        var $window = $(window);
        var instances = [];
        
        $(this).each(function(){
            instances.push(new moveItItem($(this)));
        });
        window.onscroll = function(){
        var scrollTop = $window.scrollTop();
        var height = $(document).height();

        var calc = 1 - (3*scrollTop/height);
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
        this.el.css({'margin-top' : -(pos/2)+"px"});
    };

    $(function(){
        $('[data-scroll-speed]').moveIt();
    });
});

var updateHeight = function(){
    // TODO: fix height calculations

    // Loop through elements children to find & set the biggest height
    // $(".wrapper div").each(function(){
    // // If this elements height is bigger than the biggestHeight
    //     console.log($(this));
    //     console.log($(this).height());
    //     biggestHeight += $(this).height();
    // });

    // Set the container height
    $(".wrapper").height($(".content").outerHeight()*2);
}

