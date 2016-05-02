using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Frecuencia
    {
        public int id;
        public String Codigo;
        public String Parametro;
        public String Descripcion;

        public Frecuencia() { }

        public Frecuencia(int id, String Codigo, String Parametro, String Descripcion)
        {
            this.id = id;
            this.Codigo = Codigo;
            this.Parametro = Parametro;
            this.Descripcion = Descripcion;
        }
    }
}