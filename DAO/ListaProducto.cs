using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class ListaProducto
    {
        public int idLista;
        public int id;//public int idProducto;
        public float PrecioModif;
        
        public String Lista;
        public int idMarca;
        public String Marca;
        public int idGrupo;
        public String Grupo;
        public String Nombre;
        public float Precio;
        public String Codigo;


        public ListaProducto() { }

        public ListaProducto(int idLista, int id, float PrecioModif, String Lista, int idMarca, 
            String Marca, int idGrupo, String Grupo, String Nombre, float Precio, 
            String Codigo) 
        {
            this.idLista = idLista;
            this.id = id;
            this.PrecioModif = PrecioModif;

            this.Lista = Lista;
            this.idMarca = idMarca;

            this.Marca = Marca;
            this.idGrupo = idGrupo;
            this.Grupo = Grupo;
            this.Nombre = Nombre;
            this.Precio = Precio;

            this.Codigo = Codigo;
        }
    }
}