// Carrito de compras
let carrito = [];
let total = 0;

// Elementos del DOM
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
document.body.appendChild(modalOverlay);

// Crear modal del carrito
const carritoModal = document.createElement('div');
carritoModal.className = 'modal carrito-modal';
carritoModal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h3>Carrito de Compras</h3>
            <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <div id="carrito-items"></div>
            <div class="carrito-total">
                <strong>Total: L <span id="total-precio">0.00</span></strong>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-vaciar">Vaciar Carrito</button>
            <button class="btn-comprar">Proceder al Pago</button>
        </div>
    </div>
`;
modalOverlay.appendChild(carritoModal);

// Crear modales para categorías
const categorias = {
    'tazas': {
        titulo: 'Tazas y Más - Colección Completa',
        productos: [
            { id: 1, nombre: 'Set Tazas Artisan', precio: 499, imagen: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=500&q=80' },
            { id: 2, nombre: 'Vasos Minimal Glass', precio: 359, imagen: 'https://images.unsplash.com/photo-1529429617124-aeeff6c38c62?auto=format&fit=crop&w=500&q=80' },
            { id: 3, nombre: 'Tetera Nordic Glow', precio: 629, imagen: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=500&q=80' },
            { id: 4, nombre: 'Termo EcoTravel', precio: 549, imagen: 'https://images.unsplash.com/photo-1613470205328-5562b0d13dae?auto=format&fit=crop&w=500&q=80' },
            { id: 5, nombre: 'Tazas Café Premium', precio: 699, imagen: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80' },
            { id: 6, nombre: 'Set Copas Elegantes', precio: 899, imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    'linea-blanca': {
        titulo: 'Línea Blanca - Electrodomésticos',
        productos: [
            { id: 7, nombre: 'Refrigeradora SmartCool', precio: 24999, imagen: 'https://images.unsplash.com/photo-1523507496633-338bf2b8e9a5?auto=format&fit=crop&w=500&q=80' },
            { id: 8, nombre: 'Lavadora HydroSense', precio: 18450, imagen: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?auto=format&fit=crop&w=500&q=80' },
            { id: 9, nombre: 'Cocina InfinityHeat', precio: 14299, imagen: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80' },
            { id: 10, nombre: 'Aire Acondicionado ArcticPro', precio: 22999, imagen: 'https://images.unsplash.com/photo-1616628188511-1df56d2fd1d1?auto=format&fit=crop&w=500&q=80' }
        ]
    },
    'utensilios': {
        titulo: 'Utensilios del Hogar',
        productos: [
            { id: 11, nombre: 'Set Cuchillos MasterChef', precio: 1499, imagen: 'https://images.unsplash.com/photo-1581586905412-1e5ba4eb2c94?auto=format&fit=crop&w=500&q=80' },
            { id: 12, nombre: 'Battery Chef Copper', precio: 2850, imagen: 'https://images.unsplash.com/photo-1586253634023-666e9edfb5e5?auto=format&fit=crop&w=500&q=80' },
            { id: 13, nombre: 'Organizador Modular Flow', precio: 689, imagen: 'https://images.unsplash.com/photo-1506367722041-8d124c95cfb9?auto=format&fit=crop&w=500&q=80' },
            { id: 14, nombre: 'Set Contenedores FreshGlass', precio: 959, imagen: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=500&q=80' }
        ]
    }
};

// Función para crear modal de categoría
function crearModalCategoria(categoria, datos) {
    const modal = document.createElement('div');
    modal.className = 'modal categoria-modal';
    modal.id = `modal-${categoria}`;
    
    const productosHTML = datos.productos.map(producto => `
        <div class="producto-modal">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-info">
                <h4>${producto.nombre}</h4>
                <p class="precio">L ${producto.precio.toLocaleString()}.00</p>
                <button class="btn-agregar" onclick="consultarWhatsApp('${producto.nombre}', ${producto.precio})">
                    Consultar por WhatsApp
                </button>
            </div>
        </div>
    `).join('');
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${datos.titulo}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="productos-grid">
                    ${productosHTML}
                </div>
            </div>
        </div>
    `;
    
    modalOverlay.appendChild(modal);
}

// Crear todos los modales de categorías
Object.keys(categorias).forEach(categoria => {
    crearModalCategoria(categoria, categorias[categoria]);
});

// Función para consultar por WhatsApp
function consultarWhatsApp(nombre, precio) {
    const mensaje = `Hola! Me interesa el producto: ${nombre} - Precio: L ${precio.toLocaleString()}.00. ¿Podrían darme más información?`;
    const numeroWhatsApp = '50497716898';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const totalPrecio = document.getElementById('total-precio');
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        total = 0;
    } else {
        carritoItems.innerHTML = carrito.map(item => `
            <div class="carrito-item">
                <div class="item-info">
                    <h4>${item.nombre}</h4>
                    <p>L ${item.precio.toLocaleString()}.00 x ${item.cantidad}</p>
                </div>
                <div class="item-acciones">
                    <button onclick="eliminarDelCarrito(${item.id})" class="btn-eliminar">Eliminar</button>
                </div>
            </div>
        `).join('');
        
        total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    }
    
    totalPrecio.textContent = total.toLocaleString() + '.00';
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const contador = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    let badge = document.querySelector('.carrito-badge');
    
    if (!badge && contador > 0) {
        badge = document.createElement('span');
        badge.className = 'carrito-badge';
        document.querySelector('.taiwal-search').appendChild(badge);
    }
    
    if (badge) {
        badge.textContent = contador;
        badge.style.display = contador > 0 ? 'block' : 'none';
    }
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    mostrarNotificacion('Carrito vaciado');
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => document.body.removeChild(notificacion), 300);
    }, 2000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Solo interceptar enlaces con # (anclas), no archivos .html
    document.querySelectorAll('.sidebar nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const categoria = this.getAttribute('href').substring(1);
            if (categorias[categoria]) {
                abrirModal(`modal-${categoria}`);
            }
        });
    });
    
    // Abrir carrito
    document.querySelector('.taiwal-search').addEventListener('click', function() {
        abrirModal('carrito-modal');
    });
    
    // Cerrar modales
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay || e.target.classList.contains('close-modal')) {
            cerrarModal();
        }
    });
    
    // Botones del carrito
    document.querySelector('.btn-vaciar').addEventListener('click', vaciarCarrito);
    document.querySelector('.btn-comprar').addEventListener('click', function() {
        if (carrito.length > 0) {
            alert(`Procesando compra por L ${total.toLocaleString()}.00`);
            vaciarCarrito();
            cerrarModal();
        } else {
            alert('Tu carrito está vacío');
        }
    });
    
    // Consultar por WhatsApp desde la página principal
    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const nombre = card.querySelector('h3').textContent;
            const precio = parseFloat(card.querySelector('.price').textContent.replace('L ', '').replace(',', ''));
            
            consultarWhatsApp(nombre, precio);
        });
    });
});

function abrirModal(modalId) {
    modalOverlay.style.display = 'flex';
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para mostrar/ocultar características
function toggleCaracteristicas(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    
    content.classList.toggle('show');
    arrow.classList.toggle('rotated');
}