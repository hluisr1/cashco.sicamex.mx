using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class OBJ4T4U
    {
        public int idVisitaCliente;
        public int idRuta;
        public String idUsuario_Op;
        public int idDireccion;
        public DateTime fApartirDe;
        public bool Activo;

        public int Dia;
        public int idFrecuencia;
        public int Secuencia;
        public int idCliente;

        public String Calle;
        public String NumeroExt;
        public String NumeroInt;
        public String CodigoPostal;
        public String Colonia;
        public int idMunicipio;
        public double Latitud;
        public double Longitud;

        public int idCedis;
        public String NombreTienda;
        public String Nombre;
        public String ApellidoP;
        public String ApellidoM;
        public String Celular;
        public String Correo;
        public DateTime fCreacion;

        public OBJ4T4U() { }

        public OBJ4T4U(int idVisitaCliente, int idRuta, String idUsuario_Op, int idDireccion, DateTime fApartirDe, bool Activo, 
            int Dia, int idFrecuencia, int Secuencia, int idCliente, 
            String Calle, String NumeroExt, String NumeroInt, String CodigoPostal, String Colonia, int idMunicipio, double Latitud, double Longitud, 
            int idCedis, String NombreTienda, String Nombre, String ApellidoP, String ApellidoM, String Celular, String Correo, DateTime fCreacion)
        {
            this.idVisitaCliente = idVisitaCliente;
            this.idRuta = idRuta;
            this.idUsuario_Op = idUsuario_Op;
            this.idDireccion = idDireccion;
            this.fApartirDe = fApartirDe;
            this.Activo = Activo;

            this.Dia = Dia;
            this.idFrecuencia = idFrecuencia;
            this.Secuencia = Secuencia;
            this.idCliente = idCliente;
            
            this.Calle = Calle;
            this.NumeroExt = NumeroExt;
            this.NumeroInt = NumeroInt;
            this.CodigoPostal = CodigoPostal;
            this.Colonia = Colonia;
            this.idMunicipio = idMunicipio;
            this.Latitud = Latitud;
            this.Longitud = Longitud;

            this.idCedis = idCedis;
            this.NombreTienda = NombreTienda;
            this.Nombre = Nombre;
            this.ApellidoP = ApellidoP;
            this.ApellidoM = ApellidoM;
            this.Celular = Celular;
            this.Correo = Correo;
            this.fCreacion = fCreacion;

        }
    }
}