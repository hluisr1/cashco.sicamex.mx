using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Marca
    {
        public int id;
        public String Nombre;

        public Marca() { }

        public Marca(int id, String Nombre)
        {
            this.id = id;
            this.Nombre = Nombre;
        }
    }
}