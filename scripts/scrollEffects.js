//Scroll effects

function setUpScrollEffects({scrollDivId, headerContainerDivId, sideMenuDivId}) { 

  //Check input arguments
  if (!scrollDivId || !headerContainerDivId || !sideMenuDivId) {
    console.error('setUpScrollEffects: Invalid arg(s).');
  }

  setUpNavUpdater({
    scrollDivId,
    sideMenuDivId,
  });

  setUpHeaderUpdater({
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
