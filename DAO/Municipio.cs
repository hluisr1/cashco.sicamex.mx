using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Municipio
    {
        public int id;
        public int idEstado;
        public String Nombre;
        public String Estado;
        public String Pais;

        public Municipio() { }

        public Municipio(int id, int idEstado, String Nombre, String Estado, String Pais) 
        {
            this.id = id;
            this.idEstado = idEstado;
            this.Nombre = Nombre;
            this.Estado = Estado;
            this.Pais = Pais;
        }
    }
}