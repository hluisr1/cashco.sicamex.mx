using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class DiaVisita
    {
        public int idVisitaCliente;
        public int Dia;
        public int idFrecuencia;

        public String Ruta;
        public String Usuario;
        public String Direccion;
        public String Frecuencia;

        public String Codigo;
        public String Parametro;
        public DateTime fApartir;

        public double Latitud;
        public double Longitud;
        public int idCliente;
        public int idRuta;

        public String NombreTienda;
        public String NombreCliente;
        public int Secuencia;


        public DiaVisita() { }

        public DiaVisita(int idVisitaCliente, int Dia, int idFrecuencia, String Ruta, String Usuario, String Direccion, String Frecuencia, String Codigo, String Parametro, DateTime fApartir,
            double Latitud, double Longitud, int idCliente, int idRuta) 
        {
            this.idVisitaCliente = idVisitaCliente;
            this.Dia = Dia;
            this.idFrecuencia = idFrecuencia;

            this.Ruta = Ruta;
            this.Usuario = Usuario;
            this.Direccion = Direccion;
            this.Frecuencia = Frecuencia;

            this.Codigo = Codigo;
            this.Parametro = Parametro;
            this.fApartir = fApartir;

            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.idCliente = idCliente;
            this.idRuta = idRuta;
        }

        public DiaVisita(int idVisitaCliente, int Dia, int idFrecuencia) 
        {
            this.idVisitaCliente = idVisitaCliente;
            this.Dia = Dia;
            this.idFrecuencia = idFrecuencia;
        }


        public DiaVisita(int idVisitaCliente, int Dia, int idFrecuencia, String Ruta, String Usuario, String Direccion, String Frecuencia, String Codigo, String Parametro, DateTime fApartir,
            double Latitud, double Longitud, int idCliente, int idRuta, String NombreTienda, String NombreCliente, int Secuencia)
        {
            this.idVisitaCliente = idVisitaCliente;
            this.Dia = Dia;
            this.idFrecuencia = idFrecuencia;

            this.Ruta = Ruta;
            this.Usuario = Usuario;
            this.Direccion = Direccion;
            this.Frecuencia = Frecuencia;

            this.Codigo = Codigo;
            this.Parametro = Parametro;
            this.fApartir = fApartir;

            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.idCliente = idCliente;
            this.idRuta = idRuta;

            this.NombreTienda = NombreTienda;
            this.NombreCliente = NombreCliente;
            this.Secuencia = Secuencia;
        }

    }
}