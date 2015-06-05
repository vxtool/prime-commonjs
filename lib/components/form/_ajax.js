var Util = require('./_util');
var Response = require('./_response');
var IsMobile = require('../../util/_detection');
var Elem = require('../../util/_element');

var util = new Util();
var response = new Response();
var isMobile = new IsMobile();
var element = new Elem();

/**
 * @class CS.components.form.ajax
 * Componente para a apresentação da resposta da requisição feita via ajax
 * @constructor
 * Cria uma nova instância Ajax.
 */
var Ajax = function(options) {
	if (!options) {
		options = {};
	}
	/**
	 * @property
	 * Parametro para identificacao de data attributes de dados para passar na requisicao ajax.
	 * Uso para elementos que simulam um formulario
	 */
	this.paramData = options.paramData || 'param';
	/**
	 * @property
	 * Mensagem para falha na requisicao ajax
	 */
	this.messageFail = options.messageFail || 'Um erro ocorreu no processo da sua solicitação. Tente novamente por favor.';
};

/**
 * @method getInfo
 */
Ajax.prototype.getInfo = function(form) {
	var options = {};

	options.$form = $(form);

	options.action = options.$form.attr('action') || options.$form.data('action');
	options.message = options.$form.data('message') || true;
	options.type = options.$form.data('type') || 'default';
	options.elementResponse = options.$form.data('elementresponse') || options.$form;
	options.clearFields = options.$form.data('clearfields') || true;
	options.anchor = options.$form.data('anchor') || false;

	options.paramData = this.paramData;
	options.messageFail = this.messageFail;

	options.$elementResponse = $(options.elementResponse);

	return options;
};
/**
 * @method beforeRequest
 */
Ajax.prototype.beforeRequest = function(options) {
	var me = this;

	this.objAjaxBefore = null;

	CS.mediator.subscribe("ajax-before-" + options.type + "-return", function(obj) {
		me.objAjaxBefore = obj;
	});

	CS.mediator.publish("ajax-before-" + options.type, options.$form);
};
/**
 * @method data
 */
Ajax.prototype.data = function(options) {
	var
		typeData = typeof options.$form.data('serialize') !== "undefined" ? options.$form.data('serialize') : true,
		resultData;

	if (typeData === true) {
		resultData = options.$form.serialize();
	} else {
		var
			objData = options.$form.data(),
			myRe = new RegExp('^' + options.paramData, 'g'),
			valueData, newObjData = {};

		for (var obj in objData) {
			if (objData.hasOwnProperty(obj)) {
				if (obj.match(myRe)) {
					var newObj = obj.replace(options.paramData, '').toLowerCase();
					newObjData[newObj] = objData[obj];
				}
			}
		}

		resultData = newObjData;
	}

	return resultData;
};
/**
 * @method dataSuccess
 */
Ajax.prototype.dataSuccess = function(options, data) {
	if (options.clearFields === true) {
		this.clearFields(options.$form);
	}

	if (isMobile.getIsMobile() && options.anchor === true) {
		this.anchor(options.$form);
	}

	if (data.route) {
		this.verifyRoute(data);
		return false;
	}

	CS.mediator.publish("ajax-success-" + options.type, options.$form, data);

	if (options.message === true) {
		this.response(options, data.msg, 'success');
	}

};
/**
 * @method dataError
 */
Ajax.prototype.dataError = function(options, data) {
	CS.mediator.publish("ajax-error-" + options.type, options.$form, data);
	this.response(options, data.msg);
};
/**
 * @method request
 */
Ajax.prototype.request = function(form) {
	var
		me = this,
		options = this.getInfo(form);

	this.beforeRequest(options);

	if( options.$form.data('serialize') !== false ) {
		this.disable(form);
	}

	$.ajax({
		type: 'POST',
		data: this.objAjaxBefore || this.data(options),
		dataType: 'json',
		url: options.action,
		timeout: 60000
	}).done(function(data) {
		if (data.status === 'success') {
			me.dataSuccess(options, data);
		} else {
			me.dataError(options, data);
		}
	}).fail(function() {
		me.response(options, me.messageFail);
	}).always(function(data) {
		if (!data.route) {
			me.enable(options.$form);
		}
	});
};
/**
 * @method response
 */
Ajax.prototype.response = function(options, message, type) {
	if (type === 'success') {
		return response.init(options.$elementResponse, message, 'success');
	} else {
		return response.init(options.$elementResponse, message);
	}
};
/**
 * @method clearFields
 */
Ajax.prototype.clearFields = function(form) {
	return util.clearFields(form);
};
/**
 * @method verifyRoute
 * Retorna um método externo "util.verifyRoute(data)", para verificar se existe uma rota na resposta da requisição.
 * @param {Object} data Objeto que contem ou não a propriedade com a rota (route).
 */
Ajax.prototype.verifyRoute = function(data) {
	return util.verifyRoute(data);
};
/**
 * @method disable
 * Retorna um método externo "util.enable(form)", para habilitar o elemento alvo.
 * @param {HTMLElement} form Dom do elemento alvo.
 */
Ajax.prototype.enable = function(form) {
	return util.enable(form);
};
/**
 * @method disable
 * Retorna um método externo "util.disable(form)", para desabilitar o elemento alvo.
 * @param {HTMLElement} form Dom do elemento alvo.
 */
Ajax.prototype.disable = function(form) {
	return util.disable(form);
};

module.exports = Ajax;
