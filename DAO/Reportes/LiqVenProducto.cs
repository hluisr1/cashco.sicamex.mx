using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class LiqVenProducto
    {
        public String Ruta;
        public String Nombre;
        public int Cantidad;
        public float Contado;
        public float Credito;
        public float Consignacion;
        public float Total;
        public DateTime Entrada;

        public LiqVenProducto() { }

        public LiqVenProducto(String Ruta, String Nombre, int Cantidad, float Contado, float Credito, float Consignacion, float Total, DateTime Entrada)
        {
            this.Ruta = Ruta;
            this.Nombre = Nombre;
            this.Cantidad = Cantidad;
            this.Contado = Contado;
            this.Credito = Credito;
            this.Consignacion = Consignacion;
            this.Total = Total;
            this.Entrada = Entrada;
        }

    }
}