using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Error
    {
        public DateTime FechaHora;
        public String App;
        public int Linea;
        public String Metodo;
        public String String;
        public String idHH;
        public int idRuta;
        public bool bnd;


        public Error() { }

        public Error(DateTime FechaHora, String App, int Linea, String Metodo, String String, String idHH, int idRuta, bool bnd)
        {
            this.FechaHora = FechaHora;
            this.App = App;
            this.Linea = Linea;
            this.Metodo = Metodo;
            this.String = String;
            this.idHH = idHH;
            this.idRuta = idRuta;
            this.bnd = bnd;
        }
    }
}