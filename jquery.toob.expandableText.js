/*
* jQuery Toob expandableText
*
* Copyright 2013, Tobias Reinhardt
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 
* February 2013
*
* This plugin provides functionality to display additional text for a given element
* taken from one of its data-attributes.
*/

(function($) {
  $.extend($.fn, {
		expandableText: function(options) {
			settings = $.extend({
				// The name of the data-attribute containing the additional text to display
				'dataAttributeName': 'expand',
				// Placeholder text for hidden text
				'placeholderText': '…',
				// Insert blank space before generated <span> element
				'insertBlankBefore': true,
				// Hide additional information initially
				'hideInitially': true,
				// CSS value for mouse cursor
				'cursor': 'pointer',
				// Title for placeholder element (information is hidden)
				'hiddenTitleText': '',
				// Title for information element (information is shown)
				'displayedTitleText': '',
				// CSS class for placeholder element 
				'placeholderClass': '',
				// CSS class for information element 
				'resultClass': ''
			}, options);

			// Create data attribute, if settings does not start with "data-"
			settings.dataAttributeName = (!/^data\-(.)+$/.test(settings.dataAttributeName)) ? 'data-' + settings.dataAttributeName : settings.dataAttributeName;

			this.each(function() {
				// Save data attribute text
				var expandedText = $(this).attr(settings.dataAttributeName);
				
				if(expandedText){
					// Create element for additional information and append initial text
					var expandedElement = $(document.createElement('span'))
											.append((settings.hideInitially) ? settings.placeholderText : expandedText)
											.css('cursor', 'pointer');
											
					setTitleText(expandedElement);				
					setClassAttribute(expandedElement);

					// Add click event for information element
					expandedElement.on("click", function (event) {
						$(this).text(($(this).text() == settings.placeholderText) ? expandedText : settings.placeholderText);
						
						setTitleText($(this));				
						setClassAttribute(expandedElement);
					});

					// Insert blank space before information element if wanted
					if (settings.insertBlankBefore) {
						$(this).append(' ');
					}

					$(this).append(expandedElement);
				}							
			});
			
			// Set title attribute value depending on currently displayed text
			function setTitleText(element){
				element.attr('title', (element.text() == settings.placeholderText) ? settings.hiddenTitleText : settings.displayedTitleText);
				if (!element.attr('title')) {
					element.removeAttr('title');
				}
			}
			
			// Set title attribute value depending on currently displayed text
			function setClassAttribute(element){
				element.removeClass((element.text() == settings.placeholderText) ? settings.resultClass : settings.placeholderClass);
				element.addClass((element.text() == settings.placeholderText) ? settings.placeholderClass : settings.resultClass);
			}

			return this;
		}
	});
})(jQuery);
