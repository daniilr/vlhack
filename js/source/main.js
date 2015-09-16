/**
 * Created by Work-nekki on 18/05/15.
 */
$(document).ready(function() {

	function List(options) {
		var elem = options.elem;

		elem.on("click", ".faq__title", onTitleClick);

		function onTitleClick(e) {
			var faqTitle = $(this);
			var faqList = $(this).next(".faq__list");
			if(faqTitle.hasClass(".faq__title_open")) {
				faqTitle.removeClass(".faq__title_open");
				faqList.hide();
			} else {
				faqTitle.add(".faq__title_open");
				faqList.show();
			}
		}
	}

	var faqList = new List({
		elem: $('.faq')
	});

});