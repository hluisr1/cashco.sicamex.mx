using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class VentaAcumulada
    {
        public int id;
        public String NombreTienda;
        public String Calle;
        public String NumeroExt;
        public String Colonia;
        public float VentaAcum;
        public String Ruta;
        public DateTime fCreacion;

        public DateTime UltimaVisita;
        public int DiasSinVisita;

        public VentaAcumulada() { }

        public VentaAcumulada(int id, String NombreTienda, String Calle, String NumeroExt, String Colonia, float VentaAcum, String Ruta, DateTime fCreacion)
        {
            this.id = id;
            this.NombreTienda = NombreTienda;
            this.Calle = Calle;
            this.NumeroExt = NumeroExt;
            this.Colonia = Colonia;
            this.VentaAcum = VentaAcum;
            this.Ruta = Ruta;
            this.fCreacion = fCreacion;
        }

        public VentaAcumulada(int id, String NombreTienda, String Calle, String NumeroExt, String Colonia, float VentaAcum, String Ruta, DateTime fCreacion, DateTime UltimaVisita, int DiasSinVisita)
        {
            this.id = id;
            this.NombreTienda = NombreTienda;
            this.Calle = Calle;
            this.NumeroExt = NumeroExt;
            this.Colonia = Colonia;
            this.VentaAcum = VentaAcum;
            this.Ruta = Ruta;
            this.fCreacion = fCreacion;

            this.UltimaVisita = UltimaVisita;
            this.DiasSinVisita = DiasSinVisita;
        }
    }
}