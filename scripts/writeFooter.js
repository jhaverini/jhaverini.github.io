
const wf = { //"wf": A containing namespace, to prevent cross-file variable/function name collisions
  
  writeFooter: () => {

    const year = new Date().getFullYear();
    const emailHref = 'mailto:nilpa.j@gmail.com?subject=Your website';
    const linkedInHref = 'https://www.linkedin.com/in/njhaveri/';
    const emailLink = `<a href="${emailHref}">Nilpa Jhaveri</a>`;
    
    document.write('<div class="footer">');

    //Contact links
    document.write('<div class="footer-line" style="padding-bottom:10px">');
    document.write(`<a class="footer-contact-link" target="_blank" href="${linkedInHref}"><img src="../images/contact/linkedin.svg" width="22px"/></a>`);
    document.write('<span style="display:inline-block; width:15px;"></span>');
    document.write(`<a class="footer-contact-link" href="${emailHref}"><img src="../images/contact/email-plane.svg" width="22px"/></a>`);
    document.write('</div>');
    
    //Copywrite notice
    document.write('<div class="footer-line">');
    document.write(`&copy 2019 - ${year} ${emailLink}<br>All rights reserved.`);
    document.write('</div>');

    //Some extra space, so when iOSes browser bottom-bar appears over footer content, the important footer content isn't hidden.
    //(iOS vh/vw coords are screwed up when the browser bottom bar is present...)
    document.write('<div style="height:40px;">');
    document.write('</div>');

    document.write('</div>');

  },
};



