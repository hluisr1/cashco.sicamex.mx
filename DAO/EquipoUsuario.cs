using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class EquipoUsuario
    {
        public int id;
        public int idEquipo;
        public String idUsuario;
        public String ApellidoP;
        public String ApellidoM;
        public String Nombre;
        public String Tipo;
        public String Modelo;
        public String NoSerie;
        public String fCreacion;

        public EquipoUsuario() { }

        public EquipoUsuario(int id, int idEquipo, String idUsuario, String ApellidoP, String ApellidoM, String Nombre, String Tipo, String Modelo, String NoSerie, String fCreacion)
        {
            this.id = id;
            this.idEquipo = idEquipo;
            this.idUsuario = idUsuario;
            this.ApellidoP = ApellidoP;
            this.ApellidoM = ApellidoM;
            this.Nombre = Nombre;
            this.Tipo = Tipo;
            this.Modelo = Modelo;
            this.NoSerie = NoSerie;
            this.fCreacion = fCreacion;
        }
    }
}