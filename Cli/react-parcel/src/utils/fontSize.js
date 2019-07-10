(function (doc, win) {
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = () => {
      let clientWidth = docEl.clientWidth;
      clientWidth = Math.min(750, Math.min(window.innerWidth, document.documentElement.clientWidth));
      if (!clientWidth) {
          return;
      }
      docEl.style.fontSize =  `${100 * (clientWidth / 750)}px`;
      docEl.getElementsByTagName('body')[0].style.fontSize = docEl.style.fontSize;
  };

  if (!doc.addEventListener) {
      return;
  }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));
