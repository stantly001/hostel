$(function () {
    // Slideshow 4
    $("#slider3").responsiveSlides({
        auto: true,
        pager: false,
        nav: false,
        speed: 500,
        namespace: "callbacks",
        before: function () {
            $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
            $('.events').append("<li>after event fired.</li>");
        }
    });
});

$(document).ready(function () {
    $("span.menu").click(function () {
        $("ul.nav1").slideToggle(300, function () {
            // Animation complete.
        });
    });
    $().UItoTop({ easingType: 'easeOutQuart' });
});


$(function () {

    var menu_ul = $('.menu_drop > li > ul'),
        menu_a = $('.menu_drop > li > a');

    menu_ul.hide();

    menu_a.click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            menu_a.removeClass('active');
            menu_ul.filter(':visible').slideUp('normal');
            $(this).addClass('active').next().stop(true, true).slideDown('normal');
        } else {
            $(this).removeClass('active');
            $(this).next().stop(true, true).slideUp('normal');
        }
    });

});
$(window).load(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 9000,
        values: [50, 6000],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

});//]]>  
$(window).load(function () {
    $("#slider-range1").slider({
        range: true,
        min: 0,
        max: 6000,
        values: [50, 5000],
        slide: function (event, ui) {
            $("#amount1").val("KM-" + ui.values[0] + " - KM-" + ui.values[1]);
        }
    });
    $("#amount1").val("KM-" + $("#slider-range1").slider("values", 0) + " - KM-" + $("#slider-range1").slider("values", 1));

});//]]>