using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Devolucion
    {
        public int id;
        public int idDetalleVisita;
        public int idProducto;
        public int idCausaDevolucion;
        public int Cantidad;
        public float Total;
        public String fCreacion;
        public bool nAutorizacion;

        public String Ruta;
        public String NombreTienda;
        public String Producto;
        public String Descripcion;
        public DateTime Entrada;

        public Devolucion() { }

        public Devolucion(int id, int idDetalleVisita, int idProducto, int idCausaDevolucion, int Cantidad, 
                            float Total, String fCreacion, bool nAutorizacion) 
        {
            this.id = id;
            this.idDetalleVisita = idDetalleVisita;
            this.idProducto = idProducto;
            this.idCausaDevolucion = idCausaDevolucion;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.fCreacion = fCreacion;
            this.nAutorizacion = nAutorizacion;
        }

        public Devolucion(int idDetalleVisita, String Ruta, String NombreTienda, String Producto, int Cantidad,
                            float Total, String Descripcion, DateTime Entrada)
        {/*LIQUIDACION*/

            this.idDetalleVisita = idDetalleVisita;
            this.Ruta = Ruta;
            this.NombreTienda = NombreTienda;
            this.Producto = Producto;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.Descripcion = Descripcion;
            this.Entrada = Entrada;
        }
    }
}