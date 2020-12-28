//Update header height on scroll

const uh = { //uh: UpdateHeader "namespace", to minimize variable name collisions across files
  
  //*** KEEP THESE SYNCED WITH CORRESPONDING CSS FILE VARIABLES!!! ***
  HEADER_CONTAINER_MIN_HEIGHT: '50px', // --header-container-min-height
  HEADER_CONTAINER_MAX_HEIGHT: '100px', // --header-container-max-height
  SIDE_MENU_MAX_TOP: '50px', // --side-menu-max-top
  SIDE_MENU_MIN_TOP: '0px', // --side-menu-min-top

  UP: -1,
  DOWN: 1,

  scrollPosition: 0,
  prevScrollDirection: undefined,

  scrollDiv: undefined,
  headerContainerDiv: undefined,
  sideMenuDiv: undefined,


  initHeaderUpdater: ({scrollDivId, headerContainerDivId, sideMenuDivId}) => {

    //Check input arguments
    if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
      elog('initHeaderUpdater: Invalid arg(s).');
    }

    uh.scrollDiv = document.getElementById(scrollDivId);
    uh.headerContainerDiv = document.getElementById(headerContainerDivId);
    uh.sideMenuDiv = document.getElementById(sideMenuDivId);
    if (!uh.scrollDiv || !uh.headerContainerDiv || !uh.sideMenuDiv) {
      elog('initHeaderUpdater: Elements corresponding to id args not found.');
    }

    //Initialize scrollbar position
    uh.scrollPosition = document.getElementById(scrollDivId).scrollTop;
  },


  updateHeader: () => {
    
    const newScrollPosition = uh.scrollDiv.scrollTop;
    const scrollAtOrPastBottom = 
      (uh.scrollDiv.scrollHeight - newScrollPosition) <= uh.scrollDiv.clientHeight;

    //If starting to scroll down...
    if (uh.scrollPosition > 0 && //This condition guards against Safari touch bounce issue
        newScrollPosition > uh.scrollPosition && 
        uh.prevScrollDirection !== uh.DOWN) {

      //Initiate contraction of header (a css transition animation)
      uh.headerContainerDiv.style.flexBasis = uh.HEADER_CONTAINER_MIN_HEIGHT;

      //Initiate counter-animation of side-menu top (a css transition animation)
      //so that the side menu location appears constant while the header is 
      //contracting. (Note: Since side-menu's position is "sticky", this
      //counter-animation of side-menu top only has effect when the side-menu
      //is as high as it can go relative to the bottom of the header.)
      uh.sideMenuDiv.style.top = uh.SIDE_MENU_MAX_TOP;
      
      //Update previous scroll direction value with current value
      uh.prevScrollDirection = uh.DOWN;
    } 
    
    //If starting to scroll up...
    else if (!scrollAtOrPastBottom && //This condition guards against Safari touchscreen bounce issue
             newScrollPosition < uh.scrollPosition && 
             uh.prevScrollDirection !== uh.UP) {

      //Initiate expansion of header (a css transition animation)
      uh.headerContainerDiv.style.flexBasis = uh.HEADER_CONTAINER_MAX_HEIGHT;

      //Initiate counter-animation of side-menu top (a css transition animation)
      //so that the side menu location appears constant while the header is 
      //expanding. (Note: Since side-menu's position is "sticky", this
      //counter-animation of side-menu top only has effect when the side-menu
      //is as high as it can go relative to the bottom of the header.)
      uh.sideMenuDiv.style.top = uh.SIDE_MENU_MIN_TOP;
      
      //Update previous scroll direction value with current value
      uh.prevScrollDirection = uh.UP;      
    }

    //Update scroll position
    uh.scrollPosition = newScrollPosition;
  }
}
