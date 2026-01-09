/* File: js/main.js */

const translations = {
    'es': {
        // NAV & FOOTER
        'nav_home': 'Inicio', 'nav_p1': 'Seguridad', 'nav_p2': 'Sistemas', 'nav_all': 'Proyectos', 'nav_contact': 'Contacto',
        'footer_text': 'CONTACTO: anuard.coello.7e9@itb.cat', 'btn_back': 'Volver',
        
        // HOME
        'home_title': 'SYSADMIN & CIBERSEGURIDAD', 'home_subtitle': 'Protegiendo infraestructuras y optimizando el rendimiento.',
        'btn_p1': 'Ver Seguridad', 'btn_p2': 'Ver Sistemas',
        
        // P1 & P2 DETAILS
        'p1_title': 'RED TEAM & INCIDENTS', 'p1_sub': 'OPERACIONES DE SEGURIDAD AVANZADA', 'p1_badge': 'PROYECTO DESTACADO',
        'p1_project_title': 'RESPUESTA AUTOMATIZADA (SOAR)', 'p1_desc': 'Arquitectura SOAR para reducir drásticamente el tiempo de mitigación.',
        'p1_arch_title': 'Arquitectura Técnica:', 'p1_list_1': '🔹 Ingesta Logs: Splunk Enterprise.', 'p1_list_2': '🔹 Análisis: Python scripts.', 'p1_list_3': '🔹 Respuesta: AWS WAF API.', 'p1_res_title': 'Resultado:', 'p1_res_desc': 'Reducción del 60% en detección.',
        
        'p2_title': 'BLUE TEAM & AI', 'p2_sub': 'OPTIMIZACIÓN INTELIGENTE', 'p2_badge': 'DEFENSA IA',
        'p2_project_title': 'MODELO PREDICTIVO (ML)', 'p2_desc': 'Modelo de aprendizaje no supervisado para detectar anomalías de red.',
        'p2_stack_title': 'Stack:', 'p2_list_1': '🔹 Framework: TensorFlow & Keras.', 'p2_list_2': '🔹 Algoritmo: Isolation Forest.', 'p2_list_3': '🔹 Entrenamiento: Dataset CIC-IDS2017.', 'p2_list_4': '🔹 Despliegue: Docker & Flask.', 'p2_res_title': 'Impacto:', 'p2_res_desc': 'Precisión del 92% en Zero-Day.',

        // CONTACT & MODAL
        'form_title': 'ENLACE DE COMUNICACIÓN', 'form_sub': 'ESTABLECER CONEXIÓN', 
        'label_name': 'ID USUARIO', 'label_email': 'EMAIL', 'label_msg': 'MENSAJE', 'btn_send': 'ENVIAR',
        'msg_success_title': 'ESTADO DEL SISTEMA', 'msg_success_body': 'Mensaje transmitido con éxito.\nGracias por contactarnos.',
        
        // PROJECTS
        'all_title': 'BASE DE DATOS', 'all_sub': 'Repositorio de 100 scripts.', 'filter_ph': 'Buscar protocolo...'
    },
    'en': {
        // NAV & FOOTER
        'nav_home': 'Home', 'nav_p1': 'Security', 'nav_p2': 'Systems', 'nav_all': 'Projects', 'nav_contact': 'Contact',
        'footer_text': 'CONTACT: anuard.coello.7e9@itb.cat', 'btn_back': 'Go Back',

        // HOME
        'home_title': 'SYSADMIN & CYBERSECURITY', 'home_subtitle': 'Securing critical infrastructure and optimizing performance.',
        'btn_p1': 'View Security', 'btn_p2': 'View Systems',

        // P1 & P2 DETAILS
        'p1_title': 'RED TEAM & INCIDENTS', 'p1_sub': 'ADVANCED SECURITY OPERATIONS', 'p1_badge': 'FEATURED PROJECT',
        'p1_project_title': 'AUTOMATED INCIDENT RESPONSE (SOAR)', 'p1_desc': 'SOAR architecture designed to drastically reduce mitigation time.',
        'p1_arch_title': 'Technical Architecture:', 'p1_list_1': '🔹 Log Ingestion: Splunk Enterprise.', 'p1_list_2': '🔹 Analysis: Python scripts.', 'p1_list_3': '🔹 Auto-Response: AWS WAF API.', 'p1_res_title': 'Result:', 'p1_res_desc': 'Reduced MTTD by 60%.',

        'p2_title': 'BLUE TEAM & AI', 'p2_sub': 'INTELLIGENT SYSTEMS OPTIMIZATION', 'p2_badge': 'AI DEFENSE',
        'p2_project_title': 'PREDICTIVE THREAT MODEL (ML)', 'p2_desc': 'Unsupervised learning model identifying network traffic anomalies.',
        'p2_stack_title': 'Tech Stack:', 'p2_list_1': '🔹 Framework: TensorFlow & Keras.', 'p2_list_2': '🔹 Algorithm: Isolation Forest.', 'p2_list_3': '🔹 Training: CIC-IDS2017 dataset.', 'p2_list_4': '🔹 Deployment: Docker & Flask.', 'p2_res_title': 'Impact:', 'p2_res_desc': '92% accuracy on Zero-Day.',

        // CONTACT & MODAL
        'form_title': 'COMMUNICATION LINK', 'form_sub': 'ESTABLISH CONNECTION', 
        'label_name': 'USER ID', 'label_email': 'SOURCE IP', 'label_msg': 'PAYLOAD', 'btn_send': 'SEND ME',
        'msg_success_title': 'SYSTEM STATUS', 'msg_success_body': 'Message Transmitted Successfully.\nThank you for contacting us.',

        // PROJECTS
        'all_title': 'DATABASE', 'all_sub': 'Repository of 100 scripts.', 'filter_ph': 'Search protocol...'
    }
};

let currentLang = localStorage.getItem('selectedLang') || 'en';
let projectsDB = [];
let currentProjects = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 9; 

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
            const searchInput = document.getElementById('search-input');
            if(searchInput && translations[currentLang]) searchInput.placeholder = translations[currentLang]['filter_ph'];
        });
    }

    // 2. FORMULARIO CONTACTO (MODAL)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const modal = document.getElementById('success-modal');
            if(modal) {
                modal.classList.add('active');
                contactForm.reset();
                const closeBtn = document.getElementById('close-modal');
                if(closeBtn) closeBtn.onclick = () => modal.classList.remove('active');
                modal.onclick = (ev) => { if(ev.target === modal) modal.classList.remove('active'); };
            }
        });
    }

    // 3. PROYECTOS (GENERADOR & PAGINACIÓN)
    if(document.getElementById('project-grid-container')) {
        generateProjects();
        currentProjects = projectsDB; 
        renderPaginatedProjects();
        setupFilters();
        const searchInput = document.getElementById('search-input');
        if(searchInput && translations[currentLang]) searchInput.placeholder = translations[currentLang]['filter_ph'];
    }
});

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[currentLang] && translations[currentLang][key]) {
            el.innerText = translations[currentLang][key]; // innerText respeta \n
        }
    });
}

// GENERADOR PROYECTOS
const techs = ['python', 'bash', 'powershell', 'go', 'rust', 'c++'];
const actions = ['Automated', 'Encrypted', 'Distributed', 'Cloud-Native', 'Stealth', 'Real-time'];
const nouns = ['Firewall', 'Packet Sniffer', 'Keylogger', 'VPN Tunnel', 'Load Balancer', 'SIEM Agent'];

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
            desc: `Optimized ${t} script for low-latency environment.`
        });
    }
}

function renderPaginatedProjects() {
    const container = document.getElementById('project-grid-container');
    const paginationContainer = document.getElementById('pagination-container');
    if(!container) return;
    container.innerHTML = ''; paginationContainer.innerHTML = '';
    
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedItems = currentProjects.slice(start, end);

    paginatedItems.forEach(p => {
        const div = document.createElement('div');
        div.className = 'mini-card';
        div.innerHTML = `
            <div class="card-header"><span class="card-id">${p.id}</span><span class="tech-badge">${p.tech.toUpperCase()}</span></div>
            <div><h3>${p.title}</h3><p>${p.desc}</p></div>`;
        container.appendChild(div);
    });

    const totalPages = Math.ceil(currentProjects.length / ITEMS_PER_PAGE);
    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                const btn = document.createElement('button');
                btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                btn.innerText = i;
                btn.addEventListener('click', () => {
                    currentPage = i; renderPaginatedProjects();
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
            currentProjects = projectsDB.filter(p => p.title.toLowerCase().includes(term) || p.tech.toLowerCase().includes(term) || p.id.toLowerCase().includes(term));
            currentPage = 1; renderPaginatedProjects();
        });
    }
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            if(document.getElementById('search-input')) document.getElementById('search-input').value = '';
            if(filter === 'all') currentProjects = projectsDB; else currentProjects = projectsDB.filter(p => p.tech === filter);
            currentPage = 1; renderPaginatedProjects();
        });
    });
}