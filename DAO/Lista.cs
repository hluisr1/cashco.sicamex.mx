using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Lista
    {
        public int id;
        public String Nombre;


        public Lista() { }

        public Lista(int id, String Nombre) 
        {
            this.id = id;
            this.Nombre = Nombre;
        }
    }
}