const pr = { //"pr": A containing namespace, to prevent cross-file variable/function name collisions

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
      url: "./projects-kaiser-nicu.html",
      target: "_self",
    },
    projectKeyConservationApp: {
      name: "Case Study: Key Conservation App",
      url: "./projects-key-conservation-app.html",
      target: "_self",
    },
    resume: {
      name: "Resume",
      url: "../pdfs/Resume-Jhaveri-2020-12.pdf",
      target: "_blank",
    },
  },
  

  currentPageFileName: () => {
    const parts = document.location.href.split('/')
    const lastPart = parts[parts.length - 1] //Page file name - plus any # anchor
    return lastPart.split('#')[0]; //Remove any # anchor
  },


  pageFileName: (page) => {
    const parts = page.url.split('/');
    const lastPart = parts[parts.length - 1]; //Page file name - plus any # anchor
    return lastPart.split('#')[0]; //Remove any # anchor
  },


  isCurrentPage: (page) => {
    return pr.currentPageFileName().toLowerCase() === pr.pageFileName(page).toLowerCase();
  },
};



