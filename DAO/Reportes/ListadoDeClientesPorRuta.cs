using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class ListadoDeClientesPorRuta
    {
        public String NombreTienda;
        public String Calle;
        public String NumeroExt;
        public String NumeroInt;
        public String CodigoPostal;
        public String Colonia;
        public Double Latitud;
        public Double Longitud;
        public String Ruta;
        public int Dia;
        public int Secuencia;
        public int idCliente;
        public int idRuta;
        public String idUsuario;
        public int idFrecuencia;
        public String Frecuencia;
        public DateTime fCreacion;
        public int idVC;
        public int idDireccion;
        public bool Activo;


        public ListadoDeClientesPorRuta() { }

        public ListadoDeClientesPorRuta(String NombreTienda, String Calle, String NumeroExt, String NumeroInt, String CodigoPostal, String Colonia, Double Latitud, Double Longitud, 
            String Ruta, int Dia, int Secuencia, int idCliente, int idRuta, String idUsuario, int idFrecuencia, String Frecuencia, DateTime fCreacion, int idVC, int idDireccion, bool Activo)
        {
            
            this.NombreTienda = NombreTienda;
            this.Calle = Calle;
            this.NumeroExt = NumeroExt;
            this.NumeroInt = NumeroInt;
            this.CodigoPostal = CodigoPostal;
            this.Colonia = Colonia;
            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.Ruta = Ruta;
            this.Dia = Dia;
            this.Secuencia = Secuencia;
            this.idCliente = idCliente;
            this.idRuta = idRuta;
            this.idUsuario = idUsuario;
            this.idFrecuencia = idFrecuencia;
            this.Frecuencia = Frecuencia;
            this.fCreacion = fCreacion;
            this.idVC = idVC;
            this.idDireccion = idDireccion;
            this. Activo = Activo;

        }
    }
}