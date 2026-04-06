/* SICAMEX Demo - Data Manager */
var DB = (function() {
    var data = null;
    
    function loadData(callback) {
        fetch('data/database.json')
            .then(response => response.json())
            .then(json => {
                data = json;
                if (callback) callback(data);
            })
            .catch(error => {
                console.error('Error loading database:', error);
                // Fallback data if JSON fails to load
                data = getFallbackData();
                if (callback) callback(data);
            });
    }
    
    function getFallbackData() {
        return {
            cedis: [],
            usuarios: [],
            rutas: [],
            clientes: [],
            productos: [],
            ventasDia: [],
            entregas: [],
            devoluciones: [],
            indicadores: []
        };
    }
    
    function getCedis() { return data ? data.cedis : []; }
    function getUsuarios() { return data ? data.usuarios : []; }
    function getRutas() { return data ? data.rutas : []; }
    function getClientes() { return data ? data.clientes : []; }
    function getProductos() { return data ? data.productos : []; }
    function getVentasDia() { return data ? data.ventasDia : []; }
    function getEntregas() { return data ? data.entregas : []; }
    function getDevoluciones() { return data ? data.devoluciones : []; }
    function getIndicadores() { return data ? data.indicadores : []; }
    
    function getCedisSelect() {
        return data ? data.cedis.map(c => ({id: c.id, nombre: c.nombre})) : [];
    }
    
    function getRutaById(id) {
        if (!data) return null;
        return data.rutas.find(r => r.id === id);
    }
    
    function getClienteById(id) {
        if (!data) return null;
        return data.clientes.find(c => c.id === id);
    }
    
    function getProductosByCedis(idCedis) {
        if (!data) return [];
        return data.productos.filter(p => p.idCedis === idCedis);
    }
    
    function getClientesByRuta(idRuta) {
        if (!data) return [];
        return data.clientes.filter(c => c.idRuta === idRuta);
    }
    
    function formatCurrency(amount) {
        return '$' + parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }
    
    return {
        loadData: loadData,
        getCedis: getCedis,
        getUsuarios: getUsuarios,
        getRutas: getRutas,
        getClientes: getClientes,
        getProductos: getProductos,
        getVentasDia: getVentasDia,
        getEntregas: getEntregas,
        getDevoluciones: getDevoluciones,
        getIndicadores: getIndicadores,
        getCedisSelect: getCedisSelect,
        getRutaById: getRutaById,
        getClienteById: getClienteById,
        getProductosByCedis: getProductosByCedis,
        getClientesByRuta: getClientesByRuta,
        formatCurrency: formatCurrency,
        formatDate: formatDate
    };
})();
