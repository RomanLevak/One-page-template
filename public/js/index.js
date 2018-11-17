const ToggleBtn = document.getElementById('menu-toggle')
const Menu = document.getElementById('menu')


ToggleBtn.addEventListener('click', toggleMenu)

function toggleMenu () {
	Menu.classList.toggle('active')
}
