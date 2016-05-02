using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminWeb
{
    public class Direccion
    {
        public int id;
        public int idCliente;
        public String Calle;
        public String NumeroExt;
        public String NumeroInt;
        public String CodigoPostal;
        public String Colonia;
        public int idMunicipio;
        public double Latitud;
        public double Longitud;

        public String Nombre;
        public String ApePat;
        public String ApeMat;
        public String Municipio;
        public String Estado;
        public String Pais;

        public int idCedis;



        public Direccion() { }

        public Direccion(int id, int idCliente, String Calle, String NumeroExt, String NumeroInt, String CodigoPostal, String Colonia, int idMunicipio, double Latitud, double Longitud,
                String Nombre, String ApePat, String ApeMat, String Municipio, String Estado, String Pais, int idCedis)
        {
            this.id = id;
            this.idCliente = idCliente;
            this.Calle = Calle;
            this.NumeroExt = NumeroExt;
            this.NumeroInt = NumeroInt;
            this.CodigoPostal = CodigoPostal;
            this.Colonia = Colonia;
            this.idMunicipio = idMunicipio;
            this.Latitud = Latitud;
            this.Longitud = Longitud;

            this.Nombre = Nombre;
            this.ApePat = ApePat;
            this.ApeMat = ApeMat;
            this.Municipio = Municipio;
            this.Estado = Estado;
            this.Pais = Pais;

            this.idCedis = idCedis;
        }
    }
}