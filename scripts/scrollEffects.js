//Scroll effects

const sfx = { //sfx: ScrollEffects "namespace" - reduce chances of naming collisions across files

  initScrollEffects: ({scrollDivId, headerContainerDivId, sideMenuDivId}) => { 

    //Error-check input arguments
    if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
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

    //Initialize the side-nav and header updaters
    un.initNavUpdater({
      scrollDivId,
      sideMenuDivId,
    });
    uh.initHeaderUpdater({
      scrollDivId,
      headerContainerDivId,
      sideMenuDivId,
    });
  
    //Set the div's onScroll function to update header and side-nav
    scrollDiv.onscroll = () => {
      uh.updateHeader();
      un.updateNav();
    }
  }

};
