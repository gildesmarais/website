(function() {
  'use strict';

  if (window.console && window.console.log) {
    var font = 'font-family:"Ubuntu Mono", Monaco, monospaced; font-size:16px';

    window.console.log('%cHey!', 'font-weight:bold;' + font);
    window.console.log('%cLooks like you are interested in my work.', font);
    window.console.log('%cI prefer writing maintainable CSS with BEM notation.', font);
    window.console.log('%cYou can find the complete code, with grunt setup etc., of my website on github:', font);
    window.console.log('%chttp://github.com/giLL0r/website', font);
  }
}());
