
//https://stackoverflow.com/questions/18545467/how-to-scroll-within-a-div-with-jquery-animate-function
//https://stackoverflow.com/a/18545500

function smoothScrollTo(scrollToId){
  smoothScrollInTo('scroll-window-id', scrollToId)
}

function smoothScrollInTo(scrollBoxId, scrollToId) {
  $('#'+scrollBoxId).animate(
    {scrollTop: $('#'+scrollToId).position().top}, 300, 'swing'
  )
}