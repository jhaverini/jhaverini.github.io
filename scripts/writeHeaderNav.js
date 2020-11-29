const pages = {
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
};

function lcEq(currentPageName, pageName) {
  return currentPageName.toLowerCase() === pageName.toLowerCase();
}

function writeTopRightNavItem(page, isCurrentPage) {
  if (isCurrentPage) {
    document.write(`<span class="top-nav-link current">${page.name}</span>`);
    return;
  }
  document.write(
    `<a class="top-nav-link" href="${page.url}" target="${page.target}">${page.name}</a>`
  );
}

function writeTopRightNav(currentPageName) {
  document.write(`<div>`);
  writeTopRightNavItem(
    pages.about,
    lcEq(currentPageName, pages.about.name)
  );
  writeTopRightNavItem(
    pages.projects,
    lcEq(currentPageName, pages.projects.name)
  );
  writeTopRightNavItem(
    pages.resume,
    lcEq(currentPageName, pages.resume.name)
  );
  document.write(`</div>`);
}


function writeTopLeftNavItem(page, isCurrentPage) {

  const nj = 'Nilpa Jhaveri';

  if (isCurrentPage) {
    document.write(`<span class="top-nav-link home current">${nj}</span>`);
    return;
  }
  document.write(
    `<a class="top-nav-link home" href="${page.url}" target="${page.target}">${nj}</a>`
  );
}

function writeTopLeftNav(currentPageName) {
  writeTopLeftNavItem(
    pages.home,
    lcEq(currentPageName, pages.home.name)
  );
}


function writeTopNav(currentPageName) {

  document.write(`<div class="top-nav-bar">`);
  
  document.write(`<div class="top-nav-bar-left">`);
  writeTopLeftNav(currentPageName);
  document.write(`</div>`);
  
  document.write(`<div class="top-nav-bar-right">`);
  //document.write('About&nbsp;&nbsp;&nbsp;Projects&nbsp;&nbsp;&nbsp;Resume');
  writeTopRightNav(currentPageName);
  document.write(`</div>`);

  document.write(`</div>`);
}