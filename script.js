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
    manaden: {
        title: 'ManaDen',
        type: 'Personal / In Progress',
        intro: 'A small web app for searching Magic: The Gathering cards and sorting them by color and set.',
        image: 'manaden-placeholder.svg',
        alt: 'ManaDen placeholder artwork, screenshots coming with the first build',
        stack:['Scryfall API', 'HTML', 'CSS', 'JavaScript'],
        challenge: 'A pile of card names is hard to browse. ManaDen keeps the first version intentionally small: look up cards through the Scryfall API, then organize results by color and set so they become something you can actually scan.',
        approach: ['Wire Scryfall search and render a clean results list.', 'Sort and filter results by color and set.', 'Polish empty, loading, and error states plus the mobile layout.'],
        focus: 'API Integration · Front End Sorting · Usable Scope'
    },
    foxforge: {
        title: 'Foxforge',
        type: 'Personal / In Progress',
        intro: 'A Microsoft Teams app I\'m scoping and scaffolding, built to live where conversations already happen.',
        image: 'foxforge-placeholder.svg',
        alt: 'Foxforge placeholder artwork, screenshots coming once the scaffold is running',
        stack:['Microsoft Teams', 'Teams Toolkit', 'TypeScript', 'Node.js'],
        challenge: 'Foxforge is a project I\'ve put off for a while. The first version starts with the basics: a written scope that defines who it\'s for and what v1 does, plus a bare Teams app that installs and runs end to end.',
        approach: ['Write a one-page scope covering audience, core job, and v1 boundaries.', 'Scaffold a bare Teams app and sideload it in a dev tenant.', 'Build the smallest version of the core flow from the scope.'],
        focus: 'Scoping · Platform Setup · Teams Integration'
    },
    folio: {
        title: 'Folio',
        type: 'Creative Dev / Concept',
        intro: 'A digital space with a point of view. An editorial portfolio concept that pairs expressive typography with a fast, accessible browsing experience.',
        image: 'folio.svg',
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
                project.classList.add('filtering')
            }
        })
    })
);

// project detail dialogs

    // cards with a data-dialog attribute open the matching <dialog>
    // 1. remember which card opened it so focus can go back there
    // 2. showModal() when supported, otherwise fall back to the open attribute
    // 3. lock page scroll with body.modal-open while it's open
let lastDialogTrigger = null
const nativeDialog = typeof HTMLDialogElement === 'function' &&
    typeof HTMLDialogElement.prototype.showModal === 'function'

function openProjectDialog(dialog, trigger){
    if(!dialog || dialog.open) return
    lastDialogTrigger = trigger || null

    if(nativeDialog){
        dialog.showModal()
    } else {
        dialog.setAttribute('open', '')
    }
    document.body.classList.add('modal-open')

    const closeBtn = dialog.querySelector('.close-dialog')
    if(closeBtn) closeBtn.focus()
}

function closeProjectDialog(dialog){
    if(!dialog || !dialog.open) return

    if(nativeDialog){
        dialog.close()
    } else {
        dialog.removeAttribute('open')
        projectDialogClosed()
    }
}

function projectDialogClosed(){
    document.body.classList.remove('modal-open')
    if(lastDialogTrigger){
        lastDialogTrigger.focus()
        lastDialogTrigger = null
    }
}

    // cards are real <button>s, so click also covers Enter and Space
document.querySelectorAll('.project-open[data-dialog]').forEach(trigger =>
    trigger.addEventListener('click', () => {
        openProjectDialog(document.getElementById(trigger.dataset.dialog), trigger)
    })
);

document.querySelectorAll('dialog.project-dialog').forEach(dialog => {
    dialog.querySelectorAll('.close-dialog').forEach(btn =>
        btn.addEventListener('click', () => closeProjectDialog(dialog))
    )

        // backdrop click: the target is the <dialog> itself, outside its content box
    dialog.addEventListener('click', e => {
        if(e.target !== dialog) return
        const r = dialog.getBoundingClientRect()
        const inside = e.clientX >= r.left && e.clientX <= r.right &&
                       e.clientY >= r.top && e.clientY <= r.bottom
        if(!inside) closeProjectDialog(dialog)
    })

        // Esc is handled natively by showModal(); this covers the fallback
    dialog.addEventListener('keydown', e => {
        if(e.key === 'Escape' && !nativeDialog){
            e.preventDefault()
            closeProjectDialog(dialog)
        }
    })

    dialog.addEventListener('close', projectDialogClosed)
});
