using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Incidencia
    {
        public DateTime Fecha;
        public String App;
        public String String;
        public String Mensaje;
        public int idRuta;
        public String idHH;

        public Incidencia() { }

        public Incidencia(DateTime Fecha, String App, String String, String Mensaje, int idRuta, String idHH)
        {
            this.Fecha = Fecha;
            this.App = App;
            this.String = String;
            this.Mensaje = Mensaje;
            this.idRuta = idRuta;
            this.idHH = idHH;
            
        }
    }
}