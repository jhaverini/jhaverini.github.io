//Update header height on scroll

const uh = { //uh: UpdateHeader "namespace", to minimize variable name collisions across files
  
  //*** KEEP THESE SYNCED WITH CORRESPONDING CSS!!! ***
  HEADER_MIN_HEIGHT: '48px', // --header-min-height
  HEADER_MAX_HEIGHT: '96px', // --header-max-height
  SIDE_NAV_MAX_TOP: '50px', // --side-nav-max-top
  SIDE_NAV_MIN_TOP: '0px', // --side-nav-min-top

  UP: -1,
  DOWN: 1,

  scrollDiv: undefined,
  headerDiv: undefined,
  sideNavDiv: undefined,

  prevScrollPosition: 0,
  prevScrollDirection: undefined,

  initHeaderUpdater: ({
    scrollDivId, 
    headerDivId, 
    sideNavDivId, //Set to null if page has no side navigation
  }) => {

    //Check input arguments
    if (!scrollDivId || !headerDivId) {
      elog('initHeaderUpdater: Invalid arg(s).');
    }

    uh.scrollDiv = document.getElementById(scrollDivId);
    if (!uh.scrollDiv) {
      elog('initHeaderUpdater: scrollDiv not found for id:' + scrollDivId);
      return;
    }

    uh.headerDiv = document.getElementById(headerDivId);
    if (!uh.headerDiv) {
      elog('initHeaderUpdater: headerDiv not found for id:' + headerDivId);
      return;
    }

    if (sideNavDivId) {
      uh.sideNavDiv = document.getElementById(sideNavDivId);
      if (!uh.sideNavDiv) {
        elog('initHeaderUpdater: sideNavDiv not found for id:' + sideNavDivId);
        return;
      }
    }

    //Initialize prev scrollbar position
    uh.prevScrollPosition = document.getElementById(scrollDivId).scrollTop;
  },


  updateHeader: () => {
    
    const scrollPosition = uh.scrollDiv.scrollTop;
    const scrollAtOrPastBottom = 
      (uh.scrollDiv.scrollHeight - scrollPosition) <= uh.scrollDiv.clientHeight;

    //If starting to scroll down...
    if (uh.prevScrollPosition > 0 && //This condition guards against Safari touch bounce issue
        scrollPosition > uh.prevScrollPosition && 
        uh.prevScrollDirection !== uh.DOWN) {

      //Initiate contraction of header (a css transition animation)
      uh.headerDiv.style.flexBasis = uh.HEADER_MIN_HEIGHT;
    //  document.getElementById('page-body').style.maxHeight = `calc(100vh - ${uh.HEADER_MIN_HEIGHT})`;

      //For pages that have a side nav menu:
      //Initiate counter-animation of side-nav top (a css transition animation)
      //so that the side nav location appears constant while the header is 
      //contracting. (Note: Since side-nav's position is "sticky", this
      //counter-animation of side-nav top only has effect when the side-nav
      //is as high as it can go relative to the bottom of the header.)
      if (uh.sideNavDiv) {
        uh.sideNavDiv.style.top = uh.SIDE_NAV_MAX_TOP;
      }

      //Update previous scroll direction value with current value
      uh.prevScrollDirection = uh.DOWN;
    } 
    
    //If starting to scroll up...
    else if (!scrollAtOrPastBottom && //This condition guards against Safari touchscreen bounce issue
             (scrollPosition < uh.prevScrollPosition) && 
             uh.prevScrollDirection !== uh.UP) {

      //Initiate expansion of header (a css transition animation)
      uh.headerDiv.style.flexBasis = uh.HEADER_MAX_HEIGHT;
  //    document.getElementById('page-body').style.maxHeight = `calc(100vh - ${uh.HEADER_MAX_HEIGHT})`;
      
      //For pages that have a side nav menu:
      //Initiate counter-animation of side-nav top (a css transition animation)
      //so that the side nav location appears constant while the header is 
      //expanding. (Note: Since side-nav's position is "sticky", this
      //counter-animation of side-nav top only has effect when the side-nav
      //is as high as it can go relative to the bottom of the header.)
      if (uh.sideNavDiv) {
        uh.sideNavDiv.style.top = uh.SIDE_NAV_MIN_TOP;
      }

      //Update previous scroll direction value with current value
      uh.prevScrollDirection = uh.UP;      
    }

    //Update scroll positions
    uh.prevScrollPosition = scrollPosition;
  }
}
