using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class IndicadoresFijosHH
    {
        public int idVisitaCliente;
        public int idCliente;
        public int idCedis;
        public String idSupervisor;         //*//
        public int DiaProg;
        public int Secuencia;
        public int idEstatus;
        public DateTime Fecha;
        public int idRuta;
        public float Total;
        public String HICedis;
        public String HPrimerClt;
        public String HCierre;
        public double Diff;                 //*//
        public DateTime FechaCreacion;      //*//
        public String HUltimoClt;
        public DateTime fInsert;            //*//

        public Double LatE;
        public Double LonE;


        public IndicadoresFijosHH() { }

        public IndicadoresFijosHH(int idVisitaCliente, int idCliente, int idCedis, String idSupervisor, int DiaProg, int Secuencia, int idEstatus, DateTime Fecha, 
                                    int idRuta, float Total, String HICedis, String HPrimerClt, String HCierre, double Diff, 
                                    DateTime FechaCreacion, String HUltimoClt, DateTime fInsert) 
        {
            this.idVisitaCliente = idVisitaCliente;
            this.idCliente = idCliente;
            this.idCedis = idCedis;
            this.idSupervisor = idSupervisor;
            this.DiaProg = DiaProg;
            this.Secuencia = Secuencia;
            this.idEstatus = idEstatus;
            this.Fecha = Fecha;
            this.idRuta = idRuta;
            this.Total = Total;
            this.HICedis = HICedis;
            this.HPrimerClt = HPrimerClt;
            this.HCierre = HCierre;
            this.Diff = Diff;
            this.FechaCreacion = FechaCreacion;
            this.HUltimoClt = HUltimoClt;
            this.fInsert = fInsert;

        }

        public IndicadoresFijosHH(int idVisitaCliente, int idCliente, int idCedis, int DiaProg, int Secuencia, 
                                    DateTime Fecha, int idRuta, float Total, String HICedis, String HPrimerClt, 
                                    String HCierre, String HUltimoClt, Double LatE, Double LonE, int idEstatus)
        {
            this.idVisitaCliente = idVisitaCliente;
            this.idCliente = idCliente;
            this.idCedis = idCedis;
            this.idSupervisor = "-";
            this.DiaProg = DiaProg;
            this.Secuencia = Secuencia;
            this.idEstatus = idEstatus;
            this.Fecha = Fecha;
            this.idRuta = idRuta;
            this.Total = Total;
            this.HICedis = HICedis;
            this.HPrimerClt = HPrimerClt;
            this.HCierre = HCierre;
            this.Diff = -1;
            this.FechaCreacion = new DateTime(1999, 1, 1);
            this.HUltimoClt = HUltimoClt;
            this.fInsert = new DateTime(1999, 1, 1);

            this.LatE = LatE;
            this.LonE = LonE;

        }
    }
}
