/**
 * @class CS.components.anchor
 * Componente para a apresentação da resposta da requisição feita via ajax
 * @singleton
 */
var Anchor = function() {};

Anchor.prototype.init = function(container, topNegative) {
	var me = this;
	this.container = container;
	this.active = 'active';
	this.topNegative = topNegative || 0;

	$(this.container).on('click', function(event) {
		event.preventDefault();

		var $anchor = $(this);
		$anchor = $anchor.data('anchor') ? ($($anchor.data('anchor')).offset().top - me.topNegative) : 0;

		$(me.container).removeClass(me.active);
		$(this).toggleClass(me.active);

		$('html, body').stop().animate({
			scrollTop: $anchor
		}, 1500);
	});
};


module.exports = Anchor;
