using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class LiquidacionDiaRuta
    {
        public String Ruta;
        public String Usuario;
        public float Contado;
        public float Credito;
        public float Consignacion;
        public float Total;
        public int Inputs;
        public DateTime fDestinado;
        public DateTime fCreacion;

        public float Deposito;
        public float Diff;

        public LiquidacionDiaRuta() { }

        public LiquidacionDiaRuta(String Ruta, String Usuario, float Contado, float Credito, float Consignacion, float Total, int Inputs, DateTime fDestinado, DateTime fCreacion, float Deposito, float Diff)
        {
            this.Ruta = Ruta;
            this.Usuario = Usuario;
            this.Contado = Contado;
            this.Credito = Credito;
            this.Consignacion = Consignacion;
            this.Total = Total;
            this.Inputs = Inputs;
            this.fDestinado = fDestinado;
            this.fCreacion = fCreacion;

            this.Deposito = Deposito;
            this.Diff = Diff;
        }
    }
}