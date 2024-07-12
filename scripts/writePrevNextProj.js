const pnp = { //"pnp": A containing namespace, to prevent cross-file variable/function name collisions
  
  writePrevNextProj: (prevProjId, nextProjId) => {

    console.log(pr)
    console.log(pr.pages)

    if (!pr) {
      console.error(`Page routes namespace not found.`)
      return
    }

    const pages = pr.pages

    if (pages === undefined || pages === null) {
      console.error(`Variable 'pages' not found.`)
      return
    }
    if (!pages[prevProjId]) {
      console.error(`Project id: ${prevProjId} not found.`)
      return
    }
    if (!pages[nextProjId]) {
      console.error(`Project id: ${nextProjId} not found.`)
      return
    }

    document.write(`<div class="prev-next-proj">`)
      document.write(`<a class="prev-next-proj-link" href="${pages[prevProjId].url}">&lt;&nbsp;&nbsp;${pages[prevProjId].name}</a>`)
      document.write(`<span class="prev-next-proj-separator">&nbsp;&nbsp;|&nbsp;&nbsp;</span>`)
      document.write(`<a class="prev-next-proj-link" href="${pages[nextProjId].url}">${pages[nextProjId].name}&nbsp;&nbsp;&gt;</a>`)
    document.write(`</div>`)
  },

};



