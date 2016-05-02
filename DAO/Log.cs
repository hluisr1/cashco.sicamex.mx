using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAO
{
    public class Log
    {
        public int id;
        public int idTabla;
        public int Accion;
        public String idUsuario;
        public DateTime Fecha;

        public String Backup;
        public String Tabla;

        public int Cambios;
        public DateTime NOW;


        public Log() { }

        public Log(int id, int idTabla, int Accion, String idUsuario, DateTime Fecha, String Backup, String Tabla) 
        {
            this.id = id;
            this.idTabla = idTabla;
            this.Accion = Accion;
            this.idUsuario = idUsuario;
            this.Fecha = Fecha;

            this.Backup = Backup;
            this.Tabla = Tabla;
        }

        public Log(String Tabla, int Cambios, DateTime NOW)
        {
            this.Tabla = Tabla;
            this.Cambios = Cambios;

            this.NOW = NOW;
        }


        public Log(String Tabla, int Cambios, DateTime NOW, DateTime Fecha)
        {
            this.Tabla = Tabla;
            this.Cambios = Cambios;
            this.NOW = NOW;

            this.Fecha = Fecha;
        }
    }
}