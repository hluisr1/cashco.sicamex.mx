using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Cobranza
    {
        public String idUsuario;
        public float Liquidado;
        public float PagadoCliente;
        public float EntregadoCliente;
        public float ALiquidar;
        public float PendienteLiquidar;
        public float PendienteCobrar;

        public Cobranza() { }

        public Cobranza(String idUsuario, float Liquidado, float PagadoCliente, float EntregadoCliente, float ALiquidar, float PendienteLiquidar, float PendienteCobrar)
        {
            this.idUsuario = idUsuario;
            this.Liquidado = Liquidado;
            this.PagadoCliente = PagadoCliente;
            this.EntregadoCliente = EntregadoCliente;
            this.ALiquidar = ALiquidar;
            this.PendienteLiquidar = PendienteLiquidar;
            this.PendienteCobrar = PendienteCobrar;
        }
    }
}