(function () {

  'use strict';

  /**
   * Provides the off-canvas menu.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for the off-canvas menu.
   */
  Drupal.behaviors.responsive_menu_mmenu = {
    attach: function (context) {

      const mmenuId = '#off-canvas';
      const offCanvas = document.querySelector(mmenuId)

      // The instatiation of the mmenu must only happen once.
      if (offCanvas && !offCanvas.hasOwnProperty('mmApi') && typeof (Mmenu) !== 'undefined') {
        const settings = drupalSettings.responsive_menu;
        const position = settings.position,
          theme = settings.theme,
          pagedim = settings.pagedim;

        const options = {
          extensions: [
            theme,
            'fx-menu-slide',
            position === 'left' ? 'position-left' : 'position-right'
          ],
          keyboardNavigation: {
            enable: true,
            enhance: true,
          },
          drag: {
            open: settings.drag
          }
        };

        if (pagedim !== 'none') {
          options.extensions.push(pagedim);
        }

        const config = {
          classNames: {
            selected: 'menu-item--active-trail'
          }
        };

        // Allow the settings and options to be extended or overridden.
        if (typeof settings.custom !== 'undefined') {
          if (typeof settings.custom.options !== 'undefined') {
            extend(options, drupalSettings.responsive_menu.custom.options);
          }
          if (typeof drupalSettings.responsive_menu.custom.config !== 'undefined') {
            extend(config, drupalSettings.responsive_menu.custom.config);
          }
        }

        // Set up the off canvas menu.
        const mmenu = new Mmenu(mmenuId, options, config);

        // Due to a rendering issue with Chrome the page needs the viewport
        // metatag to have a value including initial-scale=1.0 otherwise it
        // won't render properly.
        // @see issue #3153145
        const mmenuApi = mmenu.API;
        const viewports = document.getElementsByName('viewport');

        if (viewports.length !== 0 && settings.modifyViewport) {
          const viewportMeta = viewports[0]
          const defaultViewport = viewports[0].content
          const staticViewport = "width=device-width, initial-scale=1.0, minimum-scale=1.0";

          mmenuApi.bind('open:start', function() {
            viewportMeta.setAttribute('content', staticViewport);
          });
          mmenuApi.bind('close:start', function() {
            viewportMeta.setAttribute('content', defaultViewport);
          });
        }
      }
    }
  };
})();

/**
 * Similar to the jQuery extend but shallow.
 *
 * @param out
 * @returns {*|{}}
 */
const extend = function (out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (let key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
};
