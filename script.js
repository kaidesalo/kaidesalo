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
    spellbranch: {
        title: 'Spellbranch',
        type: 'Personal / In Progress',
        intro: 'A web app for building Magic: The Gathering decks with friends: search cards, fork a deck into branches, and compare every change.',
        image: 'spellbranch/deck-detail.webp',
        alt: 'Screenshot of Spellbranch\'s deck page with branches, Scryfall card search, and the deck list',
        stack:['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'Scryfall API'],
        challenge: 'Trying a new idea in a shared deck usually means overwriting the original list. Spellbranch lets friends fork a deck into branches and compare each branch against the source side by side, with card search and data from the Scryfall API.',
        approach: ['Search cards through the Scryfall API and build lists by card type.', 'Fork decks into branches and compare them with added, removed, and replaced cards called out.', 'Share decks publicly or with friends only, with accounts and data in Supabase.'],
        focus: 'Collaboration · Version Comparison · API Integration'
    },
    cleanslate: {
        title: 'Clean Slate',
        type: 'Booking / In Progress',
        intro: 'A booking platform for a cleaning service: customers book as guests and only see times the team can actually staff, while staff run the schedule from a private dashboard.',
        image: 'clean-slate.svg',
        alt: 'Placeholder title card for Clean Slate; screenshots coming soon',
        stack:['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'Vitest'],
        challenge: 'A polished booking UI that still allows double-booking is a failed product. Clean Slate computes available times from business hours, employee schedules, appointment length, blocked time, and calendar busy periods, and re-checks each slot before saving a booking.',
        approach: ['Guest booking flow with automatic estimates, or a custom quote when an estimate is not confident.', 'A management code on confirmation for rescheduling and cancelling.', 'A private staff dashboard for appointments, calendar, employees, availability, services, and quotes.'],
        focus: 'Scheduling · Booking Flows · Admin Tools'
    },
    kitbook: {
        title: 'Kitbook',
        type: 'Fintech / Concept',
        intro: 'A personal finance tracker concept that turns everyday spending into a clear, friendly picture of where your money goes, with a small origami fox keeping watch.',
        image: 'kitbook.svg',
        alt: 'Concept mockup of the Kitbook personal finance dashboard; all figures are sample data',
        stack:['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL'],
        challenge: 'Budgeting tools tend to either bury people in spreadsheets or nag them with alerts. Kitbook explores how one calm overview (a balance, a monthly budget, spending by category, and a savings goal) can make money feel manageable instead of stressful.',
        approach: ['A one-screen overview that answers the everyday questions first: how much is left, where it went, and whether a goal is on track.', 'Charts built with D3 and paired with plain-text labels and totals, so no figure is conveyed by color alone.', 'A typed data model for accounts, transactions, and budgets in PostgreSQL, shaped for fast monthly roll-ups.'],
        focus: 'Data Visualization · Product Design · Accessibility'
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
