/**
 * @class CS.components.form.util
 * Componente para a apresentação da resposta da requisição feita via ajax
 * @singleton
 */
var Util = function() {};

/*
limpar campos
==================================================
*/
Util.prototype.clearFields = function(form) {
	this.form = form || this.form;
	this.form.find('.form-group .form-field, .form-group .form-field--textarea').val('');
	this.form.find('.form-group .form-field--radio, .form-group .form-field--checkbox').removeAttr('checked');
	this.form.find('.form-group .form-field--select').removeAttr('selected');
};

/*
desabilitar/habilitar campos e botao submit do form
==================================================
*/
Util.prototype.disable = function(form) {
	this.form = form || this.form;
	// torna campos somente leitura
	this.form.find('.form-field').addClass('field-readonly').prop('readonly', true);
	// botao de envio desabilitado, com visual de loading e com largura perdida pelo text-indent
	var $botaoSubmit = this.form.find('input[type="submit"], button[type="submit"], submit');
	$botaoSubmit.innerWidth($botaoSubmit.innerWidth()).addClass('btn-loading').prop('disabled', true);
};

Util.prototype.enable = function(form) {
	this.form = form || this.form;
	// torna campos editaveis
	this.form.find('.form-field').removeClass('field-readonly').prop('readonly', false);
	// botao de envio habilitado, sem visual de loading
	var $botaoSubmit = this.form.find('input[type="submit"], button[type="submit"], submit');
	$botaoSubmit.removeClass('btn-loading').prop('disabled', false).removeAttr('style');
};

Util.prototype.disableElement = function(element) {
	// botao de envio desabilitado, com visual de loading e com largura perdida pelo text-indent
	var $botaoSubmit = $(element);
	$botaoSubmit.innerWidth($botaoSubmit.innerWidth()).addClass('btn-loading').prop('disabled', true);
};

Util.prototype.enableElement = function(element) {
	// botao de envio habilitado, sem visual de loading
	var $botaoSubmit = $(element);
	$botaoSubmit.removeClass('btn-loading').prop('disabled', false).removeAttr('style');
};

Util.prototype.serializeFormJSON = function(form) {
	var obj = {};
	var array = form.serializeArray();
	$.each(array, function() {
		if (obj[this.name]) {
			if (!obj[this.name].push) {
				obj[this.name] = [obj[this.name]];
			}
			obj[this.name].push(this.value || '');
		} else {
			obj[this.name] = this.value || '';
		}
	});
	return obj;
};

Util.prototype.anchor = function(form) {
	var $form = $(form);
	if ($($form).hasClass('anchor-form')) {
		$("html.mobile, .mobile body").animate({
			scrollTop: $($form).closest('.b-form').offset().top
		}, "slow");
	}
};


Util.prototype.verifyRoute = function(data) {
	if (data.route) {

		if (data.route === 'reload') {
			location.reload();
		} else {
			location.href = data.route;
		}
	}
};

module.exports = Util;
