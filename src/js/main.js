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

$(document).ready(function () {
    window.load_images();

    try {
        window.frontpage_blog_slider = new Swiper('.blog-slider', {
            slidesPerView: 3,
            spaceBetween: 36,
            pagination: {
                el: ".swiper-pagination.blog-pagination",
                type: "bullets",
            },
        })
    } catch (err) {
        window.frontpage_blog_slider = false;
        
    }
})
