class ThemeSwitch {
  constructor() {
    this.block = document.querySelector('.ThemeSwitch');
    this.themeBlock = document.querySelector('.Theme');
    this._initTheme();
  }

  init = () => {
    this.block.addEventListener('click', e => {
      const { theme } = e.target.dataset;

      if (theme) {
        this._setTheme(theme);
        this._setActiveClass(e.target);
      }
    });
  };

  _initTheme = () => {
    const theme = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : 'light';
    this._setTheme(theme);
  };

  _setTheme = theme => {
    this.themeBlock.classList.remove(...this.themeBlock.classList);
    this.themeBlock.classList.add('Theme', `Theme_${theme}`);
    localStorage.setItem('theme', theme);
  };

  _setActiveClass = el => {
    this._removeActiveClasses();
    el.classList.add('ThemeSwitch-Item_active');
  };

  _removeActiveClasses = () => {
    const items = this.block.querySelectorAll('.ThemeSwitch-Item_active');

    [...items].forEach(item =>
      item.classList.remove('ThemeSwitch-Item_active')
    );
  };
}

export default ThemeSwitch;
