/* File: js/main.js */

const translations = {
    'es': {
        'nav_home': 'Inicio', 'nav_p1': 'Seguridad', 'nav_p2': 'Sistemas', 'nav_all': 'Proyectos', 'nav_contact': 'Contacto',
        'home_title': 'SYSADMIN & CIBERSEGURIDAD', 'home_subtitle': 'Protegiendo infraestructuras y optimizando el rendimiento.',
        'btn_p1': 'Ver Seguridad', 'btn_p2': 'Ver Sistemas', 'footer_text': 'Sistema en línea. Disponible para contratación.',
        'all_title': 'BASE DE DATOS', 'all_sub': 'Repositorio de 100 scripts.',
        'filter_ph': 'Buscar protocolo, ID o tecnología...',
        'form_title': 'ENLACE DE COMUNICACIÓN', 'form_sub': 'ESTABLECER CONEXIÓN', 
        'label_name': 'ID DE USUARIO', 'label_email': 'IP ORIGEN (EMAIL)', 'label_msg': 'MENSAJE', 'btn_send': 'ENVIAR', 'btn_back': 'Volver'
    },
    'en': {
        'nav_home': 'Home', 'nav_p1': 'Security', 'nav_p2': 'Systems', 'nav_all': 'Projects', 'nav_contact': 'Contact',
        'home_title': 'SYSADMIN & CYBERSECURITY', 'home_subtitle': 'Securing critical infrastructure and optimizing performance.',
        'btn_p1': 'View Security', 'btn_p2': 'View Systems', 'footer_text': 'System Online. Available for hire.',
        'all_title': 'DATABASE', 'all_sub': 'Repository of 100 scripts.',
        'filter_ph': 'Search protocol, ID or technology...',
        'form_title': 'COMMUNICATION LINK', 'form_sub': 'ESTABLISH CONNECTION', 
        'label_name': 'USER ID', 'label_email': 'SOURCE IP', 'label_msg': 'PAYLOAD', 'btn_send': 'EXECUTE', 'btn_back': 'Go Back'
    }
};

let currentLang = localStorage.getItem('selectedLang') || 'en';

// VARIABLES DE PAGINACIÓN
let projectsDB = [];
let currentProjects = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 9; // Grid 3x3 limpio

document.addEventListener("DOMContentLoaded", () => {
    updateTexts();
    
    // 1. IDIOMA
    const btn = document.getElementById('lang-toggle');
    if (btn) {
        btn.textContent = currentLang === 'en' ? 'ES' : 'EN';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = currentLang === 'en' ? 'es' : 'en';
            localStorage.setItem('selectedLang', currentLang);
            updateTexts();
            btn.textContent = currentLang === 'en' ? 'ES' : 'EN';
            
            // Actualizar placeholder buscador
            const searchInput = document.getElementById('search-input');
            if(searchInput && translations[currentLang]) {
                searchInput.placeholder = translations[currentLang]['filter_ph'];
            }
        });
    }

    // 2. PROYECTOS (Solo si existe la grilla)
    if(document.getElementById('project-grid-container')) {
        generateProjects();
        currentProjects = projectsDB; // Inicialmente son todos
        renderPaginatedProjects();
        setupFilters();

        const searchInput = document.getElementById('search-input');
        if(searchInput && translations[currentLang]) {
            searchInput.placeholder = translations[currentLang]['filter_ph'];
        }
    }
});

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

// --- GENERADOR ---
const techs = ['python', 'bash', 'powershell', 'go', 'rust', 'c++'];
const actions = ['Automated', 'Encrypted', 'Distributed', 'Cloud-Native', 'Stealth', 'Real-time'];
const nouns = ['Firewall', 'Packet Sniffer', 'Keylogger', 'VPN Tunnel', 'Load Balancer', 'SIEM Agent', 'Backdoor Hunter'];

function generateProjects() {
    projectsDB = [];
    for(let i=1; i<=100; i++) {
        const t = techs[Math.floor(Math.random() * techs.length)];
        const act = actions[Math.floor(Math.random() * actions.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        projectsDB.push({
            id: `PRJ-${1000+i}`,
            title: `${act} ${noun} v${(Math.random()*5).toFixed(1)}`,
            tech: t,
            desc: `Optimized ${t} script for low-latency environment and secure data transmission.`
        });
    }
}

// --- RENDERIZADO CON PAGINACIÓN ---
function renderPaginatedProjects() {
    const container = document.getElementById('project-grid-container');
    const paginationContainer = document.getElementById('pagination-container');
    
    if(!container) return;
    container.innerHTML = '';
    paginationContainer.innerHTML = '';

    // Calcular Start y End
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedItems = currentProjects.slice(start, end);

    // Pintar Tarjetas
    paginatedItems.forEach(p => {
        const div = document.createElement('div');
        div.className = 'mini-card';
        div.innerHTML = `
            <div class="card-header">
                <span class="card-id">${p.id}</span>
                <span class="tech-badge">${p.tech.toUpperCase()}</span>
            </div>
            <div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>
        `;
        container.appendChild(div);
    });

    // Pintar Botones de Paginación
    const totalPages = Math.ceil(currentProjects.length / ITEMS_PER_PAGE);
    
    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            // Lógica para no mostrar 100 botones: solo primero, último y cercanos
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                const btn = document.createElement('button');
                btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                btn.innerText = i;
                btn.addEventListener('click', () => {
                    currentPage = i;
                    renderPaginatedProjects();
                    document.querySelector('.filter-container').scrollIntoView({ behavior: 'smooth' });
                });
                paginationContainer.appendChild(btn);
            }
        }
    }
}

function setupFilters() {
    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            currentProjects = projectsDB.filter(p => 
                p.title.toLowerCase().includes(term) || 
                p.tech.toLowerCase().includes(term) ||
                p.id.toLowerCase().includes(term)
            );
            currentPage = 1; // Volver a la 1 al buscar
            renderPaginatedProjects();
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            if(document.getElementById('search-input')) document.getElementById('search-input').value = '';
            
            if(filter === 'all') {
                currentProjects = projectsDB;
            } else {
                currentProjects = projectsDB.filter(p => p.tech === filter);
            }
            currentPage = 1;
            renderPaginatedProjects();
        });
    });
}