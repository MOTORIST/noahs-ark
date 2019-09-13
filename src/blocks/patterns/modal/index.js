const className = {
  VISIBILITY: 'Modal_isVisibility',
};

class Modal {
  constructor(idModal) {
    this.modalEl = document.getElementById(idModal);
    this._init();
  }

  open = () => {
    this.modalEl.classList.add(className.VISIBILITY);
  };

  close = () => {
    this.modalEl.classList.remove(className.VISIBILITY);
  };

  _init = () => {
    this.modalEl.addEventListener('click', e => {
      if (e.target.dataset && e.target.dataset.dismiss === 'modal') {
        this.close();
      }
    });
  };
}

export default Modal;
