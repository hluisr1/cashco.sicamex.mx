using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Grupo
    {
        public int id;
        public String Nombre;

        public Grupo() { }

        public Grupo(int id, String Nombre) 
        {
            this.id = id;
            this.Nombre = Nombre;
        }

    }
}