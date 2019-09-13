class Text {
  static animationInit = () => {
    const texts = document.querySelectorAll('.Text_animation_bounce');

    [...texts].forEach(text => {
      let htmlText = '';

      [...text.textContent].forEach(letter => {
        htmlText += `<span>${letter}</span>`;
        text.innerHTML = htmlText;
      });
    });
  };
}

export default Text;
