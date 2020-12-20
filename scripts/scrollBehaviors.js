//For updating header height
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const UP = -1;
const DOWN = 1;
let scrollPosition = 0;
let prevScrollDirection;
//------------------------------------------------------------


//For updating sidebar nav links
//See: 
//  https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section
//  https://stackoverflow.com/a/57494988
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let $sections;
let $navLinks;
let sectionIdToNavLink = {};
let throttler;

//Throttle function, enforces a minimum time interval
function throttle(updateNavLinksFn, scrollDivId, interval) {
  scrollPosition = $('#'+ scrollDivId).scrollTop(); 
  var lastCall, timeoutId;
	return function() {
		var now = new Date().getTime();
		if (lastCall && now < (lastCall + interval) ) {
			// if we are inside the interval we wait
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function () {
				lastCall = now;
        updateNavLinksFn.call(scrollPosition);
			}, interval - (now - lastCall) );
    } 
    else {
			//Otherwise, directly call function 
			lastCall = now;
			updateNavLinksFn.call(scrollPosition);
		}
	};
}

function getYOffset(el) {
	let y = 0;
	while(el && !isNaN(el.offsetTop)) {
		y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return y;
}

function updateNavLinks(scrollPosition) {
  for (let i = $sections.length - 1; i >= 0; i--) {
		let section = $sections[i];
		let sectionTop = getYOffset(section);
	  //If scrolled over section top...  
		if (scrollPosition >= sectionTop - 250) {
			let $navLink = sectionIdToNavLink[section.id];
			//If link is not active...
			if (typeof $navLink[0] !== 'undefined') {
				if (!$navLink[0].classList.contains('side-menu-active-selection')) {
					//Remove active class from all links
					for (i = 0; i < $navLinks.length; i++) {
						$navLinks[i].className = $navLinks[i].className.replace(/ side-menu-active-selection/, '');
					}
					//Add active class to current link
					$navLink[0].className += (' side-menu-active-selection');
				}
      }
      else {
					//Remove active class from all links
					for (i = 0; i < $navLinks.length; i++) {
						$navLinks[i].className = $navLinks[i].className.replace(/ side-menu-active-selection/, '');
					}
			}	
			//Section found; done
			return;
		}
	}
}
//------------------------------------------------------------


function setUpScrollBehaviors({scrollDivId, headerContainerDivId, sideMenuDivId}) {

  //Check input arguments
  if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
    console.error('setupHeaderResizeOnScroll: Invalid argument(s) supplied.');
  }

  //DivIDs -> jQuery selectors
  const scrollDivSelector = '#'+ scrollDivId;
  const headerContainerDivSelector = '#'+ headerContainerDivId;
  const sideMenuDivSelector = '#'+ sideMenuDivId;

  //Initialize scrollbar position
  scrollPosition = $(scrollDivSelector).scrollTop(); 

  //Initialize nav link-related caches
  $navLinks = document.querySelectorAll(`${sideMenuDivSelector} > ul > li > a`);
  $sections = document.getElementsByTagName('section');
  sectionIdToNavLink = {};
  for (let i = $sections.length-1; i >= 0; i--) {
    const id = $sections[i].id;
    sectionIdToNavLink[id] = 
      document.querySelectorAll(`${sideMenuDivSelector} > ul > li > a[href=\\#${id}]`) || null;
  } 
  
  //Set scrollDiv's scroll function
  $(scrollDivSelector).scroll(() => {

    //1. UPDATE HEADER HEIGHT
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    let newScrollPosition = $(scrollDivSelector).scrollTop();

    //If starting to scroll down...
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
    
    //If starting to scroll up...
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
    //------------------------------------------------------------

    //2. Update nav links
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    updateNavLinks(scrollPosition);
    //throttler();
    //throttler = throttle(updateNavLinks, scrollDivId, 100);
    //------------------------------------------------------------
  });
}

//Smooth Scrolling
//Use of this function is necessary at least until there is widespread browser 
//support for the scroll-behavior: smooth css property.
//As of Dec 2020, support is lagging in (at least) Safari. 
//Inspired by: 
// * https://stackoverflow.com/questions/18545467/how-to-scroll-within-a-div-with-jquery-animate-function
// * https://stackoverflow.com/a/18545500

function smoothScroll(inId, toId) { //"inId": id of element w/ scrollbar

  //Check args
  if (!inId || !toId) {
    console.error('smoothScroll: Invalid argument(s) supplied.');
  }

  //Determine new scrollbar position and distance to be scrolled
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
  //For alternate ease-in / ease-out animation behaviors
  //see: https://gsgd.co.uk/sandbox/jquery/easing/
  const easingType = 'easeInOutQuad';

  //Scroll!
  $('#'+inId).animate({scrollTop}, durationMs, easingType);
}
