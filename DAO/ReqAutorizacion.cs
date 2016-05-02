using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class ReqAutorizacion
    {
        public int id;
        public String Tabla;
        public int nAutorizacion;
        public int NivelAuthMin;

        public ReqAutorizacion() { }

        public ReqAutorizacion(int id, String Tabla, int nAutorizacion, int NivelAuthMin) 
        {
            this.id = id;
            this.Tabla = Tabla;
            this.nAutorizacion = nAutorizacion;
            this.NivelAuthMin = NivelAuthMin;
        }
    }
}