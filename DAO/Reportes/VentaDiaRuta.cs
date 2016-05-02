using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class VentaDiaRuta
    {
        public String Ruta;
        public DateTime Fecha;
        public int idCliente;
        public int idDetalleVisita;
        public String NombreTienda;
        public float Contado;
        public float Credito;
        public float Consignacion;
        public float Total;

        public Boolean Nuevo;

        public VentaDiaRuta() { }

        public VentaDiaRuta(String Ruta, DateTime Fecha, int idCliente, int idDetalleVisita, String NombreTienda, float Contado, float Credito, float Consignacion, float Total, Boolean Nuevo)
        {
            this.Ruta = Ruta;
            this.Fecha = Fecha;
            this.idCliente = idCliente;
            this.idDetalleVisita = idDetalleVisita;
            this.NombreTienda = NombreTienda;
            this.Contado = Contado;
            this.Credito = Credito;
            this.Consignacion = Consignacion;            
            this.Total = Total;

            this.Nuevo = Nuevo;

        }

    }
}

