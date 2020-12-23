//Scroll effects

function initScrollEffects({scrollDivId, headerContainerDivId, sideMenuDivId}) { 

  //Check input arguments
  if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
    console.error('setUpScrollEffects: Invalid arg(s).');
  }

  un.initNavUpdater({
    scrollDivId,
    sideMenuDivId,
  });

  uh.initHeaderUpdater({
    scrollDivId,
    headerContainerDivId,
    sideMenuDivId,
  });

  //Set scroll function
  $('#'+scrollDivId).scroll(() => {
    uh.updateHeader();
    un.updateNav();
  });
}
