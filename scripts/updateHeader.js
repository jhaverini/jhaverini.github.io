//Update header height on scroll

//*** NOTE! KEEP SYNCED WITH CSS FILE... ***
const _UH_HEADER_CONTAINER_MIN_HEIGHT = '50px'; // --header-container-min-height
const _UH_HEADER_CONTAINER_MAX_HEIGHT = '100px'; // --header-container-max-height
const _UH_SIDE_MENU_MAX_TOP = '50px'; // --side-menu-max-top
const _UH_SIDE_MENU_MIN_TOP = '0px'; // --side-menu-min-top

const _UH_UP = -1;
const _UH_DOWN = 1;

let _uh_scrollPosition = 0;
let _uh_prevScrollDirection;

let _uh_scrollDivSelector;
let _uh_headerContainerDivSelector;
let _uh_sideMenuDivSelector;


function setUpHeaderUpdater({scrollDivId, headerContainerDivId, sideMenuDivId}) {

  //Check input arguments
  if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
    console.error('setupHeaderUpdater: Invalid arg(s).');
  }

  //DivIDs -> jQuery selectors
  _uh_scrollDivSelector = '#'+ scrollDivId;
  _uh_headerContainerDivSelector = '#'+ headerContainerDivId;
  _uh_sideMenuDivSelector = '#'+ sideMenuDivId;

  //Initialize scrollbar position
  _uh_scrollPosition = $(_uh_scrollDivSelector).scrollTop(); 
}


function updateHeader() {
  
    let newScrollPosition = $(_uh_scrollDivSelector).scrollTop();

    //If starting to scroll down...
    if (newScrollPosition > _uh_scrollPosition && 
        _uh_prevScrollDirection !== _UH_DOWN) {

      //Initiate contraction of header (a css transition animation)
      $(_uh_headerContainerDivSelector).css('flexBasis', _UH_HEADER_CONTAINER_MIN_HEIGHT);

      //Initiate counter-animation of side-menu top (a css transition animation)
      //so that the side menu location appears constant while the header is 
      //contracting. (Note: Since side-menu's position is "sticky", this
      //counter-animation of side-menu top only has effect when the side-menu
      //is as high as it can go relative to the bottom of the header.)
      $(_uh_sideMenuDivSelector).css('top', _UH_SIDE_MENU_MAX_TOP);
      
      //Update previous scroll direction value with current value
      _uh_prevScrollDirection = _UH_DOWN;
    } 
    
    //If starting to scroll up...
    else if (newScrollPosition < _uh_scrollPosition && 
             _uh_prevScrollDirection !== _UH_UP) {

      //Initiate expansion of header (a css transition animation)
      $(_uh_headerContainerDivSelector).css('flexBasis', _UH_HEADER_CONTAINER_MAX_HEIGHT);

      //Initiate counter-animation of side-menu top (a css transition animation)
      //so that the side menu location appears constant while the header is 
      //expanding. (Note: Since side-menu's position is "sticky", this
      //counter-animation of side-menu top only has effect when the side-menu
      //is as high as it can go relative to the bottom of the header.)
      $(_uh_sideMenuDivSelector).css('top', _UH_SIDE_MENU_MIN_TOP);
      
      //Update previous scroll direction value with current value
      _uh_prevScrollDirection = _UH_UP;      
    }

    //Update scroll position
    _uh_scrollPosition = newScrollPosition;
}
