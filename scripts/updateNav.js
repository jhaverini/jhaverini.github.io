//Updates sidebar nav links on scroll
//See: 
//  https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section
//  https://stackoverflow.com/a/57494988
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let sections;
let navLinks;
let sectionIdToNavLink = {};
let scrollDivSelector;
let sideMenuDivSelector;

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

function updateNav() {

  const scrollPosition = $(scrollDivSelector).scrollTop(); 

  for (let i = sections.length - 1; i >= 0; i--) {
		let section = sections[i];
		let sectionTop = getYOffset(section);
	  //If scrolled over section top...  
		if (scrollPosition >= sectionTop - 250) {
			let navLink = sectionIdToNavLink[section.id];
			if (typeof navLink[0] !== 'undefined') {
        //If link is not active...
				if (!navLink[0].classList.contains('side-menu-active-selection')) {
					//Remove active class from all links
					for (i = 0; i < navLinks.length; i++) {
						navLinks[i].className = navLinks[i].className.replace(/ side-menu-active-selection/, '');
					}
					//Add active class to current link
          navLink[0].className += (' side-menu-active-selection');
				}
      }
      else {
					//Remove active class from all links
					for (i = 0; i < navLinks.length; i++) {
						navLinks[i].className = navLinks[i].className.replace(/ side-menu-active-selection/, '');
					}
			}	
			//Section found; done
			return;
		}
	}
}
//------------------------------------------------------------


function initNavUpdater({scrollDivId, sideMenuDivId}) {

  //Check input args
  if (!scrollDivId || !sideMenuDivId) {
    console.error('setUpNavUpdater: Invalid arg(s) supplied.');
  }

  //Initialize jQuery selectors
  scrollDivSelector = '#'+ scrollDivId;
  sideMenuDivSelector = '#'+ sideMenuDivId;

  //Initialize scrollbar position
  const scrollPosition = $(scrollDivSelector).scrollTop(); 

  //Initialize nav link-related caches
  navLinks = document.querySelectorAll(`${sideMenuDivSelector} > ul > li > a`);
  sections = document.getElementsByTagName('section');
  sectionIdToNavLink = {};
  for (let i = sections.length-1; i >= 0; i--) {
    const id = sections[i].id;
    sectionIdToNavLink[id] = 
      document.querySelectorAll(`${sideMenuDivSelector} > ul > li > a[href=\\#${id}]`) || null;
  } 
  
  //Set scrollDiv's scroll function
  $(scrollDivSelector).scroll(() => {

    //2. Update nav links
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    updateNav();
    //throttler();
    //throttler = throttle(updateNavLinks, scrollDivId, 100);
    //------------------------------------------------------------
  });
}
