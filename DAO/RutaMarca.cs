using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class RutaMarca
    {
        public int id;
        public int idRuta;
        public int idMarca;


        public RutaMarca() { }

        public RutaMarca(int id, int idRuta, int idMarca) 
        {
            this.id = id;
            this.idRuta = idRuta;
            this.idMarca = idMarca;
        }

    }
}