using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Ruta
    {
        public int id;
        public int idCedis;
        public int idTipoRuta;
        public String Nombre;

        public String TipoRuta;
        public String Cedis;

        public Ruta() { }

        public Ruta(int id, int idCedis, int idTipoRuta, String Nombre, String TipoRuta, String Cedis) 
        {
            this.id = id;
            this.idCedis = idCedis;
            this.idTipoRuta = idTipoRuta;
            this.Nombre = Nombre;

            this.TipoRuta = TipoRuta;
            this.Cedis = Cedis;
        }
    }
}