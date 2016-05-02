using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class TipoRuta
    {
        public int id;
        public String Tipo;

        public TipoRuta() { }

        public TipoRuta(int id, String Tipo) 
        {
            this.id = id;
            this.Tipo = Tipo;
        }
    }
}