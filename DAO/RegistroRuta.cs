using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminWeb
{
    public class RegistroRuta
    {
        public int id;
        public String idUsuario;
        public int idRuta;

        public int iOdometro;
        public double iLatitud;
        public double iLongitud;
        public DateTime iFecha;

        public int fOdometro;
        public double fLatitud;
        public double fLongitud;
        public DateTime fFecha;



        public RegistroRuta() { }

        public RegistroRuta(int id, String idUsuario, int idRuta, int iOdometro, double iLatitud, double iLongitud, DateTime iFecha, 
                            int fOdometro, double fLatitud, double fLongitud, DateTime fFecha)
        {
            this.id = id;
            this.idUsuario = idUsuario;
            this.idRuta = idRuta;

            this.iOdometro = iOdometro;
            this.iLatitud = iLatitud;
            this.iLongitud = iLongitud;
            this.iFecha = iFecha;
            
            this.fOdometro = fOdometro;
            this.fLatitud = fLatitud;
            this.fLongitud = fLongitud;
            this.fFecha = fFecha;

        }
    }
}