using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class VisitaCliente
    {
        public int id;
        public int idRuta;
        public String idUsuario;
        public int idDireccion;
        public DateTime fApartir;
        public bool Activo;
        
        public String Ruta;
        public String Direccion;

        public String Tipo;



        public String NombreTienda;
        public int Dia;
        public String Frecuencia;
        public int Secuencia;
        public int idCliente;
        public int idFrecuencia;


        public Double Latitud;
        public Double Longitud;




        public VisitaCliente() { }

        public VisitaCliente(int id, int idRuta, String idUsuario, int idDireccion, DateTime fApartir, bool Activo, String Ruta, String Direccion) 
        {
            ini();

            this.id = id;
            this.idRuta = idRuta;
            this.idUsuario = idUsuario;
            this.idDireccion = idDireccion;
            this.fApartir = fApartir.Date;//fApartir.Split(' ')[0];
            this.Activo = Activo;

            this.Ruta = Ruta;
            this.Direccion = Direccion;

        }

        public VisitaCliente(int idRuta, String idUsuario, bool Activo, String Ruta, String Tipo)
        {
            ini();

            this.idRuta = idRuta;
            this.idUsuario = idUsuario;
            this.Activo = Activo;
            this.Ruta = Ruta;

            this.Tipo = Tipo;
        }



        public VisitaCliente(int id, String Ruta, String idUsuario, String NombreTienda, String Direccion, DateTime fApartir, int Dia, String Frecuencia, int Secuencia, 
                                int idCliente, int idDireccion, int idRuta, int idFrecuencia, Double Latitud, Double Longitud)
        {
            ini();

            this.id = id;
            this.Ruta = Ruta;
            this.idUsuario = idUsuario;
            this.NombreTienda = NombreTienda;
            this.Direccion = Direccion;
            this.fApartir = fApartir;
            this.Dia = Dia;
            this.Frecuencia = Frecuencia;
            this.Secuencia = Secuencia;
            this.idCliente = idCliente;
            this.idDireccion = idDireccion;
            this.idRuta = idRuta;
            this.idFrecuencia = idFrecuencia;

            this.Latitud = Latitud;
            this.Longitud = Longitud;
        }

        private void ini() {
            
            this.id = 0;
            this.idRuta = 0;
            this.idUsuario = "-";
            this.idDireccion = 0;
            this.fApartir = new DateTime(1993, 1, 1);
            this.Activo = false;
        
            this.Ruta = "-";
            this.Direccion = "-";

            this.Tipo = "-";



            this.NombreTienda ="-";
            this.Dia = 0;
            this.Frecuencia = "-";
            this.Secuencia = 0;
            this.idCliente = 0;
            this.idFrecuencia = 0;

            this.Latitud = -1;
            this.Longitud = -1;
        
        }



    }
}