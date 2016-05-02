using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Asueto
    {
        public int id;
        public String Fecha;

        public Asueto() { }

        public Asueto(int id, String Fecha)
        {
            this.id = id;
            this.Fecha = Fecha;
        }
    }
}