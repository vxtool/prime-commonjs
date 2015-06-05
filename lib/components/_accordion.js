/**
 * @class CS.components.accordion
 * Componente para a apresentação da resposta da requisição feita via ajax
 * @singleton
 */
(function() {
	var Accordion = function(element, options) {
		if (!options) {
			options = {};
		}

		this.$element = $(element);

		this.container = options.container || '.b-checkout';
		this.$container = this.$element.closest(this.container);

		this.first = options.first || 1;
		this.last = options.last || false;

		this.target = options.target || '.b-checkout-cont';
		this.$target = this.$element.next(this.target);

		// Classes
		this.valid = options.valid || 'ok';
		this.open = options.open || 'open';
		this.closed = options.closed || 'closed';

		this.verifyFirst();
		this.addEventListeners();
	};

	Accordion.prototype.addEventListeners = function() {

		this.$element
			.on("click", {
				me: this
			}, this.onElementClick);

	};

	Accordion.prototype.onElementClick = function(event) {
		var
			me = event.data.me,
			open;

		$(me.container).each(function(index, value) {
			open = $(this).hasClass(me.open);

			if (open && me !== me.$container[0]) {
				$($(me.target)[index]).slideUp();
				$(this).removeClass(me.open).addClass(me.closed);
			}
		});

		me.$target.slideToggle();
		if (!me.$container.hasClass(me.open)) {
			me.$container.removeClass(me.closed).addClass(me.open);
			MAG.mediator.publish('message-lateral-checkout', me.$container);
		} else {
			me.$container.removeClass(me.open).addClass(me.closed);
		}
	};

	Accordion.prototype.verifyFirst = function() {
		var
			me = this,
			validated, container, count = $(this.target).length;

		$(this.target).each(function(index, val) {
			container = $(this).closest(me.container);
			validated = $(container).hasClass(me.valid);

			if ((!validated && me.first === index + 1 && me.last === false) || (!validated && me.last === true && index === count - 1)) {

				$(container).removeClass(me.closed).addClass(me.open);

				MAG.mediator.publish('message-lateral-checkout', container);
				return false;
			}
		});
	};

	module.exports = function() {
		this.init = function(element, options) {
			var instance = new Accordion(element, options);
			return instance;
		};
	};


})();
