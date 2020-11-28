
const pages = {
  home: {
    name: 'Home',
    url: './home.html',
  },
  about: {
    name: 'About',
    url: './about.html',
  },
  projects: {
    name: 'Projects',
    url: './projects.html',
  },
  resume: {
    name: 'Resume',
    url: './resume.html',
  }
};


function lowerCaseEquals(currentPageName, pageName) {
  return currentPageName.toLowerCase() === pageName.toLowerCase();
}


function writeHeaderItem(page, isCurrentPage) {
  if (isCurrentPage) {
    document.write(`<span class="top-nav">${page.name}</span>`);
    return;
  }
  document.write(`<a class="top-nav" href="${page.url}">${page.name}</a>`);
}


function writeHeaderNav(currentPageName) {
  writeHeaderItem(pages.home, lowerCaseEquals(currentPageName, pages.home.name));
  writeHeaderItem(pages.about, lowerCaseEquals(currentPageName, pages.about.name));
  writeHeaderItem(pages.projects, lowerCaseEquals(currentPageName, pages.projects.name));
  writeHeaderItem(pages.resume, lowerCaseEquals(currentPageName, pages.resume.name));
}