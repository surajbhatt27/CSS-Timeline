(function() {
    const sections = [
        { id: "era-1996", year: "1996" },
        { id: "era-2003", year: "2003" },
        { id: "era-2009", year: "2009" },
        { id: "era-2015", year: "2015" },
        { id: "era-2018", year: "2018" },
        { id: "era-2024", year: "2024" }
    ];

    const yearBadge = document.getElementById('yearBadge');
    const timelineDots = document.querySelectorAll('.timeline-dot');

    function updateActiveSection() {
        let currentSectionId = null; 
        let scrollPos = window.scrollY + window.innerHeight * 0.3;

        // Find active section
        for(let section of sections) {
            const el = document.getElementById(section.id);
            if(el) {
                const offsetTop = el.offsetTop;
                const offsetBottom = offsetTop + el.offsetHeight;
                if(scrollPos >= offsetTop && scrollPos < offsetBottom) {
                    currentSectionId = section.id;
                    yearBadge.textContent = section.year;
                    break;
                }
            }
        }

        // Fallback
        if (!currentSectionId && sections.length) {
            const lastSection = document.getElementById(sections[sections.length-1].id);
            if (lastSection && (window.scrollY + window.innerHeight) >= document.body.scrollHeight - 50) {
                currentSectionId = sections[sections.length-1].id;
                yearBadge.textContent = sections[sections.length-1].year;
            } else if (!currentSectionId && sections[0]) {
                currentSectionId = sections[0].id;
                yearBadge.textContent = sections[0].year;
            }
        }

        // Highlight timeline dot
        timelineDots.forEach(dot => {
            const dotYear = dot.getAttribute('data-year');
            const activeYear = yearBadge.textContent;
            
            if (dotYear === activeYear) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveSection);
    });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection(); 

    timelineDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const yearTarget = dot.getAttribute('data-year');
            const cleanYear = yearTarget.replace('+', '');
            const targetSection = document.getElementById(`era-${cleanYear}`);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();