document.addEventListener('DOMContentLoaded', () => {
	function toggleAccountOnWideScreen() {
		const accountDiv = document.querySelector('#topBarHeaderAccount')
		const toggle = document.querySelector('.submenu')

		accountDiv.addEventListener('click', () => {
			if(toggle.classList.contains("show")) {
				toggle.classList.remove("show")
			} else {
				toggle.classList.add("show")
			}

		})
	}
	toggleAccountOnWideScreen()
})