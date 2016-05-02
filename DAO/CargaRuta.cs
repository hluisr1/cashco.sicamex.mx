using System;

using System.Collections.Generic;

using System.Linq;

using System.Web;



namespace DAO
{

    public class CargaRuta
    {

        public int id;
        public int idRuta;
        public DateTime fAlta;
        public string idUsuario;
        public int Estatus;

        public int idProducto;
        public int Cantidad_Propuesta;
        public int Cantidad_Requerida;
        public int Cantidad_Final;
        public int idMarca;
        public int idGrupo;
        public string Nombre;
        public float Precio;
        public string Codigo;
        public string Marca;
        public string Grupo;

        public float PrecioModif;
        
        public string Ruta;
        public string Estatus_Str;
        public string Usuario;

        public string Estado;
        public float Monto;


        public CargaRuta() { }
        
        public CargaRuta(int id, int idRuta, DateTime fAlta, string idUsuario, int Estatus)
        {

            this.id = id;

            this.idRuta = idRuta;

            this.fAlta = fAlta;

            this.idUsuario = idUsuario;

            this.Estatus = Estatus;

        }
        
        public CargaRuta(int id, int idProducto, int Cantidad_Propuesta, int Cantidad_Requerida, int Cantidad_Final,
            int idMarca, int idGrupo, string Nombre, float Precio, string Codigo,
            string Marca, string Grupo, float PrecioModif)
        {

            this.id = id;

            this.idProducto = idProducto;
            this.Cantidad_Propuesta = Cantidad_Propuesta;
            this.Cantidad_Requerida = Cantidad_Requerida;
            this.Cantidad_Final = Cantidad_Final;
            this.idMarca = idMarca;
            this.idGrupo = idGrupo;
            this.Nombre = Nombre;
            this.Precio = Precio;
            this.Codigo = Codigo;
            this.Marca = Marca;
            this.Grupo = Grupo;

            this.PrecioModif = PrecioModif;

        }

        
        public CargaRuta(int id, string Ruta, string Estatus_Str, DateTime fAlta, string Usuario)
        {

            this.id = id;

            this.idProducto = 0;

            this.Cantidad_Propuesta = 0;

            this.Cantidad_Requerida = 0;

            this.Cantidad_Final = 0;

            this.idMarca = 0;

            this.idGrupo = 0;

            this.Nombre = "";

            this.Precio = 0;

            this.Codigo = "";

            this.Marca = "";

            this.Grupo = "";

            this.PrecioModif = 0;





            this.id = id;

            this.Ruta = Ruta;

            this.fAlta = fAlta;

            this.Usuario = Usuario;

            this.Estatus_Str = Estatus_Str;

        }

        public CargaRuta(int id, int idRuta, DateTime fAlta, string idUsuario, string Usuario, 
            int Estatus, string Estado, float Monto)
        {

            this.id = id;
            this.idProducto = 0;
            this.Cantidad_Propuesta = 0;
            this.Cantidad_Requerida = 0;

            this.Cantidad_Final = 0;
            this.idMarca = 0;
            this.idGrupo = 0;
            this.Nombre = "";
            this.Precio = 0;
            this.Codigo = "";
            this.Marca = "";
            this.Grupo = "";
            this.PrecioModif = 0;

            this.id = id;
            this.idRuta = idRuta;
            this.fAlta = fAlta;
            this.idUsuario = idUsuario;
            this.Usuario = Usuario;
            this.Estatus = Estatus;
            this.Estado = Estado;
            this.Monto = Monto;

        }





    }

}