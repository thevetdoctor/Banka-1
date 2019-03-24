document.addEventListener('DOMContentLoaded', () => {
	function toggleAccountOnWideScreen() {
		const profileDiv = document.querySelector('#topBarHeaderAccount')
		const showMenu = document.querySelector('.header__hamburger')
		const toggle = document.querySelector('.submenu')
		const sidebar = document.querySelector('.mobile-sidebar')
		const sidebar2 = document.querySelector('.sidebar__fixed--vertical')


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
	}
	toggleAccountOnWideScreen()
})