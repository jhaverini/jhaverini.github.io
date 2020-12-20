
//https://stackoverflow.com/questions/18545467/how-to-scroll-within-a-div-with-jquery-animate-function
//https://stackoverflow.com/a/18545500


function smoothScroll(inId, toId) { //"inId": id of element w/ scrollbar

  //Check input arguments...
  if (!inId || !toId) {
    console.error('smoothScroll: Invalid argument(s) supplied.');
  }

  //Determine new scrollbar position, and distance to scroll
  const inTop = $('#'+inId).position().top;
  const toOffset = $('#'+toId).position().top;
  const scrollTop = inTop  + toOffset;
  const oldScrollTop = $('#'+inId).scrollTop();
  const scrollDistance =  Math.abs(oldScrollTop - scrollTop);

  //Set the duration of the scroll animation
  let durationMs = 0; 
  if (scrollDistance !== 0) {
    //Alt1: Constant scroll duration
    durationMs = 300;
    //Alt2: A constant portion, but with some inverse dependence on distance
    //durationMs = 200 + (4000 / Math.abs(scrollDistance));
  }

  //Set the scroll animation's ease-in / ease-out behavior
  const easingType = 'easeInOutQuad';
  //NOTE: For alternate ease-in / ease-out animation behaviors, see:
  //https://gsgd.co.uk/sandbox/jquery/easing/

  //Scroll!
  $('#'+inId).animate({scrollTop}, durationMs, easingType);
}
