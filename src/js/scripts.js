//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    
    // Removida la función que añadía elementos de animación de fútbol
    
    // Add fun tooltips to WhatsApp buttons
    initializeTooltips();
    
    // Initialize custom animations based on scroll position
    initScrollAnimations();
    
    // Initialize interactive team badges
    initializeTeamBadges();

    // Inicializar la simulación de WhatsApp
    initWhatsAppChat();
});

// Function that añadía balones ha sido eliminada

// Add tooltips to the WhatsApp buttons
function initializeTooltips() {
    const whatsappButtons = document.querySelectorAll('[onclick*="wa.me"]');
    
    const funMessages = [
        "Haz clic para comenzar tu experiencia Deep90",
        "Nuestro asistente te está esperando para ayudarte",
        "Análisis de fútbol a un solo clic de distancia",
        "¡Un paso más cerca de entender el fútbol como un profesional!"
    ];
    
    whatsappButtons.forEach((button, index) => {
        // Create a tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'whatsapp-tooltip';
        tooltip.textContent = funMessages[index % funMessages.length];
        
        // Add tooltip to button
        button.appendChild(tooltip);
        
        // Show tooltip on hover
        button.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });
        
        // Hide tooltip when not hovering
        button.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        });
    });
}

// Initialize scroll-based animations
function initScrollAnimations() {
    // Get all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .testimonial-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation class when element is visible
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '-50px'
    });
    
    // Observe each element
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize interactive team badges
function initializeTeamBadges() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        badge.addEventListener('click', function() {
            // Simulate selection by adding a checkmark
            const checkmark = document.createElement('i');
            checkmark.className = 'bi bi-check2';
            
            // Remove existing checkmarks
            badges.forEach(b => {
                b.classList.remove('selected-team');
                const existingCheck = b.querySelector('.bi-check2');
                if (existingCheck) {
                    b.removeChild(existingCheck);
                }
            });
            
            // Add checkmark to selected badge
            this.classList.add('selected-team');
            this.prepend(checkmark);
            
            // Show a success message
            showSuccessToast(`¡${this.textContent.trim()} seleccionado!`);
        });
    });
}

// Show a toast message
function showSuccessToast(message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white bg-primary border-0';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    // Create toast content
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="bi bi-check-circle-fill me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    // Add to container
    toastContainer.appendChild(toastEl);
    
    // Initialize and show toast
    const toast = new bootstrap.Toast(toastEl, {
        animation: true,
        autohide: true,
        delay: 3000
    });
    
    toast.show();
}

// Handle form submissions with fun football responses
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Show success message
            document.getElementById('submitSuccessMessage').classList.remove('d-none');
            
            // Scroll to success message
            document.getElementById('submitSuccessMessage').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('submitSuccessMessage').classList.add('d-none');
            }, 5000);
        });
    }
});

function initWhatsAppChat() {
    // Ocultar elementos que aparecerán con animación
    document.querySelectorAll('.typing-animation, .typing-animation-2, .typing-animation-3, .typing-animation-4, .typing-animation-5, .message-liga, .message-liga-respuesta, .message-partidos, .message-partido-seleccion, .message-opciones, .message-apuestas-seleccion, .message-apuestas-info, .message-pronostico-pregunta, .message-pronostico-final').forEach(el => {
        el.classList.add('d-none');
    });

    // Iniciar la secuencia de animación cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startChatAnimation();
                observer.disconnect(); // Solo necesitamos disparar la animación una vez
            }
        });
    }, { threshold: 0.3 });

    // Observar el contenedor del chat
    const whatsappContainer = document.querySelector('.whatsapp-container');
    if (whatsappContainer) {
        observer.observe(whatsappContainer);
    }
}

function startChatAnimation() {
    // Secuencia de animaciones

    // Paso 1: Mostrar el bot escribiendo
    setTimeout(() => {
        document.querySelector('.typing-animation').classList.remove('d-none');
        scrollChatToBottom();
    }, 1500);

    // Paso 2: Mostrar opciones de ligas
    setTimeout(() => {
        document.querySelector('.typing-animation').classList.add('d-none');
        document.querySelector('.message-liga').classList.remove('d-none');
        scrollChatToBottom();
    }, 3000);

    // Paso 3: Mostrar respuesta del usuario (selección de liga)
    setTimeout(() => {
        document.querySelector('.message-liga-respuesta').classList.remove('d-none');
        scrollChatToBottom();
    }, 4500);

    // Paso 4: Mostrar bot escribiendo de nuevo
    setTimeout(() => {
        document.querySelector('.typing-animation-2').classList.remove('d-none');
        scrollChatToBottom();
    }, 5500);

    // Paso 5: Mostrar partidos disponibles
    setTimeout(() => {
        document.querySelector('.typing-animation-2').classList.add('d-none');
        document.querySelector('.message-partidos').classList.remove('d-none');
        scrollChatToBottom();
    }, 7000);

    // Paso 6: Mostrar selección de partido por el usuario
    setTimeout(() => {
        document.querySelector('.message-partido-seleccion').classList.remove('d-none');
        scrollChatToBottom();
    }, 8500);

    // Paso 7: Mostrar bot escribiendo (opciones)
    setTimeout(() => {
        document.querySelector('.typing-animation-3').classList.remove('d-none');
        scrollChatToBottom();
    }, 9500);

    // Paso 8: Mostrar opciones de información
    setTimeout(() => {
        document.querySelector('.typing-animation-3').classList.add('d-none');
        document.querySelector('.message-opciones').classList.remove('d-none');
        scrollChatToBottom();
    }, 11000);

    // Paso 9: Mostrar selección de apuestas por el usuario
    setTimeout(() => {
        document.querySelector('.message-apuestas-seleccion').classList.remove('d-none');
        scrollChatToBottom();
    }, 12500);

    // Paso 10: Mostrar bot escribiendo (apuestas)
    setTimeout(() => {
        document.querySelector('.typing-animation-4').classList.remove('d-none');
        scrollChatToBottom();
    }, 13500);

    // Paso 11: Mostrar información de apuestas
    setTimeout(() => {
        document.querySelector('.typing-animation-4').classList.add('d-none');
        document.querySelector('.message-apuestas-info').classList.remove('d-none');
        scrollChatToBottom();
    }, 16000);

    // Paso 12: Mostrar pregunta de pronóstico final
    setTimeout(() => {
        document.querySelector('.message-pronostico-pregunta').classList.remove('d-none');
        scrollChatToBottom();
    }, 19000);

    // Paso 13: Mostrar bot escribiendo (pronóstico final)
    setTimeout(() => {
        document.querySelector('.typing-animation-5').classList.remove('d-none');
        scrollChatToBottom();
    }, 20000);

    // Paso 14: Mostrar pronóstico final
    setTimeout(() => {
        document.querySelector('.typing-animation-5').classList.add('d-none');
        document.querySelector('.message-pronostico-final').classList.remove('d-none');
        scrollChatToBottom();
    }, 22500);

    // Hacer que el botón de envío y el campo de texto parezcan interactivos
    const whatsappInput = document.querySelector('.whatsapp-input');
    const sendIcon = document.querySelector('.send-icon');

    if (whatsappInput && sendIcon) {
        whatsappInput.addEventListener('focus', () => {
            sendIcon.innerHTML = '<i class="bi-send"></i>';
        });

        whatsappInput.addEventListener('blur', () => {
            if (!whatsappInput.value) {
                sendIcon.innerHTML = '<i class="bi-mic"></i>';
            }
        });

        whatsappInput.addEventListener('input', () => {
            if (whatsappInput.value) {
                sendIcon.innerHTML = '<i class="bi-send"></i>';
            } else {
                sendIcon.innerHTML = '<i class="bi-mic"></i>';
            }
        });
    }

    // Hacer que los botones de opciones sean interactivos
    document.querySelectorAll('.league-badge, .option-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Desactivar todos los botones del mismo grupo
            const parent = this.parentElement;
            parent.querySelectorAll('.league-badge, .option-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Activar este botón
            this.classList.add('active');
        });
    });

    // Hacer que las tarjetas de partidos sean interactivas
    document.querySelectorAll('.match-card').forEach(card => {
        card.addEventListener('click', function() {
            // Resaltar la tarjeta seleccionada
            document.querySelectorAll('.match-card').forEach(c => {
                c.style.border = 'none';
            });
            this.style.border = '2px solid var(--bs-primary)';
        });
    });
}

// Función para desplazar el chat hacia abajo
function scrollChatToBottom() {
    const chatBody = document.querySelector('.whatsapp-body');
    if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}
