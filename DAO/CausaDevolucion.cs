using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class CausaDevolucion
    {
        public int id;
        public String Descripcion;

        public CausaDevolucion() { }

        public CausaDevolucion(int id, String Descripcion) 
        {
            this.id = id;
            this.Descripcion = Descripcion;
        }
    }
}