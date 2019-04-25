const accountInfo = [
		{
			"id": 1,
			"account_name": "James Joseph",
			"account_number": "1234567890"
		},
		{
			"id": 2,
			"account_name": "Tunde Chukwuma",
			"account_number": "1234567891"
		},
		{
			"id": 3,
			"account_name": "Chioma Musa",
			"account_number": "1234567892"
		}
		]

document.addEventListener('DOMContentLoaded', () => {
	const profileDiv = document.querySelector('#ProfileDropDown')
		const registerButton = document.querySelector('#RegisterOverlay')
		const registerLink = document.querySelector('#RegisterLink')
		const registerButtonOnMobile = document.querySelector('#RegisterOverlayOnMobile')
		const loginButton = document.querySelector('#LoginOverlay')
		const loginLink = document.querySelector('#loginLink')
		const showMenu = document.querySelector('.header__hamburger')
		const registerModalClose = document.querySelector('.register__modal')
		const loginModalClose = document.querySelector('.login__modal')
		const toggle = document.querySelector('.submenu')
		const sidebar = document.querySelector('.mobile-sidebar')
		const sidebar2 = document.querySelector('.sidebar__fixed--vertical')
		const registerOverlay = document.querySelector('.register__account_modal')
		const loginOverlay = document.querySelector('.login__account_modal')
		const accountButton = document.querySelector('#account__btn')
		const secondNav = document.querySelector('.account__side__wrapper')

		const btn = document.querySelector('#topBarHeaderResponsiveBar');
		const menu = document.querySelector('#st-container');
		const pusher = document.querySelector('.body');

	function toggleAccountOnWideScreen() {
	
		if(profileDiv) {
		profileDiv.addEventListener('click', () => {
				toggle.classList.toggle("show")

		})
		}
		if(registerLink) {
		registerLink.addEventListener('click', () => {
			if(registerOverlay.classList.contains("show")) {
				registerOverlay.classList.remove("show")
				loginOverlay.classList.add("show")
			} 

		})
		}
		if(loginLink) {
		loginLink.addEventListener('click', () => {
			if(loginOverlay.classList.contains("show")) {
				loginOverlay.classList.remove("show")
				registerOverlay.classList.add("show")
			} 

		})
		}
		if(registerButton) {
		registerButton.addEventListener('click', () => {
		
			if(registerOverlay.classList.contains("show")) {
				registerOverlay.classList.remove("show")
			} 

		})
		}
		registerButtonOnMobile.addEventListener('click', () => {
			if(registerOverlay.classList.contains("show")) {
				registerOverlay.classList.remove("show")
			} 

		})
		if(loginButton) {
		loginButton.addEventListener('click', () => {
			if(loginOverlay.classList.contains("show")) {
				loginOverlay.classList.remove("show")

			} 
		})
		}
		loginModalClose.addEventListener('click', () => {
			if(!loginOverlay.classList.contains("show")) {
				loginOverlay.classList.add("show")
			}

		})
		registerModalClose.addEventListener('click', () => {
			if(!registerOverlay.classList.contains("show")) {
				registerOverlay.classList.add("show")
			}
		})
		if(accountButton) {
		accountButton.addEventListener('click', () => {
				secondNav.classList.toggle("show")
		})
		}
	}
		

		btn.addEventListener('click', addClass)
		pusher.addEventListener('click', closeMenu);

		function addClass(e) {
		  // adding the effects
		  menu.classList.add('st-effect-1');
		  menu.classList.add('st-menu-open');  
		}

		function closeMenu(el) {
		  // if the click target has this class then we close the menu by removing all the classes
		  if (!el.target.classList.contains('fa-bars'))
		  	{
		    menu.classList.remove('st-effect-1');
		    menu.classList.remove('st-menu-open');
		  }
		  if(!el.target.classList.contains('fa') && !secondNav.classList.contains('show')) {
		  	secondNav.classList.add("show")
		  }
		}


	 
	toggleAccountOnWideScreen()
})