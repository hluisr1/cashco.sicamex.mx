using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class UsuarioCarga
    {
        //public int id;
        public String idUsuario;
        //public int idProducto;
        public int Cantidad;
        public float Total;
        public DateTime fCargado;
        public String Usuario;

        public String Productos;
        public String Cantidades;
        public String Montos;


        public UsuarioCarga() { }

        public UsuarioCarga(String idUsuario, int Cantidad, float Total, DateTime fCargado, String Usuario, String Productos, String Cantidades, String Montos) 
        {            
            this.idUsuario = idUsuario;
            this.Cantidad = Cantidad;
            this.Total = Total;
            this.fCargado = fCargado;

            this.Usuario = Usuario;
            this.Productos = Productos;
            this.Cantidades = Cantidades;
            this.Montos = Montos;
        }
    }
}