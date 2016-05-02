using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Equipo
    {
        public int id;
        public int idTipo;
        public String NoSerie;
        public String Modelo;
        public String Descripcion;
        public String fAlta;
        public String fDesc;

        public String Tipo;

        public Equipo() { }

        public Equipo(int id, int idTipo, String NoSerie, String Modelo, String Descripcion, String fAlta, String fDesc, String Tipo)
        {
            this.id = id;
            this.idTipo = idTipo;
            this.NoSerie = NoSerie;
            this.Modelo = Modelo;
            this.Descripcion = Descripcion;
            this.fAlta = fAlta;
            this.fDesc = fDesc;

            this.Tipo = Tipo;
        }
    }
}