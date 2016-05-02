using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class SumVisitasDiaRuta
    {
        public int ConVenta;
        public int SinVenta;
        public int NoVisitados;

        public SumVisitasDiaRuta() { }

        public SumVisitasDiaRuta(int ConVenta, int SinVenta, int NoVisitados)
        {
            this.ConVenta = ConVenta;
            this.SinVenta = SinVenta;
            this.NoVisitados = NoVisitados;
        }
    }
}