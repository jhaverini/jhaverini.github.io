const wh = { //"wh": A containing namespace, to prevent cross-file variable/function name collisions
  
  writeHeader: () => {

    document.write(`<header class="heading">`)  // id required to "find" header for collapsing / expanding when scrolling down / up

      document.write(`<div id="header-content" class="header-content">`)  // id required to "find" header for collapsing / expanding when scrolling down / up

        document.write(`<div class="header-content-inner">`)

          document.write(`<div class="header-line1">`)
            document.write(`<div class="header-line1-left">`)
              wh.writeLeftNav()
            document.write(`</div>`)
            
            document.write(`<div class="header-line1-right">`)
              wh.writeRightNav()
            document.write(`</div>`) 
          document.write(`</div>`) 
        
          document.write(`<div class="header-line2">`)
            document.write(`<div class="header-line2-title">`)
              document.write(`Product/UX Designer`)
            document.write(`</div>`)
            document.write(`<div class="header-line2-title">`)
              document.write(`Licensed Architect`)
            document.write(`</div>`)
          document.write(`</div>`)

        document.write(`</div>`) // header-content-inner

      document.write(`</div>`) // header-content

     document.write(`<div class="header-shaddow" /> `)

    document.write(`</header>`);   
  },


  writeLeftNav: () => {
    wh.writeLeftNavItem(pr.pages.home);
  },


  writeLeftNavItem: (page) => {
    const nj = 'Nilpa Jhaveri';
    /* Not needed, while left link leads to about page, and there is no home page...
    if (pr.isCurrentPage(page)) {
      document.write(`<span class="header-line1-link home current">${nj}</span>`);
      return;
    }
    */
    document.write(
      `<a class="header-line1-link home current" href="${page.url}" target="${page.target}">${nj}</a>`
    );
  },


  writeRightNav: () => {
    const pages = pr.pages;
    const writeRightNavItem = wh.writeRightNavItem;
    document.write(`<div style="white-space:nowrap; padding-left:10px;">`);
    writeRightNavItem(pages.about);
    document.write('&nbsp;&nbsp;');
    writeRightNavItem(pages.projects);
    document.write('&nbsp;&nbsp;');
    writeRightNavItem(pages.resume);
    document.write(`</div>`);
  },


  writeRightNavItem: (page) => {
    const classList = `header-line1-link ${pr.isCurrentPage(page) ? 'current':''}`;
    document.write(
      `<a class="header-line1-link ${classList}" href="${page.url}" target="${page.target}">
        ${page.name}
      </a>`
    );
  },

};



