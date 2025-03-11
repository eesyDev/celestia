// lazyload for images
window.load_images = () => {
    setTimeout(function () {
        $("body")
            .find("img[data-src]")
            .each(function () {
                var src = $(this).attr("data-src");
                var srcset = $(this).attr("data-srcset");
                var classes = $(this).attr("class");
                var alt = $(this).attr("alt");
                var title = $(this).attr("title");
                if (src) {
                    var img = new Image();
                    $(img).hide();
                    $(img).on("load", function () {
                        $(this).fadeIn(400);
                        $(img).parents(".bg").addClass("loaded");

                        setTimeout(function () {
                            $(img).addClass("transition");
                        }, 400);
                    });
                    (srcset && srcset.length) > 3
                        ? $(img).attr("srcset", srcset)
                        : $();
                    $(img).attr("src", src);
                    $(img).attr("alt", alt);
                    $(img).attr("title", title);
                    $(img).addClass(classes);
                    $(this).replaceWith(img);
                }
            });
    }, 150);
};

jQuery(document).ready(function ($) {
    window.load_images();
    $('.header__search').on('click', function() {
        if (!$(this).find('input').length) {
            // Сохраняем SVG
            const $svg = $(this).find('svg');
            
            // Создаем элементы
            const $form = $('<form>', { class: 'header__search-form' });
            const $input = $('<input>', {
                type: 'text',
                class: 'header__search-input',
                placeholder: 'Поиск...'
            });
            const $button = $('<button>', {
                type: 'submit',
                class: 'header__search-submit'
            });
            
            // Перемещаем SVG в кнопку
            $button.append($svg);
            
            // Собираем форму
            $form.append($input, $button);
            
            // Очищаем div и добавляем форму
            $(this).empty().append($form);
            
            // Фокус на input
            $input.focus();
            
            // Обработчик формы
            $form.on('submit', function(e) {
                e.preventDefault();
                console.log('Search query:', $input.val());
            });
        }
    });
    
    // Закрытие при клике вне
    $(document).on('click', function(e) {
        const $search = $('.header__search');
        if (!$(e.target).closest('.header__search').length && $search.find('form').length) {
            const $svg = $search.find('svg');
            $search.empty().append($svg);
        }
    });
    
    // Закрытие при Escape
    $(document).on('keyup', function(e) {
        if (e.key === 'Escape') {
            const $search = $('.header__search');
            if ($search.find('form').length) {
                const $svg = $search.find('svg');
                $search.empty().append($svg);
            }
        }
    });

    $('.burger').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('.slide-menu').toggleClass('open');

        if ($(this).hasClass('open')) {
            const scrollPosition = window.pageYOffset;
            $('body').css({
                overflow: 'hidden',
                position: 'fixed',
                top: -scrollPosition,
                width: '100%'
            }).data('scroll-position', scrollPosition);
        } else {
            const scrollPosition = $('body').data('scroll-position');
            $('body').css({
                overflow: '',
                position: '',
                top: '',
                width: ''
            });
            window.scrollTo(0, scrollPosition);
        }
    });

    try {
        window.frontpage_blog_slider = new Swiper('.blog-slider', {
            slidesPerView: 1,
            spaceBetween: 36,
            pagination: {
                el: ".swiper-pagination.blog-pagination",
                type: "bullets",
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                620: {
                    slidesPerView: 2,
                }
            }
        })
    } catch (err) {
        window.frontpage_blog_slider = false;
        
    }
    
})
