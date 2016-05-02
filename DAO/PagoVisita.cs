using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class PagoVisita
    {
        public int id;
        public int idDetalleVisita;
        public int idTipoPago;
        public float Monto;

        public int idFactura;
        public DateTime fPago;

        public int idCliente;
        public int idEstatus;
        public String Fecha;
        public String ApellidoP;
        public String ApellidoM;
        public String Nombre;
        public String Estatus;

        public String TipoPago;


        public PagoVisita() { }

        public PagoVisita(int id, int idDetalleVisita, int idTipoPago, float Monto, int idFactura, DateTime fPago, int idCliente, int idEstatus, String Fecha, String ApellidoP, String ApellidoM, String Nombre, String Estatus, String TipoPago)
        {
            this.id = id;
            this.idDetalleVisita = idDetalleVisita;
            this.idTipoPago = idTipoPago;
            this.Monto = Monto;

            this.idFactura = idFactura;
            this.fPago = fPago;
            this.idCliente = idCliente;
            this.idEstatus = idEstatus;
            this.Fecha = Fecha;
            this.ApellidoP = ApellidoP;
            this.ApellidoM = ApellidoM;
            this.Nombre = Nombre;
            this.Estatus = Estatus;

            this.TipoPago = TipoPago;
        }
    }
}