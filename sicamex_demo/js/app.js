/* SICAMEX Demo - Main Application */
$(document).ready(function() {
    
    // Initialize the application
    DB.loadData(function(data) {
        console.log('Database loaded successfully');
        initDashboard();
        loadCedisSelect();
        renderVentasDiaChart();
        updateTotalVentas();
        populateTables();
    });
    
    // Initialize dashboard elements
    function initDashboard() {
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        $('#Fecha').val(dateStr);
        $('#VDD').text('Venta del Día ' + dateStr);
        
        // Set current user (simulated)
        $('#User').text('Juan Pérez');
    }
    
    // Load CEDIS into select dropdown
    function loadCedisSelect() {
        const cedis = DB.getCedisSelect();
        const $select = $('#edtidCedis');
        $select.empty();
        $select.append('<option value="0">Escoje el CEDIS</option>');
        
        cedis.forEach(cedi => {
            $select.append(`<option value="${cedi.id}">${cedi.nombre}</option>`);
        });
    }
    
    // Render sales chart using Morris.js style with Chart.js
    function renderVentasDiaChart() {
        const ventasData = DB.getVentasDia();
        
        if (ventasData.length === 0) {
            $('#hero-bar').html('<p class="text-center text-muted">No hay datos de ventas disponibles</p>');
            return;
        }
        
        const ctx = document.getElementById('salesChart').getContext('2d');
        
        // Destroy existing chart if any
        if (window.salesChartInstance) {
            window.salesChartInstance.destroy();
        }
        
        window.salesChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ventasData.map(v => v.Ruta),
                datasets: [{
                    label: 'Ventas Totales',
                    data: ventasData.map(v => v.Total),
                    backgroundColor: [
                        'rgba(98, 204, 100, 0.8)',
                        'rgba(232, 78, 64, 0.8)',
                        'rgba(232, 90, 200, 0.8)',
                        'rgba(63, 207, 187, 0.8)',
                        'rgba(98, 111, 112, 0.8)'
                    ],
                    borderColor: [
                        'rgb(98, 204, 100)',
                        'rgb(232, 78, 64)',
                        'rgb(232, 90, 200)',
                        'rgb(63, 207, 187)',
                        'rgb(98, 111, 112)'
                    ],
                    borderWidth: 2
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
                                return DB.formatCurrency(value);
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return DB.formatCurrency(context.raw);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Update total sales amount
    function updateTotalVentas() {
        const ventasData = DB.getVentasDia();
        const total = ventasData.reduce((sum, v) => sum + v.Total, 0);
        $('#TTL').text(DB.formatCurrency(total));
    }
    
    // Populate all tables
    function populateTables() {
        populateProductosTable();
        populateClientesTable();
        populateEntregasTable();
        populateDevolucionesTable();
        populateIndicadoresTable();
    }
    
    // Productos Table
    function populateProductosTable() {
        const productos = DB.getProductos();
        const tbody = $('#productosTableBody');
        tbody.empty();
        
        productos.forEach(prod => {
            const row = `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.nombre}</td>
                    <td>${prod.grupo}</td>
                    <td>${prod.marca}</td>
                    <td>${DB.formatCurrency(prod.precio)}</td>
                    <td>${prod.codigo}</td>
                    <td>${getCedisName(prod.idCedis)}</td>
                </tr>
            `;
            tbody.append(row);
        });
    }
    
    // Clientes Table
    function populateClientesTable() {
        const clientes = DB.getClientes();
        const tbody = $('#clientesTableBody');
        tbody.empty();
        
        clientes.forEach(cli => {
            const row = `
                <tr>
                    <td>${cli.id}</td>
                    <td>${cli.nombreTienda}</td>
                    <td>${cli.calle} #${cli.numeroExt}</td>
                    <td>${cli.colonia}</td>
                    <td>${cli.codigoPostal}</td>
                    <td>Ruta ${cli.idRuta}</td>
                    <td>Día ${cli.dia}</td>
                    <td><span class="badge bg-${cli.activo ? 'success' : 'danger'}">${cli.activo ? 'Activo' : 'Inactivo'}</span></td>
                </tr>
            `;
            tbody.append(row);
        });
    }
    
    // Entregas Table
    function populateEntregasTable() {
        const entregas = DB.getEntregas();
        const tbody = $('#entregasTableBody');
        tbody.empty();
        
        entregas.forEach(ent => {
            const statusClass = ent.estado === 'Entregado' ? 'success' : 'warning';
            const row = `
                <tr>
                    <td>${ent.id}</td>
                    <td>${DB.formatDate(ent.fecha)}</td>
                    <td>${ent.cliente}</td>
                    <td>${ent.ruta}</td>
                    <td>${DB.formatCurrency(ent.total)}</td>
                    <td><span class="badge bg-${statusClass}">${ent.estado}</span></td>
                </tr>
            `;
            tbody.append(row);
        });
    }
    
    // Devoluciones Table
    function populateDevolucionesTable() {
        const devoluciones = DB.getDevoluciones();
        const tbody = $('#devolucionesTableBody');
        tbody.empty();
        
        devoluciones.forEach(dev => {
            const row = `
                <tr>
                    <td>${dev.id}</td>
                    <td>${DB.formatDate(dev.fecha)}</td>
                    <td>${dev.cliente}</td>
                    <td>${dev.ruta}</td>
                    <td>${DB.formatCurrency(dev.total)}</td>
                    <td>${dev.causa}</td>
                </tr>
            `;
            tbody.append(row);
        });
    }
    
    // Indicadores Table
    function populateIndicadoresTable() {
        const indicadores = DB.getIndicadores();
        const tbody = $('#indicadoresTableBody');
        tbody.empty();
        
        indicadores.forEach(ind => {
            const row = `
                <tr>
                    <td>${ind.mes}</td>
                    <td>${ind.rutasProgramadas}</td>
                    <td>${ind.rutasCompletadas}</td>
                    <td>${ind.eficiencia}%</td>
                    <td>${DB.formatCurrency(ind.ventasTotales)}</td>
                    <td>${ind.clientesVisitados}</td>
                    <td>${ind.clientesCompraron}</td>
                </tr>
            `;
            tbody.append(row);
        });
    }
    
    // Helper function to get CEDIS name by ID
    function getCedisName(idCedis) {
        const cedis = DB.getCedis();
        const cedi = cedis.find(c => c.id === idCedis);
        return cedi ? cedi.nombre : 'N/A';
    }
    
    // Export functions for buttons
    $('#EXP_PROD').on('click', function() {
        exportToCSV(DB.getProductos(), 'Productos');
    });
    
    $('#EXP_CLTS').on('click', function() {
        exportToCSV(DB.getClientes(), 'Clientes');
    });
    
    $('#EXP_VENT').on('click', function() {
        exportToCSV(DB.getVentasDia(), 'Ventas');
    });
    
    $('#EXP_INDI').on('click', function() {
        exportToCSV(DB.getIndicadores(), 'Indicadores');
    });
    
    // CSV Export function
    function exportToCSV(data, filename) {
        if (!data || data.length === 0) {
            alert('No hay datos para exportar');
            return;
        }
        
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => 
                    `"${row[header] !== null && row[header] !== undefined ? row[header] : ''}"`
                ).join(',')
            )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Date picker change event
    $('#Fecha').on('change', function() {
        const selectedDate = $(this).val();
        $('#VDD').text('Venta del Día ' + selectedDate);
        // In a real app, this would fetch data for the selected date
        console.log('Date changed to:', selectedDate);
    });
    
    // CEDIS selection change
    $('#CAMBIA_CEDIS').on('click', function() {
        const selectedCedis = $('#edtidCedis').val();
        console.log('Selected CEDIS:', selectedCedis);
        // In a real app, this would filter data by selected CEDIS
    });
});
