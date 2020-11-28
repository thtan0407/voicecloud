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

    if ($('#scrollspy').length) {
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
        if ($('body').hasClass('show_navigation')) {
            $('body').removeClass('show_navigation');
        } else {
            $('body').addClass('show_navigation');
        }
    }

    $('#hamburger, #close-menu, .header-overlay').click(function () {
        callMenu();
    });

    let avatar = $("#avatar .owl-carousel");
    let thumbs = $("#thumb .owl-carousel");
    let syncedSecondary = true;

    avatar.owlCarousel({
        items: 1,
        slideSpeed: 1000,
        nav: false,
        autoplay: true,
        dots: false,
        loop: false,
        autoplayTimeout: 10000,
        responsiveRefreshRate: 200,
        navText: [
            '<i class="fal fa-chevron-left" aria-hidden="true"></i>',
            '<i class="fal fa-chevron-right" aria-hidden="true"></i>'
        ]
    }).on("changed.owl.carousel", syncPosition);

    thumbs.on("initialized.owl.carousel", function () {
        thumbs
            .find(".owl-item")
            .eq(0)
            .addClass("current");
    }).owlCarousel({
        items: 4,
        dots: false,
        nav: false,
        smartSpeed: 200,
        slideSpeed: 500,
        statePadding: 3,
        margin: 10,
        slideBy: 4,
        responsiveRefreshRate: 100,
        responsive: {
            0: {
                items: 3,
                slideBy: 3,
            },
            991: {
                items: 4,
                slideBy: 4,
            }
        }
    }).on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        let count = el.item.count - 1;
        let current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        thumbs
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        let onscreen = thumbs.find(".owl-item.active").length - 1;
        let start = thumbs
            .find(".owl-item.active")
            .first()
            .index();
        let end = thumbs
            .find(".owl-item.active")
            .last()
            .index();

        if (current > end) {
            thumbs.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            thumbs.data("owl.carousel").to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            let number = el.item.index;
            avatar.data("owl.carousel").to(number, 100, true);
        }
    }

    thumbs.on("click", ".owl-item", function (e) {
        e.preventDefault();
        let number = $(this).index();
        avatar.data("owl.carousel").to(number, 300, true);
    });

    if ($('[data-toggle="popover"]').length) {
        $('[data-toggle="popover"]').popover();
    }
});