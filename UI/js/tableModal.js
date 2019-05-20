
(function() {
  /* Opening modal window function */
  function openModal() {
    /* Get trigger element */
    const modalTrigger = document.getElementById('jsModalTrigger');
    const modal = document.getElementById('jsModal');
    const rows = modalTrigger.getElementsByTagName('tr');

    /* Set onclick event handler for all trigger elements */
    for (let i = 1; i < rows.length; i++) {
      rows[i].onclick = function() {
        modal.classList.toggle('open');
        modal.classList.remove('close');
      };
    }
  }

  function closeModal() {
    /* Get close button */
    const closeButton = document.getElementsByClassName('jsModalClose');
    const modal = document.getElementById('jsModal');

    /* Set onclick event handler for close buttons */
    for (let i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function() {
        modal.classList.toggle('open');
        modal.classList.add('close');
      };
    }
  }

  /* Handling domready event IE9+ */
  function ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* Triggering modal window function after dom ready */
  ready(openModal);
  ready(closeModal);
}());
