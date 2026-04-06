// SICAMEX Clone - Aplicación Principal
let db = {};
let selectedCedis = null;

// Cargar datos desde JSON
async function loadDatabase() {
    try {
        const response = await fetch('data/database.json');
        db = await response.json();
        console.log('Base de datos cargada:', db);
        return true;
    } catch (error) {
        console.error('Error al cargar la base de datos:', error);
        return false;
    }
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', async () => {
    await loadDatabase();
    initializeApp();
});

function initializeApp() {
    // Actualizar navegación activa
    updateActiveNav();
    
    // Cargar página específica según el archivo actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        loadDashboard();
    } else if (currentPage === 'productos.html') {
        loadProductos();
    } else if (currentPage === 'clientes.html') {
        loadClientes();
    } else if (currentPage === 'entregas.html') {
        loadEntregas();
    } else if (currentPage === 'devoluciones.html') {
        loadDevoluciones();
    } else if (currentPage === 'indicadores.html') {
        loadIndicadores();
    }
    
    // Configurar modal de CEDIS
    setupCedisModal();
}

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Dashboard
function loadDashboard() {
    renderKPIs();
    renderVentasPorRutaChart();
    renderUltimasEntregas();
}

function renderKPIs() {
    const kpiContainer = document.getElementById('kpi-container');
    if (!kpiContainer) return;
    
    const indicadores = db.indicadores.slice(0, 4);
    kpiContainer.innerHTML = indicadores.map(kpi => `
        <div class="kpi-card">
            <h3>${kpi.Concepto}</h3>
            <div class="value">${formatValue(kpi.Valor)}</div>
            <div class="meta">Meta: ${formatValue(kpi.Meta)}</div>
            <div class="percentage ${kpi.Porcentaje >= 0 ? 'positive' : 'negative'}">
                ${kpi.Porcentaje >= 0 ? '▲' : '▼'} ${Math.abs(kpi.Porcentaje).toFixed(2)}%
            </div>
        </div>
    `).join('');
}

function formatValue(value) {
    if (typeof value === 'number') {
        if (value >= 1000) {
            return '$' + value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return value.toString();
    }
    return value;
}

function renderVentasPorRutaChart() {
    const ctx = document.getElementById('ventasChart');
    if (!ctx) return;
    
    // Agrupar ventas por ruta
    const ventasPorRuta = {};
    db.entregasProducto.forEach(entrega => {
        const visita = db.visitasCliente.find(v => v.id === entrega.idVisitaCliente);
        if (visita) {
            const ruta = db.rutas.find(r => r.id === visita.idRuta);
            if (ruta) {
                if (!ventasPorRuta[ruta.Nombre]) {
                    ventasPorRuta[ruta.Nombre] = 0;
                }
                ventasPorRuta[ruta.Nombre] += entrega.Total;
            }
        }
    });
    
    const labels = Object.keys(ventasPorRuta);
    const data = Object.values(ventasPorRuta);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ventas por Ruta ($)',
                data: data,
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(230, 126, 34, 0.8)',
                    'rgba(231, 76, 60, 0.8)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Ventas Totales por Ruta'
                }
            }
        }
    });
}

function renderUltimasEntregas() {
    const tableBody = document.getElementById('ultimas-entregas-body');
    if (!tableBody) return;
    
    const ultimasEntregas = db.entregasProducto.slice(0, 5);
    tableBody.innerHTML = ultimasEntregas.map(entrega => `
        <tr>
            <td>${entrega.Producto}</td>
            <td>${entrega.NombreTienda}</td>
            <td>${entrega.Cantidad} pz</td>
            <td>$${entrega.Total.toFixed(2)}</td>
            <td><span class="badge badge-success">Completada</span></td>
        </tr>
    `).join('');
}

// Productos
function loadProductos() {
    renderProductosTable();
}

function renderProductosTable() {
    const tableBody = document.getElementById('productos-body');
    if (!tableBody) return;
    
    let productos = db.productos;
    
    // Filtrar por CEDIS seleccionado
    if (selectedCedis) {
        // En una implementación real, los productos estarían asociados a CEDIS
    }
    
    tableBody.innerHTML = productos.map(prod => `
        <tr>
            <td>${prod.Codigo}</td>
            <td>${prod.Nombre}</td>
            <td>${prod.Marca}</td>
            <td>${prod.Grupo}</td>
            <td>$${prod.Precio.toFixed(2)}</td>
            <td>${prod.Cargas}</td>
            <td>${prod.Ventas}</td>
            <td>${prod.Inventario}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="alert('Editar producto: ${prod.Nombre}')">Editar</button>
            </td>
        </tr>
    `).join('');
}

// Clientes
function loadClientes() {
    renderClientesTable();
}

function renderClientesTable() {
    const tableBody = document.getElementById('clientes-body');
    if (!tableBody) return;
    
    let clientes = db.clientes;
    
    // Filtrar por CEDIS seleccionado
    if (selectedCedis) {
        clientes = clientes.filter(c => c.idCedis === selectedCedis);
    }
    
    tableBody.innerHTML = clientes.map(cliente => `
        <tr>
            <td>${cliente.NombreTienda}</td>
            <td>${cliente.Nombre} ${cliente.ApellidoP}</td>
            <td>${cliente.Celular}</td>
            <td>${cliente.Correo}</td>
            <td>${cliente.Cedis}</td>
            <td>
                <span class="badge ${cliente.Activo ? 'badge-success' : 'badge-danger'}">
                    ${cliente.Activo ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="alert('Ver cliente: ${cliente.NombreTienda}')">Ver</button>
            </td>
        </tr>
    `).join('');
}

// Entregas
function loadEntregas() {
    renderEntregasTable();
}

function renderEntregasTable() {
    const tableBody = document.getElementById('entregas-body');
    if (!tableBody) return;
    
    let entregas = db.entregasProducto;
    
    // Filtrar por CEDIS seleccionado
    if (selectedCedis) {
        const visitasCedis = db.visitasCliente
            .filter(v => {
                const cliente = db.clientes.find(c => c.id === v.idCliente);
                return cliente && cliente.idCedis === selectedCedis;
            })
            .map(v => v.id);
        
        entregas = entregas.filter(e => visitasCedis.includes(e.idVisitaCliente));
    }
    
    tableBody.innerHTML = entregas.map(entrega => `
        <tr>
            <td>${entrega.Producto}</td>
            <td>${entrega.NombreTienda}</td>
            <td>${entrega.Cantidad} pz</td>
            <td>$${entrega.Total.toFixed(2)}</td>
            <td>${entrega.idUsuario}</td>
            <td><span class="badge badge-success">Completada</span></td>
        </tr>
    `).join('');
}

// Devoluciones
function loadDevoluciones() {
    renderDevolucionesTable();
}

function renderDevolucionesTable() {
    const tableBody = document.getElementById('devoluciones-body');
    if (!tableBody) return;
    
    const tableBodyFull = document.getElementById('devoluciones-full-body');
    
    if (tableBody) {
        tableBody.innerHTML = db.devoluciones.map(dev => `
            <tr>
                <td>${dev.Producto}</td>
                <td>${dev.NombreTienda}</td>
                <td>${dev.Cantidad} pz</td>
                <td>$${dev.Total.toFixed(2)}</td>
                <td>${getCausaName(dev.idCausaDevolucion)}</td>
                <td>
                    <span class="badge ${dev.nAutorizacion ? 'badge-success' : 'badge-warning'}">
                        ${dev.nAutorizacion ? 'Autorizada' : 'Pendiente'}
                    </span>
                </td>
            </tr>
        `).join('');
    }
}

function getCausaName(id) {
    const causa = db.causaDevolucion.find(c => c.id === id);
    return causa ? causa.Nombre : 'Desconocida';
}

// Indicadores
function loadIndicadores() {
    renderIndicadoresTable();
}

function renderIndicadoresTable() {
    const tableBody = document.getElementById('indicadores-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = db.indicadores.map(ind => `
        <tr>
            <td>${ind.Concepto}</td>
            <td>${formatValue(ind.Valor)}</td>
            <td>${formatValue(ind.Meta)}</td>
            <td>
                <div class="percentage ${ind.Porcentaje >= 0 ? 'positive' : 'negative'}">
                    ${ind.Porcentaje >= 0 ? '▲' : '▼'} ${Math.abs(ind.Porcentaje).toFixed(2)}%
                </div>
            </td>
        </tr>
    `).join('');
}

// Modal CEDIS
function setupCedisModal() {
    const modal = document.getElementById('cedisModal');
    const openBtn = document.getElementById('openCedisModal');
    const closeBtn = document.querySelector('.close-btn');
    
    if (!modal || !openBtn) return;
    
    openBtn.addEventListener('click', () => {
        renderCedisOptions();
        modal.classList.add('active');
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function renderCedisOptions() {
    const container = document.getElementById('cedis-options');
    if (!container) return;
    
    container.innerHTML = db.cedis.map(cedis => `
        <div class="form-group">
            <label style="cursor: pointer; padding: 10px; border: 1px solid #ddd; border-radius: 4px; display: block;">
                <input type="radio" name="cedis" value="${cedis.id}" ${selectedCedis === cedis.id ? 'checked' : ''} onchange="selectCedis(${cedis.id})">
                <strong>${cedis.Nombre}</strong><br>
                <small>${cedis.Domicilio}</small>
            </label>
        </div>
    `).join('');
}

function selectCedis(id) {
    selectedCedis = id;
    const cedis = db.cedis.find(c => c.id === id);
    
    // Actualizar botón
    const btn = document.getElementById('openCedisModal');
    if (btn && cedis) {
        btn.textContent = `CEDIS: ${cedis.Nombre}`;
    }
    
    // Cerrar modal
    document.getElementById('cedisModal').classList.remove('active');
    
    // Recargar página actual para aplicar filtros
    setTimeout(() => {
        initializeApp();
    }, 100);
}

// Exportar a CSV
function exportToCSV(tableId, filename) {
    const table = document.querySelector(`#${tableId} table`);
    if (!table) return;
    
    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('th, td');
        const rowData = [];
        cols.forEach(col => {
            rowData.push('"' + col.innerText.replace(/"/g, '""') + '"');
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
