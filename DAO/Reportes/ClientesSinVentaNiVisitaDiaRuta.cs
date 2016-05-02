using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class ClientesSinVentaNiVisitaDiaRuta
    {
        public int idVisitaCliente;
        public String Ruta;
        public String NombreTienda;
        public String Descripcion;

        public ClientesSinVentaNiVisitaDiaRuta() { }

        public ClientesSinVentaNiVisitaDiaRuta(int idVisitaCliente, String Ruta, String NombreTienda, String Descripcion)
        {
            this.idVisitaCliente = idVisitaCliente;
            this.Ruta = Ruta;
            this.NombreTienda = NombreTienda;
            this.Descripcion = Descripcion;            
        }

        
    }
}