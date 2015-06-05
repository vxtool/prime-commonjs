/**
 * @class CS.components.form.response
 * Componente para a apresentação da resposta da requisição feita via ajax
 * @singleton
 */
var Response = function() {};

Response.prototype.init = function(form, message, type) {
	/**
	 * @cfg  {HTMLElement} form (required)
	 *
	 */
	this.form;
	/**
	 * @cfg  {String} message
	 * Caso não receba uma valor , por default ele recebe o valou null.
	 */
	this.message = message || null;
	/**
	 * @cfg  {String} type
	 *
	 */
	this.type = type || null;
	/**
	 * @cfg {String} responseClass
	 *
	 */
	this.responseClass = '.form-response';
	/**
	 * @cfg {String} alertClass
	 *
	 */
	this.alertClass = '.alert';
	/**
	 * @cfg {String} alertMessageClass
	 *
	 */
	this.alertMessageClass = '.alert-message';
	/**
	 * @cfg {String} closeAlertClass
	 *
	 */
	this.closeAlertClass = '.js-form-response';
	/**
	 * @cfg {String} hide
	 *
	 */
	this.hide = 'hide';
	/**
	 * @cfg {String} show
	 *
	 */
	this.show = 'show';
	/**
	 * @cfg {Array} typesResponse
	 *
	 */
	this.typesResponse = ['success', 'error'];
	/**
	 * @property {Object} response
	 * @property {Object} response.success
	 * @property {String} response.success.class
	 * @property {String} response.success.message
	 * @property {Object} response.error
	 * @property {String} response.error.class
	 * @property {String} response.error.message
	 *
	 */
	this.response = {
		success: {
			class: 'alert--success',
			message: 'Sua solicitação foi enviada com sucesso.'
		},
		error: {
			class: 'alert--error',
			message: 'Erro. Tente novamente.'
		}
	};

	this.$form = $(form);
	this.$boxAlert = this.$form.find(this.responseClass);
	this.$alert = this.$boxAlert.children(this.alertClass);
	this.$alertMessage = this.$alert.find(this.alertMessageClass);
	this.$closeAlert = this.$alert.find(this.closeAlertClass);

	this.actionResponse();
	this.addEventListeners();

};

Response.prototype.addEventListeners = function() {
	/**
	 * @event clickHide
	 * Quando o botão de fechar é clicado
	 * @param {Object} this
	 */
	this.$closeAlert
		.on("click", this.onClickHide.bind(this));
};

Response.prototype.actionResponse = function() {
	this.existingAlertRemove(this.type);
	this.actionShow(this.message, this.type);
};

Response.prototype.existingAlertRemove = function(type) {
	var
		types = this.typesResponse,
		typeResponse = null,
		objTypeResponse = null;

	for (var i = 0, len = types.length; i < len; i++) {
		if (type !== types[i]) {
			typeResponse = types[i];
			objTypeResponse = this.response[typeResponse];

			if (this.$alert.hasClass(objTypeResponse.class)) {
				this.$alert.removeClass(objTypeResponse.class);
			}
		}
	}

	//this.actionHide();
};

Response.prototype.actionHide = function() {
	var me = this;
	this.$alertMessage.html('');
	this.$boxAlert.fadeOut('slow', function() {
		$(this).removeClass(me.show).addClass(me.hide);
	});
};

Response.prototype.actionShow = function(message, type) {
	type = type || 'error';
	var objTypeResponse = this.response[type];
	this.message = this.message ? this.message : objTypeResponse.message;

	if (!this.$alert.hasClass(objTypeResponse.class)) {
		this.$alert.addClass(objTypeResponse.class);
	}

	this.$alertMessage.html(this.message);
	this.$boxAlert.fadeIn().removeClass(this.hide).addClass(this.show);
};

Response.prototype.onClickHide = function() {
	this.actionHide();
};

module.exports = Response;
