document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.body');
  const toggle = document.querySelector('.submenu');
  const registerOverlay = document.querySelector('.register__account_modal');
  const loginOverlay = document.querySelector('.login__account_modal');
  const secondNav = document.querySelector('.account__side__wrapper');
  const menu = document.querySelector('#st-container');


  const toggleClickedItem = ({ target }) => {
    if (target.classList.contains('circle')) toggle.classList.toggle('show');
    if (target.classList.contains('btn__register')) {
      registerOverlay.classList.remove('show');
      loginOverlay.classList.add('show');
    }
    if (target.classList.contains('btn__login')) {
      loginOverlay.classList.remove('show');
      registerOverlay.classList.add('show');
    }
    if (target.classList.contains('navbar__text') || target.classList.contains('navbar__icon')) toggle.classList.toggle('show');
    if (target.classList.contains('register__modal')) registerOverlay.classList.add('show');
    if (target.classList.contains('login__modal')) loginOverlay.classList.add('show');
    if (target.classList.contains('fa-dashboard') || target.classList.contains('fa-book')) secondNav.classList.toggle('show');
    if (target.classList.contains('fa-bars')) {
      menu.classList.add('st-effect-1');
      menu.classList.add('st-menu-open');
    } else {
      menu.classList.remove('st-effect-1');
      menu.classList.remove('st-menu-open');
    }
  };
  body.addEventListener('click', toggleClickedItem);
});
