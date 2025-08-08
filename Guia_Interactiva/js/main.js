// ===== VARIABLES GLOBALES =====
let currentSection = 'home';
let completedChapters = new Set();
let readingProgress = 0;
let startTime = Date.now();

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadProgress();
    setupEventListeners();
    highlightCodeBlocks();
    updateProgress();
});

// ===== FUNCIONES DE INICIALIZACIÓN =====
function initializeApp() {
    console.log('🚀 Guía Interactiva de Pruebas de Software iniciada');
    
    // Mostrar sección inicial
    showSection('home');
    
    // Configurar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Configurar scroll spy para la navegación
    setupScrollSpy();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showWelcomeMessage();
    }, 1000);
}

function setupEventListeners() {
    // Navegación principal
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Tarjetas de capítulos
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', handleChapterCardClick);
    });
    
    // Scroll para mostrar/ocultar botón de subir
    window.addEventListener('scroll', handleScroll);
    
    // Navegación del teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Redimensionado de ventana
    window.addEventListener('resize', handleResize);
    
    // Detección de cambios en el hash de la URL
    window.addEventListener('hashchange', handleHashChange);
    
    // Click en enlaces externos
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Toggle del sidebar en móviles
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Cerrar sidebar al hacer click fuera
    document.addEventListener('click', handleOutsideClick);
}

// ===== NAVEGACIÓN =====
function handleNavigation(e) {
    e.preventDefault();
    const targetSection = e.target.closest('[data-section]').getAttribute('data-section');
    navigateToSection(targetSection);
}

function navigateToSection(sectionId) {
    if (sectionId === currentSection) return;
    
    // Animación de salida
    const currentElement = document.getElementById(currentSection);
    if (currentElement) {
        currentElement.style.opacity = '0';
        currentElement.style.transform = 'translateY(-20px)';
    }
    
    setTimeout(() => {
        showSection(sectionId);
        updateNavigation(sectionId);
        updateProgress();
        saveProgress();
        
        // Scroll al inicio de la sección
        scrollToTop();
        
        // Tracking de analytics (si se implementa)
        trackSectionView(sectionId);
    }, 200);
}

function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección objetivo
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
        currentSection = sectionId;
        
        // Actualizar título de la página
        updatePageTitle(sectionId);
        
        // Actualizar URL sin recargar la página
        updateURL(sectionId);
        
        // Resaltar código si es necesario
        setTimeout(() => {
            highlightCodeBlocks();
        }, 100);
    }
}

function updateNavigation(sectionId) {
    // Actualizar navbar
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Actualizar sidebar
    document.querySelectorAll('#chapterNavigation .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// ===== MANEJO DE EVENTOS =====
function handleChapterCardClick(e) {
    const targetSection = e.currentTarget.getAttribute('data-target');
    if (targetSection) {
        navigateToSection(targetSection);
        
        // Efecto de animación en la tarjeta
        e.currentTarget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.currentTarget.style.transform = '';
        }, 150);
    }
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const backToTopButton = document.getElementById('backToTop');
    
    // Mostrar/ocultar botón de subir
    if (scrollTop > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
    
    // Actualizar barra de progreso si estamos en un capítulo
    if (currentSection !== 'home') {
        updateScrollProgress();
    }
}

function handleKeyboardNavigation(e) {
    // Navegación con teclado
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                navigateToSection('capitulo1');
                break;
            case '2':
                e.preventDefault();
                navigateToSection('capitulo2');
                break;
            case '3':
                e.preventDefault();
                navigateToSection('capitulo3');
                break;
            case 'h':
                e.preventDefault();
                navigateToSection('home');
                break;
        }
    }
    
    // Escape para ir al inicio
    if (e.key === 'Escape') {
        navigateToSection('home');
    }
}

function handleResize() {
    // Ajustar layout en dispositivos móviles
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth < 992) {
        sidebar.classList.remove('show');
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}

function handleOutsideClick(e) {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (window.innerWidth < 992 && 
        sidebar.classList.contains('show') && 
        !sidebar.contains(e.target) && 
        !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('show');
    }
}

function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        navigateToSection(hash);
    }
}

// ===== PROGRESO Y PERSISTENCIA =====
function updateProgress() {
    const chapters = ['capitulo1', 'capitulo2', 'capitulo3'];
    let progress = 0;
    
    if (currentSection === 'home') {
        progress = 0;
    } else {
        const currentIndex = chapters.indexOf(currentSection);
        if (currentIndex !== -1) {
            progress = ((currentIndex + 1) / chapters.length) * 100;
            completedChapters.add(currentSection);
        }
    }
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
    }
    
    readingProgress = progress;
}

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar && docHeight > 0) {
        const baseProgress = readingProgress;
        const scrollProgress = (scrollPercent / 100) * (100 / 3); // Cada capítulo es 33.33%
        const totalProgress = Math.min(baseProgress + scrollProgress, 100);
        
        progressBar.style.width = totalProgress + '%';
    }
}

function saveProgress() {
    const progressData = {
        currentSection: currentSection,
        completedChapters: Array.from(completedChapters),
        readingProgress: readingProgress,
        timestamp: Date.now(),
        sessionTime: Date.now() - startTime
    };
    
    localStorage.setItem('softwareTestingGuideProgress', JSON.stringify(progressData));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('softwareTestingGuideProgress');
    if (savedProgress) {
        try {
            const progressData = JSON.parse(savedProgress);
            completedChapters = new Set(progressData.completedChapters || []);
            readingProgress = progressData.readingProgress || 0;
            
            // Mostrar mensaje de continuación si hay progreso previo
            if (progressData.currentSection && progressData.currentSection !== 'home') {
                showContinueMessage(progressData.currentSection);
            }
        } catch (e) {
            console.error('Error al cargar el progreso:', e);
        }
    }
}

function resetProgress() {
    localStorage.removeItem('softwareTestingGuideProgress');
    completedChapters.clear();
    readingProgress = 0;
    startTime = Date.now();
    navigateToSection('home');
    updateProgress();
    
    showNotification('Progreso reiniciado', 'success');
}

// ===== UTILIDADES =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function updatePageTitle(sectionId) {
    const titles = {
        'home': 'Guía Interactiva - Pruebas de Software',
        'capitulo1': 'Conceptos Básicos - Guía de Pruebas de Software',
        'capitulo2': 'Pruebas Manuales - Guía de Pruebas de Software',
        'capitulo3': 'Pruebas Automáticas - Guía de Pruebas de Software'
    };
    
    document.title = titles[sectionId] || 'Guía Interactiva - Pruebas de Software';
}

function updateURL(sectionId) {
    const newURL = sectionId === 'home' ? window.location.pathname : `${window.location.pathname}#${sectionId}`;
    window.history.replaceState(null, '', newURL);
}

function highlightCodeBlocks() {
    // Inicializar highlight.js para bloques de código
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
}

function setupScrollSpy() {
    // Implementar scroll spy para navegación automática
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId !== currentSection) {
                    updateNavigation(sectionId);
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
    });
    
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
}

// ===== MENSAJES Y NOTIFICACIONES =====
function showWelcomeMessage() {
    const isFirstVisit = !localStorage.getItem('softwareTestingGuideVisited');
    
    if (isFirstVisit) {
        showNotification('¡Bienvenido a la Guía Interactiva de Pruebas de Software! 🎉', 'info', 5000);
        localStorage.setItem('softwareTestingGuideVisited', 'true');
    }
}

function showContinueMessage(lastSection) {
    const sectionNames = {
        'capitulo1': 'Conceptos Básicos',
        'capitulo2': 'Pruebas Manuales',
        'capitulo3': 'Pruebas Automáticas'
    };
    
    const message = `¿Quieres continuar desde "${sectionNames[lastSection]}"?`;
    
    // Crear toast personalizado
    const toastHtml = `
        <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-bookmark-fill me-2"></i>${message}
                </div>
                <div class="me-2 m-auto">
                    <button type="button" class="btn btn-sm btn-outline-light me-1" onclick="navigateToSection('${lastSection}')">
                        Continuar
                    </button>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
            </div>
        </div>
    `;
    
    showCustomToast(toastHtml, 10000);
}

function showNotification(message, type = 'info', duration = 3000) {
    const iconMap = {
        'success': 'check-circle-fill',
        'error': 'exclamation-triangle-fill',
        'warning': 'exclamation-triangle-fill',
        'info': 'info-circle-fill'
    };
    
    const bgColorMap = {
        'success': 'bg-success',
        'error': 'bg-danger',
        'warning': 'bg-warning',
        'info': 'bg-info'
    };
    
    const toastHtml = `
        <div class="toast align-items-center text-white ${bgColorMap[type]} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-${iconMap[type]} me-2"></i>${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    showCustomToast(toastHtml, duration);
}

function showCustomToast(html, duration = 3000) {
    // Crear container para toasts si no existe
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Crear elemento toast
    const toastElement = document.createElement('div');
    toastElement.innerHTML = html;
    const toast = toastElement.firstElementChild;
    
    toastContainer.appendChild(toast);
    
    // Inicializar toast de Bootstrap
    const bsToast = new bootstrap.Toast(toast, {
        delay: duration
    });
    
    bsToast.show();
    
    // Limpiar después de ocultarse
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// ===== MODAL DE FINALIZACIÓN =====
function showCompletionModal() {
    const modal = new bootstrap.Modal(document.getElementById('completionModal'));
    modal.show();
    
    // Guardar logro de finalización
    localStorage.setItem('softwareTestingGuideCompleted', 'true');
    localStorage.setItem('softwareTestingGuideCompletionDate', new Date().toISOString());
    
    // Confetti animation (opcional)
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// ===== ANALYTICS Y TRACKING =====
function trackSectionView(sectionId) {
    // Placeholder para analytics
    const eventData = {
        event: 'section_view',
        section: sectionId,
        timestamp: new Date().toISOString(),
        sessionTime: Date.now() - startTime
    };
    
    console.log('📊 Tracking:', eventData);
    
    // Aquí se podría integrar con Google Analytics, Adobe Analytics, etc.
    // gtag('event', 'page_view', { page_title: sectionId, page_location: window.location.href });
}

function trackProgress() {
    const completionRate = (completedChapters.size / 3) * 100;
    
    const progressData = {
        event: 'progress_update',
        completion_rate: completionRate,
        chapters_completed: completedChapters.size,
        current_section: currentSection,
        session_time: Date.now() - startTime
    };
    
    console.log('📈 Progress:', progressData);
}

// ===== FUNCIONES DE BÚSQUEDA =====
function initializeSearch() {
    // Placeholder para funcionalidad de búsqueda
    const searchContent = {
        'home': 'guía interactiva pruebas software testing conceptos manuales automáticas',
        'capitulo1': 'conceptos básicos software testing tipos pruebas unitarias integración sistema',
        'capitulo2': 'pruebas manuales casos de prueba documentación evidencias bugs defectos',
        'capitulo3': 'pruebas automáticas automatización frameworks jest cypress selenium'
    };
    
    window.searchIndex = searchContent;
}

function performSearch(query) {
    if (!query || query.length < 2) return [];
    
    const results = [];
    const searchQuery = query.toLowerCase();
    
    Object.entries(window.searchIndex || {}).forEach(([section, content]) => {
        if (content.toLowerCase().includes(searchQuery)) {
            results.push({
                section: section,
                title: getSectionTitle(section),
                relevance: calculateRelevance(content, searchQuery)
            });
        }
    });
    
    return results.sort((a, b) => b.relevance - a.relevance);
}

function getSectionTitle(sectionId) {
    const titles = {
        'home': 'Página Principal',
        'capitulo1': 'Conceptos Básicos',
        'capitulo2': 'Pruebas Manuales',
        'capitulo3': 'Pruebas Automáticas'
    };
    return titles[sectionId] || sectionId;
}

function calculateRelevance(content, query) {
    const matches = (content.toLowerCase().match(new RegExp(query, 'g')) || []).length;
    return matches;
}

// ===== ACCESIBILIDAD =====
function enhanceAccessibility() {
    // Mejorar navegación por teclado
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Anuncios para lectores de pantalla
    const announceRegion = document.createElement('div');
    announceRegion.setAttribute('aria-live', 'polite');
    announceRegion.setAttribute('aria-atomic', 'true');
    announceRegion.className = 'sr-only';
    document.body.appendChild(announceRegion);
    
    window.announceToScreenReader = (message) => {
        announceRegion.textContent = message;
        setTimeout(() => {
            announceRegion.textContent = '';
        }, 1000);
    };
}

// ===== EXPORTAR FUNCIONES GLOBALES =====
window.navigateToSection = navigateToSection;
window.showCompletionModal = showCompletionModal;
window.resetProgress = resetProgress;
window.scrollToTop = scrollToTop;

// ===== INICIALIZACIÓN FINAL =====
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    enhanceAccessibility();
    
    // Manejar URL inicial
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        setTimeout(() => {
            navigateToSection(hash);
        }, 100);
    }
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// ===== SERVICE WORKER (OPCIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registrado con éxito:', registration.scope);
            })
            .catch(function(error) {
                console.log('SW registro falló:', error);
            });
    });
}
