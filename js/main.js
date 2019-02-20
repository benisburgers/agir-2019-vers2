$(document).ready(function() {
    var $window = $(window),
        $body = $('body'),
        minifyClass = 'minify',
        $circleEl = $('.circle, .percentage');

    feather.replace();

    $('nav .hamburger').click(function() {
        $(this).toggleClass('is-active');
        $body.toggleClass('nav-open');
        $('.dimmer').delay(300).fadeToggle();

        if($body.hasClass('nav-open')) {
        	var $delay = 0;
        	$($('ul.anchor-link li').get().reverse()).each(function() {
				$(this).delay($delay).animate({
			        marginRight: '0px'
			    }, 800, 'easeOutQuart');
			    $delay += 50;
	        });
        } else {
        	var $delay = 0;
	        $('ul.anchor-link li').each(function() {
				$(this).delay($delay).animate({
			        marginRight: '-300px'
			    }, 600, 'easeInQuart');
			    $delay += 50;
	        });
        }
    });

    $('.anchor-link li a').click(function() {
    	var $delay = 0;
        $('ul.anchor-link li').each(function() {
			$(this).delay($delay).animate({
		        marginRight: '-300px'
		    }, 800, 'easeInQuart');
		    $delay += 50;
        });

        $('nav .hamburger').toggleClass('is-active');
        $body.removeClass('nav-open');
    });

    // Change active menu item on page scroll
    // Cache selectors
    var lastId,
        topMenu = $(".anchor-link"),
        topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 2000, 'easeInOutExpo', function() {
            $('.dimmer').fadeOut();
        });

        e.preventDefault();
    });

    $window.scroll(function() {
        // If scroll down, add class minify to body
        if ($window.scrollTop() >= 50) {
            $body.addClass(minifyClass);
        } else {
            $body.removeClass(minifyClass);
        }

        // Bind to Scroll
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    $circleEl.viewportChecker({
        classToAdd: 'visible',
        repeat: true,
        offset: '5%',
        invertBottomOffset: true
    });

    $('.bar > div p, .bars > div p').text(function() {
        return $(this).parent().data('value');
    }).append('%');

    // Scroll smooth to anchor Function
    // var $root = $('html, body');

    // $anchors.click(function () {
    //     $root.animate({
    //         scrollTop: $( $.attr(this, 'href') ).offset().top
    //     }, 3000, 'easeInOutQuint');

    //     return false;
    // });

    // Hidden magic
    var $clicked = 0;

    $('.hidden-magic').click(function() {
    	if ($clicked >= 10) {
    		$('.adv-logo').attr('src', 'img/content/advance-logo-white-magic.svg');
    		$('.adv-logo-footer').attr('src', 'img/content/advance-logo-color-magic.svg');
    		$body.addClass('hidden-magic');
    	} else {
    		$clicked ++;
    		console.log('clicked: ' + $clicked);
    	}
    });
});