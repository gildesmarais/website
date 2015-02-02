(function() {
  'use strict';

  if (window.console && window.console.log) {
    var font = 'font-family:"Ubuntu Mono", Monaco, monospaced; font-size:16px';

    window.console.log('%cHey!', 'font-weight:bold;' + font);
    window.console.log('%cLooks like you are interested in my work. That\'s cool!', font);
    window.console.log('%cYou can find the git-repository of this website on github:', font);
    window.console.log('%chttp://github.com/giLL0r/website', font);
    window.console.log('%cIf you like it and want to get to know me better, contact me!', font);
  }
}());
