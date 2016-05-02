using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Autorizacion
    {
        public int id;
        public int idUsuario;
        public int idReqAutorizacion;
        public int idTabla;


        public Autorizacion() { }

        public Autorizacion(int id, int idUsuario, int idReqAutorizacion, int idTabla) 
        {
            this.id = id;
            this.idUsuario = idUsuario;
            this.idReqAutorizacion = idReqAutorizacion;
            this.idTabla = idTabla;
        }
    }
}