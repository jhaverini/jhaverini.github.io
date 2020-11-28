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

function lowerCaseEquals(currentPageName, pageName) {
  return currentPageName.toLowerCase() === pageName.toLowerCase();
}

function writeHeaderItem(page, isCurrentPage) {
  if (isCurrentPage) {
    document.write(`<span class="top-nav">${page.name}</span>`);
    return;
  }
  document.write(
    `<a class="top-nav" href="${page.url}" target="${page.target}">${page.name}</a>`
  );
}

function writeHeaderNav(currentPageName) {
  writeHeaderItem(
    pages.home,
    lowerCaseEquals(currentPageName, pages.home.name)
  );
  writeHeaderItem(
    pages.about,
    lowerCaseEquals(currentPageName, pages.about.name)
  );
  writeHeaderItem(
    pages.projects,
    lowerCaseEquals(currentPageName, pages.projects.name)
  );
  writeHeaderItem(
    pages.resume,
    lowerCaseEquals(currentPageName, pages.resume.name)
  );
  document.write("<br/>");
}
