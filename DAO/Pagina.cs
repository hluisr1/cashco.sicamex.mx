using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Pagina
    {
        public int id;
        public String Nombre;

        public Pagina() { }

        public Pagina(int id, String Nombre) 
        {
            this.id = id;
            this.Nombre = Nombre;
        }
    }
}