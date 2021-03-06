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


/*$(document).ready(function() {
    $('body').append('<div> <audio id="my_audio" src="/static/main/youAndINotionRemix.mp3" loop="loop"></audio>  <script> $(document).on("click", ".btn", function () { $("#my_audio")[0].play(); }); </script> </div>');
});*/


// Open/Close Dashboard
$(document).on('click', '#toggleDash', function () {
    init_slick_dashboard();
    dashboard_toggle();
});

$(document).on('click', '#filterBtn', function () {
    init_slick_dashboard();
    if (!($('#toggleDash').parent().is('footer.active'))) {
        dashboard_toggle();
    }
    $('#dashCarousel').slick('slickGoTo', 3);
    $('#dashCarousel').slick('slickNext');
    $('#dash3').children().fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
});

$(document).on('click', '#filterBtnDash', function () {

    $('#dashCarousel').slick('slickGoTo', 3);
    $('#dashCarousel').slick('slickNext');
    $('#dash3').children().fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
});

$(document).on('click', '.mapboxgl-ctrl-geocoder--icon-search', function () {
    init_slick_dashboard();
    if (!($('#toggleDash').parent().is('footer.active'))) {
        dashboard_toggle();
    }
    $('#dashCarousel').slick('slickGoTo', 0);
    //$('#dashCarousel').slick('slickPrev');
    $('#dash0').children().fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
});

$(document).on('click', '#dropPin', function () {

    $('#toggleDash').parent().removeClass('active');
    $('#toggleDash').css({ 'display': 'none' });

    $('#mapbox').append('<div id="crosshair" style="position: absolute; z-index: 99; left: calc(50% - 16px); top: calc(50% - 17px); color: red;"> <i class="fas fa-crosshairs fa-2x"></i> </div>');
    $('#mapbox').append('<div class="alert alert-primary alert-dismissible" style="position: absolute; z-index: 99; width: 520px; top: 1%; left: 32%;" id="locationPinInstruct"> <button type="button" class="close" data-dismiss="alert">&times;</button><ol><li>Position the crosshair on the location you want to add.</li><li>Press the tick when you are done.</li></ol></div>');
    $('#mapbox').append('<button id="confirmLocation" class="btn" style="position: absolute; z-index: 99; left: calc(50% - 53px); top: 11%; color: greenyellow;"><i class="fas fa-check-circle fa-5x"></i></button>');

    $('#uploaderEntry').val($('#navUsername').html());
});

$(document).on('click', '#confirmLocation', function () {

    $('#crosshair').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // TODO: Add longitude and latitude to add location form
    var new_location = new mapboxgl.Marker().setLngLat(map.getCenter()).addTo(map);

    $('#locationPinInstruct').remove();
    $('#confirmLocation').remove();

    $('#mapbox').append('<div class="alert alert-primary alert-dismissible" style="position: absolute; z-index: 99; width: 700px; top: 1%; left: 30%;" id="nearestAccessPinInstruct"> <button type="button" class="close" data-dismiss="alert">&times;</button><ul><li>If appropriate, add the location of a nearby access point (e.g. car park) as before.</li><li>If this is not relevant, press the cross.</li></ul></div>');
    $('#mapbox').append('<button id="confirmNearestAccess" class="btn" style="position: absolute; z-index: 99; right: calc(50% - 0px); top: 11%; color: greenyellow;"><i class="fas fa-check-circle fa-5x"></i></button>')
    $('#mapbox').append('<button id="cancelNearestAccess" class="btn" style="position: absolute; z-index: 99; left: calc(50% - 0px); top: 11%; color: red;"><i class="fas fa-window-close fa-5x"></i></button>')

    $('#locationEntry').val(map.getCenter());

});


$(document).on('click', '#confirmNearestAccess', function () {
    $('#crosshair').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var new_nearest_access = new mapboxgl.Marker().setLngLat(map.getCenter()).addTo(map);

    upload_location();

    $('#nearestAccessEntry').val(map.getCenter());
});

$(document).on('click', '#cancelNearestAccess', function () {
    upload_location();
});


$(document).on('click', '#primarySubCatContinue', function () {

    if ($('#primarySubCatContainer').find('#primarySubCatBtn').length) {

        $('#uploadLocationModalPrimary').modal('hide');
        $('#uploadLocationModalSecondary').modal();
        $('continueErrorPrimary').remove();

        $('#primarySubCatEntry').val($('#primarySubCatBtn').find('.figure-caption').html());
    }
});


$(document).on('click', '#subCatBtnAddLocation', function () {

    var name = $(this).find('figcaption').text();
    var icon_path = $(this).find('img').attr('src');

    $('#primarySubCatContainer').empty();
    $('#primarySubCatContainer').append('<button class="btn" type="button" id="primarySubCatBtn"><figure class="figure"><img src="' + icon_path + '" style="height: 100px; width: 100px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button>');
    $('#primarySubCatContinue').tooltip('disable');
    
    $('.selectedPrimaryCategory').tooltip('dispose');
    $('.selectedPrimaryCategory').removeClass('.selectedPrimaryCategory');

    $('button[id^="secondarySubCatBtn"]').each(function () {
        if ($(this).find('.figure-caption').html() == name) {
            $(this).replaceWith('<button class="btn" type="button" id="secondaryPlaceholder"><figure class="figure"><img src="/static/main/img/icons/subcat_icon_placeholder.svg" style="height: 90px; width: 90px;"><figcaption class="figure-caption">&nbsp </figcaption></figure></button>');
        }
    });

});


$(document).on('click', '#subCatBtnAddLocationSecondary', function () {

    var name = $(this).find('figcaption').text();
    var icon_path = $(this).find('img').attr('src');

    if ($('#secondarySubCatBtn').find('.figure-caption').html() != name) {
        
        if ($('#primarySubCatBtn').find('.figure-caption').html() != name) {
            $('#secondaryPlaceholder').replaceWith('<button class="btn" type="button" id="secondarySubCatBtn"><figure class="figure"><img src="' + icon_path + '" style="height: 90px; width: 90px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button>');
        } else { 

            $(this).addClass('selectedPrimaryCategory');
            $(this).attr('data-toggle', 'tooltip');
            $(this).attr('title', 'This is your primary category. You cannot select it as a secondary category.');
            $(this).attr('data-placement', 'bottom');
            $(this).tooltip('show');

        }
    }
});


$(document).on('click', '#secondarySubCatBtn', function () {
    $(this).replaceWith('<button class="btn" type="button" id="secondaryPlaceholder"><figure class="figure"><img src="/static/main/img/icons/subcat_icon_placeholder.svg" style="height: 90px; width: 90px;"><figcaption class="figure-caption">&nbsp </figcaption></figure></button>');
});

$(document).on('click', '#secondarySubCatBack', function () {

    $('#uploadLocationModalSecondary').modal('hide');
    $('#uploadLocationModalPrimary').modal();

});


$(document).on('click', '#secondarySubCatContinue', function () {

    $('#uploadLocationModalSecondary').modal('hide');
    $('#submitLocationModal').modal();

    var secondary_sub_cats = []

    $('button[id^="secondarySubCatBtn"]').each(function () {
        secondary_sub_cats.push($(this).find('.figure-caption').html());
    });

    $('#secondarySubCatEntry').val(secondary_sub_cats);

});



$(document).on('click', '#submitLocationBack', function () {

    $('#submitLocationModal').modal('hide');
    $('#uploadLocationModalSecondary').modal();

});


$(document).on('input', '#inputLocationName', function () {
    $('#submitLocation').tooltip('disable');
});


$(document).on('click', '#submitLocation', function () {
    console.log($('#inputLocationName').val());
    console.log($('#inputLocationDescription').val());

    if ($('#inputLocationName').val() != '') {

        $('#nameEntry').val($('#inputLocationName').val());
        $('#descriptionEntry').val($('#inputLocationDescription').val());
        var cloned_image_input = $('#inputLocationImage').clone();
        // cloned_image_input.attr('class', '');
        cloned_image_input.attr('id', 'photoEntry');
        cloned_image_input.attr('name', 'photo');
        $('#photoEntry').replaceWith(cloned_image_input);

        $('#createLocationForm').submit();

        end_create_location();
    }

});

$(document).on('mouseover', '#submitLocation', function () {

    if ($('#inputLocationName').val() == '') {
        $('#submitLocation').tooltip('enable');
        $('#submitLocation').tooltip('show');
    }
});



function upload_location() {
    $('#crosshair').remove();
    $('#confirmLocation').remove();
    $('#confirmNearestAccess').remove();
    $('#cancelNearestAccess').remove();
    $('#nearestAccessPinInstruct').remove();

    $('#uploadLocationModalPrimary').modal().fadeIn(500);

}


$(document).on('click', 'button.close', function () {
    end_create_location();
});



function end_create_location() {
    $('#dashArrow').replaceWith('<span class="no-gutters" id="dashArrow"><i class="fas fa-caret-up"></i>DASHBOARD</span>');
    $('#crosshair').remove();
    $('#confirmLocation').remove();
    $('#confirmNearestAccess').remove();
    $('#cancelNearestAccess').remove();
    $('#toggleDash').css({ 'display': '' });

    $('#primarySubCatContainer').empty();
    $('#primarySubCatContainer').append('<img src="/static/main/img/icons/subcat_icon_placeholder.svg" alt="primary_subCat_icon" style="height: 100px; width: 100px;">');

    $('#secondarySubCatBtn').replaceWith('<button class="btn" type="button" id="secondaryPlaceholder"><figure class="figure"><img src="/static/main/img/icons/subcat_icon_placeholder.svg" style="height: 90px; width: 90px;"><figcaption class="figure-caption">&nbsp </figcaption></figure></button>');
    $('#secondarySubCatBtn').replaceWith('<button class="btn" type="button" id="secondaryPlaceholder"><figure class="figure"><img src="/static/main/img/icons/subcat_icon_placeholder.svg" style="height: 90px; width: 90px;"><figcaption class="figure-caption">&nbsp </figcaption></figure></button>');

    $('#primarySubCatContinue').tooltip('enable');

    $('#inputLocationName').replaceWith('<input type="text" class="form-control" id="inputLocationName" placeholder="Name your location" aria-label="Name of location">');
    $('#inputLocationImage').next('.custom-file-label').html('Select file');
    $('#inputLocationDescription').replaceWith('<textarea class="form-control" id="inputLocationDescription" placeholder="Describe your location" aria-label="Description of location"></textarea>');
    $('submitLocation').tooltip('enable');

    $('.selectedPrimaryCategory').tooltip('dispose');
    $('.selectedPrimaryCategory').removeClass('.selectedPrimaryCategory');

}


function dashboard_toggle() {
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
        $('#dashContent').attr('style', 'background-color: aquamarine; height: 0px; overflow-y: hidden;');
    } else {
        $('#dashArrow').replaceWith('<span class="no-gutters" id="dashArrow"><i class="fas fa-caret-up fa-rotate-180"></i>DASHBOARD</span>');
        $('#dashContent').attr('style', 'background-color: aquamarine; height: 100%;');
        $('footer').removeClass('collapseFilters');
        if ($('.activeBtn').length) {
            var actives = get_all_active();
            $('.dashboardActiveFilters').remove();
            build_actives_carousel(max_filters_per_page = 4, actives = actives, display_page = 0);
        } else { $('#filterCardFooter').remove(); }
        $('.slick-track').attr
    };
    $('footer').toggleClass('active');
}


function init_slick_dashboard() {

    if (!($('#dashCarousel').hasClass('slick-initialized'))) {

        $('#dashCarousel').on('breakpoint', function () {
            $('[data-toggle="tooltip"]').tooltip();
            $('#focusHeaderContainer').textfill({});
        });

        $('#dashCarousel').on('init', function () {
            $('[data-toggle="tooltip"]').tooltip();
            $('#focusHeaderContainer').textfill({});
        });

        $('#dashCarousel').slick({
            //general
            infinite: false,
            slidesToShow: 4,
            arrows: true,
            prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",

            //responsivity
            responsive: [{
                breakpoint: 1580,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 1190,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });
    }
}


function popSubCategories(categories, sub_categories, initial) {
    var carousel_page = 0;

    if (initial) {
        var category = Object.keys(categories)[0];
        sub_categories = categories[category];
        $('#' + category + '-dash-filter').addClass('active');

    } else {
        $('.carousel-indicators.subCat').empty();
        $('#subCatCarousel').empty();
        $('.catBtn').each(function () {
            if ($(this).attr('id') == String(categories + '-dash-filter')) {
                $(this).addClass('active');
            } else if ($(this).attr('id').slice(-11) == 'dash-filter') {
                $(this).removeClass('active');
            }
        });
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
        $('#button-container' + carousel_page).append('<button class="btn" type="button" id="subCatBtn"><figure class="figure"><img class="mx-auto d-block" src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button>');
    }

}



function popSubCategoriesAddLocationPrimary(categories, sub_categories, initial) {
    var carousel_page = 0;

    if (initial) {
        var category = Object.keys(categories)[0];
        sub_categories = categories[category];
        $('#' + category + '-add-location').addClass('active');
    } else {
        $('#carousel-pages-add-location').empty()
        $('#subCatCarouselAddLocation').empty()
        $('.catBtn').each(function () {
            if ($(this).attr('id') == String(categories + '-add-location')) {
                $(this).addClass('active');
            } else if ($(this).attr('id').slice(-12) == 'add-location') {
                $(this).removeClass('active');
            }
        });
    }

    var sub_cat_length = Object.keys(sub_categories).length;

    for (var i = 0; i < sub_cat_length; i++) {
        var name = String(Object.keys(sub_categories)[i]);
        // var icon_path = String(Object.values(categories[default_category])[i]).replace('static/', "/static/");\
        var icon_path = '/media/' + String(Object.values(sub_categories)[i]);

        if (i == 0) {
            $('#carousel-pages-add-location').append('<li data-target="#filterMenuAddLocation" data-slide-to="' + carousel_page + '" class="active"></li>');
            $('#subCatCarouselAddLocation').append('<div class="carousel-item active"><div class="container" id="button-container-add-location' + carousel_page + '"></div></div>');
        } else if (i % 4 == 0) {
            carousel_page += 1;
            $('#carousel-pages-add-location').append('<li data-target="#filterMenuAddLocation" data-slide-to="' + carousel_page + '"></li>');
            $('#subCatCarouselAddLocation').append('<div class="carousel-item"><div class="container" id="button-container-add-location' + carousel_page + '"></div></div>');
        }
        $('#button-container-add-location' + carousel_page).append('<button class="btn" type="button" id="subCatBtnAddLocation"><figure class="figure"><img src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button>');
    }

}


function popSubCategoriesAddLocationSecondary(categories, sub_categories, initial) {
    var carousel_page = 0;

    if (initial) {
        var category = Object.keys(categories)[0];
        sub_categories = categories[category];
        $('#' + category + '-add-location-secondary').addClass('active');
    } else {
        $('#carousel-pages-add-location-secondary').empty()
        $('#subCatCarouselAddLocationSecondary').empty()
        $('.catBtn').each(function () {
            if ($(this).attr('id') == String(categories + '-add-location-secondary')) {
                $(this).addClass('active');
            } else if ($(this).attr('id').slice(-22) == 'add-location-secondary') {
                $(this).removeClass('active');
            }
        });
    }

    var sub_cat_length = Object.keys(sub_categories).length;

    for (var i = 0; i < sub_cat_length; i++) {
        var name = String(Object.keys(sub_categories)[i]);
        // var icon_path = String(Object.values(categories[default_category])[i]).replace('static/', "/static/");\
        var icon_path = '/media/' + String(Object.values(sub_categories)[i]);

        if (i == 0) {
            $('#carousel-pages-add-location-secondary').append('<li data-target="#filterMenuAddLocationSecondary" data-slide-to="' + carousel_page + '" class="active"></li>');
            $('#subCatCarouselAddLocationSecondary').append('<div class="carousel-item active"><div class="container" id="button-container-add-location-secondary' + carousel_page + '"></div></div>');
        } else if (i % 4 == 0) {
            carousel_page += 1;
            $('#carousel-pages-add-location-secondary').append('<li data-target="#filterMenuAddLocationSecondary" data-slide-to="' + carousel_page + '"></li>');
            $('#subCatCarouselAddLocationSecondary').append('<div class="carousel-item"><div class="container" id="button-container-add-location-secondary' + carousel_page + '"></div></div>');
        }
        $('#button-container-add-location-secondary' + carousel_page).append('<button class="btn" type="button" id="subCatBtnAddLocationSecondary"><figure class="figure"><img src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button>');
    }

}


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

    if (!$('#toggleDash').parent().is('footer.active') && $('footer').hasClass('collapseFilters')) {

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


$(document).on('click', '#subCatBtn', function () { // USE THIS FOR APPENDED BUTTONS
    var carousel_page;
    var display_page;
    var name = $(this).find('figcaption').text();
    var icon_path = $(this).find('img').attr('src') //.replace('_64.svg', '_64_clr.svg');
    var actives = add_active_filter(name, icon_path);
    var no_actives = Object.keys(actives).length;

    if ($('#filterCardFooter').length) {

        if (no_actives % 4 == 0) { display_page = (no_actives / 4) - 1; } else { display_page = Math.floor(no_actives / 4); }
        build_actives_carousel(4, actives, display_page);

    } else {

        carousel_page = 0;
        $('#filterCardBody').after('<div class="card-footer" id="filterCardFooter" style="background-color: goldenrod; padding: 0; margin: 0; height: 150px;"><div class="no-gutters d-flex align-items-center border" style="height: 150px;"><div id="activeFilters" class="carousel slide" data-interval="false"><ul class="carousel-indicators actives" style="margin: 0; padding: 0;" id="carousel-pages-active"></ul><div class="carousel-inner"><div class="container actives-pages"><div class="carousel-item active footer"><div class="container" id="active-button-container' + carousel_page + '"><button class="btn activeBtn" type="button" ><figure class="figure"><img class="mx-auto d-block" src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption><i class="fa fa-close" style="font-size:12px; color:red; vertical-align:top;"></i></figure></button></div></div></div></div></div></div>');

    }
});


function build_actives_carousel(max_filters_per_page, actives, display_page) {
    var carousel_page;

    if (Object.keys(actives).length) {

        $('#carousel-pages-active').empty();
        $('.carousel-arrow').remove();
        $('.actives-pages').empty();

        for (i = 0; i < Object.keys(actives).length; i++) {

            name = Object.keys(actives)[i];
            icon_path = Object.values(actives)[i];

            if (i == 0) {
                carousel_page = 0;
                if (!$('#filterCardFooter').length) {
                    $('#filterCardBody').after('<div class="card-footer" id="filterCardFooter" style="background-color: goldenrod; padding: 0; margin: 0; height: 150px;"><div class="no-gutters d-flex align-items-center border" style="height: 150px;"><div id="activeFilters" class="carousel slide" data-interval="false"><ul class="carousel-indicators actives" style="margin: 0; padding: 0;" id="carousel-pages-active"></ul><div class="carousel-inner"><div class="container actives-pages"><div class="carousel-item active footer"><div class="container" id="active-button-container' + carousel_page + '"><button class="btn activeBtn" type="button" ><figure class="figure"><img class="mx-auto d-block" src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption></figure></button></div></div></div></div></div></div>');
                    continue;
                }
                $('.actives-pages').append('<div class="carousel-item footer"><div class="container" id="active-button-container' + carousel_page + '"></div></div>');

            } else if (i % max_filters_per_page == 0) {

                carousel_page = i / max_filters_per_page;
                $('#carousel-pages-active').empty();

                if (!($('.carousel-arrow').length)) {
                    $('#activeFilters').append('<a class="carousel-control-prev carousel-arrow" href="#activeFilters" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next carousel-arrow" href="#activeFilters" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>');
                }

                for (var j = 0; j < carousel_page + 1; j++) {

                    $('#carousel-pages-active').append('<li data-target="#activeFilters" data-slide-to="' + j + '" id="active-page-indicator-container' + j + '"></li>');

                }

                $('#active-button-container' + (carousel_page - 1)).parent().after('<div class="carousel-item footer"><div class="container" id="active-button-container' + carousel_page + '"></div></div>');

            } else {
                carousel_page = Math.floor(i / max_filters_per_page);
            }

            $('#active-button-container' + carousel_page).append('<button class="btn activeBtn" type="button"><figure class="figure"><img class="mx-auto d-block" src="' + icon_path + '" style="height: 40px; width: 40px;"><figcaption class="figure-caption">' + name + '</figcaption><i class="fa fa-close" style="font-size:12px; color:red; vertical-align:top;"></i></figure></button>');

        }

        $('#active-button-container' + display_page).parent().addClass('active');
        $('#active-page-indicator-container' + display_page).addClass('active');

    } else { $('#filterCardFooter').remove(); }

}

$(document).on("mouseenter", "#searchRange", function () {
    $('#dashCarousel').slick("slickSetOption", "draggable", false);
});

$(document).on("mouseleave", "#searchRange", function () {
    $('#dashCarousel').slick("slickSetOption", "draggable", true);

});

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
