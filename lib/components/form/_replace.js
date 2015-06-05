/**
 * @class CS.components.form.replace
 * Componente para a apresentação da resposta da requisição feita via ajax
 * @singleton
 */
var Replace = function() {};

Replace.prototype.init = function(container) {
	this.container = container;
};


//Remove tudo o que não é Letra e 1 espaço
Replace.prototype.soLetters = function() {
	return $(this.container).val().replace(/[^a-zA-ZãâÃÂáÁàÀêÊéÉèÈíÍìÌôÔõÕóÓòÒúÚùÙûÛçÇ ]/g, "");
};

//Remove tudo o que não é numero
Replace.prototype.soNumbers = function() {
	return $(this.container).val().replace(/[^0-9]/g, "");
};

Replace.prototype.typeText = function(type) {
	for (var i = 0, len = $(this.container).length; i < len; i++) {
		if ($($(this.container)[i]).attr("type") === type) {
			$($(this.container)[i]).attr("type", "text");
		}

		//$($(this.container)[i]).placeholder();
	}
};

module.exports = Replace;
