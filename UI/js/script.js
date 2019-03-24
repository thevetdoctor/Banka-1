document.addEventListener('DOMContentLoaded', () => {
	function toggleAccountOnWideScreen() {
		const profileDiv = document.querySelector('#headerAccount')
		const registerButton = document.querySelector('#RegisterOverlay')
		const showMenu = document.querySelector('.header__hamburger')
		const modalClose = document.querySelector('.account__close')
		const toggle = document.querySelector('.submenu')
		const sidebar = document.querySelector('.mobile-sidebar')
		const sidebar2 = document.querySelector('.sidebar__fixed--vertical')
		const registerOverlay = document.querySelector('.account_modal') 


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
				modalClose.classList.remove("show")
			} 

		})
		modalClose.addEventListener('click', () => {
			if(!registerOverlay.classList.contains("show")) {
				registerOverlay.classList.add("show")
			} 

		})
	}
	toggleAccountOnWideScreen()
})