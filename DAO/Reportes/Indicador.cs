using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Indicador
    {
        /*int idCliente;
        String Nombre;
        int idDia;
        int Secuencia;
        String Evento;
        int DiaVisitado;
        String VisitadoDentro;
        String Fecha;
        String Marca;
        float Total;
        String HICedis;
        String HPrimerClte;
        String HCierreHH;
        double Dif;*/

        public int idCliente;
        public String Nombre;
        public int idDia;
        public int Secuencia;
        public String Evento;
        public String DiaVisitado;
        public String VisitadoDentro;
        String _Fecha;
        public String Marca;
        public String Total;
        public String HICedis;
        public String HPrimerClte;
        public String HCierreHH;
        public String Dif;

        public DateTime Fecha;







        public String Cedis;
        public String Supervisor;
        public String Mes;
        public String Ruta;

        public int Programados;
        public int CltsCompra;
        public int CltsCerrados;
        public int CltsNoCompra;
        public int CltsFueraZona;
        public int CltsCompraFF;
        public String HUltimoClt;



        public Indicador()
        {
        }


        public Indicador(int idCliente, String Nombre, int idDia, int Secuencia, String Evento, String DiaVisitado, String VisitadoDentro,
            String Fecha, String Marca, String Total, String HICedis, String HPrimerClte, String HCierreHH, String Dif)
        {
            ini();

            this.idCliente = idCliente;
            this.Nombre = Nombre;
            this.idDia = idDia;
            this.Secuencia = Secuencia;
            this.Evento = Evento;

            this.DiaVisitado = DiaVisitado;
            this.VisitadoDentro = VisitadoDentro;
            this._Fecha = Fecha;
            get_Fecha();
            this.Marca = Marca;
            this.Total = Total;

            this.HICedis = HICedis;
            this.HPrimerClte = HPrimerClte;
            this.HCierreHH = HCierreHH;
            this.Dif = Dif;
        }



        public Indicador(int idCliente, String Cedis, String Supervisor, String Mes, String Nombre,
            int idDia, int Secuencia, String Evento, String DiaVisitado, String VisitadoDentro,
            String Fecha, String Ruta, String Total, String HICedis, String HPrimerClte,
            String HCierreHH, String Dif,
            int Programados, int CltsCompra, int CltsCerrados, int CltsNoCompra, int CltsFueraZona, int CltsCompraFF, String HUltimoClt)
        {
            ini();

            this.idCliente = idCliente;
            this.Cedis = Cedis;
            this.Supervisor = Supervisor;
            this.Mes = Mes;
            this.Nombre = Nombre;

            this.idDia = idDia;
            this.Secuencia = Secuencia;
            this.Evento = Evento;
            this.DiaVisitado = DiaVisitado;
            this.VisitadoDentro = VisitadoDentro;

            //this.Fecha = Fecha;
            this._Fecha = Fecha;
            get_Fecha();
            this.Ruta = Ruta;
            this.Total = Total;
            this.HICedis = HICedis;
            this.HPrimerClte = HPrimerClte;

            this.HCierreHH = HCierreHH;
            this.Dif = Dif;

            this.Programados = Programados;
            this.CltsCompra = CltsCompra;
            this.CltsCerrados = CltsCerrados;
            this.CltsNoCompra = CltsNoCompra;
            this.CltsFueraZona = CltsFueraZona;
            this.CltsCompraFF = CltsCompraFF;
            this.HUltimoClt = HUltimoClt;

        }


        public void ini()
        {
            this.idCliente = -1;
            this.Nombre = "-";
            this.idDia = -1;
            this.Secuencia = -1;
            this.Evento = "-";
            this.DiaVisitado = "-";
            this.VisitadoDentro = "-";
            //String _Fecha;
            this.Marca = "-";
            this.Total = "-";
            this.HICedis = "-";
            this.HPrimerClte = "-";
            this.HCierreHH = "-";
            this.Dif = "-";
            this.Fecha = new DateTime(2000, 01, 01);


            this.Cedis = "-";
            this.Supervisor = "-";
            this.Mes = "-";
            this.Ruta = "-";
            this.Programados = -1;
            this.CltsCompra = -1;
            this.CltsCerrados = -1;
            this.CltsNoCompra = -1;
            this.CltsFueraZona = -1;
            this.CltsCompraFF = -1;
            this.HUltimoClt = "-";
        }

        public DateTime get_Fecha()
        {

            DateTime dt = new DateTime();

            try
            {
                this.Fecha = DateTime.Parse(this._Fecha);
            }
            catch (Exception e)
            {

                return dt;
            }

            return Fecha;
        }


        public String ToString()
        {

            return Fecha + "";//idCliente + " | " + Nombre + " | " + Fecha;
        }
    }
}