using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Liquidacion
    {
        public int id;
        public String idUsuario_Resp;
        public String idUsuario_Op;
        public float Monto;
        public DateTime fCreacion;

        public String vApellidoP;
        public String vApellidoM;
        public String vNombre;

        public String sApellidoP;
        public String sApellidoM;
        public String sNombre;



        public int idRuta;
        public DateTime fDestinado;
        public int idCredito;
        public String Descripcion;
        public bool Activo;


        public Liquidacion() { }

        public Liquidacion(int id, String idUsuario_Resp, String idUsuario_Op, float Monto, DateTime fCreacion, String vApellidoP, String vApellidoM, String vNombre, String sApellidoP, String sApellidoM, String sNombre) 
        {
            this.id = id;
            this.idUsuario_Resp = idUsuario_Resp;
            this.idUsuario_Op = idUsuario_Op;
            this.Monto = Monto;
            this.fCreacion = fCreacion;
            this.vApellidoP = vApellidoP;
            this.vApellidoM = vApellidoM;
            this.vNombre = vNombre;
            this.sApellidoP = sApellidoP;
            this.sApellidoM = sApellidoM;
            this.sNombre = sNombre;
        }

        public Liquidacion(int id, String idUsuario_Resp, String idUsuario_Op, float Monto, DateTime fCreacion, int idRuta, DateTime fDestinado, int idCredito, String Descripcion, bool Activo)
        {/*NEW LIQUDADOR*/

            this.id = id;
            this.idUsuario_Resp = idUsuario_Resp;
            this.idUsuario_Op = idUsuario_Op;
            this.Monto = Monto;
            this.fCreacion = fCreacion;

            this.vApellidoP = "-";
            this.vApellidoM = "-";
            this.vNombre = "-";
            this.sApellidoP = "-";
            this.sApellidoM = "-";
            this.sNombre = "-";

            this.idRuta = idRuta;
            this.fDestinado = fDestinado;
            this.idCredito = idCredito;
            this.Descripcion = Descripcion;

            this.Activo = Activo;
        }
    }
}