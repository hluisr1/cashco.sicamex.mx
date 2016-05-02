using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class TipoPago
    {
        public int id;
        public String Descripcion;

        public TipoPago() { }

        public TipoPago(int id, String Descripcion) 
        {
            this.id = id;
            this.Descripcion = Descripcion;
        }
    }
}