class DataManager {
    constructor() {
        this.data = null;
        this.currentCedis = 'todos';
    }

    async loadData() {
        try {
            const response = await fetch('data/database.json');
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }

    setCedis(cedisId) {
        this.currentCedis = cedisId;
    }

    getCedis() {
        return this.currentCedis;
    }

    filterByCedis(items, cedisField = 'cedis') {
        if (this.currentCedis === 'todos') {
            return items;
        }
        return items.filter(item => item[cedisField] === this.currentCedis);
    }

    getIndicadores() {
        return this.data?.indicadores || {};
    }

    getProductos() {
        return this.data?.productos || [];
    }

    getClientes() {
        return this.data?.clientes || [];
    }

    getEntregas() {
        const entregas = this.data?.entregas || [];
        return this.filterByCedis(entregas);
    }

    getDevoluciones() {
        const devoluciones = this.data?.devoluciones || [];
        return this.filterByCedis(devoluciones);
    }

    getCedisList() {
        return this.data?.cedis || [];
    }

    getVentasPorRuta() {
        return this.data?.ventasPorRuta || [];
    }

    getClienteById(id) {
        return this.data?.clientes?.find(c => c.id === id) || {};
    }

    getCedisById(id) {
        return this.data?.cedis?.find(c => c.id === id) || {};
    }
}

const dataManager = new DataManager();

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function getStatusClass(estado) {
    const states = {
        'Entregado': 'status-success',
        'En tránsito': 'status-info',
        'Programado': 'status-warning',
        'Cancelado': 'status-danger',
        'Procesado': 'status-success',
        'En revisión': 'status-warning',
        'Pendiente': 'status-warning'
    };
    return states[estado] || 'status-info';
}

function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cols = row.querySelectorAll('th, td');
        const rowData = [];
        cols.forEach(col => {
            rowData.push('"' + col.textContent.trim().replace(/"/g, '""') + '"');
        });
        csv.push(rowData.join(','));
    });

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Modal functions
function openCedisModal() {
    const modal = document.getElementById('cedisModal');
    if (modal) {
        modal.classList.add('active');
        renderCedisList();
    }
}

function closeCedisModal() {
    const modal = document.getElementById('cedisModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function renderCedisList() {
    const container = document.getElementById('cedisListContainer');
    if (!container) return;

    const cedisList = dataManager.getCedisList();
    const currentCedis = dataManager.getCedis();

    container.innerHTML = `
        <div class="cedis-item ${currentCedis === 'todos' ? 'selected' : ''}" 
             onclick="selectCedis('todos')">
            <h4>Todos los CEDIS</h4>
            <p>Ver datos de todos los centros de distribución</p>
        </div>
        ${cedisList.map(cedis => `
            <div class="cedis-item ${currentCedis === cedis.id ? 'selected' : ''}" 
                 onclick="selectCedis('${cedis.id}')">
                <h4>${cedis.nombre}</h4>
                <p>${cedis.direccion}</p>
                <p>${cedis.telefono}</p>
            </div>
        `).join('')}
    `;
}

function selectCedis(cedisId) {
    dataManager.setCedis(cedisId);
    renderCedisList();
    
    // Update header display
    const cedisDisplay = document.getElementById('cedisDisplay');
    if (cedisDisplay) {
        const cedis = cedisId === 'todos' 
            ? { nombre: 'Todos los CEDIS' } 
            : dataManager.getCedisById(cedisId);
        cedisDisplay.textContent = cedis.nombre;
    }
    
    closeCedisModal();
    
    // Refresh current page data
    if (typeof refreshCurrentPage === 'function') {
        refreshCurrentPage();
    }
}

// Initialize navigation
function initNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop() || 
            (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', async () => {
    await dataManager.loadData();
    initNavigation();
    
    // Set initial CEDIS display
    const cedisDisplay = document.getElementById('cedisDisplay');
    if (cedisDisplay) {
        cedisDisplay.textContent = 'Todos los CEDIS';
    }
});
