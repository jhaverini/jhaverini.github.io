//Scroll effects

function initScrollEffects({scrollDivId, headerContainerDivId, sideMenuDivId}) { 

  //Check input arguments
  if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
    console.error('setUpScrollEffects: Invalid arg(s).');
  }

  initNavUpdater({
    scrollDivId,
    sideMenuDivId,
  });

  initHeaderUpdater({
    scrollDivId,
    headerContainerDivId,
    sideMenuDivId,
  });

  //Set scroll function
  $('#'+scrollDivId).scroll(() => {
    updateHeader();
    updateNav();
  });
}
