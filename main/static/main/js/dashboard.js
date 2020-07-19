// Dashboard controller

// JQUERY EVENT HANDLERS
$(document).on('click', '.activeBtn', function () {

    var actives = remove_active_filter($(this).find('figcaption').text());

    if ($('#toggleDash').parent().is('footer.active')) {
        build_actives_carousel(max_filters_per_page = 4, actives = actives, display_page = get_display_page(4, actives));
    } else {
        build_dashboard_active_filters(actives = actives);
    }
});


// Open/Close Dashboard
$(document).on('click', '#toggleDash', function () {
    if ($('#toggleDash').parent().is('footer.active')) {

        if (!$('.activeBtn').length) {
            $('footer').attr('id', '');
            $('body').attr('id', '');
            $('footer.active').removeClass('collapseFilters');
        } else {
            $('footer.active').addClass('collapseFilters');
            var actives = get_all_active();
            build_dashboard_active_filters(actives = actives);
        }
        $('#dashArrow').replaceWith('<span class="no-gutters" id="dashArrow"><i class="fas fa-caret-up"></i>DASHBOARD</span>');
        $('#dashContent').attr('style', 'background-color: aquamarine; height: 100%; display: none;');
    } else {
        $('#dashArrow').replaceWith('<span class="no-gutters" id="dashArrow"><i class="fas fa-caret-up fa-rotate-180"></i>DASHBOARD</span>');
        $('#dashContent').attr('style', 'background-color: aquamarine; height: 100%;');
        $('footer').removeClass('collapseFilters');
        if ($('.activeBtn').length) {
            var actives = get_all_active();
            $('.dashboardActiveFilters').remove();
            build_actives_carousel(max_filters_per_page = 4, actives = actives, display_page = 0);
        } else { $('.card-footer').remove(); }
    };
    $('footer').toggleClass('active');
});


// Collapse collapsed dashboard after removing final active filter

/*$(document).on('click', '.activeBtn', function () {
    if ($('footerCollapseFilters').length) {
        // TODO: remove active filter here
        if (!($('.activeBtn').length)) {
            $('footer').attr('id', '');
            $('body').attr('id', '');
        }
    }
});*/


// Collapse full dashboard after removing active filters

// INSERT CAROUSEL GENERATION FOR ACTIVE FILTERS



// display dashboard according to screensize

// INSERT CAROUSEL GENERATION FOR DASHBOARD PAGES




function popSubCategories(categories, sub_categories, initial) {
    var carousel_page = 0;

    if (initial) {
        var category = Object.keys(categories)[0];
        sub_categories = categories[category];
    } else {
        $('.carousel-indicators.subCat').empty()
        $('#subCatCarousel').empty()
    }

    var sub_cat_length = Object.keys(sub_categories).length;

    for (var i = 0; i < sub_cat_length; i++) {
        var name = String(Object.keys(sub_categories)[i]);
        // var icon_path = String(Object.values(categories[default_category])[i]).replace('static/', "/static/");\
        var icon_path = '/media/' + String(Object.values(sub_categories)[i]);

        if (i == 0) {
            $('#carousel-pages').append('<li data-target="#filterMenu" data-slide-to="' + carousel_page + '" class="active"></li>');
            $('#subCatCarousel').append('<div class="carousel-item active"><div class="container" id="button-container' + carousel_page + '"></div></div>');
        } else if (i % 4 == 0) {
            carousel_page += 1;
            $('#carousel-pages').append('<li data-target="#filterMenu" data-slide-to="' + carousel_page + '"></li>');
            $('#subCatCarousel').append('<div class="carousel-item"><div class="container" id="button-container' + carousel_page + '"></div></div>');
        }
        $('#button-container' + carousel_page).append('<button class="btn" type="button" id="subCatBtn"><figure class="figure"><img src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button>');
    }
}



$(document).on('click', '#subCatBtn', function () { // USE THIS FOR APPENDED BUTTONS
    var carousel_page;
    var display_page;
    var name = $(this).find('figcaption').text();
    var icon_path = $(this).find('img').attr('src');
    var actives = add_active_filter(name, icon_path);
    var no_actives = Object.keys(actives).length;

    if ($('.card-footer').length) {

        if (no_actives % 4 == 0) { display_page = (no_actives / 4) - 1; } else { display_page = Math.floor(no_actives / 4); }
        build_actives_carousel(4, actives, display_page);

    } else {

        carousel_page = 0;
        $('.card-body').after('<div class="card-footer" style="background-color: aquamarine; padding: 0; margin: 0;"><div id="activeFilters" class="carousel slide" data-interval="false" data-touch="true"><ol class="carousel-indicators actives" style="margin: 0; padding: 0;" id="carousel-pages-active"></ol><div class="carousel-inner"><div class="container actives-pages"><div class="carousel-item active footer"><div class="container" id="active-button-container' + carousel_page + '"><button class="btn activeBtn" type="button" ><figure class="figure"><img src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button></div></div></div></div></div></div>');

    }
});


function build_dashboard_active_filters(actives) {
    var no_actives = Object.keys(actives).length;
    var last_page = 0;

    if (no_actives) {
        if ($('.dashboardActiveFilters').length) {

            for (i = 0; i < no_actives; i++) { if ((i % get_max_filters_per_page() == 0) && (i > 0)) { last_page++; } }
            build_actives_carousel(get_max_filters_per_page(), actives, last_page);

        } else {

            var carousel_page = 0;
            $('#toggleDash').after('<div class="dashboardActiveFilters no-gutters" style="background-color: aquamarine; padding: 0; margin: 0;"><div id="activeFilters" class="carousel slide" data-interval="false" data-touch="true"><ol class="carousel-indicators actives" style="margin: 0; padding: 0;" id="carousel-pages-active"></ol><div class="carousel-inner"><div class="container actives-pages"><div class="carousel-item active footer"><div class="container" id="active-button-container' + carousel_page + '"></div></div></div></div></div></div>');
            build_actives_carousel(get_max_filters_per_page(), actives, carousel_page);

        }
    } else {
        $('.dashboardActiveFilters').remove()
        $('footer').removeClass('collapseFilters');
    }
}


function resize_dashboard() {

    if ($('#toggleDash').parent().is('footer.active')) {

        var sections_per_page = Math.floor(($(window).width() - 100) / 300);

        if (1 < sections_per_page && sections_per_page < 4 && $('#mdDash').length == 0) {
            var dash0 = $('#dash0')[0].outerHTML;
            var dash1 = $('#dash1')[0].outerHTML;
            var dash2 = $('#dash2')[0].outerHTML;
            var dash3 = $('#dash3')[0].outerHTML;

            dash2 = "Filters";

            console.log(sections_per_page);
            
            $('#dashContent').empty();
            $('#dashContent').append('<div id="mdDash" class="no-gutters border carousel slide" data-interval="false" data-touch="true"> <ul class="carousel-indicators" style="margin: 0; padding: 0;"> <li data-target="#mdDash" data-slide-to="0" class="active"></li> <li data-target="#mdDash" data-slide-to="1"></li> </ul> <div class="carousel-inner no-gutters carouselRow"> <div class="carousel-item active container-fluid"> <div class="row d-flex border carouselRow"> <div class="col-6 border"> ' + dash0 + ' </div> <div class="col-6 border"> ' + dash1 + ' </div> </div> </div> <div class="carousel-item container-fluid"> <div class="row d-flex border carouselRow"> <div class="col-6 border"> ' + dash2 + ' </div> <div class="col-6 border"> ' + dash3 + ' </div> </div> </div> </div> <a class="carousel-control-prev" href="#mdDash" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#mdDash" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>');
            

        } else if (sections_per_page < 2 && $('#smDash').length == 0) {
            var dash0 = $('#dash0')[0].outerHTML;
            var dash1 = $('#dash1')[0].outerHTML;
            var dash2 = $('#dash2')[0].outerHTML;
            var dash3 = $('#dash3')[0].outerHTML;

            dash2 = "Filters";

            console.log(sections_per_page);

           
            $('#dashContent').empty();
            $('#dashContent').append('<div id="smDash" class="no-gutters border carousel slide" data-interval="false" data-touch="true">  <ul class="carousel-indicators" style="margin: 0; padding: 0;"> <li data-target="#smDash" data-slide-to="0" class="active"></li> <li data-target="#smDash" data-slide-to="1"></li> <li data-target="#smDash" data-slide-to="2"></li> <li data-target="#smDash" data-slide-to="3"></li> </ul>  <div class="carousel-inner no-gutters carouselRow"> <div class="carousel-item active container-fluid"><div class="row d-flex border carouselRow"> <div class="col-12 border"> ' + dash0 + ' </div></div></div> <div class="carousel-item container-fluid"> <div class="row d-flex border carouselRow"> <div class="col-12 border">' + dash1 + '</div></div> </div> <div class="carousel-item container-fluid"> <div class="row d-flex border carouselRow"> <div class="col-12 border">' + dash2 + '</div></div> </div> <div class="carousel-item container-fluid"> <div class="row d-flex border carouselRow"> <div class="col-12 border">' + dash3 + '</div></div> </div> </div>  <a class="carousel-control-prev" href="#smDash" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#smDash" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>');

        } else if (sections_per_page >= 4 && $('#xlDash').length == 0) {
            var dash0 = $('#dash0')[0].outerHTML;
            var dash1 = $('#dash1')[0].outerHTML;
            var dash2 = $('#dash2')[0].outerHTML;
            var dash3 = $('#dash3')[0].outerHTML;

            dash2 = "Filters";

            console.log(sections_per_page);
            
            $('#dashContent').empty();
            $('#dashContent').append('<div id="xlDash" class="row d-flex"> <div class="col-3 no-gutters border"> ' + dash0 + ' </div> <div class="col-3 no-gutters border"> ' + dash1 + ' </div> <div class="col-3 no-gutters border"> ' + dash2 + ' </div> <div class="col-3 no-gutters border"> ' + dash3 + ' </div> </div>');
        }

    } else if (!$('#toggleDash').parent().is('footer.active') && $('footer').hasClass('collapseFilters')) {

        build_actives_carousel(get_max_filters_per_page(), get_all_active(), 0);

    }

}


function get_max_filters_per_page() {

    var screen_size = $(window).width();
    return Math.floor((screen_size - 100) / 83);
}


function add_active_filter(clicked_name, clicked_icon_path) {
    var actives = {};
    $('.activeBtn').each(function () {
        var name = $(this).find('figcaption').text();
        var icon_path = $(this).find('img').attr('src');
        actives[name] = icon_path;
    });
    actives[clicked_name] = clicked_icon_path;
    return actives;
}


function remove_active_filter(clicked_name) {
    var actives = {};
    $('.activeBtn').each(function () {
        var name = $(this).find('figcaption').text();
        if (clicked_name != name) {
            var icon_path = $(this).find('img').attr('src');
            actives[name] = icon_path;
        }
    });
    return actives;
}


function get_all_active() {
    var actives = {};
    $('.activeBtn').each(function () {
        var name = $(this).find('figcaption').text();
        var icon_path = $(this).find('img').attr('src');
        actives[name] = icon_path;
    });
    return actives;
}


function get_display_page(max_filters_per_page, actives) {
    var no_actives = Object.keys(actives).length;
    var current_page = $('.carousel-item.footer.active').children('.container').attr('id').replace('active-button-container', '');
    var last_page = 0;

    for (i = 0; i < no_actives; i++) { if ((i % max_filters_per_page == 0) && (i > 0)) { last_page++; } }

    if (last_page >= current_page) { return current_page; } else { return last_page; }
}


function build_actives_carousel(max_filters_per_page, actives, display_page) {
    var carousel_page;


    if (Object.keys(actives).length) {

        $('#carousel-pages-active').empty();
        $('.carousel-arrow').remove();
        $('.actives-pages').empty();
        $('.carousel-item.footer.active').removeClass('active');

        for (i = 0; i < Object.keys(actives).length; i++) {

            name = Object.keys(actives)[i];
            icon_path = Object.values(actives)[i];

            if (i == 0) {
                if (!$('.card-footer').length) {
                    carousel_page = 0;
                    $('.card-body').after('<div class="card-footer" style="background-color: aquamarine; padding: 0; margin: 0;"><div id="activeFilters" class="carousel slide" data-interval="false" data-touch="true"><ol class="carousel-indicators actives" style="margin: 0; padding: 0;" id="carousel-pages-active"></ol><div class="carousel-inner"><div class="container actives-pages"><div class="carousel-item active footer"><div class="container" id="active-button-container' + carousel_page + '"><button class="btn activeBtn" type="button" ><figure class="figure"><img src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button></div></div></div></div></div></div>');
                    continue;
                }

                carousel_page = 0;
                $('.actives-pages').append('<div class="carousel-item footer"><div class="container" id="active-button-container' + carousel_page + '"></div></div>');

            } else if (i % max_filters_per_page == 0) {
                carousel_page = i / max_filters_per_page;
                $('#carousel-pages-active').empty();

                if (!($('.carousel-arrow').length)) {
                    console.log('success');
                    $('#activeFilters').append('<a class="carousel-control-prev carousel-arrow" href="#activeFilters" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next carousel-arrow" href="#activeFilters" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>');
                }

                for (var j = 0; j < carousel_page + 1; j++) {

                    $('#carousel-pages-active').append('<li data-target="#activeFilters" data-slide-to="' + j + '" id="active-page-indicator-container' + j + '"></li>');

                }

                $('#active-button-container' + (carousel_page - 1)).parent().after('<div class="carousel-item footer"><div class="container" id="active-button-container' + carousel_page + '"></div></div>');

            } else {
                carousel_page = Math.floor(i / max_filters_per_page);
            }

            $('#active-button-container' + carousel_page).append('<button class="btn activeBtn" type="button"><figure class="figure"><img src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button>');

        }

        $('#active-button-container' + display_page).parent().addClass('active');
        $('#active-page-indicator-container' + display_page).addClass('active');

    } else { $('.card-footer').remove(); }

}

// AJAX REQUEST FOR QUERYING DB FOR SUB-CATEGORIES
/*$.ajax({
    url: 'ajax/populate_sub_categories/',
    data: {
        'category': category
    },
    dataType: 'json',
    success: function (data) {
        var len = Object.keys(data.sub_categories).length;
        for (var i = 0; i < len; i++) {
            var name = String(Object.keys(data.sub_categories)[i]);
            var icon_path = String(Object.values(data.sub_categories)[i]);

            // icon_path = String(icon_path).replace('static/', "{% static '");
            // icon_path = icon_path.concat("' %}");
            icon_path = icon_path.replace('static/', "/static/");
            console.log(icon_path)

            // NEED FUNCTIONALITY FOR CAROUSEL PAGES

            $('#subCatCarousel').append('<div class="carousel-item active"><div class="container"><button class="btn" type="button"><figure class="figure"><img src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button></div></div>');
        }
    }
});*/