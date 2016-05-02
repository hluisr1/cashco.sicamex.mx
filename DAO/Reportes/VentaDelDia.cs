using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class VentaDelDia
    {
        public int idCedis;
        public String idSupervisor;

        public String Ruta;
        public DateTime Fecha;
        public float Total;
        public String TipoVenta;

        public VentaDelDia() { }

        public VentaDelDia(String Ruta, DateTime Fecha, float Total)
        {
            this.Ruta = Ruta;
            this.Fecha = Fecha;
            this.Total = Total;
            this.TipoVenta = "CONTADO";
        }

        public VentaDelDia(String Ruta, DateTime Fecha, float Total, String TipoVenta)
        {
            this.Ruta = Ruta;
            this.Fecha = Fecha;
            this.Total = Total;
            this.TipoVenta = TipoVenta;
        }


        public VentaDelDia(int idCedis, String idSupervisor, String Ruta, DateTime Fecha, float Total)
        {
            this.Ruta = Ruta;
            this.Fecha = Fecha;
            this.Total = Total;
            this.TipoVenta = "CONTADO";

            this.idCedis = idCedis;
            this.idSupervisor = idSupervisor;
        }
    }
}