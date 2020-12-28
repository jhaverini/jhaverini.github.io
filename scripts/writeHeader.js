
const wh = {

  pages: {
    home: {
      name: "Home",
      url: "./home.html",
      target: "_self",
    },
    about: {
      name: "About",
      url: "./about.html",
      target: "_self",
    },
    projects: {
      name: "Projects",
      url: "./projects.html",
      target: "_self",
    },
    projectKaiserNicu: {
      name: "Case Study: Kaiser NICU",
      url: "./case-study-kaiser-nicu.html",
      target: "_self",
    },
    projectKeyConservationApp: {
      name: "Case Study: Key Conservation App",
      url: "./case-study-key-conservation-app.html",
      target: "_self",
    },
    resume: {
      name: "Resume",
      url: "../pdfs/Resume-Jhaveri-2020-12.pdf",
      target: "_blank",
    },
  },
  

  currentPageName: () => {
    const url = document.location.href;
    const urlParts = url.split('/');
    const pageNameIndex = urlParts.length - 1; 
    return urlParts[pageNameIndex];
  },


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
    wh.writeLeftNavItem(wh.pages.home);
  },

  writeLeftNavItem: (page) => {
    const nj = 'Nilpa Jhaveri';
    if (page.name === wh.currentPageName()) {
      document.write(`<span class="header-line1-link home current">${nj}</span>`);
      return;
    }
    document.write(
      `<a class="header-line1-link home" href="${page.url}" target="${page.target}">${nj}</a>`
    );
  },


  writeRightNav: () => {
    const pages = wh.pages;
    const writeRightNavItem = wh.writeRightNavItem;
    document.write(`<div>`);
    writeRightNavItem(pages.about);
    writeRightNavItem(pages.projects);
    writeRightNavItem(pages.resume);
    document.write(`</div>`);
  },

  writeRightNavItem: (page) => {
    if (page.name === wh.currentPageName()) {
      document.write(`<span class="header-line1-link current">${page.name}</span>`);
      return;
    }
    document.write(
      `<a class="header-line1-link" href="${page.url}" target="${page.target}">${page.name}</a>`
    );
  },
};



