"use strict";

$(function() {
    var $posts = $("ol.posts"),
        cardName = ".card",
        $postsGrid,
        el;

    el = CaffeineTheme.app;

    if (el.dataset) {
        el.dataset.page = CaffeineTheme.context();
        el.dataset.device = CaffeineTheme.device();
    } else {
        $(el)
            .attr("data-page", CaffeineTheme.context())
            .attr("data-device", CaffeineTheme.device());
    }

    CaffeineTheme.readTime();

    if (window.profile_title) {
        $(".profile-title").text(window.profile_title);
    }

    if (window.profile_resume) {
        $("#profile-resume").text(window.profile_resume);
    }

    // Dynamically generate tags in tags overlay
    if (window.tag_names) {
        for (var i = 0; i < window.tag_names.length; i++) {
            var tag = window.tag_names[i],
                link = "/tag/" + tag + "/" + CaffeineTheme.getOpenHashFragment();

            $("<a>", {
                "href": link,
                "text": tag
            }).appendTo("#popular-tags .tags");
        }
    }

    // Subscribe button
    if (window.mailchimpOptions && window.mailchimpOptions.url) {
        $(".subscribe-button").removeClass("hide");
    }

    // "Post" page setup
    if (CaffeineTheme.is("page", "post")) {
        $("main").readingTime({
            readingTimeTarget: ".reading-time > span"
        });
        $(".content").fitVids();

        $("#back-button").on("click", function (event) {
            var lastPageNum = CaffeineTheme.getLastPageNum();
            event.preventDefault();

            if (lastPageNum.length > 0) {
                CaffeineTheme.redirect(lastPageNum);
            } else {
                window.history.back();
            }
        });
    }

    // Sets up masonry effects
    if ($posts && $posts.masonry) {
        $postsGrid = $posts.masonry({
            itemSelector: cardName,
			transitionDuration: 0,
            percentPosition: true
        });

        if (window.gridOptions) {
            var gridOptions = window.gridOptions,
                width = CaffeineTheme.getGridWidth(gridOptions.columns),
                fullColumnWidth = function() {
                    $posts.find(cardName).css("width", "100%");
                },
                gridColumnWidth = function() {
                    $posts.find(cardName).css("width", width);
					setTimeout(
						function() {
							$posts.masonry({
					            itemSelector: cardName,
								transitionDuration: 0,
					            percentPosition: true
					        });
						}, 300
					);
                };

            if (width) {
                CaffeineTheme.mediaQueryListener("all and (max-width: 700px)", fullColumnWidth, gridColumnWidth);
            }
        }

        if ($postsGrid.imagesLoaded) {
            $postsGrid.imagesLoaded()
                .done(function() {
                    $postsGrid.masonry("layout");
                })
                .progress(function() {
                    $postsGrid.masonry("layout");
                });
        }
    } else {
        $posts.find(cardName).css("width", CaffeineTheme.getGridWidth(1));
    }

    $(window).load(function() {
        if (CaffeineTheme.is("page", "home")) {

            if (CaffeineTheme.isOpen()) {
                CaffeineTheme.showNotification();
            }
        }

        $posts.addClass("animated fade-in");

        // Sets up scroll reveal effects
        if (window.ScrollReveal && $(cardName).length > 0) {
            window.sr = window.ScrollReveal().reveal(cardName, {
                afterReveal: function () {
                    if ($postsGrid) {
						$posts.masonry({
				            itemSelector: cardName,
							transitionDuration: 0,
				            percentPosition: true
				        });
                    }
                }
            });
        } else {
            $posts.css("visibility", "visible");
        }

        CaffeineTheme.setLastPageNum();
    });
	
	var toc = $( "p" )
    	.contents()
		.filter(function(){
			return this.nodeValue == "[TOC]";
		}).parent();
	
	if(toc != []) {
		toc.addClass("toc");
		toc.empty();
		toc.initTOC({overwrite:false,scope:".post-content"});
		toc.prepend("<h3>Contents</h3>");
	}
	
	// $(".post-content img[src$='gif'")
	// 	.each(function(a, b) {
	// 		$(this).attr('data-gifffer', $(this).attr('src'));
	// 		$(this).attr('data-gifffer-width', $(this).attr('width'));
	// 		$(this).attr('data-gifffer-height', $(this).attr('height'));
	// 		$(this).removeAttr('src')
	// 	}
	// );
	// Gifffer();
});
