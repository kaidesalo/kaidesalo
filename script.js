// mobile menu controls
const menuToggle = document.querySelector('.menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')

    // closing the mobile menu when user uses a nav link within the menu
function closeMenu(){
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', 'open nav')
    mobileMenu.hidden = true
};

    // opening and closing the mobile menu with the menu button
menuToggle.addEventListener('click', ()=> {
    const open = menuToggle.getAttribute('aria-expanded') === 'true'

    menuToggle.setAttribute('aria-expanded', String(!open))
    menuToggle.setAttribute('aria-label', open ? 'Open nav':'close nav')
    mobileMenu.hidden = open
})

mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu))

document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
        closeMenu()
    }
});

window.matchMedia('(min-width: 701px').addEventListener('change', e => {
    if(e.matches){
        closeMenu()
    }
});