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

// projects
const projects = {
    atlas: {
        title: 'Atlas',
        type: 'Full Stack / Concept',
        intro: 'A clearer view of complex data. A dashboard concept that turns geographic and operational information into an interface people can actually navigate.',
        iamge: 'atlas.svg',
        alt: 'Atlas geospatial analytics dashboard',
        stack:['React', 'Typescript', 'PostgreSQL'],
        challenge: 'Dense dashboards often bury the useful parts. Atlas explores a map-first workspace that brings context, filters, and essential metrics together without overwhelming the screen.',
        approach: ['A responsive workspace with a consistent hierarchy across charts, maps, and detail panels.', 'Composable interface components and explicit loading, empty, and error states.', 'An API and data model designed around filtering and progressive disclosure.'],
        focus: 'Data Visualization · Interface Architecture · Full Stack Design'
    },
    orbit: {
        title: 'Orbit',
        type: 'Dev Tools / Concept',
        intro: 'One place to find your flow. A developer workspace concept for keeping projects, activity, and everyday commands within reach.',
        iamge: 'orbit.svg',
        alt: 'Orbit developer workspace',
        stack:['TypeScript', 'Node.js', 'CLI design'],
        challenge: 'Switching between tools interrupts focus. Orbit explores a compact workspace that puts project context and routine actions in one predictable place.',
        approach: ['A keyboard-first interaction model with discoverable commands.', 'Readable terminal output and clear status feedback for everyday tasks.', 'A modular command architecture that makes new workflows straightforward to add.'],
        focus: 'Developer Experience · Command Design · Tooling'
    },
    folio: {
        title: 'Folio',
        type: 'Creative Dev / Concept',
        intro: 'A digital space with a point of view. An editorial portfolio concept that pairs expressive typography with a fast, accessible browsing experience.',
        iamge: 'folio.svg',
        alt: 'Folio editorial website concept',
        stack:['Next.js', 'CSS', 'Motion design'],
        challenge: 'Creative websites should feel distinctive while remaining easy to use. Folio explores how typography, structure, and restrained motion can give work a memorable setting.',
        approach: ['An adaptable layout system that gives each project enough room to tell its story.', 'Responsive typography and lightweight interactions with reduced-motion support.', 'Semantic page structure and a focus on image loading, legibility, and keyboard access.'],
        focus: 'Front End Craft · Accessibility · Performance'
    },
};

// project viewers switch
document.querySelectorAll('.filter').forEach(button => 
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        document.querySelectorAll('.filter').forEach(item => {
            const active = item === button
            item.classList.toggle('active', active)
            item.setAttribute('aria-pressed', String(active))
        })

        document.querySelectorAll('.project').forEach(project => {
            project.hidden = filter !== 'all' && project.dataset.category !== filter
            project.classList.remove('filtering')
            
            if(!project.hidden){
                void project.offsetWidth
                project.classList.add(filtering)
            }
        })
    })
);