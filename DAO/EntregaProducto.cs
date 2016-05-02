using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class EntregaProducto
    {
        public int idDetalleVisita;
        public int InventarioInicial;
        public int idProducto;
        public int Cantidad;
        public float Total;
        public int idPromocion;

        public String NombreTienda;
        public int idVisitaCliente;
        public String Producto;
        public String idUsuario;


        public int idCredito;

        public bool Activo;
        public String fHH;

        public float Descuento;


        public EntregaProducto() { }

        public EntregaProducto(int idDetalleVisita, int InventarioInicial, int idProducto, int Cantidad, float Total, int idPromocion) 
        {
            this.idDetalleVisita = idDetalleVisita;            
            this.InventarioInicial = InventarioInicial;
            this.idProducto = idProducto;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.idPromocion = idPromocion;

        }

        public EntregaProducto(int idDetalleVisita, int InventarioInicial, int idProducto, int Cantidad, float Total, int idPromocion, String NombreTienda, int idVisitaCliente, String Producto, String idUsuario)
        {
            this.idDetalleVisita = idDetalleVisita;
            this.InventarioInicial = InventarioInicial;
            this.idProducto = idProducto;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.idPromocion = idPromocion;

            this.NombreTienda = NombreTienda;
            this.idVisitaCliente = idVisitaCliente;
            this.Producto = Producto;
            this.idUsuario = idUsuario;
        }



        public EntregaProducto(int idDetalleVisita, int InventarioInicial, int idProducto, int Cantidad, float Total, int idPromocion, int idCredito)
        {/*METODO DE CONSIGNACION*/

            this.idDetalleVisita = idDetalleVisita;
            this.InventarioInicial = InventarioInicial;
            this.idProducto = idProducto;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.idPromocion = idPromocion;

            this.idCredito = idCredito;
        }

        public EntregaProducto(int idDetalleVisita, int InventarioInicial, int idProducto, int Cantidad, float Total, int idPromocion, bool Activo, String fHH)
        {/*METODO DE GUARDAR HISTORIAL EDICIONES*/

            this.idDetalleVisita = idDetalleVisita;
            this.InventarioInicial = InventarioInicial;
            this.idProducto = idProducto;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.idPromocion = idPromocion;

            this.Activo = Activo;
            this.fHH = fHH;
        }

        public EntregaProducto(int idDetalleVisita, int idProducto, int InventarioInicial, int Cantidad, float Total, int idPromocion, int idCredito, float Descuento, bool Activo)
        {/*METODO PARA INSERTAR LIQUIDADOR*/

            this.idDetalleVisita = idDetalleVisita;            
            this.idProducto = idProducto;
            this.InventarioInicial = InventarioInicial;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.idPromocion = idPromocion;

            this.idCredito = idCredito;
            this.Descuento = Descuento;

            this.Activo = Activo;
        }

        public EntregaProducto(int idDetalleVisita, int idProducto, int InventarioInicial, int Cantidad, float Total, int idPromocion, int idCredito, float Descuento, bool Activo, String NombreTienda, int idVisitaCliente, String Producto, String idUsuario)
        {/*METODO PARA CONSULTAR FULL LIQUIDADOR*/

            this.idDetalleVisita = idDetalleVisita;
            this.idProducto = idProducto;
            this.InventarioInicial = InventarioInicial;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.idPromocion = idPromocion;
            this.idCredito = idCredito;
            this.Descuento = Descuento;
            this.Activo = Activo;


            this.NombreTienda = NombreTienda;
            this.idVisitaCliente = idVisitaCliente;
            this.Producto = Producto;
            this.idUsuario = idUsuario;
        }

        public EntregaProducto(int idDetalleVisita, int InventarioInicial, int idProducto, int Cantidad, float Total, int idPromocion, bool Activo, String fHH, int idCredito, float Descuento)
        {/*METODO DE GUARDAR HISTORIAL EDICIONES*/

            this.idDetalleVisita = idDetalleVisita;
            this.InventarioInicial = InventarioInicial;
            this.idProducto = idProducto;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.idPromocion = idPromocion;

            this.Activo = Activo;
            this.fHH = fHH;

            this.idCredito = idCredito;
            this.Descuento = Descuento;
        }
    
    }
}