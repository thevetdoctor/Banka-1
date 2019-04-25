
(function() {
  /* Opening modal window function */
  function openModal() {
      /* Get trigger element */
      var modalTrigger = document.getElementById('jsModalTrigger');
      var modal = document.getElementById('jsModal')
      var rows = modalTrigger.getElementsByTagName("tr");

      /* Set onclick event handler for all trigger elements */
      for(var i = 1; i < rows.length; i++) {
          rows[i].onclick = function() {
            modal.classList.toggle('open');
            modal.classList.remove('close'); 
          }
      }   
  }

  function closeModal(){
    /* Get close button */
    var closeButton = document.getElementsByClassName('jsModalClose');
    var modal = document.getElementById('jsModal')

    /* Set onclick event handler for close buttons */
      for(var i = 0; i < closeButton.length; i++) {
        closeButton[i].onclick = function() {
            modal.classList.toggle('open');
          modal.classList.add('close');
        }
      }  

  }

  /* Handling domready event IE9+ */
  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* Triggering modal window function after dom ready */
  ready(openModal);
  ready(closeModal);
}());