using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Deposito
    {
        public int id;
        public String idUsuario;
        public int idCuenta;
        public String _idSucursal;
        public float Monto;
        public double Latitud;
        public double Longitud;
        public bool Dentro;

        public String nRef;
        public String idUsuario_Resp;
        public String Descripcion;
        public DateTime fCreacion;
        public DateTime fDestinado;
        public bool Activo;

        public int idRuta;
        


        public Deposito() { }

        public Deposito(int id, String idUsuario, int idCuenta, String _idSucursal, float Monto, double Latitud, double Longitud, bool Dentro) 
        {
            this.id = id;
            this.idUsuario = idUsuario;
            this.idCuenta = idCuenta;
            this._idSucursal = _idSucursal;
            this.Monto = Monto;
            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.Dentro = Dentro;
        }

        public Deposito(int id, String idUsuario, int idCuenta, String _idSucursal, float Monto, double Latitud, double Longitud, bool Dentro,
                    String nRef, String idUsuario_Resp, String Descripcion, DateTime fCreacion, DateTime fDestinado, bool Activo, int idRuta)
        {
            this.id = id;
            this.idUsuario = idUsuario;
            this.idCuenta = idCuenta;
            this._idSucursal = _idSucursal;
            this.Monto = Monto;
            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.Dentro = Dentro;

            this.nRef = nRef;
            this.idUsuario_Resp = idUsuario_Resp;
            this.Descripcion = Descripcion;
            this.fCreacion = fCreacion;
            this.fDestinado = fDestinado;
            this.Activo = Activo;

            this.idRuta = idRuta;
        }
    }
}