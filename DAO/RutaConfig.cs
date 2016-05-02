using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class RutaConfig
    {
        public int idRuta;
        public String TimeToError;
        public String TimeGPS;
        public String Extra1;
        public String Extra2;
        public String Extra3;

        public RutaConfig() { }

        public RutaConfig(int idRuta, String TimeToError, String TimeGPS, String Extra1, String Extra2, String Extra3) 
        {
            this.idRuta = idRuta;
            this.TimeToError = TimeToError;
            this.TimeGPS = TimeGPS;
            this.Extra1 = Extra1;
            this.Extra2 = Extra2;
            this.Extra3 = Extra3;
        }
    }
}