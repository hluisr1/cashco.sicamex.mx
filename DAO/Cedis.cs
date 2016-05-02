using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Cedis
    {
        public int id;
        public String Nombre;
        public double Latitud;
        public double Longitud;


        public String nEmpresa;
        public String RFC;
        public String Telefono;
        public String Domicilio;

        public Cedis() { }

        public Cedis(int id, String Nombre, double Latitud, double Longitud)
        {
            this.id = id;
            this.Nombre = Nombre;
            this.Latitud = Latitud;
            this.Longitud = Longitud;
        }


        public Cedis(int id, String Nombre, double Latitud, double Longitud, String nEmpresa, String RFC, String Telefono, String Domicilio)
        {
            this.id = id;
            this.Nombre = Nombre;
            this.Latitud = Latitud;
            this.Longitud = Longitud;

            this.nEmpresa = nEmpresa;
            this.RFC = RFC;
            this.Telefono = Telefono;
            this.Domicilio = Domicilio;
        }

    }
}