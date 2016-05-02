using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class UsuarioCargaFactura
    {
        public int id;
            public String Folio;
        public String idUsuario;
            public String uApellidoP;
            public String uApellidoM;
            public String uNombre;
        public int idFactura;        
        public DateTime fCargado;


        public UsuarioCargaFactura(){}

        public UsuarioCargaFactura(int id, String Folio, String idUsuario, String uApellidoP, String uApellidoM, String uNombre, int idFactura, DateTime fCargado)
        {
            this.id = id;
            this.Folio = Folio;
            this.idUsuario = idUsuario;
            this.uApellidoP = uApellidoP;
            this.uApellidoM = uApellidoM;
            this.uNombre = uNombre;
            this.idFactura = idFactura;
            this.fCargado = fCargado;
        }
    }
}