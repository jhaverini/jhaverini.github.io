
//For updating selected sidebar navigational links
//See: 
//  https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section
//  https://stackoverflow.com/a/57494988
let $sections;
let $navigationLinks;
let sectionIdTonavigationLink = {};
let throttler;

//Throttle function, enforces a minimum time interval
function throttle(highlightCurrentSectionFn, scrollDivId, interval) {

  scrollPosition = $('#'+ scrollDivId).scrollTop(); 

  console.log('dd')

  var lastCall, timeoutId;
	return function () {
		var now = new Date().getTime();
		if (lastCall && now < (lastCall + interval) ) {
			// if we are inside the interval we wait
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function () {
				lastCall = now;
        highlightCurrentSectionFn.call(scrollPosition);
			}, interval - (now - lastCall) );
    } 
    else {
			// otherwise, we directly call the function 
			lastCall = now;
			highlightCurrentSectionFn.call(scrollPosition);
		}
	};
}

function getOffset(el) {
	let x = 0;
	let y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		x += el.offsetLeft - el.scrollLeft;
		y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: y, left: x };
}

function highlightCurrentSection(scrollPosition) {

  for (let i = $sections.length - 1; i >= 0; i--) {
		let currentSection = $sections[i];
		// get the position of the section
		let sectionTop = getOffset(currentSection).top;

	   // if the user has scrolled over the top of the section  
		if (scrollPosition >= sectionTop - 250) {
			// get the section id
      let id = currentSection.id;
      console.log(id);
			// get the corresponding navigation link
			let $navigationLink = sectionIdTonavigationLink[id];
			// if the link is not active
			if (typeof $navigationLink[0] !== 'undefined') {
				if (!$navigationLink[0].classList.contains('side-menu-active-selection')) {
					// remove .active class from all the links
					for (i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace(/ side-menu-active-selection/, '');
					}
					// add .active class to the current link
					$navigationLink[0].className += (' side-menu-active-selection');
				}
			} else {
					// remove .active class from all the links
					for (i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace(/ side-menu-active-selection/, '');
					}
			}	
			// we have found our section, so we return false to exit the each loop
			return false;
		}
	}
}




//For updating header height
const UP = -1;
const DOWN = 1;
let scrollPosition = 0;
let prevScrollDirection;







function setUpScrollBehaviors({scrollDivId, headerContainerDivId, sideMenuDivId}) {

  //Check input arguments
  if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
    console.error('setupHeaderResizeOnScroll: Invalid argument(s) supplied.');
  }

  const scrollDivSelector = '#'+ scrollDivId;
  const headerContainerDivSelector = '#'+ headerContainerDivId;
  const sideMenuDivSelector = '#'+ sideMenuDivId;

  scrollPosition = $(scrollDivSelector).scrollTop(); 

  //For nav links
  $navigationLinks = document.querySelectorAll(`${sideMenuDivSelector} > ul > li > a`);
  $sections = document.getElementsByTagName('section');
  sectionIdTonavigationLink = {};
  for (var i = $sections.length-1; i >= 0; i--) {
    var id = $sections[i].id;
    sectionIdTonavigationLink[id] = 
    document.querySelectorAll(`${sideMenuDivSelector} > ul > li > a[href=\\#${id}]`) || null;
  } 
  

  $(scrollDivSelector).scroll(() => {

    //For updating header height...
    //++++++++++++++
    let newScrollPosition = $(scrollDivSelector).scrollTop();

    //If STARTING to scroll down...
    if (newScrollPosition > scrollPosition && 
        prevScrollDirection !== DOWN) {

      //Initiate contraction of header (a css transition animation)
      const headerContainerHeight = '50px'; //Sync w css --header-container-min-height
      $(headerContainerDivSelector).css('flexBasis', headerContainerHeight);

      //Initiate counter-animation of side-menu top (a css transition animation)
      //so that the side menu location appears constant while the header is 
      //contracting. (Note: Since side-menu's position is "sticky", this
      //counter-animation of side-menu top only has effect when the side-menu
      //is as high as it can go relative to the bottom of the header.)
      //
      //* Keep XXpx value below in sync with css file's --side-menu-max-top
      $(sideMenuDivSelector).css('top', '50px');
      
      //Update previous scroll direction value with current value
      prevScrollDirection = DOWN;
    } 
    
    //If STARTING to scroll up...
    else if (newScrollPosition < scrollPosition && 
             prevScrollDirection !== UP) {

      //Initiate expansion of header (a css transition animation)
      const headerContainerHeight = '100px'; //Sync w css --header-container-min-height
      $(headerContainerDivSelector).css('flexBasis', headerContainerHeight);

      //Initiate counter-animation of side-menu top (a css transition animation)
      //so that the side menu location appears constant while the header is 
      //expanding. (Note: Since side-menu's position is "sticky", this
      //counter-animation of side-menu top only has effect when the side-menu
      //is as high as it can go relative to the bottom of the header.)
      //
      //* Keep XXpx value below in sync with css file's --side-menu-min-top
      $(sideMenuDivSelector).css('top', '0px');
      
      //Update previous scroll direction value with current value
      prevScrollDirection = UP; //Update previous val with current val      
    }

    //Update scroll position
    scrollPosition = newScrollPosition;
    //--------------

    //For nav links
    //++++++++++++++
    highlightCurrentSection(scrollPosition);
   // throttler();
   //throttler = throttle(highlightCurrentSection, scrollDivId, 100);
    //--------------
  });

}





// Smooth Scrolling...

// PERHAPS NOT NECESSARY, AFTER GENERAL SUPPORT FOR SCROLL-BEHAVIOR CSS PROPERTY?

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
