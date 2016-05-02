using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class InicioTimeHH
    {
        public int id;
        public int idRuta;
        public String Ruta;
        public DateTime fHH;
        public DateTime fBD;
        
        public String Desc;
        public int Veces;
        public float Diff;


        public InicioTimeHH() { }

        public InicioTimeHH(int id, int idRuta, String Ruta, DateTime fHH, DateTime fBD, 
                            String Desc, int Veces, float Diff)
        {
            this.id = id;
            this.idRuta = idRuta;
            this.Ruta = Ruta;
            this.fHH = fHH;
            this.fBD = fBD;
                        
            this.Desc = Desc;
            this.Veces = Veces;
            this.Diff = Diff;
        }

    }
}