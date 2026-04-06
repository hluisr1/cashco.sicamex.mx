# Documentación Técnica: Sistema SICAMEX
## Análisis de Arquitectura, Reglas de Negocio y Roadmap de Evolución

**Versión:** 1.0  
**Fecha:** Octubre 2023  
**Estado:** Análisis de Prototipo (Frontend-only con datos mockeados)

---

## 1. Visión General del Sistema

SICAMEX es una plataforma de gestión logística y comercial diseñada para el monitoreo de operaciones en Centros de Distribución (CEDIS). Su objetivo principal es proporcionar visibilidad en tiempo real sobre el flujo de productos, desde el inventario hasta la entrega al cliente final, incluyendo la gestión de devoluciones y el análisis de indicadores clave de desempeño (KPIs).

Actualmente, el sistema opera como una **Single Page Application (SPA) simulada** utilizando HTML, CSS y JavaScript vainilla, consumiendo datos estáticos desde un archivo JSON local.

---

## 2. Módulos Funcionales

El sistema se compone de 5 módulos principales interconectados:

### 2.1. Dashboard (Tablero de Control)
*   **Función:** Vista agregada de la operación.
*   **Componentes:**
    *   Gráfica de ventas/distribución por Ruta.
    *   Tarjetas de resumen (Total Entregas, Total Devoluciones, Eficiencia Global).
    *   Selector de CEDIS (filtro global).
*   **Dependencias:** Consume datos de los módulos de Entregas y Devoluciones.

### 2.2. Gestión de Productos (Catálogo)
*   **Función:** Maestra de artículos disponibles para distribución.
*   **Datos Clave:** SKU, Nombre, Categoría, Unidad de Medida, Precio Unitario, Stock Actual por CEDIS.
*   **Regla Crítica:** El stock no puede ser negativo.

### 2.3. Gestión de Clientes (CRM Básico)
*   **Función:** Registro de puntos de venta o destinatarios finales.
*   **Datos Clave:** ID Cliente, Razón Social, Región, Ruta Asignada, Contacto, Límite de Crédito.
*   **Relación:** Un cliente pertenece a una ruta específica y puede tener múltiples entregas.

### 2.4. Operaciones Logísticas
#### A. Entregas
*   **Función:** Registro de salidas de mercancía exitosas.
*   **Flujo:** Selección de Cliente -> Selección de Productos -> Confirmación de Salida.
*   **Impacto:** Disminuye el inventario, aumenta las ventas del ruta.

#### B. Devoluciones
*   **Función:** Registro de mercancía retornada (dañada, no vendida, error de pedido).
*   **Flujo:** Vinculación a una Entrega original (o creación directa) -> Motivo -> Reingreso a inventario (o baja).
*   **Impacto:** Aumenta inventario (si es reusable), disminuye venta neta, afecta KPI de eficiencia.

### 2.5. Indicadores (KPIs)
*   **Función:** Cálculo de métricas de rendimiento.
*   **Métricas Actuales:**
    *   Tasa de Devolución (%).
    *   Eficiencia de Entrega (%).
    *   Ventas Netas vs. Brutas.
    *   Rotación de Inventario (simulada).

---

## 3. Reglas de Negocio Identificadas

Basado en el análisis del código y la estructura de datos `database.json`:

| ID | Regla de Negocio | Descripción Técnica | Prioridad |
|----|------------------|---------------------|-----------|
| RN-01 | **Integridad de Stock** | Ninguna entrega puede superar el stock disponible del producto en el CEDIS seleccionado. | Alta |
| RN-02 | **Jerarquía Geográfica** | Los clientes están asignados a Rutas, y las Rutas pertenecen a un CEDIS específico. No hay cruces entre CEDIS. | Media |
| RN-03 | **Cálculo de Venta Neta** | `Venta Neta = Total Entregas - Total Devoluciones (Valor Monetario)`. | Alta |
| RN-04 | **Motivos de Devolución** | Las devoluciones deben categorizarse (Daño, Caducidad, Error, No Vendido) para reportes correctos. | Media |
| RN-05 | **Unicidad de SKU** | El código SKU debe ser único globalmente para evitar duplicidad en el catálogo. | Alta |
| RN-06 | **Estados de Operación** | Una entrega pasa de "Pendiente" a "Completada". Solo las completadas afectan inventario. | Media |
| RN-07 | **Filtro Global CEDIS** | Todas las vistas (tablas y gráficas) deben respetar estrictamente el CEDIS seleccionado en el modal inicial. | Alta |

---

## 4. Modelo de Datos Actual (JSON)

La estructura actual es plana y desnormalizada, optimizada para lectura rápida en frontend pero pobre para integridad referencial.

```json
{
  "cedis": [ { "id": 1, "nombre": "CEDIS Norte", "ubicacion": "..." } ],
  "productos": [ { "sku": "P001", "nombre": "...", "precio": 100, "stock_cedis_1": 500 } ],
  "clientes": [ { "id": 101, "ruta": "R-01", "cedis_id": 1 } ],
  "entregas": [ { "id": 5001, "cliente_id": 101, "productos": [...], "total": 1000, "fecha": "..." } ],
  "devoluciones": [ { "id": 6001, "entrega_ref": 5001, "motivo": "Daño", "valor": 200 } ]
}
```

**Problemas Detectados:**
1.  **Stock Hardcodeado por Columna:** El stock está implícito o separado por cedis en lugar de ser una tabla relacional `Stock(producto_id, cedis_id, cantidad)`.
2.  **Referencias Débiles:** Las devoluciones referencian entregas por ID, pero no hay validación de existencia en el lado del cliente (JS).
3.  **Tipado Dinámico:** Riesgo de errores si un campo numérico llega como string.

---

## 5. Auditoría de Código y Arquitectura (As-Is)

### Fortalezas
*   **Portabilidad:** Cero dependencias de instalación (Node/npm). Corre en cualquier navegador.
*   **Velocidad de Desarrollo:** Prototipado extremadamente rápido para validación de conceptos.
*   **Claridad Visual:** Uso efectivo de Chart.js y CSS moderno para la presentación.

### Debilidades y Riesgos
*   **Acoplamiento Lógico-Vista:** La lógica de negocio (cálculos, filtros) está mezclada con la manipulación del DOM en `app.js`.
*   **Seguridad Nula:** Al ser todo en el cliente, cualquier usuario puede modificar el JSON o las variables en consola para alterar resultados.
*   **Escalabilidad:** Cargar todo el JSON en memoria fallará cuando los registros superen los 10,000 items.
*   **Persistencia:** Los datos se reinician al recargar la página (a menos que se use LocalStorage, que tiene límites).
*   **Manejo de Errores:** Poco robusto ante datos faltantes o malformed JSON.

---

## 6. Roadmap de Evolución (To-Be)

Para llevar SICAMEX a un entorno productivo, se recomienda la siguiente hoja de ruta:

### Fase 1: Modularización y Buenas Prácticas (Corto Plazo)
*Objetivo: Limpiar el código actual sin cambiar la tecnología base.*
1.  **Separación de Responsabilidades:**
    *   Crear `services/dataService.js`: Única fuente de verdad para leer/filtrar JSON.
    *   Crear `utils/calculators.js`: Funciones puras para KPIs y totales.
    *   Crear `ui/renderers.js`: Funciones exclusivas para pintar HTML.
2.  **Gestión de Estado:** Implementar un estado global simple (Patrón Observer) para que al cambiar el CEDIS, todas las tablas se actualicen automáticamente sin recargar.
3.  **Validación de Entrada:** Formularios con validación estricta antes de "guardar" (en LocalStorage).

### Fase 2: Backend y Base de Datos Real (Mediano Plazo)
*Objetivo: Persistencia real y seguridad.*
1.  **Tecnología Sugerida:**
    *   Backend: Node.js (Express) o Python (FastAPI).
    *   Base de Datos: PostgreSQL (Relacional es crucial aquí).
2.  **Normalización de BD:**
    *   Tabla `Inventarios`: PK (producto_id, cedis_id), Cantidad.
    *   Tabla `Transacciones`: Registro inmutable de cada movimiento (entrada/salida).
3.  **API RESTful:** Endpoints como `GET /api/cedis/:id/kpis`, `POST /api/entregas`.

### Fase 3: Configurabilidad Avanzada (Largo Plazo)
*Objetivo: Que el sistema se adapte sin tocar código.*
1.  **Motor de Reglas:** Permitir definir umbrales de alerta (ej. "Alertar si devolución > 5%") desde la UI.
2.  **Catálogo Dinámico:** Campos personalizados para productos y clientes.
3.  **Roles y Permisos:** Middleware para distinguir entre Administrador (ve todo), Gerente CEDIS (ve solo su cedis) y Operador (solo registra).

---

## 7. Recomendaciones de Estructura de Base de Datos (SQL)

Se propone el siguiente esquema relacional para reemplazar el JSON:

```sql
-- Catálogos Maestros
CREATE TABLE cedis (id INT PRIMARY KEY, nombre VARCHAR(100), direccion TEXT);
CREATE TABLE productos (id INT PRIMARY KEY, sku VARCHAR(50) UNIQUE, nombre VARCHAR(150), precio_unitario DECIMAL(10,2));
CREATE TABLE clientes (id INT PRIMARY KEY, nombre VARCHAR(150), ruta_id INT, cedis_id INT, FOREIGN KEY(cedis_id) REFERENCES cedis(id));

-- Inventarios (Tabla Pivote Crítica)
CREATE TABLE inventarios (
    producto_id INT,
    cedis_id INT,
    cantidad INT DEFAULT 0,
    PRIMARY KEY (producto_id, cedis_id)
);

-- Transacciones
CREATE TABLE entregas (
    id SERIAL PRIMARY KEY,
    cliente_id INT,
    cedis_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    estado VARCHAR(20) -- 'PENDIENTE', 'COMPLETADA', 'CANCELADA'
);

CREATE TABLE detalles_entrega (
    entrega_id INT,
    producto_id INT,
    cantidad INT,
    subtotal DECIMAL(10,2)
);

CREATE TABLE devoluciones (
    id SERIAL PRIMARY KEY,
    entrega_id INT, -- Nullable si es devolución directa
    motivo VARCHAR(100),
    valor_total DECIMAL(10,2),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 8. Conclusión

El prototipo actual de SICAMEX es una herramienta excelente para **visualización y demostración de conceptos (PoC)**. Cumple su función de mostrar cómo se verían los datos y la interfaz.

Sin embargo, para pasar a producción, es **imperativo** migrar la lógica de negocio al servidor, implementar una base de datos relacional para garantizar la integridad del inventario y modularizar el frontend para permitir mantenimiento y escalabilidad. La implementación de las fases descritas en el roadmap transformará este visor estático en un ERP logístico robusto.
