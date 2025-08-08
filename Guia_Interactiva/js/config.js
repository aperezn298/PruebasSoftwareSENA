// Configuración de la aplicación
const CONFIG = {
    // Información general
    app: {
        name: 'Guía Interactiva de Pruebas de Software',
        version: '1.0.0',
        author: 'Tu Nombre',
        description: 'Una aplicación web moderna para aprender testing de software'
    },

    // Configuración de navegación
    navigation: {
        enableKeyboardShortcuts: true,
        enableHashRouting: true,
        smoothScrolling: true,
        animationDuration: 300
    },

    // Configuración de persistencia
    storage: {
        key: 'softwareTestingGuideProgress',
        autoSave: true,
        saveInterval: 5000, // ms
        enableSessionTracking: true
    },

    // Configuración de UI
    ui: {
        theme: 'auto', // 'light', 'dark', 'auto'
        showProgressBar: true,
        enableTooltips: true,
        enableAnimations: true,
        responsiveBreakpoints: {
            mobile: 576,
            tablet: 768,
            desktop: 992,
            large: 1200
        }
    },

    // Configuración de contenido
    content: {
        chapters: [
            {
                id: 'home',
                title: 'Inicio',
                icon: 'house-fill',
                description: 'Página principal de la guía'
            },
            {
                id: 'capitulo1',
                title: 'Conceptos Básicos',
                icon: '1-circle-fill',
                description: 'Fundamentos de las pruebas de software',
                estimatedTime: 15,
                keywords: ['conceptos', 'básicos', 'fundamentos', 'tipos', 'pruebas']
            },
            {
                id: 'capitulo2', 
                title: 'Pruebas Manuales',
                icon: '2-circle-fill',
                description: 'Técnicas y procesos de testing manual',
                estimatedTime: 20,
                keywords: ['manual', 'casos', 'documentación', 'proceso', 'herramientas']
            },
            {
                id: 'capitulo3',
                title: 'Pruebas Automáticas',
                icon: '3-circle-fill', 
                description: 'Automatización y frameworks de testing',
                estimatedTime: 25,
                keywords: ['automatización', 'frameworks', 'jest', 'cypress', 'selenium']
            }
        ],
        totalEstimatedTime: 60 // minutos
    },

    // Configuración de características
    features: {
        progressTracking: true,
        bookmarks: true,
        search: false, // Por implementar
        analytics: false,
        serviceWorker: true,
        offlineSupport: false,
        exportProgress: false,
        printSupport: true
    },

    // Configuración de accesibilidad
    accessibility: {
        enableKeyboardNavigation: true,
        enableScreenReaderSupport: true,
        enableHighContrast: false,
        enableReducedMotion: true,
        enableFocusIndicators: true
    },

    // URLs y recursos externos
    resources: {
        cdn: {
            bootstrap: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0',
            bootstrapIcons: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0',
            highlightJs: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0'
        },
        documentation: {
            github: 'https://github.com/tu-usuario/pruebas-software-guia',
            issues: 'https://github.com/tu-usuario/pruebas-software-guia/issues'
        }
    },

    // Mensajes y textos
    messages: {
        welcome: '¡Bienvenido a la Guía Interactiva de Pruebas de Software! 🎉',
        completion: '¡Felicitaciones! Has completado todos los capítulos.',
        error: 'Ha ocurrido un error. Por favor, recarga la página.',
        loading: 'Cargando contenido...',
        offline: 'Estás trabajando sin conexión.',
        continue: '¿Quieres continuar desde donde lo dejaste?'
    },

    // Configuración de desarrollo
    development: {
        debug: false,
        enableLogging: true,
        enablePerformanceMetrics: false,
        enableTestMode: false
    },

    // Métodos de utilidad
    utils: {
        // Obtener configuración por clave
        get(key) {
            const keys = key.split('.');
            let value = this;
            for (const k of keys) {
                if (k === 'utils') continue;
                value = value[k];
                if (value === undefined) return null;
            }
            return value;
        },

        // Establecer configuración
        set(key, newValue) {
            const keys = key.split('.');
            let obj = CONFIG;
            for (let i = 0; i < keys.length - 1; i++) {
                if (keys[i] === 'utils') continue;
                obj = obj[keys[i]];
            }
            obj[keys[keys.length - 1]] = newValue;
        },

        // Validar configuración
        validate() {
            const required = ['app.name', 'content.chapters', 'storage.key'];
            for (const req of required) {
                if (!this.get(req)) {
                    console.error(`Configuración requerida faltante: ${req}`);
                    return false;
                }
            }
            return true;
        }
    }
};

// Hacer la configuración disponible globalmente
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

// Para Node.js (si se usa en el futuro)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
