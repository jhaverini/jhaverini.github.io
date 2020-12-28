
const wf = {
  
  writeFooter: () => {

    const year = new Date().getFullYear();
    const nameLink = `<a href="mailto:nilpa.j@gmail.com?subject=Your website">Nilpa Jhaveri</a>`;
    
    document.write('<div class="footer-text">');
    document.write(`&copy 2019 - ${year} ${nameLink}, all rights reserved.`);
    document.write('</div>');
  },
};



