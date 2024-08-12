/*
 * Modal
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2024 - Licensed under MIT
 */

// Config
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const scrollbarWidthCssVar = '--pico-scrollbar-width';
const animationDuration = 400; // ms
let visibleModal = null;

// Toggle modal
export const toggleModal = (event) => {
  if (typeof document !== 'undefined') {
    event.preventDefault();
    const modal = document.getElementById(event.currentTarget.dataset.target) as HTMLDialogElement;
    if (!modal) return;
    modal && (modal.open ? closeModal(modal) : openModal(modal));
  }
};

// Open modal
const openModal = (modal) => {
  if (typeof document !== 'undefined') {
    const { documentElement: html } = document;
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth) {
      html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
    }
    html.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
      visibleModal = modal;
      html.classList.remove(openingClass);
    }, animationDuration);
    modal.showModal();
  }
};

// Close modal
const closeModal = (modal) => {
  if (typeof document !== 'undefined') {
    visibleModal = null;
    const { documentElement: html } = document;
    html.classList.add(closingClass);
    setTimeout(() => {
      html.classList.remove(closingClass, isOpenClass);
      html.style.removeProperty(scrollbarWidthCssVar);
      modal.close();
    }, animationDuration);
  }
};

// Close with a click outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (event) => {
    if (visibleModal === null) return;
    const modalContent = (visibleModal as HTMLDialogElement).querySelector('article');
    const isClickInside = modalContent!.contains((event as MouseEvent).target as Node);
    !isClickInside && closeModal(visibleModal);
  });

  // Close with Esc key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && visibleModal) {
      closeModal(visibleModal);
    }
  });
}

// Get scrollbar width
const getScrollbarWidth = () => {
  if (typeof document !== 'undefined') {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
  }
};

// Is scrollbar visible
const isScrollbarVisible = () => {
  if (typeof document !== 'undefined') {
    return document.body.scrollHeight > screen.height;
  }
};
