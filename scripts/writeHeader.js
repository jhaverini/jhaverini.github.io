const wh = { //"wh": A containing namespace, to prevent cross-file variable/function name collisions
  
  writeHeader: () => {

    document.write(`<div class="header-line1">`);
    
    document.write(`<div class="header-line1-left">`);
    wh.writeLeftNav();
    document.write(`</div>`);
    
    document.write(`<div class="header-line1-right">`);
    wh.writeRightNav();
    document.write(`</div>`);
  
    document.write(`</div>`);
  
    document.write(`<div class="header-line2">`);
    document.write(`<div class="header-line2-title">`);
    document.write(`User Experience Designer`);
    document.write(`</div>`);
    document.write(`<div class="header-line2-title">`);
    document.write(`Licensed Architect`);
    document.write(`</div>`);
    document.write(`</div>`);
  },


  writeLeftNav: () => {
    wh.writeLeftNavItem(pr.pages.home);
  },


  writeLeftNavItem: (page) => {
    const nj = 'Nilpa Jhaveri';
    if (pr.isCurrentPage(page)) {
      document.write(`<span class="header-line1-link home current">${nj}</span>`);
      return;
    }
    document.write(
      `<a class="header-line1-link home" href="${page.url}" target="${page.target}">${nj}</a>`
    );
  },


  writeRightNav: () => {
    const pages = pr.pages;
    const writeRightNavItem = wh.writeRightNavItem;
    document.write(`<div>`);
    writeRightNavItem(pages.about);
    writeRightNavItem(pages.projects);
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



