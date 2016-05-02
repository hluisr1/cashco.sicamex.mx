using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class RutaUsuario
    {
        public int id;
        public int idRuta;
        public String idUsuario_Op;
        public DateTime fAlta;
        public bool Activo;

        public String Ruta;
        public String Nombre;
        public String ApeP;
        public String ApeM;

        public RutaUsuario() { }

        public RutaUsuario(int id, int idRuta, String idUsuario_Op, DateTime fAlta, bool Activo, String Ruta, String Nombre, String ApeP, String ApeM)
        {
            this.id = id;
            this.idRuta = idRuta;
            this.idUsuario_Op = idUsuario_Op;
            this.fAlta = fAlta;
            this.Activo = Activo;

            this.Ruta = Ruta;
            this.Nombre = Nombre;
            this.ApeP = ApeP;
            this.ApeM = ApeM;
        }

    }
}