// we use this object for
// screen categories to link our scss breakpoints with
// our JS
// There are also properties for whether the current state is small screen, user preferring reduced motion
// and abstractions for media queries to be used with GSAP / Scroll Trigger
const uiStateObj = {
    smallScreenCategories: ['sm', 'md'],
    largeScreenCategories: ['lg', 'xl', 'xxl', 'massive'],
    isSmallScreen: false,
    prefersReducedMotion: false,
    scrollTriggerMediaMatch: '(min-width: 1025px)',
    scrollTriggerSmallScreenMediaMatch: '(max-width: 1024px)'
};

export { uiStateObj };
