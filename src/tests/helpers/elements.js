/**
 *
 * @param {HTMLElement} el
 * @param {Array} classes
 * @returns {Boolean}
 */
function isHasClasses(el, classes) {
  return classes.every(cl => el.classList.contains(cl));
}

/**
 *
 * @param {HTMLElement} el
 * @param {Array} classes
 * @returns {Boolean}
 */
function isNotHasClasses(el, classes) {
  return classes.every(cl => !el.classList.contains(cl));
}

/**
 *
 * @param {HTMLElement} el
 */
function isDisabled(el) {
  return el.dataset.disable === 'true';
}

/**
 *
 * @param {HTMLElement} el
 */
function isEnabled(el) {
  return el.dataset.disable !== 'true';
}

export { isHasClasses, isNotHasClasses, isDisabled, isEnabled };
