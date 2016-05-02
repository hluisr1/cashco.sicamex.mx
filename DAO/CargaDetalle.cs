using System;

using System.Collections.Generic;

using System.Linq;

using System.Web;



namespace DAO
{

    public class CargaDetalle
    {

        public int idCargaRuta;

        public int idProducto;

        public int Cantidad_Propuesta;

        public int Cantidad_Requerida;

        public int Cantidad_Final;



        public string Producto;

        public int Inventario;


        public CargaDetalle()
        { }


        public CargaDetalle(int idCargaRuta, int idProducto, int Cantidad_Propuesta, int Cantidad_Requerida, int Cantidad_Final, string Producto)
        {

            this.idCargaRuta = idCargaRuta;

            this.idProducto = idProducto;

            this.Cantidad_Propuesta = Cantidad_Propuesta;

            this.Cantidad_Requerida = Cantidad_Requerida;

            this.Cantidad_Final = Cantidad_Final;



            this.Producto = Producto;

        }


        public CargaDetalle(int idCargaRuta, int idProducto, int Cantidad_Propuesta, int Cantidad_Requerida, int Cantidad_Final, string Producto, int Inventario)
        {

            this.idCargaRuta = idCargaRuta;

            this.idProducto = idProducto;

            this.Cantidad_Propuesta = Cantidad_Propuesta;

            this.Cantidad_Requerida = Cantidad_Requerida;

            this.Cantidad_Final = Cantidad_Final;



            this.Producto = Producto;


            this.Inventario = Inventario;

        }


    }

}