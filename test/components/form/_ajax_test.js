var Ajax = require('../../../lib/components/form/_ajax');

describe("Ajax", function() {
	var ajax;
	var ajaxWithOptions;

	before(function() {
		ajax = new Ajax();
		ajaxWithOptions = new Ajax({
			paramData: 'param',
			messageFail: 'message'
		});
	});

	describe("constructor", function() {
		it("Deve ter valores padrão do tipo {string} para as propriedades do construtor", function() {
			assert.typeOf(ajax.paramData, 'string');
			assert.typeOf(ajax.messageFail, 'string');

			assert.equal(ajax.paramData, "param");
			assert.equal(ajax.messageFail, "Um erro ocorreu no processo da sua solicitação. Tente novamente por favor.");
		});

		it("Valores do tipo {string} sendo passados por parametro no construtor", function() {
			assert.typeOf(ajaxWithOptions.paramData, 'string');
			assert.typeOf(ajaxWithOptions.messageFail, 'string');

			assert.ok(ajaxWithOptions.paramData);
			assert.ok(ajaxWithOptions.messageFail);
		});
	});

	after(function() {});
});
