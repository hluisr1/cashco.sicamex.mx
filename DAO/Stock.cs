using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Stock
    {
        public int idProducto;
        public int idCedis;
        public int Cantidad;
        public String fAlta;

        public String Producto;
        public String Cedis;

        public Stock() { }

        public Stock(int idProducto, int idCedis, int Cantidad, String fAlta, String Producto, String Cedis) 
        {
            this.idProducto = idProducto;
            this.idCedis = idCedis;
            this.Cantidad = Cantidad;
            this.fAlta = fAlta;

            this.Producto = Producto;
            this.Cedis = Cedis;
        }
    }
}