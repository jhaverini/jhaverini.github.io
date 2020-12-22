//Updates sidebar nav links on scroll
//See: 
//  https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section
//  https://stackoverflow.com/a/57494988
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let _un_sections;
let _un_navLinks;
let _un_sectionIdToNavLink = {};
let _un_scrollPosition = 0;
let _un_scrollDivSelector;
let _un_sideMenuDivSelector;

//Throttle function, enforces a minimum time interval
function throttle(updateNavLinksFn, scrollDivId, interval) {
  _un_scrollPosition = $('#'+ scrollDivId).scrollTop(); 
  var lastCall, timeoutId;
	return function() {
		var now = new Date().getTime();
		if (lastCall && now < (lastCall + interval) ) {
			// if we are inside the interval we wait
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function () {
				lastCall = now;
        updateNavLinksFn.call(_un_scrollPosition);
			}, interval - (now - lastCall) );
    } 
    else {
			//Otherwise, directly call function 
			lastCall = now;
			updateNavLinksFn.call(_un_scrollPosition);
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

  _un_scrollPosition = $(_un_scrollDivSelector).scrollTop(); 

  for (let i = _un_sections.length - 1; i >= 0; i--) {
		let section = _un_sections[i];
		let sectionTop = getYOffset(section);
	  //If scrolled over section top...  
		if (_un_scrollPosition >= sectionTop - 250) {
			let navLink = _un_sectionIdToNavLink[section.id];
			if (typeof navLink[0] !== 'undefined') {
        //If link is not active...
				if (!navLink[0].classList.contains('side-menu-active-selection')) {
					//Remove active class from all links
					for (i = 0; i < _un_navLinks.length; i++) {
						_un_navLinks[i].className = _un_navLinks[i].className.replace(/ side-menu-active-selection/, '');
					}
					//Add active class to current link
          navLink[0].className += (' side-menu-active-selection');
				}
      }
      else {
					//Remove active class from all links
					for (i = 0; i < _un_navLinks.length; i++) {
						_un_navLinks[i].className = _un_navLinks[i].className.replace(/ side-menu-active-selection/, '');
					}
			}	
			//Section found; done
			return;
		}
	}
}
//------------------------------------------------------------


function setUpNavUpdater({scrollDivId, sideMenuDivId}) {

  //Check input args
  if (!scrollDivId || !sideMenuDivId) {
    console.error('setUpNavUpdater: Invalid arg(s) supplied.');
  }

  //Initialize jQuery selectors
  _un_scrollDivSelector = '#'+ scrollDivId;
  _un_sideMenuDivSelector = '#'+ sideMenuDivId;

  //Initialize scrollbar position
  _un_scrollPosition = $(_un_scrollDivSelector).scrollTop(); 

  //Initialize nav link-related caches
  _un_navLinks = document.querySelectorAll(`${_un_sideMenuDivSelector} > ul > li > a`);
  _un_sections = document.getElementsByTagName('section');
  _un_sectionIdToNavLink = {};
  for (let i = _un_sections.length-1; i >= 0; i--) {
    const id = _un_sections[i].id;
    _un_sectionIdToNavLink[id] = 
      document.querySelectorAll(`${_un_sideMenuDivSelector} > ul > li > a[href=\\#${id}]`) || null;
  } 
  
  //Set scrollDiv's scroll function
  $(_un_scrollDivSelector).scroll(() => {

    //2. Update nav links
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    updateNav();
    //throttler();
    //throttler = throttle(updateNavLinks, scrollDivId, 100);
    //------------------------------------------------------------
  });
}
