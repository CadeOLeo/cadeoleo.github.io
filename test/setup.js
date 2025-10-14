import '@testing-library/jest-dom';

// Mock do Bootstrap
window.bootstrap = {
  Modal: class Modal {
    constructor(element) {
      this.element = element;
    }
    show() {
      this.element.classList.add('show');
      this.element.setAttribute('aria-modal', 'true');
      this.element.style.display = 'block';
    }
    hide() {
      this.element.classList.remove('show');
      this.element.removeAttribute('aria-modal');
      this.element.style.display = 'none';
    }
  },
  Popover: class Popover {
    constructor(element, config) {
      this.element = element;
      this.config = config;
    }
    show() {}
    hide() {}
  }
};
