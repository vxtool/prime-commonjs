/**
 * @class CS.util.element
 * Componente para eventos
 * @singleton
 */
var Elem = function() {
	this.wildcardRE = /([a-z0-9\-_]*\*[a-z0-9\-_]*)+/ig;
	this.wildcardReplace = '[a-z0-9\\-_]+';
};
/**
 * @method wildcardCheck
 *
 * @param {String} className
 * @return {Boolean}
 */
Elem.prototype.wildcardCheck = function(className) {
	return typeof className === 'string' && className.indexOf('*') > -1;
};
/**
 * @method hasClass
 *
 * @param {HTMLElement} obj
 * @param {String} className
 * @return {Boolean}
 */
Elem.prototype.hasClass = function(obj, className) {
	if (this.wildcardCheck(className)) {
		var RE = new RegExp(className.replace('*', this.wildcardReplace), 'ig');
		var result = false;

		this.each(obj, function(item) {
			if (RE.test(item.className)) {
				result = true;
			}
		});

		return result;
	} else {
		return new RegExp(' ' + className + ' ').test(' ' + obj.className + ' ');
	}
};
/**
 * @method addClass
 *
 * @param {HTMLElement} obj
 * @param {String} className
 * @return {Boolean}
 */
Elem.prototype.addClass = function(obj, className) {
	if (!this.hasClass(obj, className)) {
		obj.className += ' ' + className;
	}
	return obj;
};
/**
 * @method removeClass
 *
 * @param {HTMLElement} obj
 * @param {String} className
 * @return {Boolean}
 */
Elem.prototype.removeClass = function(obj, className) {
	if (this.wildcardCheck(className)) {
		var RE = [];
		var wildcards = [];

		className = className.replace(this.wildcardRE, function(match) {
			wildcards.push(match);
			return '';
		});

		for (var i = 0; i < wildcards.length; i++) {
			var wildcard = wildcards[i];
			RE.push('(' + wildcard.replace('*', this.wildcardReplace) + ')');
		}

		RE = new RegExp(RE.join('|'), 'ig');

		this.each(obj, function(item) {
			item.className = item.className.replace(RE, '');
		});

	} else {
		var newClass = ' ' + obj.className.replace(/[\t\r\n]/g, ' ') + ' ';

		if (this.hasClass(obj, className)) {
			while (newClass.indexOf(' ' + className + ' ') >= 0) {
				newClass = newClass.replace(' ' + className + ' ', ' ');
			}
			obj.className = newClass.replace(/^\s+|\s+$/g, ' ');
		}
	}

	return obj;
};
/**
 * @method toggleClass
 *
 * @param {HTMLElement} obj
 * @param {String} className
 * @return {Boolean}
 */
Elem.prototype.toggleClass = function(obj, className) {
	var newClass = ' ' + obj.className.replace(/[\t\r\n]/g, " ") + ' ';

	if (this.hasClass(obj, className)) {
		while (newClass.indexOf(" " + className + " ") >= 0) {
			newClass = newClass.replace(" " + className + " ", " ");
		}
		obj.className = newClass.replace(/^\s+|\s+$/g, ' ');
	} else {
		obj.className += ' ' + className;
	}
	return obj;
};
/**
 * @method each
 *
 * @param {HTMLElement} obj
 * @param {String} className
 * @return {Boolean}
 */
Elem.prototype.each = function(obj, callback) {
	var
		arr = [],
		i,
		len;

	for (i = 0, len = obj.length; i < len; i += 1) {
		arr[i] = obj[i];
		callback(arr[i]);
	}
};
/**
 * @method addEventListener
 * Registra uma única espera de evento em um único alvo.
 * @param {HTMLElement} obj O elemento para o evento.
 * @param {String} evt O evento que irá acionar a função.
 * @param {Function} fnc A função de ligação ao elemento.
 * @return {Boolean} true Se foi vinculado com sucesso.
 *
 * Elem.addEventListener(document.getElementById("foo"), 'click', foo());
 */
Elem.prototype.addEventListener = function(obj, evt, fnc) {
	if (!obj) {
		return false;
	}
	// Modelo W3C
	if (obj.addEventListener) {
		obj.addEventListener(evt, fnc, false);
		return true;
	}
	// Modelo Microsoft
	else if (obj.attachEvent) {
		return obj.attachEvent('on' + evt, fnc);
	}
	// O navegador não suporta W3C ou modelo MSFT , vá em frente com a tradicional
	else {
		evt = 'on' + evt;
		if (typeof obj[evt] === 'function') {
			// O objeto já tem uma função tradicional
			// Vamos envolvê-lo com a nossa própria função dentro de outra função
			fnc = (function(f1, f2) {
				return function() {
					f1.apply(this, arguments);
					f2.apply(this, arguments);
				};
			})(obj[evt], fnc);
		}
		obj[evt] = fnc;
		return true;
	}
	return false;
};

module.exports = Elem;
