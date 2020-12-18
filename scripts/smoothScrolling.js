
//https://stackoverflow.com/questions/18545467/how-to-scroll-within-a-div-with-jquery-animate-function
//https://stackoverflow.com/a/18545500

function smoothScrollTo(scrollToId){
  smoothScrollInTo('scroll-window', scrollToId)
}

function smoothScrollInTo(scrollBoxId, scrollToId) {

  const scrollPaneTop = $('#scroll-pane').position().top;
  const toTop = $('#'+scrollToId).position().top;
  let offset = toTop;
  if (scrollToId === 'section0') {
    offset -= toTop
  }
  else {
    offset -= scrollPaneTop;
  }

  $('#'+scrollBoxId).animate(
    {scrollTop: $('#'+scrollBoxId).position().top + offset }, 300, 'swing'
  )
}