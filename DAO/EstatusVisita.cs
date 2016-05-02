using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class EstatusVisita
    {
        public int id;
        public String Descripcion;


        public EstatusVisita() { }

        public EstatusVisita(int id, String Descripcion) 
        {
            this.id = id;
            this.Descripcion = Descripcion;
        }
    }
}