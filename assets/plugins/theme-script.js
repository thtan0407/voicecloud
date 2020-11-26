$(document).ready(function () {
    // Slide swiper.js
    let service = new Swiper('.services-slide', {
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    let partner = new Swiper('.partner-slide', {
        loop: true,
        slidesPerView: 4,
        autoplay: {
            delay: 7500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }
    });

    // ScrollSpy

    let stickyOffset = $('#scrollspy').offset().top + 100;

    function addClassScrollSpy() {
        let sticky = $('#scrollspy'),
            scroll = $(window).scrollTop();
        if (scroll >= stickyOffset) {
            sticky.addClass('sticky');
        } else {
            sticky.removeClass('sticky');
        }
    }

    function updateClassActive() {
        $('.wrap-section').each(function () {
            var sectionId = $(this).attr('id');
            var navigationMatch = $('#scrollspy ul li a[href="#' + sectionId + '"]');
            console.log(navigationMatch);
            if (($(this).offset().top - $(window).height() / 2 < $(window).scrollTop()) &&
                ($(this).offset().top + $(this).height() - $(window).height() / 2 > $(window).scrollTop())) {
                navigationMatch.closest('li').addClass('active');
            } else {
                navigationMatch.closest('li').removeClass('active');
            }
        });
    }

    $(window).scroll(function () {
        if ($('#scrollspy').length) {
            addClassScrollSpy();
            updateClassActive();
        }
    });

    function scrollSpy(el) {
        $('#scrollspy > ul > li').removeClass("active");
        el.closest("li").addClass("active")
    }

    $('#scrollspy > ul > li > a').click(function (e) {
        e.stopPropagation();
        scrollSpy($(this));
    });

    // Menu
    function callMenu() {
        if($('body').hasClass('show_navigation')) {
            $('body').removeClass('show_navigation');
        } else {
            $('body').addClass('show_navigation');
        }
    }

    $('#hamburger, #close-menu, .header-overlay').click(function () {
        callMenu();
    });

});