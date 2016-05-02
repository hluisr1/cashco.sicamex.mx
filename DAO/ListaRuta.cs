using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class ListaRuta
    {
        public int idRuta;
        public int idLista;
        public DateTime fAlta;
        public bool Activo;

        public int idCedis;
        public String Ruta;
        public String idSupervisor;
        public String Lista;

        

        public ListaRuta() { }

        public ListaRuta(int idRuta, int idLista, DateTime fAlta, bool Activo, int idCedis, String Ruta, String idSupervisor, String Lista)
        {
            this.idRuta = idRuta;
            this.idLista = idLista;
            this.fAlta = fAlta;
            this.Activo = Activo;

            this.idCedis = idCedis;
            this.Ruta = Ruta;
            this.idSupervisor = idSupervisor;
            this.Lista = Lista;
        }
    }
}