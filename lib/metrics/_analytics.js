/**
 * @class CS.metrics.analytics
 * Componente para Evento do Analytics
 * @singleton
 */
var Analytics = function() {};
	/**
	 * @method eventAnalytics
	 * @param {String} eventCategory
	 * @param {String} eventAction
	 * @param {String} eventLabel
	 */
Analytics.prototype.eventAnalytics = function(eventCategory, eventAction, eventLabel) {
	dataLayer.push({
		'event': 'GAevent',
		'eventCategory': eventCategory,
		'eventAction': eventAction,
		'eventLabel': eventLabel
	});
};

module.exports = Analytics;
