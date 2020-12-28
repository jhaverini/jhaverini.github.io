//Updates sidebar nav links on scroll
//See: 
//  https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section
//  https://stackoverflow.com/a/57494988
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// GET RID OF JQUERY DEPENDENCE
// BLINKINESS
// TEST TO SEE IF POSITIONING IS ACCURATE
// THROTTLING?


const un = { //un: UpdateNav "namespace" - to minimize variable name collisions across files
  
  sections: [],
  navLinks: [],
  sectionIdToNavLink: {}, //Look-up table; given sectionID, get corresponding navLink
  
  scrollDivId: undefined,
  sideMenuDivId: undefined,

  scrollDiv: undefined,
  sideMenuDiv: undefined,

  scrollPosition: 0,


  initNavUpdater: ({scrollDivId, sideMenuDivId}) => {

    //Check input args
    if (!scrollDivId || !sideMenuDivId) {
      elog('initNavUpdater: Invalid arg(s) supplied.');
      return;
    }

    //Initialize stored divs and ids
    un.scrollDivId = scrollDivId;
    un.sideMenuDivId = sideMenuDivId;
    un.scrollDiv = document.getElementById(scrollDivId);
    un.sideMenuDiv = document.getElementById(sideMenuDivId);

    if (!un.scrollDiv || !un.sideMenuDiv) {
      elog('initNavUpdater: Required element(s) not found.');
      return;
    }

    //Initialize nav link-related caches
    un.navLinks = document.querySelectorAll(`#${un.sideMenuDivId} > ul > li > a`);
    un.sections = document.getElementsByTagName('section');
    un.sectionIdToNavLink = {};
    for (let i = un.sections.length-1; i >= 0; i--) {
      const id = un.sections[i].id;
      un.sectionIdToNavLink[id] = 
        document.querySelectorAll(`#${un.sideMenuDivId} > ul > li > a[href=\\#${id}]`) || null;
    }

    //Highlight the initially-highlighted link
    un.updateNav();
  },


  updateNav: () => {

    un.scrollPosition = un.scrollDiv.scrollTop; 

    for (let i = un.sections.length - 1; i >= 0; i--) {
      const section = un.sections[i];
      const sectionTop = un.getYOffset(section);
      //If scrolled over section top...  
      if (un.scrollPosition >= sectionTop - 250) {
        let navLink = un.sectionIdToNavLink[section.id];
        if (typeof navLink[0] !== 'undefined') {
          //If link is not active...
          if (!navLink[0].classList.contains('side-menu-active-selection')) {
            //Remove active class from all links
            for (i = 0; i < un.navLinks.length; i++) {
              un.navLinks[i].className = un.navLinks[i].className.replace(/ side-menu-active-selection/, '');
            }
            //Add active class to current link
            navLink[0].className += (' side-menu-active-selection');
          }
        }
        else {
            //Remove active class from all links
            for (i = 0; i < un.navLinks.length; i++) {
              un.navLinks[i].className = un.navLinks[i].className.replace(/ side-menu-active-selection/, '');
            }
        }	
        //Section found; done
        return;
      }
    }
  },


  getYOffset: (el) => {
    let y = 0;
    while(el && !isNaN(el.offsetTop)) {
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return y;
  },
};



//Throttle function, enforces a minimum time interval
function throttle(updateNavLinksFn, scrollDivId, interval) {

  un.scrollPosition = un.scrollDiv.scrollTop;

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

