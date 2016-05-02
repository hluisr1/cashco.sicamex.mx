using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class DetalleVisita
    {
        public int id;
        public int idVisitaCliente;
        public int idCliente;
        public String idUsuario;
        public int idEstatus;
        public DateTime Fecha;
        public double Latitud;
        public double Longitud;
        public DateTime Entrada;
        public DateTime Salida;
        public bool Dentro;

        public String ApellidoP;
        public String ApellidoM;
        public String Nombre;
        public String Estatus;

        public String Descripcion;


        public DetalleVisita() { }

        public DetalleVisita(int id, int idVisitaCliente, int idCliente, String idUsuario, int idEstatus, DateTime Fecha, double Latitud,
            double Longitud, DateTime Entrada, DateTime Salida, bool Dentro, String ApellidoP, String ApellidoM, String Nombre, String Estatus) 
        {
            this.id = id;
            this.idVisitaCliente = idVisitaCliente;
            this.idCliente = idCliente;
            this.idUsuario = idUsuario;
            this.idEstatus = idEstatus;
            this.Fecha = Fecha;
            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.Entrada = Entrada;
            this.Salida = Salida;
            this.Dentro = Dentro;

            this.ApellidoP = ApellidoP;
            this.ApellidoM = ApellidoM;
            this.Nombre = Nombre;
            this.Estatus = Estatus;
        }

        public DetalleVisita(int id, int idVisitaCliente, int idCliente, String idUsuario, int idEstatus, DateTime Fecha, double Latitud,
           double Longitud, DateTime Entrada, DateTime Salida, bool Dentro, String ApellidoP, String ApellidoM, String Nombre, String Estatus, int Descripcion)
        {
            this.id = id;
            this.idVisitaCliente = idVisitaCliente;
            this.idCliente = idCliente;
            this.idUsuario = idUsuario;
            this.idEstatus = idEstatus;
            this.Fecha = Fecha;
            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.Entrada = Entrada;
            this.Salida = Salida;
            this.Dentro = Dentro;

            this.ApellidoP = ApellidoP;
            this.ApellidoM = ApellidoM;
            this.Nombre = Nombre;
            this.Estatus = Estatus;

            //this.Descripcion = Descripcion;
        }
    }
}