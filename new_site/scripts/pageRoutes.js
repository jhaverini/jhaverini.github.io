const pr = { //"pr": A containing namespace, to prevent cross-file variable/function name collisions

  pages: {
    home: {
      name: "Home",
      url: "./about.html",
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
    projectKaiserNICU: {
      name: "Kaiser NICU",
      url: "./projects-kaiser-nicu.html",
      target: "_self",
    },
    projectEpicore: {
      name: "Epicore App &amp; Web",
      url: "./projects-kaiser-nicu.html",
      target: "_self",
    },
    projectKeyConservation: {
      name: "Key Conservation App",
      url: "./projects-key-conservation-app.html",
      target: "_self",
    },
    projectSpeakOut: {
      name: "SpeakOut",
      url: "./projects-speakout.html",
      target: "_self",
    },
    projectHamiltonPay: {
      name: "HamiltonPay",
      url: "./projects-hamiltonpay.html",
      target: "_self",
    },
    projectIterant: {
      name: "Iterant",
      url: "./projects-iterant.html",
      target: "_self",
    },
    projectMuseum: {
      name: "Academic Website",
      url: "./projects-museum.html",
      target: "_self",
    },
    projectVoxPulmini: {
      name: "Vox Pulmini",
      url: "./projects-vox-pulmini.html",
      target: "_self",
    },
    resume: {
      name: "\u25F9" + " Resume",
      url: "../pdfs/resume-jhaveri.pdf",
      target: "_blank",
    }
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



