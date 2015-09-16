/**
 * Created by Work-nekki on 18/05/15.
 */
$(document).ready(function() {

	function List(options) {
		var elem = options.elem;

		elem.on("click", ".faq__title", onTitleClick);

		function onTitleClick(e) {
			if($(this).hasClass("faq__title_open")) {
				$(this).removeClass("faq__title_open");
				$(this).next(".faq__list").hide();
			} else {
				$(this).addClass("faq__title_open");
				$(this).next(".faq__list").show();
			}
		}
	}

	var faqList = new List({
		elem: $('.faq')
	});


	$(".fancybox").fancybox({
		openEffect	: 'fade',
		closeEffect	: 'elastic'
	});



function LinkOverlay(options) {
	var elem = options.elem;

	elem.on("mouseenter", ".js-link", onLinkOver);
	elem.on("mouseleave", ".js-link", onLinkOut);

	function onLinkOver(e) {
		$(this).find(".js-link-overlay").fadeIn(500);
	}

	function onLinkOut(e) {
		$(this).find(".js-link-overlay").fadeOut();
	}
}

var linkOverlay = new LinkOverlay({
	elem: $(".js-gallery")
});


$(".schedule__more, .project__more").click(function() {
	$(this).hide();
	$(this)
		.parent()
		.next()
		.show();
});

$('.menu a').click(function(e) {
	e.preventDefault();
	var id = $(this).attr("href");
	var nextContent = $(document).find(id);
	console.log(nextContent);
	return $('html, body').animate({
		scrollTop: nextContent.offset().top
	}, 800);
});

$('[href^="https://"], [href^="http://"]').each(function () {
	$(this).attr('target', '_blank');
});

});
