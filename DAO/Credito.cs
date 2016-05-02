using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Credito
    {
        public int id;
        public String Nombre;


        public Credito() { }

        public Credito(int id, String Nombre) 
        {
            this.id = id;
            this.Nombre = Nombre;
        }
    }
}