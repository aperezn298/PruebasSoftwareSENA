# 📚 Guía Interactiva de Pruebas de Software

Una aplicación web moderna e interactiva para aprender sobre pruebas de software, desarrollada con **HTML5**, **Bootstrap 5** y **JavaScript vanilla**.

## 🌟 Características

### ✨ Funcionalidades Principales
- **Navegación fluida** entre capítulos con animaciones suaves
- **Diseño responsive** que se adapta a todos los dispositivos
- **Progreso persistente** que se guarda automáticamente en localStorage
- **Sintaxis highlighting** para ejemplos de código
- **Navegación por teclado** para mejor accesibilidad
- **Modo oscuro** automático según preferencias del sistema

### 📖 Contenido Educativo
1. **Capítulo 1: Conceptos Básicos** (Completamente Ampliado)
   - **Introducción a las pruebas de software:** Conceptos fundamentales, objetivos y importancia
   - **Clasificación de pruebas:** Estáticas vs dinámicas, funcionales vs no funcionales
   - **Importancia en el ciclo de vida:** Integración en todas las fases de desarrollo
   - **Errores, defectos y fallas:** Diferencias conceptuales e impacto en la calidad
   - **Costos de detección tardía:** Análisis económico de la detección temprana
   - **Niveles de prueba:** Unitarias, integración, sistema y aceptación (detallado)
   - **Estrategias de prueba:** Caja negra, caja blanca y caja gris con técnicas específicas
   - **🎯 Principios fundamentales:** Los 7 principios ISTQB con ejemplos prácticos
   - **📊 Técnicas de diseño:** Partición de equivalencia, valores límite, tablas de decisión, transición de estados
   - **🔄 Proceso STLC:** Ciclo completo desde análisis hasta cierre con timeline visual
   - **👥 Roles y responsabilidades:** Test Manager, Analyst, Engineer, Developer in Test
   - **🐛 Gestión de defectos:** Ciclo de vida, severity vs priority, estados y transiciones
   - **📈 Métricas de testing:** Defectos, cobertura, progreso y ROI
   - **🛠️ Herramientas:** Gestión, automatización, rendimiento con categorías específicas
   - **⚠️ Gestión de riesgos:** RBT, riesgos del producto vs proyecto, matrices de riesgo

2. **Capítulo 2: Pruebas Manuales**
   - Proceso de pruebas manuales
   - Diseño de casos de prueba
   - Herramientas y técnicas
   - Documentación y reporte de bugs

3. **Capítulo 3: Pruebas Automáticas**
   - Introducción a la automatización
   - Pirámide de pruebas
   - Frameworks populares (Jest, Cypress, Selenium)
   - Mejores prácticas y ejemplos de código

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para evitar restricciones CORS)

### Instalación
1. **Clonar o descargar** el proyecto:
   ```bash
   git clone <repository-url>
   cd PruebasSoftware
   ```

2. **Abrir directamente** el archivo `index.html` en tu navegador, o

3. **Usar un servidor local** (recomendado):
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   
   # Con PHP
   php -S localhost:8000
   ```

4. **Acceder** a `http://localhost:8000` en tu navegador

## 📁 Estructura del Proyecto

```
PruebasSoftware/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos personalizados
├── js/
│   └── main.js            # Lógica de la aplicación
├── images/                 # Imágenes (si las hay)
└── README.md              # Documentación
```

## 🎨 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con variables CSS y flexbox/grid
- **JavaScript ES6+** - Lógica de aplicación sin frameworks
- **Bootstrap 5.3** - Framework CSS para diseño responsive
- **Bootstrap Icons** - Iconografía consistente

### Librerías Externas
- **Highlight.js** - Resaltado de sintaxis para código
- **Bootstrap JavaScript** - Componentes interactivos

## ⚙️ Funcionalidades Técnicas

### 🔄 Navegación
- Sistema de routing basado en hash URL
- Navegación por teclado (Ctrl+1, Ctrl+2, Ctrl+3, Ctrl+H)
- Breadcrumbs y indicadores de progreso
- Scroll suave y animaciones de transición

### 💾 Persistencia
- Progreso guardado en `localStorage`
- Recuperación automática de la última sección visitada
- Historial de capítulos completados
- Tiempo de sesión tracking

### 📱 Responsive Design
- **Mobile First** approach
- Breakpoints optimizados para tablets y desktop
- Sidebar colapsable en dispositivos móviles
- Componentes adaptativos (pirámide de pruebas, timeline)

### ♿ Accesibilidad
- Navegación por teclado completa
- Etiquetas ARIA apropiadas
- Contraste de colores optimizado
- Soporte para lectores de pantalla
- Respeto por `prefers-reduced-motion`

## 🎯 Características Avanzadas

### 📊 Analytics y Tracking
```javascript
// Tracking de progreso del usuario
function trackSectionView(sectionId) {
    const eventData = {
        event: 'section_view',
        section: sectionId,
        timestamp: new Date().toISOString(),
        sessionTime: Date.now() - startTime
    };
    // Integración con Google Analytics, etc.
}
```

### 🔍 Búsqueda (Preparado)
- Índice de contenido preparado para implementar búsqueda
- Funciones de relevancia y ranking
- Base para autocompletado

### 🎉 Gamificación
- Sistema de progreso visual
- Modal de finalización con celebración
- Persistencia de logros
- Badges de capítulos completados

## 🛠️ Personalización

### Colores y Temas
Modifica las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    --success-color: #198754;
    /* ... más variables ... */
}
```

### Contenido
- Edita el HTML para agregar más capítulos
- Modifica el contenido educativo en cada sección
- Agrega nuevos componentes interactivos

### Funcionalidades
- Extiende `main.js` para nuevas características
- Integra con APIs externas
- Agrega más animaciones y efectos

## 📈 Optimización de Rendimiento

### Técnicas Implementadas
- **Lazy loading** de recursos no críticos
- **CSS minificación** lista para producción
- **Debouncing** en eventos de scroll
- **IntersectionObserver** para mejor rendimiento
- **requestAnimationFrame** para animaciones suaves

### Métricas Web Vitales
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 🧪 Testing y Calidad

### Validación
- HTML5 válido según W3C
- CSS3 compatible con navegadores modernos
- JavaScript sin errores en consola
- Accesibilidad AA según WCAG 2.1

### Compatibilidad
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## 🚀 Deployment

### Hosting Estático
La aplicación es completamente estática y puede desplegarse en:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS S3 + CloudFront**
- **Firebase Hosting**

### Configuración de Servidor
```apache
# .htaccess para Apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L,QSA]
```

## 📞 Soporte y Contribución

### Reportar Issues
- Usar el sistema de issues del repositorio
- Incluir navegador, versión y pasos para reproducir
- Screenshots si es necesario

### Contribuir
1. Fork del proyecto
2. Crear branch para la feature (`git checkout -b feature/nueva-feature`)
3. Commit de cambios (`git commit -am 'Agregar nueva feature'`)
4. Push al branch (`git push origin feature/nueva-feature`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver el archivo `LICENSE` para más detalles.

## 🙏 Créditos

### Recursos Utilizados
- **Bootstrap** - Framework CSS
- **Bootstrap Icons** - Iconografía
- **Highlight.js** - Resaltado de sintaxis
- **Google Fonts** - Tipografías (si se usan)

### Inspiración
- Metodologías modernas de testing
- Mejores prácticas de UX/UI
- Principios de diseño educativo

---

**Desarrollado con ❤️ para la comunidad de testing de software**