using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Exhibidor
    {
        public int idDireccion;
        public int idMarca;
        public String Tipo;
        public int NumCharolas;
        public int Compartido;
        public int Posicion;
        public int SuajesMetalicos;
        public int MetalicosVacios;
        public int SuajesPlasticos;
        public int PlasticosVacios;
        public String Foto;
        public String CompTipo;
        public int CompNumCharolas;
        public int CompPosicion;
        public String CompFoto;


        public Exhibidor(){}

        public Exhibidor(int idDireccion, int idMarca, String Tipo, int NumCharolas, int Compartido, 
            int Posicion, int SuajesMetalicos, int MetalicosVacios, int SuajesPlasticos, int PlasticosVacios, 
            String Foto, String CompTipo, int CompNumCharolas, int CompPosicion, String CompFoto) 
        {
            this.idDireccion = idDireccion;
            this.idMarca = idMarca;
            this.Tipo = Tipo;
            this.NumCharolas = NumCharolas;
            this.Compartido = Compartido;
            this.Posicion = Posicion;
            this.SuajesMetalicos = SuajesMetalicos;
            this.MetalicosVacios = MetalicosVacios;
            this.SuajesPlasticos = SuajesPlasticos;
            this.PlasticosVacios = PlasticosVacios;
            this.Foto = Foto;
            this.CompTipo = CompTipo;
            this.CompNumCharolas = CompNumCharolas;
            this.CompPosicion = CompPosicion;
            this.CompFoto = CompFoto;
        }
    }
}