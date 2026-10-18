// mobile menu controls

    // dom selectors
const menuToggle = document.querySelector('.menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')

    // closing the mobile menu
function closeMenu(){
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', 'open nav')
    mobileMenu.hidden = true
};

    // opening and closing the mobile menu with the menu button

        // 1. check if the menu is open or not
        // 2. reverse the current state of the menu
        // 3. update the accessibility
        // 4. show/hide the actual menu itself

menuToggle.addEventListener('click', ()=> {
    const open = menuToggle.getAttribute('aria-expanded') === 'true'

    
    menuToggle.setAttribute('aria-expanded', String(!open))
    menuToggle.setAttribute('aria-label', open ? 'Open nav':'close nav')
    mobileMenu.hidden = open
})

    // finding every <a> that resides within the mobile menu
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu))

    // allowings the escape btn usuage for closing the mobile menu
document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
        closeMenu()
    }
});

    // checking if the viewport >= 701px
window.matchMedia('(min-width: 701px)').addEventListener('change', e => {
    if(e.matches){
        closeMenu()
    }
});