using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Permiso
    {
        public int id;
        public String TipoUsuario;
        public String Pagina;
        public Boolean C;
        public Boolean R;
        public Boolean U;
        public Boolean D;
        public int idTipoUsuario;
        public int idPagina;


        public Permiso() { }

        public Permiso(String TipoUsuario, String Pagina, Boolean C, Boolean R, Boolean U, Boolean D, int idTipoUsuario, int idPagina) 
        {
            this.id = 0;
            this.TipoUsuario = TipoUsuario;
            this.Pagina = Pagina;
            this.C = C;
            this.R = R;
            this.U = U;
            this.D = D;
            this.idTipoUsuario = idTipoUsuario;
            this.idPagina = idPagina;

        }
    }
}
