using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class TipoUsuario
    {
        public int id;
        public String Nombre;
        public int Auth;
        public String Descripcion;

        public TipoUsuario() { }

        public TipoUsuario(int id, String Nombre, int Auth, String Descripcion)
        {
            this.id = id;
            this.Nombre = Nombre;
            this.Auth = Auth;
            this.Descripcion = Descripcion;
        }
    }
}