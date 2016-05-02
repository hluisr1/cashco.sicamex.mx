using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class RutaDiaVisitas
    {
        public DiaVisita DiaVisita;
        public List<DateTime> NextDays;

        public RutaDiaVisitas() { }

        public RutaDiaVisitas(DiaVisita DiaVisita, List<DateTime> NextDays)
        {
            this.DiaVisita = DiaVisita;
            this.NextDays = NextDays;
        }
        
    }
}