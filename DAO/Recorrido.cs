using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Recorrido
    {
        public DateTime fCreacion;
        public int idRuta;
        public Double Latitud;
        public Double Longitud;
        public int Evento;
        public DateTime FechaHH;
        public String Descripcion;
        public String Extra;
        public String Bateria;


        public String Ruta;
        public String idSupervisor;
        public Double CLat;
        public Double CLon;
        public float DiffMts;


        public Recorrido(){}

        public Recorrido(DateTime fCreacion, int idRuta, Double Latitud, Double Longitud, int Evento, DateTime FechaHH, String Descripcion, String Extra, String Bateria)
        {
            this.fCreacion = fCreacion;
            this.idRuta = idRuta;
            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.Evento = Evento;
            this.FechaHH = FechaHH;
            this.Descripcion = Descripcion;
            this.Extra = Extra;
            this.Bateria = Bateria;
        }


        public Recorrido(DateTime fCreacion, int idRuta, Double Latitud, Double Longitud, int Evento, DateTime FechaHH, String Descripcion, String Extra, String Bateria,
                String Ruta, String idSupervisor, Double CLat, Double CLon, float DiffMts)
        {
            this.fCreacion = fCreacion;
            this.idRuta = idRuta;
            this.Latitud = Latitud;
            this.Longitud = Longitud;
            this.Evento = Evento;
            this.FechaHH = FechaHH;
            this.Descripcion = Descripcion;
            this.Extra = Extra;
            this.Bateria = Bateria;

            this.Ruta = Ruta;
            this.idSupervisor = idSupervisor;
            this.CLat = CLat;
            this.CLon = CLon;
            this.DiffMts = DiffMts;
        }
    }
}