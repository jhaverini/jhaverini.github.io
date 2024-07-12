//Scroll effects

const sfx = { //"sfx": A containing namespace, to prevent cross-file variable/function name collisions

  initScrollEffects: ({
    scrollDivId, 
    headerDivId, 
    sideNavDivId //Set to null if page has no side navigation
  }) => { 

    //Error-check input arguments
    if (!scrollDivId || !headerDivId) {
      elog('initScrollEffects: Invalid arg(s).');
      return;
    }
    const scrollDiv = document.getElementById(scrollDivId);
    if (!scrollDiv) {
      elog('initScrollEffects: ScrollDiv element not found for id:' + scrollDivId)
      return;
    }
    
    //Initialize smooth scrolling
    ss.initSmoothScroll(scrollDivId);

    //Initialize header updater
    uh.initHeaderUpdater({
      scrollDivId,
      headerDivId,
      sideNavDivId,
    });

    //If page has side navigation, initialize side nav menu
    if (sideNavDivId) {
      un.initNavUpdater({
        scrollDivId,
        sideNavDivId,
      });
    }
  
    //Set the div's onScroll function to update header and side-nav
    scrollDiv.onscroll = () => {
      uh.updateHeader();
      if (sideNavDivId) {
        un.updateNav();
      }
    }
  }

};
