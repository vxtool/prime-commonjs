/**
 * @class CS.util.detection
 * Componente para a apresentação da resposta da requisição feita via ajax
 * @singleton
 */
var Elem = require('./_element');

var element = new Elem();

/**
 * @method Detection
 *
 */
var Detection = function() {

	this.deviceSize = 'small';
	this.documentWidth = global.innerWidth;
	this.isIframe;

	if (this.documentWidth >= 992) {
		this.deviceSize = 'large';
	} else if (this.documentWidth >= 768) {
		this.deviceSize = 'medium';
	}

	if (global.top !== global.self) {
		this.isIframe = true;
	}
};

/**
 * @method getDeviceSize
 *
 */
Detection.prototype.getDeviceSize = function() {
	return this.deviceSize;
};

/**
 * @method getIsIframe
 * Deteccao de página em iframe/modal
 */
Detection.prototype.getIsIframe = function() {
	return this.isIframe;
};

/**
 * @method getIsMobile
 *
 */
Detection.prototype.getIsMobile = function() {
	var htmlTag = document.getElementsByTagName('html')[0];
	return element.hasClass(htmlTag, 'mobile');
};


module.exports = Detection;
