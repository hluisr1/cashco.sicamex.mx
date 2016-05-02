using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Factura
    {
        public int id;
        public String Folio;
        public int idCliente;
        public float Monto;
        public String Detalle;
        public String fCreacion;
        public String fLimite;

        public String ApellidoP;
        public String ApellidoM;
        public String Nombre;

        public Factura(){}

        public Factura(int id, String Folio, int idCliente, float Monto, String Detalle, String fCreacion, String fLimite, String ApellidoP, String ApellidoM, String Nombre)
        {
            this.id = id;
            this.Folio = Folio;
            this.idCliente = idCliente;
            this.Monto = Monto;
            this.Detalle = Detalle;
            this.fCreacion = fCreacion;
            this.fLimite = fLimite;

            this.ApellidoP = ApellidoP;
            this.ApellidoM = ApellidoM;
            this.Nombre = Nombre;
        }
    }
}