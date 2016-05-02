using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Usuario
    {
        public String Nickname;
        public int idCedis;
        public int idTipo;
        public String Nombre;
        public String ApellidoP;
        public String ApellidoM;
        public String Celular;
        public bool Activo;

        public String Cedis;
        public String TipoUsuario;
        public int Auth;


        public String Email;
        public DateTime fAlta;

        public String Pass;


        public Usuario() { }

        public Usuario(String Nickname, int idCedis, int idTipo, String Nombre, String ApellidoP,
                        String ApellidoM, String Celular, bool Activo,
            
                        String Cedis, String TipoUsuario, int Auth, String Email, DateTime fAlta, String Pass)
        {
            this.Nickname = Nickname;
            this.idCedis = idCedis;
            this.idTipo = idTipo;
            this.Nombre = Nombre;
            this.ApellidoP = ApellidoP;
            this.ApellidoM = ApellidoM;
            this.Celular = Celular;
            this.Activo = Activo;

            this.Cedis = Cedis;
            this.TipoUsuario = TipoUsuario;
            this.Auth = Auth;

            this.Email = Email;
            this.fAlta = fAlta;

            this.Pass = Pass;

        }
    }
}