using System;

using System.Collections.Generic;

using System.Linq;

using System.Web;



namespace DAO
{

    public class Producto
    {

        public int id;

        public int idMarca;

        public int idGrupo;

        public String Nombre;

        public float Precio;

        public String Codigo;



        public String Marca;

        public String Grupo;

        public String idCedis;

        public String Cedis;



        public int Cargas;

        public int Ventas;

        public int Inventario;

        public DateTime PrimeraCarga;

        public DateTime UltimaCarga;



        public int CargasReq;

        public int CargasFnl;





        public Producto() { }



        public Producto(int id, int idMarca, int idGrupo, String Nombre, float Precio, String Codigo, String Marca, String Grupo, String idCedis, String Cedis)
        {

            this.id = id;

            this.idMarca = idMarca;

            this.idGrupo = idGrupo;

            this.Nombre = Nombre;

            this.Precio = Precio;

            this.Codigo = Codigo;



            this.Marca = Marca;

            this.Grupo = Grupo;

            this.idCedis = idCedis;

            this.Cedis = Cedis;

        }



        public Producto(int id, int idMarca, int idGrupo, String Nombre, float Precio, String Codigo, String Marca, String Grupo,

            int Cargas, int Ventas, int Inventario, DateTime PrimeraCarga, DateTime UltimaCarga)
        {

            this.id = id;

            this.idMarca = idMarca;

            this.idGrupo = idGrupo;

            this.Nombre = Nombre;

            this.Precio = Precio;

            this.Codigo = Codigo;



            this.Marca = Marca;

            this.Grupo = Grupo;



            this.Cargas = Cargas;

            this.Ventas = Ventas;

            this.Inventario = Inventario;

            this.PrimeraCarga = PrimeraCarga;

            this.UltimaCarga = UltimaCarga;

        }



        public Producto(int id, int idMarca, int idGrupo, String Nombre, float Precio, String Codigo, String Marca, String Grupo,

            int Cargas, int CargasReq, int CargasFnl, int Ventas, int Inventario, DateTime PrimeraCarga, DateTime UltimaCarga)
        {

            this.id = id;

            this.idMarca = idMarca;

            this.idGrupo = idGrupo;

            this.Nombre = Nombre;

            this.Precio = Precio;

            this.Codigo = Codigo;



            this.Marca = Marca;

            this.Grupo = Grupo;



            this.Cargas = Cargas;

            this.Ventas = Ventas;

            this.Inventario = Inventario;

            this.PrimeraCarga = PrimeraCarga;

            this.UltimaCarga = UltimaCarga;





            this.CargasReq = CargasReq;

            this.CargasFnl = CargasFnl;

        }







    }

}