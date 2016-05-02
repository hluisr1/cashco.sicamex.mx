using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class CoorPedidos
    {
        public int idRuta;
        public String Ruta;
        public int idDireccion;
        public int idCliente;
        public String NombreTienda;

        public double Latitud;
        public double Longitud;
        public String Calle;
        public String NumeroExt;
        public String Colonia;
        
        public int idPedido;
        public DateTime Entrada;
        public double pLatitud;
        public double pLongitud;


        public CoorPedidos() { }

        public CoorPedidos(int idRuta, String Ruta, int idDireccion, int idCliente, String NombreTienda, 
                            double Latitud, double Longitud, String Calle, String NumeroExt, String Colonia, 
                            int idPedido, DateTime Entrada, double pLatitud, double pLongitud)
        {
            this.idRuta = idRuta;
            this.Ruta = Ruta;
            this.idDireccion = idDireccion;
            this.idCliente = idCliente;
            this.NombreTienda = NombreTienda;

            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.Calle = Calle;
            this.NumeroExt = NumeroExt;
            this.Colonia = Colonia;

            this.idPedido = idPedido;
            this.Entrada = Entrada;
            this.pLatitud = pLatitud;
            this.pLongitud = pLongitud;
        }

    }
}