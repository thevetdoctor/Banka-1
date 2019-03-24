document.addEventListener('DOMContentLoaded', () => {
	function toggleAccountOnWideScreen() {
		const profileDiv = document.querySelector('#headerAccount')
		const registerButton = document.querySelector('#RegisterOverlay')
		const loginButton = document.querySelector('#LoginOverlay')
		const showMenu = document.querySelector('.header__hamburger')
		const registerModalClose = document.querySelector('.register__modal')
		const loginModalClose = document.querySelector('.login__modal')
		const toggle = document.querySelector('.submenu')
		const sidebar = document.querySelector('.mobile-sidebar')
		const sidebar2 = document.querySelector('.sidebar__fixed--vertical')
		const registerOverlay = document.querySelector('.register__account_modal')
		const loginOverlay = document.querySelector('.login__account_modal')


		profileDiv.addEventListener('click', () => {
			if(toggle.classList.contains("show")) {
				toggle.classList.remove("show")
			} else {
				toggle.classList.add("show")
			}

		})

		showMenu.addEventListener('click', () => {
		
			if(sidebar.classList.contains("show")) {
				sidebar2.classList.remove("false")
				sidebar.classList.remove("show")	
			}
		})
		registerButton.addEventListener('click', () => {
		
			if(registerOverlay.classList.contains("show")) {
				registerOverlay.classList.remove("show")
			} 

		})
		loginButton.addEventListener('click', () => {
		
			if(loginOverlay.classList.contains("show")) {
				loginOverlay.classList.remove("show")

			} 

		})
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
	}
	toggleAccountOnWideScreen()
})