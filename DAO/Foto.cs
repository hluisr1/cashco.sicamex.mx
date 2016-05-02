using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Foto
    {
        public int id;
        public int idDireccion;
        public String FotoExt;
        public String FotoInt;
        public String Foto1;
        public String Foto2;
        public String Foto3;

        public Foto() { }

        public Foto(int id, int idDireccion, String FotoExt, String FotoInt, String Foto1, String Foto2, String Foto3) 
        {
            this.id = id;
            this.idDireccion = idDireccion;
            this.FotoExt = FotoExt;
            this.FotoInt = FotoInt;
            this.Foto1 = Foto1;
            this.Foto2 = Foto2;
            this.Foto3 = Foto3;

        }
    }
}