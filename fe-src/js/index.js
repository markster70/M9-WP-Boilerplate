// We import the  main stylesheet here for Vite
import '../styles/base-styles.scss';

// dependency imports

// function imports

import {executeUiScripts, deferredUiScripts} from "@js/ui-scripts/uiScriptsIndex";

// utilities here - these are bespoke function that I use, and can be seen in operation in the dom

import canHover from '@js/utility-scripts/canHover';
import resizeActions from '@js/utility-scripts/resizeActions';
import prefersReducedMotion from '@js/utility-scripts/prefersReducedMotion';


// dom helpers - these are utilities, a bit like jquery, but without the need for it
// so the main things we do with UI are catered for ( selecting an element or elements, class toggling etc, resizing, basic aria work

import { $qall, $q1, hasClassN, addClassN, removeClassN, toggleClassN, currScreenSize, toggleAriaExpanded, debounce} from './utility-scripts/domHelpers';

// application vars Object - this is used to track 'state' in the site
// so things like screen size, user preferences etc - its just an object to pass around ans update as we need

import {  uiStateObj } from './siteVars';

// set up an object here to run the site
// this can either be a single piece of script, or we can kick out various ones depending on page
// salient point is we are namespacing into an es6 object literal
// and able to import whichever modules we need at any point
// inclusive of selective Bootstrap Javascript Imports

const siteUiObj = {};

siteUiObj.start = {

    'config': {
        // if we need any configs for selectors etc, this can be passed in
        //visibilityClass : 'visuallyhidden'
    },
    // function references declared here based on imports
    canHover,
    resizeActions,
    prefersReducedMotion,
    executeUiScripts,
    deferredUiScripts,


    // declare function modules

    // function to kick things off, and allow for config object options if needed
    // this is called on DOM ready
    init(settings) {
        // loop through any settings passed in, and overwrite the default config with those settings
        if (settings && typeof (settings) === 'object') {
            for (let prop in settings) {
                if (settings.hasOwnProperty(prop)) {
                    this.config[prop] = settings[prop];
                }
            }
        }

        // initial actions to get site set
        this.resizeActions();
        this.canHover();
        this.prefersReducedMotion();
        this.isResizing();
        this.executeUiScripts();

        // functions are invoked here, if needed on dom ready

        console.log(`Let's go`);
    },

    isResizing () {
        // utility function to toggle a body class when the browser is resizing
        // useful for controlling tranistions, and menu layout as layout flexes across breakpoints
        const bodyEl = $q1('body');

        window.addEventListener('resize', ()=> {
            addClassN(bodyEl, 'is-resizing');
        });

        const assessResizing = debounce( () => {
            removeClassN(bodyEl, 'is-resizing')

        }, 500);

        window.addEventListener('resize', assessResizing );
    },
    deferredFunction () {
        // example function only to demonstrate the use of the load event below
        // take out as required
        this.deferredUiScripts();
    }
};

// dom ready
window.addEventListener('DOMContentLoaded', () => {

    // this calls the init function from the object literal on dom ready, and kicks everything off.
    siteUiObj.start.init();
});

window.addEventListener('load', () => {

    // event listener can be used for triggering any required methods that are not critical on dom ready
    // helpful with 1st paint performance

    siteUiObj.start.deferredFunction();

});
