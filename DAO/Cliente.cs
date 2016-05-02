using System;

using System.Collections.Generic;

using System.Linq;

using System.Web;



namespace DAO
{

    public class Cliente
    {

        public int id;

        public int idCedis;

        public String NombreTienda;

        public String Nombre;

        public String ApellidoP;

        public String ApellidoM;

        public String Celular;

        public String Correo;

        public DateTime fCreacion;



        public String Cedis;



        public double Latitud;

        public double Longitud;



        public bool Activo;





        public Cliente() { }



        public Cliente(int id, int idCedis, String NombreTienda, String Nombre, String ApellidoP, String ApellidoM, String Celular, String Correo, DateTime fCreacion, String Cedis)
        {

            this.id = id;

            this.idCedis = idCedis;

            this.NombreTienda = NombreTienda;

            this.Nombre = Nombre;

            this.ApellidoP = ApellidoP;

            this.ApellidoM = ApellidoM;

            this.Celular = Celular;

            this.Correo = Correo;

            this.fCreacion = fCreacion;



            this.Cedis = Cedis;

        }



        public Cliente(int id, int idCedis, String NombreTienda, String Nombre, String ApellidoP, String ApellidoM, String Celular, String Correo, DateTime fCreacion, String Cedis,

            double Latitud, double Longitud)
        {

            this.id = id;

            this.idCedis = idCedis;

            this.NombreTienda = NombreTienda;

            this.Nombre = Nombre;

            this.ApellidoP = ApellidoP;

            this.ApellidoM = ApellidoM;

            this.Celular = Celular;

            this.Correo = Correo;

            this.fCreacion = fCreacion;



            this.Cedis = Cedis;



            this.Latitud = Latitud;

            this.Longitud = Longitud;

        }





        public Cliente(int id, int idCedis, String NombreTienda, String Nombre, String ApellidoP, String ApellidoM, String Celular, String Correo, DateTime fCreacion, String Cedis,

            double Latitud, double Longitud, bool Activo)
        {

            //PEND 003 20160316

            /*SE AGREGO EL CAMPO ACTIVO A NIVEL BD Y WS.*/

            this.id = id;

            this.idCedis = idCedis;

            this.NombreTienda = NombreTienda;

            this.Nombre = Nombre;

            this.ApellidoP = ApellidoP;

            this.ApellidoM = ApellidoM;

            this.Celular = Celular;

            this.Correo = Correo;

            this.fCreacion = fCreacion;



            this.Cedis = Cedis;



            this.Latitud = Latitud;

            this.Longitud = Longitud;



            this.Activo = Activo;



        }







    }

}