using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Promocion
    {
        public int id;
        public int idProducto;
        public String Descripcion;
        public DateTime fInicio;
        public DateTime fFin;
        public float Porcentaje;
        public int CantMin;

        public String Producto;

        public Promocion() { }

        public Promocion(int id, int idProducto, String Descripcion, DateTime fInicio, DateTime fFin, float Porcentaje, int CantMin, String Producto) 
        {
            this.id = id;
            this.idProducto = idProducto;
            this.Descripcion = Descripcion;
            this.fInicio = fInicio;
            this.fFin = fFin;
            this.Porcentaje = Porcentaje;
            this.CantMin = CantMin;

            this.Producto = Producto;
        }

    }
}