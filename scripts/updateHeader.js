//Update header height on scroll

const uh = { //Update header namespace
  //*** NOTE! KEEP SYNCED WITH CSS FILE... ***
  HEADER_CONTAINER_MIN_HEIGHT: '50px', // --header-container-min-height
  HEADER_CONTAINER_MAX_HEIGHT: '100px', // --header-container-max-height
  SIDE_MENU_MAX_TOP: '50px', // --side-menu-max-top
  SIDE_MENU_MIN_TOP: '0px', // --side-menu-min-top
  UP: -1,
  DOWN: 1,
  scrollPosition: 0,
  prevScrollDirection: undefined,
  scrollDivSelector: undefined,
  headerContainerDivSelector: undefined,
  sideMenuDivSelector: undefined,
}

function initHeaderUpdater({scrollDivId, headerContainerDivId, sideMenuDivId}) {

  //Check input arguments
  if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
    console.error('setupHeaderUpdater: Invalid arg(s).');
  }

  //DivIDs -> jQuery selectors
  uh.scrollDivSelector = '#'+ scrollDivId;
  uh.headerContainerDivSelector = '#'+ headerContainerDivId;
  uh.sideMenuDivSelector = '#'+ sideMenuDivId;

  //Initialize scrollbar position
  uh.scrollPosition = $(uh.scrollDivSelector).scrollTop(); 
}


function updateHeader() {
  
    const scrollDiv = $(uh.scrollDivSelector);
    const newScrollPosition = scrollDiv.scrollTop();
    const maxScrollPosition = scrollDiv.height();

    //If starting to scroll down...
    if (uh.scrollPosition > 0 && //Condition needed to guard against weird Safari touchscreen bounce issue
        newScrollPosition > uh.scrollPosition && 
        uh.prevScrollDirection !== uh.DOWN) {

      //Initiate contraction of header (a css transition animation)
      $(uh.headerContainerDivSelector).css('flexBasis', uh.HEADER_CONTAINER_MIN_HEIGHT);

      //Initiate counter-animation of side-menu top (a css transition animation)
      //so that the side menu location appears constant while the header is 
      //contracting. (Note: Since side-menu's position is "sticky", this
      //counter-animation of side-menu top only has effect when the side-menu
      //is as high as it can go relative to the bottom of the header.)
      $(uh.sideMenuDivSelector).css('top', uh.SIDE_MENU_MAX_TOP);
      
      //Update previous scroll direction value with current value
      uh.prevScrollDirection = uh.DOWN;
    } 
    
    //If starting to scroll up...
    else if (newScrollPosition < maxScrollPosition && //Condition needed to guard against weird Safari touchscreen bounce issue
             newScrollPosition < uh.scrollPosition && 
             uh.prevScrollDirection !== uh.UP) {

      //Initiate expansion of header (a css transition animation)
      $(uh.headerContainerDivSelector).css('flexBasis', uh.HEADER_CONTAINER_MAX_HEIGHT);

      //Initiate counter-animation of side-menu top (a css transition animation)
      //so that the side menu location appears constant while the header is 
      //expanding. (Note: Since side-menu's position is "sticky", this
      //counter-animation of side-menu top only has effect when the side-menu
      //is as high as it can go relative to the bottom of the header.)
      $(uh.sideMenuDivSelector).css('top', uh.SIDE_MENU_MIN_TOP);
      
      //Update previous scroll direction value with current value
      uh.prevScrollDirection = uh.UP;      
    }

    //Update scroll position
    uh.scrollPosition = newScrollPosition;
}
