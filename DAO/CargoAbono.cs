using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class CargoAbono
    {
        public int id;
        public int CargoA;
        public float Monto;
        public String Causa;
        public DateTime fCreacion;
        public String idUsuario_Op;
        public String idUsuario_Resp;
        public DateTime fDestinado;
        public bool Activo;

        public int idRuta;

        public CargoAbono() { }

        public CargoAbono(int id, int CargoA, float Monto, String Causa, DateTime fCreacion, 
                    String idUsuario_Op, String idUsuario_Resp, DateTime fDestinado, bool Activo, int idRuta)
        {
            this.id = id;
            this.CargoA = CargoA;
            this.Monto = Monto;
            this.Causa = Causa;
            this.fCreacion = fCreacion;
            this.idUsuario_Op = idUsuario_Op;
            this.idUsuario_Resp = idUsuario_Resp;
            this.fDestinado = fDestinado;
            this.Activo = Activo;

            this.idRuta = idRuta;
        }
    }
}