using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class TipoEquipo
    {
        public int id;
        public String Nombre;

        public TipoEquipo() { }

        public TipoEquipo(int id, String Nombre) 
        {
            this.id = id;
            this.Nombre = Nombre;
        }
    }
}