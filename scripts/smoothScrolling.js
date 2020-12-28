//Smooth Scrolling
//Use of this function is necessary at least until there is widespread browser 
//support for the scroll-behavior: smooth css property.
//As of Dec 2020, support is lagging in (at least) Safari. 
//Inspired by: 
// * https://stackoverflow.com/questions/18545467/how-to-scroll-within-a-div-with-jquery-animate-function
// * https://stackoverflow.com/a/18545500

const ss = {

  scrollDivId: undefined,
  easingType: 'swing', //Default

  initSmoothScroll: (scrollDivId) => {
    if (!scrollDivId) {
      elog('initSmoothScrolling: Invalid arg(s) supplied.');
      return;
    }
    ss.scrollDivId = scrollDivId;

    //Set the scroll animation's ease-in / ease-out behavior
    //For alternate ease-in / ease-out animation behaviors
    //see: https://api.jqueryui.com/easings/
    ss.easingType = 'easeInOutQuad';
  },

  scrollTo: (toId) => { //"inId": id of element w/ scrollbar

    //Check args
    if (!toId) {
      elog('smoothScroll: Invalid argument(s) supplied.');
      return;
    }

    //Determine new scrollbar position and distance to be scrolled
    const scrollDivTop = $('#'+ss.scrollDivId).position().top;
    const toOffset = $('#'+toId).position().top;
    const scrollTop = scrollDivTop + toOffset;
    const oldScrollTop = $('#'+ss.scrollDivId).scrollTop();
    const scrollDistance =  Math.abs(oldScrollTop - scrollTop);

    //Set the duration of the scroll animation
    const durationMs = (scrollDistance !== 0) ? 300 : 0; 

    //Scroll!
    $('#'+ss.scrollDivId).animate({scrollTop}, durationMs, ss.easingType);
  },

};
