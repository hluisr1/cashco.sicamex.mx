using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

using MySql.Data.MySqlClient;
using System.Web.Script.Serialization;

using DAO;

using System.Text;
using System.Net.Mail;
using System.Net;


//using System.Configuration.ConfigurationManager.AppSettings;

using System.Configuration;





namespace AdminWeb
{



    public enum Company { SICAMEX, BYDSA, CASH, ONTIME };



    public class Empresa
    {

        public String DB_Connection;



        public Empresa(Company Company)
        {

            switch (Company)
            {

                case Company.SICAMEX:

                    DB_Connection = "Server=204.93.160.35;Database=avg93312_scmxAdminw;Uid=avg93312_root;Pwd=avg1496;";

                    break;



                case Company.BYDSA:

                    break;



                case Company.CASH:

                    break;



                case Company.ONTIME:

                    break;

            }

        }

    }



    class MyException : System.Exception { }





    /// <summary>

    /// Descripción breve de fWS

    /// </summary>

    [WebService(Namespace = "http://tempuri.org/")]

    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]

    [System.ComponentModel.ToolboxItem(false)]



    // Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 

    [System.Web.Script.Services.ScriptService]

    public class fWS : System.Web.Services.WebService
    {
     
        private MySqlConnection conn;// = new MySqlConnection();
        
        private void DB_OpenConn(Empresa Empresa)
        {

            MySqlConnection conn = new MySqlConnection();

            conn.ConnectionString = Empresa.DB_Connection;



            try
            {

                conn.Open();

            }

            catch (Exception ex)
            {

                int i = 0;

            }

        }
        
        private void DB_OpenConn_OLD_1496(String CompanyCode)
        {

            conn = new MySqlConnection();

            conn.ConnectionString = getConnection(CompanyCode);



            try
            {

                conn.Open();

            }

            catch (Exception ex)
            {

                int i = 0;

            }

        }
        
        private void DB_OpenConn(String CompanyCode)
        {

            conn = new MySqlConnection(getConnection(CompanyCode));



            try
            {

                conn.Open();

            }

            catch (MySqlException ex)
            {

                ClearAllPoolMySQL();



                EnviaMail("arturovillgon@hotmail.com", "Servidor BD " + CompanyCode,

                    "<h2>ERROR AL ABRIR CONECCION DE LA BD [<strong>" + CompanyCode + "</strong>]</h2>" +

                    "<p>Message: " + ex.Message +

                    "</p><p>Source: " + ex.Source +

                    "</p><p>Numero: " + ex.Number +

                    "</p><p>StackTrace: " + ex.StackTrace +

                    "</p><p>TargetSite: " + ex.TargetSite +

                    "</p><p>ToString: " + ex.ToString() +

                    "</p><p>DateTime: " + DateTime.Now);





                conn.Open();



                int i = 0;

            }

        }
        
        private void DB_OpenConn_VIP_ping(String CompanyCode)
        {

            conn = new MySqlConnection(getConnection(CompanyCode));



            try
            {

                conn.Open();

            }

            catch (MySqlException ex)
            {

                ClearAllPoolMySQL();

                EnviaMail("arturovillgon@hotmail.com", "VIP - Servidor BD " + CompanyCode,

                    "<h2>ERROR AL ABRIR CONECCION DE LA BD [<strong>" + CompanyCode + "</strong>]</h2>" +

                    "<p>Message: " + ex.Message +

                    "</p><p>Numero: " + ex.Number +

                    "</p><p>Source: " + ex.Source +

                    "</p><p>StackTrace: " + ex.StackTrace +

                    "</p><p>TargetSite: " + ex.TargetSite +

                    "</p><p>ToString: " + ex.ToString() +

                    "</p><p>DateTime: " + DateTime.Now);

                int i = 0;

            }

        }
        
        private void DB_CloseConn()
        {

            try
            {

                conn.Close();

            }

            catch (Exception ex)
            {

                int i = 0;

            }

        }
        
        private String getConnection(String CompanyCode)
        {

            /*
             SCMEX765FG2R
             BYDSA98GY1B3
             CASH48J9GX7Y
             ONTIME56SD09
             * "BYDSA0MTY3Z7";
             */

            String DB_Connection = null;



            CompanyCode = CompanyCode.Split('.')[0];





            switch (CompanyCode)
            {

                case "SCMEX765FG2R":

                    DB_Connection = "Server=204.93.160.35;Database=avg93312_scmxAdminw;Uid=avg93312_root;Pwd=avg1496;";

                    break;



                case "BYDSA98GY1B3":

                    break;



                case "BYDSA0MTY3Z7":

                    DB_Connection = "Server=mysql52.sys10.hostasp.net;Database=bydsa_mty;Uid=avg1496;Pwd=avg1496;";

                    //DB_Connection = "Server=sub.sicamex.mx;Database=bydsa_mty;Uid=urmto;Pwd=51c4M3x10115298EAG;ConnectionLifeTime=400;Connection Timeout=400;";

                    //DB_Connection = "Server=sub.sicamex.mx;Database=bydsa_mty;Uid=urmto;Pwd=51c4M3x10115298EAG;";

                    DB_Connection = "Database=bydsa_mty;Data Source=us-cdbr-azure-southcentral-e.cloudapp.net;User Id=b18b948d402251;Password=54bed342";



                    DB_Connection = ConfigurationManager.AppSettings["bydsa_az"].ToString();



                    break;



                case "BYDSA0MTY3Z7_TEST":

                    DB_Connection = "Server=mysql52.sys10.hostasp.net;Database=bydsa_mty;Uid=avg1496;Pwd=avg1496;";

                    DB_Connection = "Server=sub.sicamex.mx;Database=pruebasbydsa;Uid=urmto;Pwd=51c4M3x10115298EAG;";

                    DB_Connection = ConfigurationManager.AppSettings["bydsa_test"].ToString();

                    break;



                case "CASH48J9GX7Y":

                    DB_Connection = "Server=204.93.160.35;Database=avg93312_cash;Uid=avg93312_root;Pwd=avg1496;";

                    DB_Connection = "Server=mysql52.sys10.hostasp.net;Database=cash;Uid=avg1496;Pwd=avg1496;";

                    //DB_Connection = "Server=sub.sicamex.mx;Database=cash;Uid=urmto;Pwd=51c4M3x10115298EAG;ConnectionLifeTime=400;Connection Timeout=400;";

                    DB_Connection = "Server=sub.sicamex.mx;Database=cash;Uid=urmto;Pwd=51c4M3x10115298EAG;";



                    DB_Connection = "Server=sub.sicamex.mx;Database=cash;Uid=urmto;Pwd=51c4M3x10115298EAG;MaximumPoolsize=300;";



                    DB_Connection = ConfigurationManager.AppSettings["cash"].ToString();



                    break;



                case "CASH48J9GX7Y_TEST":

                    DB_Connection = "Server=mysql52.sys10.hostasp.net;Database=pruebascash;Uid=avg1496;Pwd=avg1496;";

                    DB_Connection = "Server=dragon210.startdedicated.com;Database=pruebascash;Uid=urmto;Pwd=sicamex123;";

                    DB_Connection = "Server=sub.sicamex.mx;Database=pcash;Uid=urmto;Pwd=51c4M3x10115298EAGa;";



                    DB_Connection = ConfigurationManager.AppSettings["cash_test"].ToString();

                    //http://sub.sicamex.mx/

                    break;





                case "SCMEX765FG2R_TEST":

                    DB_Connection = "Server=mysql52.sys10.hostasp.net;Database=pruebassicamex;Uid=avg1496;Pwd=avg1496;";

                    break;



                case "ONTIME56SD09":

                    break;



                //case "SCMEX765FG2R_TEST":

                case "CNCUN34R63J9":

                    DB_Connection = "Server=sub.sicamex.mx;Database=cancun;Uid=urmto;Pwd=51c4M3x10115298EAG;";

                    break;





                case "CASH48J9GX7Y_DEVELOP":

                    DB_Connection = ConfigurationManager.AppSettings["cash_desarrollo"].ToString();

                    //DB_Connection = ConfigurationManager.AppSettings["cash_test"].ToString();

                    break;

            }



            return DB_Connection;

        }
        

        #region -------------------------------| CEDIS |------------------------------------



        [WebMethod]

        public void i_Cedis(String CompanyCode, String Nombre, double Latitud, double Longitud, String nEmpresa, String RFC, String Telefono, String Domicilio)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Cedis(@Nombre, @Lat, @Lon, @nEmpresa, @RFC, @Telefono, @Domicilio)";

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@Lat", Latitud);

            cmd.Parameters.AddWithValue("@Lon", Longitud);



            cmd.Parameters.AddWithValue("@nEmpresa", nEmpresa);

            cmd.Parameters.AddWithValue("@RFC", RFC);

            cmd.Parameters.AddWithValue("@Telefono", Telefono);

            cmd.Parameters.AddWithValue("@Domicilio", Domicilio);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Cedis(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Cedis()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Cedis> L_Cedis = new List<Cedis>();

            while (r.Read())
            {

                //L_Cedis.Add(new Cedis(r.GetInt32("id"), r.GetString("Nombre"), r.GetDouble("Latitud"), r.GetDouble("Longitud")));

                try
                {

                    L_Cedis.Add(new Cedis(r.GetInt32("id"), r.GetString("Nombre"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetString("nEmpresa"), r.GetString("RFC"), r.GetString("Telefono"), r.GetString("Domicilio")));

                }

                catch (Exception ex)
                {

                    L_Cedis.Add(new Cedis(r.GetInt32("id"), r.GetString("Nombre"), r.GetDouble("Latitud"), r.GetDouble("Longitud")));

                }



            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Cedis);



            return json;



        }



        [WebMethod]

        public List<Cedis> sL_Cedis(String CompanyCode)
        {

            MySqlConnection conn_n = new MySqlConnection(getConnection(CompanyCode));

            try
            {

                DB_OpenConn(CompanyCode);



                //conn_n.Open();

                //MySqlCommand cmd = new MySqlCommand("CALL s_Cedis()", conn_n);

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_Cedis()";

                cmd.Connection = conn;





                MySqlDataReader r = cmd.ExecuteReader();

                List<Cedis> L_Cedis = new List<Cedis>();

                while (r.Read())
                {

                    //L_Cedis.Add(new Cedis(r.GetInt32("id"), r.GetString("Nombre"), r.GetDouble("Latitud"), r.GetDouble("Longitud")));

                    try
                    {

                        L_Cedis.Add(new Cedis(r.GetInt32("id"), r.GetString("Nombre"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetString("nEmpresa"), r.GetString("RFC"), r.GetString("Telefono"), r.GetString("Domicilio")));

                    }

                    catch (Exception ex)
                    {

                        L_Cedis.Add(new Cedis(r.GetInt32("id"), r.GetString("Nombre"), r.GetDouble("Latitud"), r.GetDouble("Longitud")));

                    }



                }



                DB_CloseConn();

                //conn_n.Close();



                return L_Cedis;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                //conn_n.Close();

                throw Ex;

            }



        }





        [WebMethod]

        public void u_Cedis(String CompanyCode, int id, String Nombre, double Latitud, double Longitud, String nEmpresa, String RFC, String Telefono, String Domicilio)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Cedis(@id, @Nombre, @Lat, @Lon, @nEmpresa, @RFC, @Telefono, @Domicilio)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@Lat", Latitud);

            cmd.Parameters.AddWithValue("@Lon", Longitud);



            cmd.Parameters.AddWithValue("@nEmpresa", nEmpresa);

            cmd.Parameters.AddWithValue("@RFC", RFC);

            cmd.Parameters.AddWithValue("@Telefono", Telefono);

            cmd.Parameters.AddWithValue("@Domicilio", Domicilio);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Cedis(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Cedis(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| TIPO USUARIO |-----------------------------



        [WebMethod]

        public void i_TipoUsuario(String CompanyCode, String Nombre, int Auth, String Descripcion)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_TipoUsuario(@Nombre, @Auth, @Desc)";

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@Auth", Auth);

            cmd.Parameters.AddWithValue("@Desc", Descripcion);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_TipoUsuario(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_TipoUsuario()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<TipoUsuario> L_TipoUsuario = new List<TipoUsuario>();

            while (r.Read())
            {

                L_TipoUsuario.Add(new TipoUsuario(r.GetInt32("id"), r.GetString("Nombre"), r.GetInt32("Auth"), r.GetString("Descripcion")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_TipoUsuario);



            return json;



        }



        [WebMethod]

        public List<TipoUsuario> sL_TipoUsuario(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_TipoUsuario()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<TipoUsuario> L_TipoUsuario = new List<TipoUsuario>();

            while (r.Read())
            {

                L_TipoUsuario.Add(new TipoUsuario(r.GetInt32("id"), r.GetString("Nombre"), r.GetInt32("Auth"), r.GetString("Descripcion")));

            }





            DB_CloseConn();



            return L_TipoUsuario;



        }





        [WebMethod]

        public void u_TipoUsuario(String CompanyCode, int id, String Nombre, int Auth, String Descripcion)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_TipoUsuario(@id, @Nombre, @Auth, @Desc)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@Auth", Auth);

            cmd.Parameters.AddWithValue("@Desc", Descripcion);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_TipoUsuario(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_TipoUsuario(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| USUARIO |----------------------------------



        [WebMethod]

        public void i_Usuario(String CompanyCode, String Nickname, int idCedis, int idTipo, String Nombre, String ApePat, String ApeMat, String Celular, String Email, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Usuario(@Nickname, @idCedis, @idTipo, @Nombre, @ApePat, @ApeMat, @Cel, @Email, @idUsuario)";

            cmd.Parameters.AddWithValue("@Nickname", Nickname);

            cmd.Parameters.AddWithValue("@idCedis", idCedis);

            cmd.Parameters.AddWithValue("@idTipo", idTipo);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@ApePat", ApePat);

            cmd.Parameters.AddWithValue("@ApeMat", ApeMat);

            cmd.Parameters.AddWithValue("@Cel", Celular);



            cmd.Parameters.AddWithValue("@Email", Email);



            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Usuario(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Usuario()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Usuario> L_Usuario = new List<Usuario>();

            while (r.Read())
            {

                String Celular, Email, Pass;

                try { Celular = r.GetString("Celular"); }

                catch (Exception) { Celular = ""; }

                try { Email = r.GetString("Email"); }

                catch (Exception) { Email = ""; }

                try { Pass = r.GetString("Pass"); }

                catch (Exception) { Pass = ""; }



                L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                    r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Usuario);



            return json;



        }



        [WebMethod]

        public List<Usuario> sL_Usuario(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Usuario()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Usuario> L_Usuario = new List<Usuario>();

            while (r.Read())
            {

                String Celular, Email, Pass;

                try { Celular = r.GetString("Celular"); }

                catch (Exception) { Celular = ""; }

                try { Email = r.GetString("Email"); }

                catch (Exception) { Email = ""; }

                try { Pass = r.GetString("Pass"); }

                catch (Exception) { Pass = ""; }



                L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                    r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

            }





            DB_CloseConn();



            return L_Usuario;



        }





        [WebMethod]

        public String s_UsuarioVen(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_UsuarioVen()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Usuario> L_Usuario = new List<Usuario>();

            while (r.Read())
            {

                String Celular, Email, Pass;

                try { Celular = r.GetString("Celular"); }

                catch (Exception) { Celular = ""; }

                try { Email = r.GetString("Email"); }

                catch (Exception) { Email = ""; }

                try { Pass = r.GetString("Pass"); }

                catch (Exception) { Pass = ""; }



                L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                    r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Usuario);



            return json;



        }



        [WebMethod]

        public List<Usuario> sL_UsuarioVen(String CompanyCode)
        {

            try
            {

                //NUEVO.CEDIS

                String[] Code = CompanyCode.Split('.');

                int idCedis = 1;

                try { idCedis = int.Parse(Code[1]); }

                catch (Exception) { }



                //DB_OpenConn(CompanyCode);

                DB_OpenConn(Code[0]);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_UsuarioVen()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Usuario> L_Usuario = new List<Usuario>();

                while (r.Read())
                {

                    if (idCedis == r.GetInt32("idCedis"))
                    {

                        String Celular, Email, Pass;

                        try { Celular = r.GetString("Celular"); }

                        catch (Exception) { Celular = ""; }

                        try { Email = r.GetString("Email"); }

                        catch (Exception) { Email = ""; }

                        try { Pass = r.GetString("Pass"); }

                        catch (Exception) { Pass = ""; }



                        L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                            r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

                    }



                }





                DB_CloseConn();



                return L_Usuario;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }





        }





        [WebMethod]

        public String s_UsuarioTipoBTWN(String CompanyCode, int minAuth, int maxAuth)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_UsuarioTipoBTWN(@minAuth, @maxAuth)";

            cmd.Parameters.AddWithValue("@minAuth", minAuth);

            cmd.Parameters.AddWithValue("@maxAuth", maxAuth);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Usuario> L_Usuario = new List<Usuario>();

            while (r.Read())
            {

                String Celular, Email, Pass;

                try { Celular = r.GetString("Celular"); }

                catch (Exception) { Celular = ""; }

                try { Email = r.GetString("Email"); }

                catch (Exception) { Email = ""; }

                try { Pass = r.GetString("Pass"); }

                catch (Exception) { Pass = ""; }



                L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                    r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Usuario);



            return json;



        }



        [WebMethod]

        public List<Usuario> sL_UsuarioTipoBTWN(String CompanyCode, int minAuth, int maxAuth)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_UsuarioTipoBTWN(@minAuth, @maxAuth)";

            cmd.Parameters.AddWithValue("@minAuth", minAuth);

            cmd.Parameters.AddWithValue("@maxAuth", maxAuth);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Usuario> L_Usuario = new List<Usuario>();

            while (r.Read())
            {

                String Celular, Email, Pass;

                try { Celular = r.GetString("Celular"); }

                catch (Exception) { Celular = ""; }

                try { Email = r.GetString("Email"); }

                catch (Exception) { Email = ""; }

                try { Pass = r.GetString("Pass"); }

                catch (Exception) { Pass = ""; }



                L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                    r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

            }





            DB_CloseConn();



            return L_Usuario;



        }





        [WebMethod]

        public String v_Usuario(String CompanyCode, String idUsuario)
        {

            Codificador COD = new Codificador();



            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_OneUsuario(@idUsuario)";

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Usuario> L_Usuario = new List<Usuario>();

            while (r.Read())
            {

                String Celular, Email, Pass;

                try { Celular = r.GetString("Celular"); }

                catch (Exception) { Celular = ""; }

                try { Email = r.GetString("Email"); }

                catch (Exception) { Email = ""; }

                try { Pass = r.GetString("Pass"); }

                catch (Exception) { Pass = ""; }



                L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                    r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Usuario);



            return json;



        }



        [WebMethod]

        public String v_Usuario_2(String CompanyCode, String idUsuario)
        {

            Codificador COD = new Codificador();

            DB_OpenConn(CompanyCode);

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_OneUsuario(@idUsuario)";

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Usuario> L_Usuario = new List<Usuario>();

            while (r.Read())
            {

                String Celular, Email, Pass;

                try { Celular = r.GetString("Celular"); }

                catch (Exception) { Celular = ""; }

                try { Email = r.GetString("Email"); }

                catch (Exception) { Email = ""; }

                try { Pass = r.GetString("Pass"); }

                catch (Exception) { Pass = ""; }



                L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                    r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Usuario);



            return json;



        }





        [WebMethod]

        public List<Usuario> vL_Usuario(String CompanyCode, String idUsuario)
        {

            Codificador COD = new Codificador();



            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_OneUsuario(@idUsuario)";

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Usuario> L_Usuario = new List<Usuario>();

            while (r.Read())
            {

                String Celular, Email, Pass;

                try { Celular = r.GetString("Celular"); }

                catch (Exception) { Celular = ""; }

                try { Email = r.GetString("Email"); }

                catch (Exception) { Email = ""; }

                try { Pass = r.GetString("Pass"); }

                catch (Exception) { Pass = ""; }



                L_Usuario.Add(new Usuario(r.GetString("Nickname"), r.GetInt32("idCedis"), r.GetInt32("idTipo"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), Celular, r.GetBoolean("Activo"),

                    r.GetString("CEDIS"), r.GetString("Tipo Usuario"), r.GetInt32("Auth"), Email, r.GetDateTime("fAlta"), Pass));

            }





            DB_CloseConn();



            return L_Usuario;



        }







        [WebMethod]

        public void u_Usuario(String CompanyCode, String Nickname, int idCedis, int idTipo, String Nombre, String ApePat, String ApeMat, String Celular, bool Activo, String Email, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Usuario(@Nickname, @idCedis, @idTipo, @Nombre, @ApePat, @ApeMat, @Cel, @Activo, @Email, @idUsuario)";

            cmd.Parameters.AddWithValue("@Nickname", Nickname);

            cmd.Parameters.AddWithValue("@idCedis", idCedis);

            cmd.Parameters.AddWithValue("@idTipo", idTipo);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@ApePat", ApePat);

            cmd.Parameters.AddWithValue("@ApeMat", ApeMat);

            cmd.Parameters.AddWithValue("@Cel", Celular);

            cmd.Parameters.AddWithValue("@Activo", Activo);



            cmd.Parameters.AddWithValue("@Email", Email);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Usuario(String CompanyCode, String Nickname, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Usuario(@Nickname, @idUsuario)";

            cmd.Parameters.AddWithValue("@Nickname", Nickname);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| ASUETO |-----------------------------------



        [WebMethod]

        public void i_Asueto(String CompanyCode, String Fecha)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Asueto(@Fecha)";

            cmd.Parameters.AddWithValue("@Fecha", Fecha);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Asueto(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Asueto()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Asueto> L_Asueto = new List<Asueto>();

            while (r.Read())
            {

                L_Asueto.Add(new Asueto(r.GetInt32("id"), r.GetString("Fecha")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Asueto);



            return json;



        }



        [WebMethod]

        public List<Asueto> sL_Asueto(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Asueto()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Asueto> L_Asueto = new List<Asueto>();

            while (r.Read())
            {

                L_Asueto.Add(new Asueto(r.GetInt32("id"), r.GetString("Fecha")));

            }





            DB_CloseConn();



            return L_Asueto;



        }





        [WebMethod]

        public void u_Asueto(String CompanyCode, int id, String Fecha)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Asueto(@id, @Fecha)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Fecha", Fecha);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Asueto(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Asueto(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| MARCA |------------------------------------



        [WebMethod]

        public void i_Marca(String CompanyCode, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Marca(@Nombre)";

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Marca(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Marca()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Marca> L_Marca = new List<Marca>();

            while (r.Read())
            {

                L_Marca.Add(new Marca(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Marca);



            return json;



        }



        [WebMethod]

        public List<Marca> sL_Marca(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Marca()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Marca> L_Marca = new List<Marca>();

            while (r.Read())
            {

                L_Marca.Add(new Marca(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            return L_Marca;



        }





        [WebMethod]

        public void u_Marca(String CompanyCode, int id, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Marca(@id, @Nombre)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Marca(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Marca(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| GRUPO |------------------------------------



        [WebMethod]

        public void i_Grupo(String CompanyCode, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Grupo(@Nombre)";

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Grupo(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Grupo()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Grupo> L_Grupo = new List<Grupo>();

            while (r.Read())
            {

                L_Grupo.Add(new Grupo(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Grupo);



            return json;



        }



        [WebMethod]

        public List<Grupo> sL_Grupo(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Grupo()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Grupo> L_Grupo = new List<Grupo>();

            while (r.Read())
            {

                L_Grupo.Add(new Grupo(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            return L_Grupo;



        }





        [WebMethod]

        public void u_Grupo(String CompanyCode, int id, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Grupo(@id, @Nombre)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Grupo(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Grupo(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| PRODUCTO |---------------------------------



        [WebMethod]

        public void i_Producto(String CompanyCode, int idMarca, int idGrupo, String Nombre, float Precio, String Codigo, String Cedis_GPO, String idUsuario)
        {



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Producto(@idMarca, @idGrupo, @Nombre, @Precio, @Codigo, @idUsuario)";

            cmd.Parameters.AddWithValue("@idMarca", idMarca);

            cmd.Parameters.AddWithValue("@idGrupo", idGrupo);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@Precio", Precio);

            cmd.Parameters.AddWithValue("@Codigo", Codigo);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            if (v_ProductoCode(CompanyCode, Codigo)) { DB_CloseConn(); throw new Exception("Ya existe un Producto con ese Codigo !!"); }



            DB_OpenConn(CompanyCode);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            //------------------------------------------------

            cmd.CommandText = "CALL s_LastidProducto();";

            MySqlDataReader r = cmd.ExecuteReader();

            int idProducto = 0;

            while (r.Read())
            {

                idProducto = r.GetInt32("LastID");

            }

            //------------------------------------------------





            DB_CloseConn();



            //------------------------------------------------

            String[] CEDIS = Cedis_GPO.Split('|');

            foreach (String c in CEDIS)
            {

                i_ProductoCedis(CompanyCode, idProducto, c);

            }

            //------------------------------------------------





        }



        [WebMethod]

        public void i_ProductoCedis(String CompanyCode, int idProducto, String idCedis)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_ProductoCedis(@idProducto, @idCedis)";

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@idCedis", idCedis);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }





        [WebMethod]

        public String s_Producto(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Producto()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Producto> L_Producto = new List<Producto>();

            while (r.Read())
            {

                L_Producto.Add(new Producto(r.GetInt32("id"), r.GetInt32("idMarca"), r.GetInt32("idGrupo"), r.GetString("Nombre"), r.GetFloat("Precio"), r.GetString("Codigo"), r.GetString("Marca"), r.GetString("Grupo"), r.GetString("idCedis"), r.GetString("Cedis")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Producto);



            return json;



        }



        [WebMethod]

        public List<Producto> sL_Producto(String CompanyCode)
        {

            try
            {

                //NUEVO.CEDIS

                String[] Code = CompanyCode.Split('.');

                int idCedis = 1;

                try { idCedis = int.Parse(Code[1]); }

                catch (Exception) { }



                //DB_OpenConn(CompanyCode);

                DB_OpenConn(Code[0]);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_Producto()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Producto> L_Producto = new List<Producto>();

                while (r.Read())
                {

                    if (idCedis == r.GetInt32("idCedis"))
                    {

                        L_Producto.Add(new Producto(r.GetInt32("id"), r.GetInt32("idMarca"), r.GetInt32("idGrupo"), r.GetString("Nombre"), r.GetFloat("Precio"), r.GetString("Codigo"), r.GetString("Marca"), r.GetString("Grupo"), r.GetString("idCedis"), r.GetString("Cedis")));

                    }

                }





                DB_CloseConn();



                return L_Producto;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }





        [WebMethod]

        public void u_Producto(String CompanyCode, int id, int idMarca, int idGrupo, String Nombre, float Precio, String Codigo, String Cedis_GPO, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Producto(@id, @idMarca, @idGrupo, @Nombre, @Precio, @Codigo, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idMarca", idMarca);

            cmd.Parameters.AddWithValue("@idGrupo", idGrupo);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@Precio", Precio);

            cmd.Parameters.AddWithValue("@Codigo", Codigo);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();



            //------------------------------------------------

            String[] CEDIS = Cedis_GPO.Split('|');

            foreach (String c in CEDIS)
            {

                i_ProductoCedis(CompanyCode, id, c);

            }

            //------------------------------------------------



        }



        [WebMethod]

        public void d_Producto(String CompanyCode, int id, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Producto(@id, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }







        [WebMethod]

        public bool v_ProductoCode(String CompanyCode, string Codigo)
        {

            DB_OpenConn(CompanyCode);



            bool bnd = false;



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_ProductoCode('" + Codigo + "')";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Producto> L_Producto = new List<Producto>();

            while (r.Read())
            {



                //L_Producto.Add(new Producto(r.GetInt32("id"), r.GetInt32("idMarca"), r.GetInt32("idGrupo"), r.GetString("Nombre"), r.GetFloat("Precio"), r.GetString("Codigo"), r.GetString("Marca"), r.GetString("Grupo"), r.GetString("idCedis"), r.GetString("Cedis")));

                bnd = true;

            }





            DB_CloseConn();





            return bnd;



        }







        #endregion
                
        #region -------------------------------| PROMOCION |--------------------------------



        [WebMethod]

        public void i_Promocion(String CompanyCode, int idProducto, String Descripcion, String fInicio, String fFin, float Porcentaje, int CantMin)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Promocion(@idProducto, @Descripcion, @fInicio, @fFin, @Porcentaje, @CantMin)";

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@fInicio", fInicio);

            cmd.Parameters.AddWithValue("@fFin", fFin);

            cmd.Parameters.AddWithValue("@Porcentaje", Porcentaje);

            cmd.Parameters.AddWithValue("@CantMin", CantMin);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();





            DB_CloseConn();



        }





        [WebMethod]

        public String s_Promocion(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Promocion()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Promocion> L_Promocion = new List<Promocion>();

            while (r.Read())
            {

                L_Promocion.Add(new Promocion(r.GetInt32("id"), r.GetInt32("idProducto"), r.GetString("Descripcion"), r.GetDateTime("fInicio"), r.GetDateTime("fFin"), r.GetFloat("Porcentaje"), r.GetInt32("CantMin"), r.GetString("Producto")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Promocion);



            return json;



        }



        [WebMethod]

        public List<Promocion> sL_Promocion(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Promocion()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Promocion> L_Promocion = new List<Promocion>();

            while (r.Read())
            {

                L_Promocion.Add(new Promocion(r.GetInt32("id"), r.GetInt32("idProducto"), r.GetString("Descripcion"), r.GetDateTime("fInicio"), r.GetDateTime("fFin"), r.GetFloat("Porcentaje"), r.GetInt32("CantMin"), r.GetString("Producto")));

            }





            DB_CloseConn();



            return L_Promocion;



        }





        [WebMethod]

        public void u_Promocion(String CompanyCode, int id, int idProducto, String Descripcion, String fInicio, String fFin, float Porcentaje, int CantMin)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Promocion(@id, @idProducto, @Descripcion, @fInicio, @fFin, @Porcentaje, @CantMin)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@fInicio", fInicio);

            cmd.Parameters.AddWithValue("@fFin", fFin);

            cmd.Parameters.AddWithValue("@Porcentaje", Porcentaje);

            cmd.Parameters.AddWithValue("@CantMin", CantMin);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();



        }



        [WebMethod]

        public void d_Promocion(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Promocion(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| CLIENTE |----------------------------------



        [WebMethod]

        public int i_Cliente(String CompanyCode, int idCedis, String NombreTienda, String Nombre, String ApePat, String ApeMat, String Celular, String Correo, String idUsuario)
        {

            try
            {

                int id = 0;



                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_Cliente(@idCedis, @NombreTienda, @Nombre, @ApePat, @ApeMat, @Cel, @Correo, @idUsuario)";

                cmd.Parameters.AddWithValue("@idCedis", idCedis);

                cmd.Parameters.AddWithValue("@Nombre", Nombre);

                cmd.Parameters.AddWithValue("@ApePat", ApePat);

                cmd.Parameters.AddWithValue("@ApeMat", ApeMat);

                cmd.Parameters.AddWithValue("@Cel", Celular);



                cmd.Parameters.AddWithValue("@NombreTienda", NombreTienda);

                cmd.Parameters.AddWithValue("@Correo", Correo);



                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



                cmd.Connection = conn;



                //cmd.ExecuteNonQuery();

                MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {

                    id = r.GetInt32("id");

                }



                DB_CloseConn();



                return id;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public void i_Clientes(String CompanyCode, String Ls_Clientes, String idUsuario)
        {

            List<Cliente> L_RegRuta = new List<Cliente>();

            String[] OBJ = Ls_Clientes.Split('|');



            foreach (String obj in OBJ)
            {

                String[] RRS = obj.Split(',');



                Cliente Clt = new Cliente();

                Clt.id = int.Parse(RRS[0]);

                Clt.idCedis = int.Parse(RRS[1].ToString());

                Clt.NombreTienda = RRS[2].ToString();



                Clt.Nombre = RRS[3].ToString();

                Clt.ApellidoP = RRS[4].ToString();

                Clt.ApellidoM = RRS[5].ToString();

                Clt.Celular = RRS[6].ToString();



                Clt.Correo = RRS[7].ToString();

                Clt.fCreacion = DateTime.Parse(RRS[8]);



                i_Cliente(CompanyCode, Clt.idCedis, Clt.NombreTienda, Clt.Nombre, Clt.ApellidoP, Clt.ApellidoM, Clt.Celular, Clt.Correo, idUsuario);

            }



        }



        [WebMethod]

        public bool i_ClienteNuevo(String CompanyCode, int idCedis, String NombreTienda, String Nombre, String ApePat, String ApeMat, String Celular, String Correo, String idUsuario,

                                        String str_Direccion, String str_VisitaCliente, String str_DiaVisita, String str_DetalleVisita, String str_EntregaProducto, String str_Devolucion)
        {

            try
            {

                int id = 0;



                DB_OpenConn(CompanyCode);



                try
                {

                    DB_OpenConn(CompanyCode);

                    MySqlCommand cmd = new MySqlCommand();

                    cmd.CommandText = "INSERT INTO TEST(Campo1, Campo2, Campo3, Campo4, Campo5, Campo6) values(@C1, @C2, @C3, @C4, @C5, @C6);";

                    cmd.Parameters.AddWithValue("@C1", str_Direccion);

                    cmd.Parameters.AddWithValue("@C2", str_VisitaCliente);

                    cmd.Parameters.AddWithValue("@C3", str_DiaVisita);

                    cmd.Parameters.AddWithValue("@C4", str_DetalleVisita);

                    String str_EntregaProducto_2 = str_EntregaProducto.Length > 740 ? str_EntregaProducto.Substring(1, 740) : str_EntregaProducto;

                    cmd.Parameters.AddWithValue("@C5", str_EntregaProducto_2);

                    String str_Devolucion_2 = (str_Devolucion + "@" + DateTime.Now).Length > 740 ? (str_Devolucion + "@" + DateTime.Now).Substring(1, 740) : (str_Devolucion + "@" + DateTime.Now);

                    cmd.Parameters.AddWithValue("@C6", str_Devolucion_2);

                    cmd.Connection = conn;

                    //cmd.ExecuteNonQuery();

                    cmd.ExecuteNonQuery();





                    //MySqlCommand cmd = new MySqlCommand();

                    cmd = new MySqlCommand();

                    cmd.CommandText = "CALL i_Cliente(@idCedis, @NombreTienda, @Nombre, @ApePat, @ApeMat, @Cel, @Correo, @idUsuario)";

                    cmd.Parameters.AddWithValue("@idCedis", idCedis);

                    cmd.Parameters.AddWithValue("@Nombre", Nombre);

                    cmd.Parameters.AddWithValue("@ApePat", ApePat);

                    cmd.Parameters.AddWithValue("@ApeMat", ApeMat);

                    cmd.Parameters.AddWithValue("@Cel", Celular);



                    cmd.Parameters.AddWithValue("@NombreTienda", NombreTienda);

                    cmd.Parameters.AddWithValue("@Correo", Correo);



                    cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



                    cmd.Connection = conn;



                    //cmd.ExecuteNonQuery();

                    MySqlDataReader r = cmd.ExecuteReader();

                    while (r.Read())
                    {

                        id = r.GetInt32("id");

                    }



                    DB_CloseConn();





                    String SP_R = "|";

                    String SP_B = "?";



                    String[] RowsDIR = str_Direccion.Split(new string[] { SP_R }, StringSplitOptions.None);

                    List<String[]> L_DIR = new List<String[]>();

                    for (int i = 0; i < RowsDIR.Length; i++)
                    {

                        L_DIR.Add(RowsDIR[i].Split(new string[] { SP_B }, StringSplitOptions.None));

                    }



                    String[] RowsVC = str_VisitaCliente.Split(new string[] { SP_R }, StringSplitOptions.None);

                    List<String[]> L_VC = new List<String[]>();

                    for (int i = 0; i < RowsVC.Length; i++)
                    {

                        L_VC.Add(RowsVC[i].Split(new string[] { SP_B }, StringSplitOptions.None));

                    }



                    String[] RowsDV = str_DiaVisita.Split(new string[] { SP_R }, StringSplitOptions.None);

                    List<String[]> L_DV = new List<String[]>();

                    for (int i = 0; i < RowsDV.Length; i++)
                    {

                        L_DV.Add(RowsDV[i].Split(new string[] { SP_B }, StringSplitOptions.None));

                    }



                    String[] RowsDetV = str_DetalleVisita.Split(new string[] { SP_R }, StringSplitOptions.None);

                    List<String[]> L_DetV = new List<String[]>();

                    for (int i = 0; i < RowsDetV.Length; i++)
                    {

                        L_DetV.Add(RowsDetV[i].Split(new string[] { SP_B }, StringSplitOptions.None));

                    }



                    String[] RowsEP = str_EntregaProducto.Split(new string[] { SP_R }, StringSplitOptions.None);

                    List<String[]> L_EP = new List<String[]>();

                    for (int i = 0; i < RowsEP.Length; i++)
                    {

                        L_EP.Add(RowsEP[i].Split(new string[] { SP_B }, StringSplitOptions.None));

                    }



                    String[] RowsDev = str_Devolucion.Split(new string[] { SP_R }, StringSplitOptions.None);

                    List<String[]> L_Dev = new List<String[]>();

                    for (int i = 0; i < RowsDev.Length; i++)
                    {

                        L_Dev.Add(RowsDev[i].Split(new string[] { SP_B }, StringSplitOptions.None));

                    }





                    foreach (String[] Row in L_DIR)
                    {

                        if (Row.Length > 2)
                        {

                            int idDireccion = 0;

                            idDireccion = i_Direccion(CompanyCode, id, Row[2], Row[3], Row[4], Row[5], Row[6], int.Parse(Row[7]), double.Parse(Row[8]), double.Parse(Row[9]), Row[10]);



                            foreach (String[] Row_VC in L_VC)
                            {

                                if (Row_VC.Length > 2)
                                {

                                    int idVisitaCliente = 0;

                                    idVisitaCliente = i_VisitaCliente(CompanyCode, int.Parse(Row_VC[1]), Row_VC[2], idDireccion, Row_VC[4], Row_VC[5]);



                                    foreach (String[] Row_DV in L_DV)
                                    {

                                        if (Row_DV.Length > 2)
                                        {

                                            //i_DiaVisita(CompanyCode, idVisitaCliente, int.Parse(Row_DV[1]), int.Parse(Row_DV[2]), Row_DV[3]);

                                            i_DiaVisita(CompanyCode, idVisitaCliente, int.Parse(Row_DV[1]), 1, Row_DV[3]);



                                            foreach (String[] Row_DetV in L_DetV)
                                            {

                                                if (Row_DetV.Length > 2)
                                                {

                                                    DetalleVisita OBJ_DetV = new DetalleVisita();

                                                    OBJ_DetV = i_DetalleVisitaHH_OBJ_LOCAL(CompanyCode, idVisitaCliente, 0, "", int.Parse(Row_DetV[4]), double.Parse(Row_DetV[6]), double.Parse(Row_DetV[7]), bool.Parse(Row_DetV[10]), Row_DetV[8], Row_DetV[9]);



                                                    if (str_EntregaProducto.Length > 2)
                                                    {

                                                        str_EntregaProducto = str_EntregaProducto.Replace("ORG_ID.DetV", OBJ_DetV.id.ToString());

                                                        str_EntregaProducto = str_EntregaProducto.Replace("?", ",");

                                                        //i_EntregaProductosHH_Consignacion(CompanyCode, str_EntregaProducto);



                                                        i_EntregaProductosHH_Historial_F(CompanyCode, str_EntregaProducto);



                                                        //i_EntregaProductosHH_Historial_F(CompanyCode, str_EntregaProducto);

                                                    }



                                                    if (str_Devolucion.Length > 2)
                                                    {

                                                        str_Devolucion = str_Devolucion.Replace("ORG_ID.DetV", OBJ_DetV.id.ToString());

                                                        str_Devolucion = str_Devolucion.Replace("?", ",");

                                                        i_DevolucionesHH(CompanyCode, str_EntregaProducto);

                                                    }













                                                }





                                            }



                                        }







                                    }

                                }



                            }

                        }





                    }



                    //DB_CloseConn();



                    return true;

                }

                catch (Exception ex)
                {

                    try
                    {

                        MySqlCommand cmd = new MySqlCommand();

                        cmd.CommandText = "INSERT INTO TEST(Campo1, Campo2, Campo3, Campo4, Campo5, Campo6) values(@C1, @C2, @C3, @C4, @C5, @C6);";

                        cmd.Parameters.AddWithValue("@C1", str_Direccion);

                        cmd.Parameters.AddWithValue("@C2", str_VisitaCliente);

                        cmd.Parameters.AddWithValue("@C3", str_DiaVisita);

                        cmd.Parameters.AddWithValue("@C4", str_DetalleVisita);

                        String str_EntregaProducto_2 = str_EntregaProducto.Length > 740 ? str_EntregaProducto.Substring(1, 740) : str_EntregaProducto;

                        cmd.Parameters.AddWithValue("@C5", str_EntregaProducto_2);

                        cmd.Parameters.AddWithValue("@C6", ex.Message);



                        cmd.Connection = conn;



                        //cmd.ExecuteNonQuery();

                        cmd.ExecuteNonQuery();



                        DB_CloseConn();



                        return false;

                    }

                    catch (Exception Ex)
                    {

                        DB_CloseConn();

                        throw Ex;

                    }



                }

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }













        }







        [WebMethod]

        public String s_Cliente(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Cliente()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Cliente> L_Cliente = new List<Cliente>();

            int count = 0;

            while (r.Read())
            {



                L_Cliente.Add(new Cliente(r.GetInt32("id"), r.GetInt32("idCedis"), r.GetString("NombreTienda"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Celular"), r.GetString("Correo"), r.GetDateTime("fCreacion"), r.GetString("Cedis")));



                count++;

                if (count == 250) break;

            }





            DB_CloseConn();



            /*var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_Cliente);*/







            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            js.MaxJsonLength = 999999999;

            var json = js.Serialize(L_Cliente);







            return json;



        }



        [WebMethod]

        public String sb_Cliente(String CompanyCode, String Texto)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL sb_Cliente(@Texto)";



            cmd.Parameters.AddWithValue("@Texto", Texto);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Cliente> L_Cliente = new List<Cliente>();

            int count = 0;

            while (r.Read())
            {



                L_Cliente.Add(new Cliente(r.GetInt32("id"), r.GetInt32("idCedis"), r.GetString("NombreTienda"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Celular"), r.GetString("Correo"), r.GetDateTime("fCreacion"), r.GetString("Cedis"), r.GetDouble("Latitud"), r.GetDouble("Longitud")));



                count++;

                if (count == 250) break;

            }





            DB_CloseConn();



            /*var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_Cliente);*/







            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            js.MaxJsonLength = 999999999;

            var json = js.Serialize(L_Cliente);







            return json;



        }





        [WebMethod]

        public void s_ClienteWeb(String CompanyCode, String Func, int rows, string callback2)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Cliente()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Cliente> L_Cliente = new List<Cliente>();

            int count = 0;

            while (r.Read())
            {



                L_Cliente.Add(new Cliente(r.GetInt32("id"), r.GetInt32("idCedis"), r.GetString("NombreTienda"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Celular"), r.GetString("Correo"), r.GetDateTime("fCreacion"), r.GetString("Cedis")));



                count++;

                if (count == rows) break;

            }





            DB_CloseConn();



            /*var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_Cliente);*/







            /*StringBuilder sb = new StringBuilder();
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = 50000000;
            var json = js.Serialize(L_Cliente);*/



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            js.MaxJsonLength = 50000000;

            sb.Append(Func + "(");

            sb.Append(js.Serialize(L_Cliente) + ");");

            Context.Response.Clear();

            Context.Response.ContentType = "application/json";

            Context.Response.Write(sb.ToString());

            Context.Response.End();



        }











        [WebMethod]

        public List<Cliente> sL_Cliente(String CompanyCode, String User)
        {

            MySqlConnection conn_n = new MySqlConnection(getConnection(CompanyCode));

            try
            {

                DB_OpenConn(CompanyCode);



                //MySqlCommand cmd = new MySqlCommand("CALL s_Cliente_4U('" + User + "')", conn_n);

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_Cliente_4U('" + User + "')";

                cmd.Connection = conn;

                //conn_n.Open();



                MySqlDataReader r = cmd.ExecuteReader();

                List<Cliente> L_Cliente = new List<Cliente>();

                while (r.Read())
                {

                    String Correo;

                    try { Correo = r.GetString("Correo"); }

                    catch (Exception e) { Correo = ""; }





                    L_Cliente.Add(new Cliente(r.GetInt32("id"), r.GetInt32("idCedis"), r.GetString("NombreTienda"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Celular"), Correo, r.GetDateTime("fCreacion"), r.GetString("Cedis")));

                }





                DB_CloseConn();

                //conn_n.Close();



                return L_Cliente;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                //conn_n.Close();

                throw Ex;

            }



        }





        [WebMethod]

        public void u_Cliente(String CompanyCode, int id, int idCedis, String NombreTienda, String Nombre, String ApePat, String ApeMat, String Celular, String Correo, String idUsuario)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL u_Cliente(@id, @idCedis, @NombreTienda, @Nombre, @ApePat, @ApeMat, @Cel, @Correo, @idUsuario)";

                cmd.Parameters.AddWithValue("@id", id);

                cmd.Parameters.AddWithValue("@idCedis", idCedis);

                cmd.Parameters.AddWithValue("@Nombre", Nombre);

                cmd.Parameters.AddWithValue("@NombreTienda", NombreTienda);

                cmd.Parameters.AddWithValue("@ApePat", ApePat);

                cmd.Parameters.AddWithValue("@ApeMat", ApeMat);

                cmd.Parameters.AddWithValue("@Cel", Celular);

                cmd.Parameters.AddWithValue("@Correo", Correo);

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





                cmd.Connection = conn;



                cmd.ExecuteNonQuery();



                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public void d_Cliente(String CompanyCode, int id, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Cliente(@id, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }







        [WebMethod]

        public String s_ClienteCoor(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_ClienteCoor()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Cliente> L_Cliente = new List<Cliente>();

            int count = 0;

            while (r.Read())
            {

                //PEND 003 20160316

                /*SE AGREGO EL CAMPO ACTIVO A NIVEL BD Y WS.*/

                L_Cliente.Add(new Cliente(r.GetInt32("id"), r.GetInt32("idCedis"), r.GetString("NombreTienda"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Celular"), r.GetString("Correo"), r.GetDateTime("fCreacion"), r.GetString("Cedis"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetBoolean("Longitud")));



                count++;

                if (count == 250) break;

            }





            DB_CloseConn();



            /*var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_Cliente);*/







            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            js.MaxJsonLength = 999999999;

            var json = js.Serialize(L_Cliente);







            return json;



        }











        #endregion
        
        #region -------------------------------| MUNICIPIO |--------------------------------



        [WebMethod]

        public String s_Municipio(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Municipio()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Municipio> L_Municipio = new List<Municipio>();

            while (r.Read())
            {

                L_Municipio.Add(new Municipio(r.GetInt32("id"), r.GetInt32("idEstado"), r.GetString("Municipio"), r.GetString("Estado"), r.GetString("Pais")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Municipio);



            return json;



        }



        [WebMethod]

        public List<Municipio> sL_Municipio(String CompanyCode)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_Municipio()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Municipio> L_Municipio = new List<Municipio>();

                while (r.Read())
                {

                    L_Municipio.Add(new Municipio(r.GetInt32("id"), r.GetInt32("idEstado"), r.GetString("Municipio"), r.GetString("Estado"), r.GetString("Pais")));

                }





                DB_CloseConn();



                return L_Municipio;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }





        #endregion
        
        #region -------------------------------| DIRECCION |--------------------------------



        [WebMethod]

        public int i_Direccion(String CompanyCode, int idCliente, String Calle, String NumeroExt, String NumeroInt, String CodigoPostal, String Colonia, int idMunicipio, double Latitud, double Longitud, String idUsuario)
        {

            try
            {

                int id = 0;

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_Direccion(@idCliente, @Calle, @NumExt, @NumInt, @CodigoPostal, @Colonia, @idMunicipio, @Latitud, @Longitud, @idUsuario)";

                cmd.Parameters.AddWithValue("@idCliente", idCliente);

                cmd.Parameters.AddWithValue("@Calle", Calle);

                cmd.Parameters.AddWithValue("@NumExt", NumeroExt);

                cmd.Parameters.AddWithValue("@NumInt", NumeroInt);

                cmd.Parameters.AddWithValue("@CodigoPostal", CodigoPostal);

                cmd.Parameters.AddWithValue("@Colonia", Colonia);

                cmd.Parameters.AddWithValue("@idMunicipio", idMunicipio);

                cmd.Parameters.AddWithValue("@Latitud", Latitud);

                cmd.Parameters.AddWithValue("@Longitud", Longitud);

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





                cmd.Connection = conn;



                //cmd.ExecuteNonQuery();

                MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {

                    id = r.GetInt32("id");

                }



                DB_CloseConn();



                return id;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public String s_Direccion(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Direccion()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Direccion> L_Direccion = new List<Direccion>();

            int count = 0;

            while (r.Read())
            {

                L_Direccion.Add(new Direccion(r.GetInt32("id"), r.GetInt32("idCliente"), r.GetString("Calle"), r.GetString("NumeroExt"), r.GetString("NumeroInt"), r.GetString("CodigoPostal"), r.GetString("Colonia"), r.GetInt32("idMunicipio"), r.GetDouble("Latitud"), r.GetDouble("Longitud"),

                                                r.GetString("ClienteNombre"), r.GetString("ClienteApePat"), r.GetString("ClienteApeMat"), r.GetString("Municipio"), r.GetString("Estado"), r.GetString("Pais"), r.GetInt32("idCedis")));



                count++;

                if (count == 250) break;

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Direccion);



            return json;



        }



        [WebMethod]

        public String sb_Direccion(String CompanyCode, String Texto)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL sb_Direccion(@Texto)";

            cmd.Parameters.AddWithValue("@Texto", Texto);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Direccion> L_Direccion = new List<Direccion>();

            int count = 0;

            while (r.Read())
            {

                L_Direccion.Add(new Direccion(r.GetInt32("id"), r.GetInt32("idCliente"), r.GetString("Calle"), r.GetString("NumeroExt"), r.GetString("NumeroInt"), r.GetString("CodigoPostal"), r.GetString("Colonia"), r.GetInt32("idMunicipio"), r.GetDouble("Latitud"), r.GetDouble("Longitud"),

                                                r.GetString("ClienteNombre"), r.GetString("ClienteApePat"), r.GetString("ClienteApeMat"), r.GetString("Municipio"), r.GetString("Estado"), r.GetString("Pais"), r.GetInt32("idCedis")));



                count++;

                if (count == 250) break;

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Direccion);



            return json;



        }





        [WebMethod]

        public List<Direccion> sL_Direccion(String CompanyCode, String User)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_Direccion_4U('" + User + "')";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Direccion> L_Direccion = new List<Direccion>();

                while (r.Read())
                {

                    L_Direccion.Add(new Direccion(r.GetInt32("id"), r.GetInt32("idCliente"), r.GetString("Calle"), r.GetString("NumeroExt"), r.GetString("NumeroInt"), r.GetString("CodigoPostal"), r.GetString("Colonia"), r.GetInt32("idMunicipio"), r.GetDouble("Latitud"), r.GetDouble("Longitud"),

                                                    r.GetString("ClienteNombre"), r.GetString("ClienteApePat"), r.GetString("ClienteApeMat"), r.GetString("Municipio"), r.GetString("Estado"), r.GetString("Pais"), r.GetInt32("idCedis")));

                }



                DB_CloseConn();



                return L_Direccion;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }





        [WebMethod]

        public void u_Direccion(String CompanyCode, int id, int idCliente, String Calle, String NumeroExt, String NumeroInt, String CodigoPostal, String Colonia, int idMunicipio, double Latitud, double Longitud, String idUsuario)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL u_Direccion(@id, @idCliente, @Calle, @NumExt, @NumInt, @CodigoPostal, @Colonia, @idMunicipio, @Latitud, @Longitud, @idUsuario)";

                cmd.Parameters.AddWithValue("@id", id);

                cmd.Parameters.AddWithValue("@idCliente", idCliente);

                cmd.Parameters.AddWithValue("@Calle", Calle);

                cmd.Parameters.AddWithValue("@NumExt", NumeroExt);

                cmd.Parameters.AddWithValue("@NumInt", NumeroInt);

                cmd.Parameters.AddWithValue("@CodigoPostal", CodigoPostal);

                cmd.Parameters.AddWithValue("@Colonia", Colonia);

                cmd.Parameters.AddWithValue("@idMunicipio", idMunicipio);

                cmd.Parameters.AddWithValue("@Latitud", Latitud);

                cmd.Parameters.AddWithValue("@Longitud", Longitud);

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





                cmd.Connection = conn;



                cmd.ExecuteNonQuery();



                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public void d_Direccion(String CompanyCode, int id, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Direccion(@id, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| TIPO RUTA |--------------------------------



        [WebMethod]

        public void i_TipoRuta(String CompanyCode, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_TipoRuta(@Nombre)";

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_TipoRuta(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_TipoRuta()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<TipoRuta> L_TipoRuta = new List<TipoRuta>();

            while (r.Read())
            {

                L_TipoRuta.Add(new TipoRuta(r.GetInt32("id"), r.GetString("Tipo")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_TipoRuta);



            return json;



        }



        [WebMethod]

        public List<TipoRuta> sL_TipoRuta(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_TipoRuta()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<TipoRuta> L_TipoRuta = new List<TipoRuta>();

            while (r.Read())
            {

                L_TipoRuta.Add(new TipoRuta(r.GetInt32("id"), r.GetString("Tipo")));

            }





            DB_CloseConn();



            return L_TipoRuta;



        }





        [WebMethod]

        public void u_TipoRuta(String CompanyCode, int id, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_TipoRuta(@id, @Nombre)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_TipoRuta(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_TipoRuta(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| RUTA |-------------------------------------



        [WebMethod]

        public void i_Ruta(String CompanyCode, int idCedis, int idTipoRuta, String Nombre, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Ruta(@idCedis, @idTipoRuta, @Nombre, @idUsuario)";

            cmd.Parameters.AddWithValue("@idCedis", idCedis);

            cmd.Parameters.AddWithValue("@idTipoRuta", idTipoRuta);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Ruta(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Ruta()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Ruta> L_Ruta = new List<Ruta>();

            while (r.Read())
            {

                L_Ruta.Add(new Ruta(r.GetInt32("id"), r.GetInt32("idCedis"), r.GetInt32("idTipoRuta"), r.GetString("Nombre"), r.GetString("Tipo"), r.GetString("Cedis")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Ruta);



            return json;



        }



        [WebMethod]

        public List<Ruta> sL_Ruta(String CompanyCode)
        {

            try
            {

                //NUEVO.CEDIS

                String[] Code = CompanyCode.Split('.');

                int idCedis = 1;

                try { idCedis = int.Parse(Code[1]); }

                catch (Exception) { }



                //DB_OpenConn(CompanyCode);

                DB_OpenConn(Code[0]);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_Ruta()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Ruta> L_Ruta = new List<Ruta>();

                while (r.Read())
                {

                    if (idCedis == r.GetInt32("idCedis"))
                    {

                        L_Ruta.Add(new Ruta(r.GetInt32("id"), r.GetInt32("idCedis"), r.GetInt32("idTipoRuta"), r.GetString("Nombre"), r.GetString("Tipo"), r.GetString("Cedis")));

                    }



                }





                DB_CloseConn();



                return L_Ruta;

            }

            catch (Exception ex)
            {

                DB_CloseConn();

                throw ex;

            }







        }







        [WebMethod]

        public List<VisitaCliente> sL_RutaUsuario(String CompanyCode)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_RutaUsuario()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<VisitaCliente> L_VisitaCliente = new List<VisitaCliente>();

                while (r.Read())
                {

                    L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("idRuta"), r.GetString("idUsuario_Op"), r.GetBoolean("Activo"), r.GetString("Ruta"), r.GetString("Tipo")));

                }





                DB_CloseConn();



                return L_VisitaCliente;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }







        }





        [WebMethod]

        public List<VisitaCliente> sL_RutaUsuarioHH(String CompanyCode)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_RutaUsuarioHH()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<VisitaCliente> L_VisitaCliente = new List<VisitaCliente>();

                while (r.Read())
                {

                    L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("idRuta"), r.GetString("idUsuario_Op"), r.GetBoolean("Activo"), r.GetString("Ruta"), r.GetString("Tipo")));

                }





                DB_CloseConn();



                return L_VisitaCliente;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }







        }







        [WebMethod]

        public List<RutaConfig> sL_RutaConfig(String CompanyCode, int idRuta)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_RutaConfigOwn(" + idRuta + ")";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<RutaConfig> L_VisitaCliente = new List<RutaConfig>();

                while (r.Read())
                {

                    L_VisitaCliente.Add(new RutaConfig(r.GetInt32("idRuta"), r.GetString("TimeToError"), r.GetString("TimeGPS"), r.GetString("Extra1"), r.GetString("Extra2"), r.GetString("Extra3")));

                }





                DB_CloseConn();



                return L_VisitaCliente;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }







        [WebMethod]

        public void u_Ruta(String CompanyCode, int id, int idCedis, int idTipoRuta, String Nombre, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Ruta(@id, @idCedis, @idTipoRuta, @Nombre, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idCedis", idCedis);

            cmd.Parameters.AddWithValue("@idTipoRuta", idTipoRuta);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Ruta(String CompanyCode, int id, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Ruta(@id, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        //04

        #region -------------------------------| VISITA CLIENTE |---------------------------



        [WebMethod]

        public int i_VisitaCliente(String CompanyCode, int idRuta, String idUsuario_Op, int idDireccion, String fApartir, String idUsuario)
        {

            try
            {

                int id = 0;



                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_VisitaCliente(@idRuta, @idUsaurio_Op, @idDireccion, @fApartir, @idUsuario)";

                cmd.Parameters.AddWithValue("@idRuta", idRuta);

                cmd.Parameters.AddWithValue("@idUsaurio_Op", idUsuario_Op);

                cmd.Parameters.AddWithValue("@idDireccion", idDireccion);

                cmd.Parameters.AddWithValue("@fApartir", fApartir);

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





                cmd.Connection = conn;



                //cmd.ExecuteNonQuery();

                MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {

                    id = r.GetInt32("id");

                }



                DB_CloseConn();



                return id;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public String s_VisitaCliente(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_VisitaCliente()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<VisitaCliente> L_VisitaCliente = new List<VisitaCliente>();

            int count = 0;

            while (r.Read())
            {

                //L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetString("idUsuario_Op"), r.GetInt32("idDireccion"), r.GetDateTime("fApartirDe"), r.GetBoolean("Activo"), r.GetString("Ruta"), r.GetString("Direccion")));

                //int id, String Ruta, String idUsuario, String NombreTienda, String Direccion, DateTime fApartir, int Dia, String Frecuencia, int Secuencia, 

                //int idCliente, int idDireccion, int idRuta, int idFrecuencia

                L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("id"), r.GetString("Ruta"), r.GetString("idUsuario"), r.GetString("NombreTienda"), r.GetString("Direccion"),

                                    r.GetDateTime("fApartirDe"), r.GetInt32("Dia"), r.GetString("Frecuencia"), r.GetInt32("Secuencia"),

                                    r.GetInt32("idCliente"), r.GetInt32("idDireccion"), r.GetInt32("idRuta"), r.GetInt32("idFrecuencia"),

                                    r.GetDouble("Latitud"), r.GetDouble("Longitud")));

                count++;

                if (count == 250) break;

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_VisitaCliente);



            return json;



        }



        [WebMethod]

        public String s_VisitaCliente_Ruta(String CompanyCode, int idRuta)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_VisitaCliente_Ruta(@idRuta)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<VisitaCliente> L_VisitaCliente = new List<VisitaCliente>();

            int count = 0;

            while (r.Read())
            {

                //L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetString("idUsuario_Op"), r.GetInt32("idDireccion"), r.GetDateTime("fApartirDe"), r.GetBoolean("Activo"), r.GetString("Ruta"), r.GetString("Direccion")));

                //int id, String Ruta, String idUsuario, String NombreTienda, String Direccion, DateTime fApartir, int Dia, String Frecuencia, int Secuencia, 

                //int idCliente, int idDireccion, int idRuta, int idFrecuencia

                L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("id"), r.GetString("Ruta"), r.GetString("idUsuario"), r.GetString("NombreTienda"), r.GetString("Direccion"),

                                    r.GetDateTime("fApartirDe"), r.GetInt32("Dia"), r.GetString("Frecuencia"), r.GetInt32("Secuencia"),

                                    r.GetInt32("idCliente"), r.GetInt32("idDireccion"), r.GetInt32("idRuta"), r.GetInt32("idFrecuencia"),

                                    r.GetDouble("Latitud"), r.GetDouble("Longitud")));

                //count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_VisitaCliente);



            return json;



        }





        [WebMethod]

        public String sb_VisitaCliente_Ruta(String CompanyCode, String Texto)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL sb_VisitaCliente_Ruta(@Texto)";

            cmd.Parameters.AddWithValue("@Texto", Texto);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<VisitaCliente> L_VisitaCliente = new List<VisitaCliente>();

            int count = 0;

            while (r.Read())
            {

                //L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetString("idUsuario_Op"), r.GetInt32("idDireccion"), r.GetDateTime("fApartirDe"), r.GetBoolean("Activo"), r.GetString("Ruta"), r.GetString("Direccion")));

                //int id, String Ruta, String idUsuario, String NombreTienda, String Direccion, DateTime fApartir, int Dia, String Frecuencia, int Secuencia, 

                //int idCliente, int idDireccion, int idRuta, int idFrecuencia

                L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("id"), r.GetString("Ruta"), r.GetString("idUsuario"), r.GetString("NombreTienda"), r.GetString("Direccion"),

                                    r.GetDateTime("fApartirDe"), r.GetInt32("Dia"), r.GetString("Frecuencia"), r.GetInt32("Secuencia"),

                                    r.GetInt32("idCliente"), r.GetInt32("idDireccion"), r.GetInt32("idRuta"), r.GetInt32("idFrecuencia"),

                                    r.GetDouble("Latitud"), r.GetDouble("Longitud")));

                //count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_VisitaCliente);



            return json;



        }







        [WebMethod]

        public List<VisitaCliente> sL_VisitaCliente(String CompanyCode, String User)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_VisitaCliente_4U('" + User + "')";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<VisitaCliente> L_VisitaCliente = new List<VisitaCliente>();

                while (r.Read())
                {

                    L_VisitaCliente.Add(new VisitaCliente(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetString("idUsuario_Op"), r.GetInt32("idDireccion"), r.GetDateTime("fApartirDe"), r.GetBoolean("Activo"), r.GetString("Ruta"), r.GetString("Direccion")));

                }





                DB_CloseConn();



                return L_VisitaCliente;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public void u_VisitaCliente_CambiaEstado(String CompanyCode, int id, bool Activo, String idUsuario_Op, String idUsuario_L)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_VisitaCliente_CambiaEstado(@id, @Activo, @idUsuario_Op, @idUsuario_L)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Activo", Activo);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            cmd.Parameters.AddWithValue("@idUsuario_L", idUsuario_L);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }







        [WebMethod]

        public void u_VisitaCliente(String CompanyCode, int id, int idRuta, String idUsuario_Op, int idDireccion, String fApartir, bool Activo, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_VisitaCliente(@id, @idRuta, @idUsuario_Op, @idDireccion, @fApartir, @Activo, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            cmd.Parameters.AddWithValue("@idDireccion", idDireccion);

            cmd.Parameters.AddWithValue("@fApartir", fApartir);

            cmd.Parameters.AddWithValue("@Activo", Activo);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_VisitaCliente(String CompanyCode, int id, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_VisitaCliente(@id, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| FRECUENCIA |-------------------------------



        [WebMethod]

        public void i_Frecuencia(String CompanyCode, String Codigo, String Parametro, String Descripcion, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Frecuencia(@Codigo, @Parametro, @Descripcion, @idUsuario)";

            cmd.Parameters.AddWithValue("@idTipoRuta", Codigo);

            cmd.Parameters.AddWithValue("@Parametro", Parametro);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Frecuencia(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Frecuencia()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Frecuencia> L_Frecuencia = new List<Frecuencia>();

            while (r.Read())
            {

                L_Frecuencia.Add(new Frecuencia(r.GetInt32("id"), r.GetString("Codigo"), r.GetString("Parametro"), r.GetString("Descripcion")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Frecuencia);



            return json;



        }



        [WebMethod]

        public List<Frecuencia> sL_Frecuencia(String CompanyCode)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_Frecuencia()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Frecuencia> L_Frecuencia = new List<Frecuencia>();

                while (r.Read())
                {

                    L_Frecuencia.Add(new Frecuencia(r.GetInt32("id"), r.GetString("Codigo"), r.GetString("Parametro"), r.GetString("Descripcion")));

                }





                DB_CloseConn();



                return L_Frecuencia;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }





        [WebMethod]

        public void u_Frecuencia(String CompanyCode, int id, String Codigo, String Parametro, String Descripcion, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Frecuencia(@id, @Codigo, @Parametro, @Descripcion, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idTipoRuta", Codigo);

            cmd.Parameters.AddWithValue("@Parametro", Parametro);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Frecuencia(String CompanyCode, int id, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Frecuencia(@id, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| DIA VISITA |-------------------------------



        [WebMethod]

        public int i_DiaVisita(String CompanyCode, int idVisitaCliente, int Dia, int idFrecuencia, String idUsuario)
        {

            try
            {

                int id = 0;

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_DiaVisita(@idVisitaCliente, @Dia, @idFrecuencia, @idUsuario)";

                cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

                cmd.Parameters.AddWithValue("@Dia", Dia);

                cmd.Parameters.AddWithValue("@idFrecuencia", idFrecuencia);

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





                cmd.Connection = conn;



                //cmd.ExecuteNonQuery();

                MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {

                    id = r.GetInt32("id");

                }



                DB_CloseConn();



                return id;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public void i_DiaVisitas(String CompanyCode, List<DiaVisita> L_DiaVisita, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            foreach (DiaVisita DV in L_DiaVisita)
            {

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_DiaVisita(@idVisitaCliente, @Dia, @idFrecuencia, @idUsuario)";

                cmd.Parameters.AddWithValue("@idVisitaCliente", DV.idVisitaCliente);

                cmd.Parameters.AddWithValue("@Dia", DV.Dia);

                cmd.Parameters.AddWithValue("@idFrecuencia", DV.idFrecuencia);

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }





            DB_CloseConn();

        }





        [WebMethod]

        public String s_DiaVisita(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_DiaVisita()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<DiaVisita> L_DiaVisita = new List<DiaVisita>();

            int count = 0;

            while (r.Read())
            {

                L_DiaVisita.Add(new DiaVisita(r.GetInt32("idVisitaCliente"), r.GetInt32("Dia"), r.GetInt32("idFrecuencia"), r.GetString("Ruta"), r.GetString("idUsuario_Op"), r.GetString("Direccion"), r.GetString("Frecuencia"), r.GetString("Codigo"), r.GetString("Parametro"), r.GetDateTime("fApartirDe"),

                    r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetInt32("idCliente"), r.GetInt32("idRuta")));



                count++;

                if (count == 150) break;



            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_DiaVisita);



            return json;



        }



        [WebMethod]

        public List<DiaVisita> sL_DiaVisita(String CompanyCode, String User)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_DiaVisita_4U('" + User + "')";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<DiaVisita> L_DiaVisita = new List<DiaVisita>();

                while (r.Read())
                {

                    L_DiaVisita.Add(new DiaVisita(r.GetInt32("idVisitaCliente"), r.GetInt32("Dia"), r.GetInt32("idFrecuencia"), r.GetString("Ruta"), r.GetString("idUsuario_Op"), r.GetString("Direccion"), r.GetString("Frecuencia"), r.GetString("Codigo"), r.GetString("Parametro"), r.GetDateTime("fApartirDe"),

                        r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetInt32("idCliente"), r.GetInt32("idRuta"), r.GetString("NombreTienda"), r.GetString("NombreCliente"), r.GetInt32("Secuencia")));

                }





                DB_CloseConn();



                return L_DiaVisita;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }







        private List<DiaVisita> s_DiaVisitaIN(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_DiaVisita()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<DiaVisita> L_DiaVisita = new List<DiaVisita>();

            while (r.Read())
            {

                L_DiaVisita.Add(new DiaVisita(r.GetInt32("idVisitaCliente"), r.GetInt32("Dia"), r.GetInt32("idFrecuencia"), r.GetString("Ruta"), r.GetString("idUsuario_Op"), r.GetString("Direccion"), r.GetString("Frecuencia"), r.GetString("Codigo"), r.GetString("Parametro"), r.GetDateTime("fApartirDe"),

                    r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetInt32("idCliente"), r.GetInt32("idRuta"), r.GetString("NombreTienda"), r.GetString("NombreCliente"), r.GetInt32("Secuencia")));

            }





            DB_CloseConn();



            return L_DiaVisita;

        }



        [WebMethod]

        public void u_DiaVisita(String CompanyCode, int idVisitaCliente, int Dia, int idFrecuencia, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_DiaVisita(@idVisitaCliente, @Dia, @idFrecuencia, @idUsuario)";

            cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

            cmd.Parameters.AddWithValue("@Dia", Dia);

            cmd.Parameters.AddWithValue("@idFrecuencia", idFrecuencia);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }





        //idVisitaCliente_ int, Dia_ int, idFrecuencia_ int, idUsuario_Op_ VARCHAR(12), idUsuario_ VARCHAR(12)

        [WebMethod]

        public void u_DiaVisita_Orden(String CompanyCode, int idVisitaCliente, int Dia, int idFrecuencia, int Secuencia, String idUsuario_Op, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_DiaVisita_Orden(@idVisitaCliente, @Dia, @idFrecuencia, @Secuencia, @idUsuario_Op, @idUsuario)";

            cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

            cmd.Parameters.AddWithValue("@Dia", Dia);

            cmd.Parameters.AddWithValue("@idFrecuencia", idFrecuencia);

            cmd.Parameters.AddWithValue("@Secuencia", Secuencia);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void u_DiaVisita_OrdenAllDay(String CompanyCode, String Cambios, String idUsuario)
        {





            String SP_R = "\n";

            String SP_B = "-";



            String[] RowsClt = Cambios.Split(new string[] { SP_R }, StringSplitOptions.None);

            List<String[]> Clt = new List<String[]>();

            for (int i = 0; i < RowsClt.Length; i++)
            {

                Clt.Add(RowsClt[i].Split(new string[] { SP_B }, StringSplitOptions.None));

            }





            foreach (String[] Row in Clt)
            {

                if (Row[0].Length > 0)

                    u_DiaVisita_Orden(CompanyCode, int.Parse(Row[0]), int.Parse(Row[1]), int.Parse(Row[2]), int.Parse(Row[6]), Row[4], idUsuario);



            }

        }



        [WebMethod]

        public void d_DiaVisita(String CompanyCode, int idVisitaCliente, int Dia, int idFrecuencia, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_DiaVisita(@idVisitaCliente, @Dia, @idFrecuencia, @idUsuario)";

            cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

            cmd.Parameters.AddWithValue("@Dia", Dia);

            cmd.Parameters.AddWithValue("@idFrecuencia", idFrecuencia);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        //05

        #region -------------------------------| STOCK |------------------------------------



        [WebMethod]

        public void i_Stock(String CompanyCode, int idProducto, int idCedis, int Cantidad)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Stock(@idProducto, @idCedis, @Cantidad)";

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@idCedis", idCedis);

            cmd.Parameters.AddWithValue("@Cantidad", Cantidad);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Stock(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Stock()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Stock> L_Stock = new List<Stock>();

            while (r.Read())
            {

                L_Stock.Add(new Stock(r.GetInt32("idProducto"), r.GetInt32("idCedis"), r.GetInt32("Cantidad"), r.GetString("fAlta"), r.GetString("Producto"), r.GetString("Cedis")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Stock);



            return json;



        }



        [WebMethod]

        public List<Stock> sL_Stock(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Stock()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Stock> L_Stock = new List<Stock>();

            while (r.Read())
            {

                L_Stock.Add(new Stock(r.GetInt32("idProducto"), r.GetInt32("idCedis"), r.GetInt32("Cantidad"), r.GetString("fAlta"), r.GetString("Producto"), r.GetString("Cedis")));

            }





            DB_CloseConn();



            return L_Stock;



        }





        [WebMethod]

        public void u_Stock(String CompanyCode, int idProducto, int idCedis, int Cantidad)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Stock(@idProducto, @idCedis, @Cantidad)";

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@idCedis", idCedis);

            cmd.Parameters.AddWithValue("@Cantidad", Cantidad);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Stock(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Stock(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| USUARIO CARGA |----------------------------



        [WebMethod]

        public void i_UsuarioCarga(String CompanyCode, String idUsuario, int idProducto, int Cantidad)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_UsuarioCarga(@idUsuario, @idProducto, @Cantidad)";

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@Cantidad", Cantidad);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_UsuarioCarga(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_UsuarioCarga()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<UsuarioCarga> L_UsuarioCarga = new List<UsuarioCarga>();

            while (r.Read())
            {

                L_UsuarioCarga.Add(new UsuarioCarga(r.GetString("idUsuario"), r.GetInt32("Cantidad"), r.GetFloat("Total"), r.GetDateTime("fCargado"), r.GetString("Usuario"), r.GetString("Productos"), r.GetString("Cantidades"), r.GetString("Montos")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_UsuarioCarga);



            return json;



        }



        [WebMethod]

        public List<UsuarioCarga> sL_UsuarioCarga(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_UsuarioCarga()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<UsuarioCarga> L_UsuarioCarga = new List<UsuarioCarga>();

            while (r.Read())
            {

                L_UsuarioCarga.Add(new UsuarioCarga(r.GetString("idUsuario"), r.GetInt32("Cantidad"), r.GetFloat("Total"), r.GetDateTime("fCargado"), r.GetString("Usuario"), r.GetString("Productos"), r.GetString("Cantidades"), r.GetString("Montos")));

            }





            DB_CloseConn();



            return L_UsuarioCarga;



        }





        [WebMethod]

        public void u_UsuarioCarga(String CompanyCode, int id, String idUsuario, int idProducto, int Cantidad)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_UsuarioCarga(@id, @idUsuario, @idProducto, @Cantidad)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@Cantidad", Cantidad);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_UsuarioCarga(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_UsuarioCarga(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| ESTATUS VISITA |---------------------------



        [WebMethod]

        public void i_EstatusVisita(String CompanyCode, String Descripcion, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_EstatusVisita(@Descripcion, @idUsuario)";

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_EstatusVisita(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_EstatusVisita()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<EstatusVisita> L_EstatusVisita = new List<EstatusVisita>();

            while (r.Read())
            {

                L_EstatusVisita.Add(new EstatusVisita(r.GetInt32("id"), r.GetString("Descripcion")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_EstatusVisita);



            return json;



        }



        [WebMethod]

        public List<EstatusVisita> sL_EstatusVisita(String CompanyCode)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_EstatusVisita()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<EstatusVisita> L_EstatusVisita = new List<EstatusVisita>();

                while (r.Read())
                {

                    L_EstatusVisita.Add(new EstatusVisita(r.GetInt32("id"), r.GetString("Descripcion")));

                }





                DB_CloseConn();



                return L_EstatusVisita;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }





        [WebMethod]

        public void u_EstatusVisita(String CompanyCode, int id, String Descripcion, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_EstatusVisita(@id, @Descripcion, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_EstatusVisita(String CompanyCode, int id, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_EstatusVisita(@id, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion



        //06

        #region -------------------------------| DETALLE VISITA |---------------------------



        [WebMethod]

        public void i_DetalleVisitaWEB(String CompanyCode, int idVisitaCliente, int idCliente, String idUsuario, int idEstatus, double Latitud, double Longitud, bool Dentro)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_DetalleVisita(@idVisitaCliente, @idCliente, @idUsuario, @idEstatus, @Latitud, @Longitud, @Dentro)";

            cmd.Parameters.AddWithValue("@idVisitaCliente", null);

            cmd.Parameters.AddWithValue("@idCliente", idCliente);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

            cmd.Parameters.AddWithValue("@idEstatus", idEstatus);

            cmd.Parameters.AddWithValue("@Latitud", Latitud);

            cmd.Parameters.AddWithValue("@Longitud", Longitud);

            cmd.Parameters.AddWithValue("@Dentro", Dentro);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public int i_DetalleVisitaHH(String CompanyCode, int idVisitaCliente, int idCliente, String idUsuario, int idEstatus, double Latitud, double Longitud, bool Dentro)
        {

            int id = 0;



            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_DetalleVisita(@idVisitaCliente, @idCliente, @idUsuario, @idEstatus, @Latitud, @Longitud, @Dentro)";

            cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

            cmd.Parameters.AddWithValue("@idCliente", null);

            cmd.Parameters.AddWithValue("@idUsuario", null);

            cmd.Parameters.AddWithValue("@idEstatus", idEstatus);

            cmd.Parameters.AddWithValue("@Latitud", Latitud);

            cmd.Parameters.AddWithValue("@Longitud", Longitud);

            cmd.Parameters.AddWithValue("@Dentro", Dentro);



            cmd.Connection = conn;



            //cmd.ExecuteNonQuery();

            MySqlDataReader r = cmd.ExecuteReader();

            while (r.Read())
            {

                id = r.GetInt32("id");

            }



            DB_CloseConn();



            return id;

        }



        [WebMethod]

        public DetalleVisita i_DetalleVisitaHH_OBJ_LOCAL(String CompanyCode, int idVisitaCliente, int idCliente, String idUsuario, int idEstatus, double Latitud, double Longitud, bool Dentro, String Entrada, String Salida)
        {

            try
            {

                DetalleVisita OBJ = new DetalleVisita();



                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_DetalleVisita_LOCAL(@idVisitaCliente, @idCliente, @idUsuario, @idEstatus, @Latitud, @Longitud, @Dentro, @Entrada, @Salida)";

                cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

                cmd.Parameters.AddWithValue("@idCliente", null);

                cmd.Parameters.AddWithValue("@idUsuario", null);

                cmd.Parameters.AddWithValue("@idEstatus", idEstatus);

                cmd.Parameters.AddWithValue("@Latitud", Latitud);

                cmd.Parameters.AddWithValue("@Longitud", Longitud);

                cmd.Parameters.AddWithValue("@Dentro", Dentro);

                cmd.Parameters.AddWithValue("@Entrada", Entrada);

                cmd.Parameters.AddWithValue("@Salida", Salida);



                cmd.Connection = conn;



                //cmd.ExecuteNonQuery();

                MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {

                    int idVC, idClientee;

                    DateTime salida;

                    String idUser;

                    String nombre, ApeP, ApeM;

                    try { idUser = r.GetString("idUsuario"); }

                    catch (Exception e) { idUser = null; }

                    try { idClientee = r.GetInt32("idCliente"); }

                    catch (Exception e) { idClientee = 0; }

                    try { idVC = r.GetInt32("idVisitaCliente"); }

                    catch (Exception e) { idVC = 0; }

                    try { salida = r.GetDateTime("Salida"); }

                    catch (Exception e) { salida = new DateTime(); }

                    try { nombre = r.GetString("Nombre"); }

                    catch (Exception e) { nombre = ""; }

                    try { ApeP = r.GetString("ApellidoP"); }

                    catch (Exception e) { ApeP = ""; }

                    try { ApeM = r.GetString("ApellidoM"); }

                    catch (Exception e) { ApeM = ""; }



                    OBJ = new DetalleVisita(r.GetInt32("id"), idVC, idClientee, idUser, r.GetInt32("idEstatus"), r.GetDateTime("Fecha"),

                        r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetDateTime("Entrada"), salida, r.GetBoolean("Dentro"), ApeP, ApeM, nombre, r.GetString("Estatus"));

                }



                DB_CloseConn();



                return OBJ;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }

        }



        [WebMethod]

        public DetalleVisita i_DetalleVisitaHH_OBJ_LOCAL_DESC(String CompanyCode, int idVisitaCliente, int idCliente, String idUsuario, int idEstatus, double Latitud, double Longitud, bool Dentro, String Entrada, String Salida, String Desc)
        {

            DetalleVisita OBJ = new DetalleVisita();



            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_DetalleVisita_LOCAL_DESC(@idVisitaCliente, @idCliente, @idUsuario, @idEstatus, @Latitud, @Longitud, @Dentro, @Entrada, @Salida, @Desc)";

            cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

            cmd.Parameters.AddWithValue("@idCliente", null);

            cmd.Parameters.AddWithValue("@idUsuario", null);

            cmd.Parameters.AddWithValue("@idEstatus", idEstatus);

            cmd.Parameters.AddWithValue("@Latitud", Latitud);

            cmd.Parameters.AddWithValue("@Longitud", Longitud);

            cmd.Parameters.AddWithValue("@Dentro", Dentro);

            cmd.Parameters.AddWithValue("@Entrada", Entrada);

            cmd.Parameters.AddWithValue("@Salida", Salida);



            cmd.Parameters.AddWithValue("@Desc", Desc);



            cmd.Connection = conn;



            //cmd.ExecuteNonQuery();

            MySqlDataReader r = cmd.ExecuteReader();

            while (r.Read())
            {

                int idVC, idClientee;

                DateTime salida;

                String idUser;

                String nombre, ApeP, ApeM;

                try { idUser = r.GetString("idUsuario"); }

                catch (Exception e) { idUser = null; }

                try { idClientee = r.GetInt32("idCliente"); }

                catch (Exception e) { idClientee = 0; }

                try { idVC = r.GetInt32("idVisitaCliente"); }

                catch (Exception e) { idVC = 0; }

                try { salida = r.GetDateTime("Salida"); }

                catch (Exception e) { salida = new DateTime(); }

                try { nombre = r.GetString("Nombre"); }

                catch (Exception e) { nombre = ""; }

                try { ApeP = r.GetString("ApellidoP"); }

                catch (Exception e) { ApeP = ""; }

                try { ApeM = r.GetString("ApellidoM"); }

                catch (Exception e) { ApeM = ""; }



                OBJ = new DetalleVisita(r.GetInt32("id"), idVC, idClientee, idUser, r.GetInt32("idEstatus"), r.GetDateTime("Fecha"),

                    r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetDateTime("Entrada"), salida, r.GetBoolean("Dentro"), ApeP, ApeM, nombre, r.GetString("Estatus"));

            }



            DB_CloseConn();



            return OBJ;

        }





        [WebMethod]

        public DetalleVisita i_DetalleVisitaHH_OBJ(String CompanyCode, int idVisitaCliente, int idCliente, String idUsuario, int idEstatus, double Latitud, double Longitud, bool Dentro)
        {

            try
            {

                DetalleVisita OBJ = new DetalleVisita();



                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_DetalleVisita(@idVisitaCliente, @idCliente, @idUsuario, @idEstatus, @Latitud, @Longitud, @Dentro)";

                cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

                cmd.Parameters.AddWithValue("@idCliente", null);

                cmd.Parameters.AddWithValue("@idUsuario", null);

                cmd.Parameters.AddWithValue("@idEstatus", idEstatus);

                cmd.Parameters.AddWithValue("@Latitud", Latitud);

                cmd.Parameters.AddWithValue("@Longitud", Longitud);

                cmd.Parameters.AddWithValue("@Dentro", Dentro);



                cmd.Connection = conn;



                //cmd.ExecuteNonQuery();

                MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {

                    int idVC, idClientee;

                    DateTime salida;

                    String idUser;

                    String nombre, ApeP, ApeM;

                    try { idUser = r.GetString("idUsuario"); }

                    catch (Exception e) { idUser = null; }

                    try { idClientee = r.GetInt32("idCliente"); }

                    catch (Exception e) { idClientee = 0; }

                    try { idVC = r.GetInt32("idVisitaCliente"); }

                    catch (Exception e) { idVC = 0; }

                    try { salida = r.GetDateTime("Salida"); }

                    catch (Exception e) { salida = new DateTime(); }

                    try { nombre = r.GetString("Nombre"); }

                    catch (Exception e) { nombre = ""; }

                    try { ApeP = r.GetString("ApellidoP"); }

                    catch (Exception e) { ApeP = ""; }

                    try { ApeM = r.GetString("ApellidoM"); }

                    catch (Exception e) { ApeM = ""; }



                    OBJ = new DetalleVisita(r.GetInt32("id"), idVC, idClientee, idUser, r.GetInt32("idEstatus"), r.GetDateTime("Fecha"),

                        r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetDateTime("Entrada"), salida, r.GetBoolean("Dentro"), ApeP, ApeM, nombre, r.GetString("Estatus"));

                }



                DB_CloseConn();



                return OBJ;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }





        [WebMethod]

        public String i_DetalleVisita_LOCAL_ADMN(String CompanyCode, int idVisitaCliente, int idEstatus, double Latitud, double Longitud, bool Dentro, String Entrada, String Salida, String idUsuario)
        {

            DetalleVisita OBJ = new DetalleVisita();



            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_DetalleVisita_LOCAL_ADMN(@idVisitaCliente, @idEstatus, @Latitud, @Longitud, @Dentro, @Entrada, @Salida, @idUsuario)";

            cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

            cmd.Parameters.AddWithValue("@idEstatus", idEstatus);

            cmd.Parameters.AddWithValue("@Latitud", Latitud);

            cmd.Parameters.AddWithValue("@Longitud", Longitud);

            cmd.Parameters.AddWithValue("@Dentro", Dentro);

            cmd.Parameters.AddWithValue("@Entrada", Entrada);

            cmd.Parameters.AddWithValue("@Salida", Salida);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            //cmd.ExecuteNonQuery();

            MySqlDataReader r = cmd.ExecuteReader();

            while (r.Read())
            {

                int idVC, idClientee;

                DateTime salida;

                String idUser;

                String nombre, ApeP, ApeM;

                try { idUser = r.GetString("idUsuario"); }

                catch (Exception e) { idUser = null; }

                try { idClientee = r.GetInt32("idCliente"); }

                catch (Exception e) { idClientee = 0; }

                try { idVC = r.GetInt32("idVisitaCliente"); }

                catch (Exception e) { idVC = 0; }

                try { salida = r.GetDateTime("Salida"); }

                catch (Exception e) { salida = new DateTime(); }

                try { nombre = r.GetString("Nombre"); }

                catch (Exception e) { nombre = ""; }

                try { ApeP = r.GetString("ApellidoP"); }

                catch (Exception e) { ApeP = ""; }

                try { ApeM = r.GetString("ApellidoM"); }

                catch (Exception e) { ApeM = ""; }



                OBJ = new DetalleVisita(r.GetInt32("id"), idVC, idClientee, idUser, r.GetInt32("idEstatus"), r.GetDateTime("Fecha"),

                    r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetDateTime("Entrada"), salida, r.GetBoolean("Dentro"), ApeP, ApeM, nombre, r.GetString("Estatus"));

            }



            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(OBJ);



            return json;

        }







        [WebMethod]

        public String lst_DetalleVisita(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL lst_DetalleVisita()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<DetalleVisita> L_DetalleVisita = new List<DetalleVisita>();

            while (r.Read())
            {

                int idVC, idCliente;

                DateTime salida;

                String idUser;

                String nombre, ApeP, ApeM;

                try { idUser = r.GetString("idUsuario"); }

                catch (Exception e) { idUser = null; }

                try { idCliente = r.GetInt32("idCliente"); }

                catch (Exception e) { idCliente = 0; }

                try { idVC = r.GetInt32("idVisitaCliente"); }

                catch (Exception e) { idVC = 0; }

                try { salida = r.GetDateTime("Salida"); }

                catch (Exception e) { salida = new DateTime(); }

                try { nombre = r.GetString("Nombre"); }

                catch (Exception e) { nombre = ""; }

                try { ApeP = r.GetString("ApellidoP"); }

                catch (Exception e) { ApeP = ""; }

                try { ApeM = r.GetString("ApellidoM"); }

                catch (Exception e) { ApeM = ""; }

                L_DetalleVisita.Add(new DetalleVisita(r.GetInt32("id"), idVC, idCliente, idUser, r.GetInt32("idEstatus"), r.GetDateTime("Fecha"),

                    r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetDateTime("Entrada"), salida, r.GetBoolean("Dentro"), ApeP, ApeM, nombre, r.GetString("Estatus")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_DetalleVisita);



            return json;



        }



        [WebMethod]

        public List<DetalleVisita> lstL_DetalleVisita(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL lst_DetalleVisita()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<DetalleVisita> L_DetalleVisita = new List<DetalleVisita>();

            while (r.Read())
            {

                int idVC, idCliente;

                DateTime salida;

                String idUser;

                String nombre, ApeP, ApeM;

                try { idUser = r.GetString("idUsuario"); }

                catch (Exception e) { idUser = null; }

                try { idCliente = r.GetInt32("idCliente"); }

                catch (Exception e) { idCliente = 0; }

                try { idVC = r.GetInt32("idVisitaCliente"); }

                catch (Exception e) { idVC = 0; }

                try { salida = r.GetDateTime("Salida"); }

                catch (Exception e) { salida = new DateTime(); }

                try { nombre = r.GetString("Nombre"); }

                catch (Exception e) { nombre = ""; }

                try { ApeP = r.GetString("ApellidoP"); }

                catch (Exception e) { ApeP = ""; }

                try { ApeM = r.GetString("ApellidoM"); }

                catch (Exception e) { ApeM = ""; }

                L_DetalleVisita.Add(new DetalleVisita(r.GetInt32("id"), idVC, idCliente, idUser, r.GetInt32("idEstatus"), r.GetDateTime("Fecha"),

                    r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetDateTime("Entrada"), salida, r.GetBoolean("Dentro"), ApeP, ApeM, nombre, r.GetString("Estatus")));

            }





            DB_CloseConn();



            return L_DetalleVisita;



        }





        [WebMethod]

        public String s_DetalleVisita(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_DetalleVisita()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<DetalleVisita> L_DetalleVisita = new List<DetalleVisita>();

            while (r.Read())
            {

                //public DetalleVisita(int id, int idVisitaCliente, int idCliente, int idEstatus, String Fecha, double Latitud, double Longitud, String Entrada, String Salida, bool Dentro, String ApellidoP, String ApellidoM, String Nombre, String Estatus) 

                int idVC, idCliente;

                DateTime salida;

                String idUser;

                String nombre, ApeP, ApeM;

                try { idUser = r.GetString("idUsuario"); }

                catch (Exception e) { idUser = null; }

                try { idCliente = r.GetInt32("idCliente"); }

                catch (Exception e) { idCliente = 0; }

                try { idVC = r.GetInt32("idVisitaCliente"); }

                catch (Exception e) { idVC = 0; }

                try { salida = r.GetDateTime("Salida"); }

                catch (Exception e) { salida = new DateTime(); }

                try { nombre = r.GetString("Nombre"); }

                catch (Exception e) { nombre = ""; }

                try { ApeP = r.GetString("ApellidoP"); }

                catch (Exception e) { ApeP = ""; }

                try { ApeM = r.GetString("ApellidoM"); }

                catch (Exception e) { ApeM = ""; }

                L_DetalleVisita.Add(new DetalleVisita(r.GetInt32("id"), idVC, idCliente, idUser, r.GetInt32("idEstatus"), r.GetDateTime("Fecha"),

                    r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetDateTime("Entrada"), salida, r.GetBoolean("Dentro"), ApeP, ApeM, nombre, r.GetString("Estatus")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_DetalleVisita);



            return json;



        }



        [WebMethod]

        public List<DetalleVisita> sL_DetalleVisita(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_DetalleVisita()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<DetalleVisita> L_DetalleVisita = new List<DetalleVisita>();

            while (r.Read())
            {

                //public DetalleVisita(int id, int idVisitaCliente, int idCliente, int idEstatus, String Fecha, double Latitud, double Longitud, String Entrada, String Salida, bool Dentro, String ApellidoP, String ApellidoM, String Nombre, String Estatus) 

                int idVC, idCliente;

                DateTime salida;

                String idUser;

                String nombre, ApeP, ApeM;

                try { idUser = r.GetString("idUsuario"); }

                catch (Exception e) { idUser = null; }

                try { idCliente = r.GetInt32("idCliente"); }

                catch (Exception e) { idCliente = 0; }

                try { idVC = r.GetInt32("idVisitaCliente"); }

                catch (Exception e) { idVC = 0; }

                try { salida = r.GetDateTime("Salida"); }

                catch (Exception e) { salida = new DateTime(); }

                try { nombre = r.GetString("Nombre"); }

                catch (Exception e) { nombre = ""; }

                try { ApeP = r.GetString("ApellidoP"); }

                catch (Exception e) { ApeP = ""; }

                try { ApeM = r.GetString("ApellidoM"); }

                catch (Exception e) { ApeM = ""; }

                L_DetalleVisita.Add(new DetalleVisita(r.GetInt32("id"), idVC, idCliente, idUser, r.GetInt32("idEstatus"), r.GetDateTime("Fecha"),

                    r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetDateTime("Entrada"), salida, r.GetBoolean("Dentro"), ApeP, ApeM, nombre, r.GetString("Estatus")));

            }





            DB_CloseConn();



            return L_DetalleVisita;



        }







        [WebMethod]

        public void u_DetalleVisita(String CompanyCode, int id, int idVisitaCliente, int idEstatus, DateTime Fecha, double Latitud, double Longitud, DateTime Entrada, DateTime Salida, bool Dentro)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL u_DetalleVisita(@id, @idVisitaCliente, @idEstatus, @Fecha, @Latitud, @Longitud, @Entrada, @Salida, @Dentro)";

                cmd.Parameters.AddWithValue("@id", id);

                cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

                cmd.Parameters.AddWithValue("@idEstatus", idEstatus);

                cmd.Parameters.AddWithValue("@Fecha", Fecha);

                cmd.Parameters.AddWithValue("@Latitud", Latitud);

                cmd.Parameters.AddWithValue("@Longitud", Longitud);

                cmd.Parameters.AddWithValue("@Entrada", Entrada);

                cmd.Parameters.AddWithValue("@Salida", Salida);

                cmd.Parameters.AddWithValue("@Dentro", Dentro);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();



                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public void d_DetalleVisita(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_DetalleVisita(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| TIPO PAGO |--------------------------------



        [WebMethod]

        public void i_TipoPago(String CompanyCode, String Descripcion)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_TipoPago(@Descripcion)";

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_TipoPago(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_TipoPago()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<TipoPago> L_TipoPago = new List<TipoPago>();

            while (r.Read())
            {

                L_TipoPago.Add(new TipoPago(r.GetInt32("id"), r.GetString("Descripcion")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_TipoPago);



            return json;



        }



        [WebMethod]

        public List<TipoPago> sL_TipoPago(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_TipoPago()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<TipoPago> L_TipoPago = new List<TipoPago>();

            while (r.Read())
            {

                L_TipoPago.Add(new TipoPago(r.GetInt32("id"), r.GetString("Descripcion")));

            }





            DB_CloseConn();



            return L_TipoPago;



        }





        [WebMethod]

        public void u_TipoPago(String CompanyCode, int id, String Descripcion)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_TipoPago(@id, @Descripcion)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_TipoPago(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_TipoPago(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| CAUSA DEVOLUCION |-------------------------



        [WebMethod]

        public void i_CausaDevolucion(String CompanyCode, String Descripcion, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_CausaDevolucion(@Descripcion, @idUsuario)";

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);







            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_CausaDevolucion(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_CausaDevolucion()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<CausaDevolucion> L_CausaDevolucion = new List<CausaDevolucion>();

            while (r.Read())
            {

                L_CausaDevolucion.Add(new CausaDevolucion(r.GetInt32("id"), r.GetString("Descripcion")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_CausaDevolucion);



            return json;



        }



        [WebMethod]

        public List<CausaDevolucion> sL_CausaDevolucion(String CompanyCode)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_CausaDevolucion()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<CausaDevolucion> L_CausaDevolucion = new List<CausaDevolucion>();

                while (r.Read())
                {

                    L_CausaDevolucion.Add(new CausaDevolucion(r.GetInt32("id"), r.GetString("Descripcion")));

                }





                DB_CloseConn();



                return L_CausaDevolucion;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }





        [WebMethod]

        public void u_CausaDevolucion(String CompanyCode, int id, String Descripcion, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_CausaDevolucion(@id, @Descripcion, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);







            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_CausaDevolucion(String CompanyCode, int id, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_CausaDevolucion(@id, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| ENTREGA PRODUCTO |-------------------------



        [WebMethod]

        public void i_EntregaProductos(String CompanyCode, String JSON)
        {

            var jsonSerialiser = new JavaScriptSerializer();





            List<EntregaProducto> L_EProducto = new List<EntregaProducto>();

            L_EProducto = jsonSerialiser.Deserialize<List<EntregaProducto>>(JSON);



            DB_OpenConn(CompanyCode);

            foreach (EntregaProducto EP in L_EProducto)
            {

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_EntregaProducto(@idDetalleVisita, @idProducto, @InventarioInicial, @Cantidad, @Total, @idPromocion)";

                cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                if (EP.InventarioInicial == -1) cmd.Parameters.AddWithValue("@InventarioInicial", null);

                else cmd.Parameters.AddWithValue("@InventarioInicial", EP.InventarioInicial);

                cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                cmd.Parameters.AddWithValue("@Total", EP.Total);

                if (EP.idPromocion == -1) cmd.Parameters.AddWithValue("@idPromocion", null);

                else cmd.Parameters.AddWithValue("@idPromocion", EP.idPromocion);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }

            DB_CloseConn();

        }





        [WebMethod]

        public void i_EntregaProductos_ADMN(String CompanyCode, String JSON)
        {

            var jsonSerialiser = new JavaScriptSerializer();





            List<EntregaProducto> L_EProducto = new List<EntregaProducto>();

            L_EProducto = jsonSerialiser.Deserialize<List<EntregaProducto>>(JSON);



            DB_OpenConn(CompanyCode);

            int orden = 0;

            foreach (EntregaProducto EP in L_EProducto)
            {

                MySqlCommand cmd = new MySqlCommand();

                //idDetalleVisita_ INT, idProducto_ INT, InventarioInicial_ INT, Cantidad_ INT, Total_ FLOAT, idPromocion_ INT, idCred_ INT, Activo_ BOOLEAN, Descuento_ FLOAT

                cmd.CommandText = "CALL i_EntregaProductoADMIN(@idDetalleVisita, @idProducto, @InventarioInicial, @Cantidad, @Total, @idPromocion, @idCred, @Activo, @Descuento, @Orden)";

                cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                if (EP.InventarioInicial == -1) cmd.Parameters.AddWithValue("@InventarioInicial", null);

                else cmd.Parameters.AddWithValue("@InventarioInicial", EP.InventarioInicial);

                cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                cmd.Parameters.AddWithValue("@Total", EP.Total);

                if (EP.idPromocion == -1) cmd.Parameters.AddWithValue("@idPromocion", null);

                else cmd.Parameters.AddWithValue("@idPromocion", EP.idPromocion);



                if (EP.idCredito == 0) cmd.Parameters.AddWithValue("@idCred", null);

                else cmd.Parameters.AddWithValue("@idCred", EP.idCredito);



                cmd.Parameters.AddWithValue("@Activo", EP.Activo);

                cmd.Parameters.AddWithValue("@Descuento", EP.Descuento);

                cmd.Parameters.AddWithValue("@Orden", orden);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();



                orden++;

            }

            DB_CloseConn();

        }





        [WebMethod]

        public void i_EntregaProductosHH(String CompanyCode, String Ls_EntregaP)
        {

            List<EntregaProducto> L_EntregaP = new List<EntregaProducto>();

            String[] OBJ = Ls_EntregaP.Split('|');



            foreach (String obj in OBJ)
            {

                String[] EP = obj.Split(',');

                L_EntregaP.Add(new EntregaProducto(int.Parse(EP[0]), int.Parse(EP[1]), int.Parse(EP[2]), int.Parse(EP[3]), float.Parse(EP[4]), int.Parse(EP[5])));

            }







            DB_OpenConn(CompanyCode);

            foreach (EntregaProducto EP in L_EntregaP)
            {

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_EntregaProducto(@idDetalleVisita, @idProducto, @InventarioInicial, @Cantidad, @Total, @idPromocion)";

                cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                if (EP.InventarioInicial == -1) cmd.Parameters.AddWithValue("@InventarioInicial", null);

                else cmd.Parameters.AddWithValue("@InventarioInicial", EP.InventarioInicial);

                cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                cmd.Parameters.AddWithValue("@Total", EP.Total);

                if (EP.idPromocion == -1) cmd.Parameters.AddWithValue("@idPromocion", null);

                else cmd.Parameters.AddWithValue("@idPromocion", EP.idPromocion);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }

            DB_CloseConn();

        }



        [WebMethod]

        public void i_EntregaProductosHH_Consignacion(String CompanyCode, String Ls_EntregaP)
        {/*METODO USADO EN CASH CONSIGNACION (CASH)*/



            List<EntregaProducto> L_EntregaP = new List<EntregaProducto>();

            String[] OBJ = Ls_EntregaP.Split('|');



            foreach (String obj in OBJ)
            {

                String[] EP = obj.Split(',');

                L_EntregaP.Add(new EntregaProducto(int.Parse(EP[0]), int.Parse(EP[1]), int.Parse(EP[2]), int.Parse(EP[3]), float.Parse(EP[4]), int.Parse(EP[5]), int.Parse(EP[6])));

            }







            DB_OpenConn(CompanyCode);

            foreach (EntregaProducto EP in L_EntregaP)
            {

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_EntregaProducto_Cons(@idDetalleVisita, @idProducto, @InventarioInicial, @Cantidad, @Total, @idPromocion, @idCred)";

                cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                if (EP.InventarioInicial == -1) cmd.Parameters.AddWithValue("@InventarioInicial", null);

                else cmd.Parameters.AddWithValue("@InventarioInicial", EP.InventarioInicial);

                cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                cmd.Parameters.AddWithValue("@Total", EP.Total);

                if (EP.idPromocion == -1) cmd.Parameters.AddWithValue("@idPromocion", null);

                else cmd.Parameters.AddWithValue("@idPromocion", EP.idPromocion);



                if (EP.idCredito == 0 || EP.idCredito == -1) cmd.Parameters.AddWithValue("@idCred", null);

                else cmd.Parameters.AddWithValue("@idCred", EP.idCredito);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }

            DB_CloseConn();

        }



        [WebMethod]

        public void i_EntregaProductosHH_Historial(String CompanyCode, String Ls_EntregaP)
        {/*METODO DE GUARDAR HISTORIAL EDICIONES (BYDSA)*/



            List<EntregaProducto> L_EntregaP = new List<EntregaProducto>();

            String[] OBJ = Ls_EntregaP.Split('|');



            foreach (String obj in OBJ)
            {

                String[] EP = obj.Split(',');

                L_EntregaP.Add(new EntregaProducto(int.Parse(EP[0]), int.Parse(EP[1]), int.Parse(EP[2]), int.Parse(EP[3]), float.Parse(EP[4]), int.Parse(EP[5]), bool.Parse(EP[6]), EP[7].ToString()));

            }







            DB_OpenConn(CompanyCode);

            foreach (EntregaProducto EP in L_EntregaP)
            {

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_EntregaProducto_Historial(@idDetalleVisita, @idProducto, @InventarioInicial, @Cantidad, @Total, @idPromocion, @Activo, @fHH)";

                cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                if (EP.InventarioInicial == -1) cmd.Parameters.AddWithValue("@InventarioInicial", null);

                else cmd.Parameters.AddWithValue("@InventarioInicial", EP.InventarioInicial);

                cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                cmd.Parameters.AddWithValue("@Total", EP.Total);

                if (EP.idPromocion == -1) cmd.Parameters.AddWithValue("@idPromocion", null);

                else cmd.Parameters.AddWithValue("@idPromocion", EP.idPromocion);



                cmd.Parameters.AddWithValue("@Activo", EP.Activo);

                cmd.Parameters.AddWithValue("@fHH", EP.fHH);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }

            DB_CloseConn();

        }





        [WebMethod]

        public void i_EntregaProductosHH_Historial_F(String CompanyCode, String Ls_EntregaP)
        {

            try
            {

                /*METODO DE GUARDAR HISTORIAL EDICIONES (BYDSA)*/



                List<EntregaProducto> L_EntregaP = new List<EntregaProducto>();

                String[] OBJ = Ls_EntregaP.Split('|');



                foreach (String obj in OBJ)
                {

                    String[] EP = obj.Split(',');

                    L_EntregaP.Add(new EntregaProducto(int.Parse(EP[0]), int.Parse(EP[1]), int.Parse(EP[2]), int.Parse(EP[3]), float.Parse(EP[4]), int.Parse(EP[5]), bool.Parse(EP[6]), EP[7].ToString(), int.Parse(EP[8]), float.Parse(EP[9])));

                }







                DB_OpenConn(CompanyCode);

                foreach (EntregaProducto EP in L_EntregaP)
                {

                    MySqlCommand cmd = new MySqlCommand();

                    cmd.CommandText = "CALL i_EntregaProducto_Historial_F(@idDetalleVisita, @idProducto, @InventarioInicial, @Cantidad, @Total, @idPromocion, @Activo, @fHH, @idCred, @Descuento)";

                    cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                    cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                    if (EP.InventarioInicial == -1) cmd.Parameters.AddWithValue("@InventarioInicial", null);

                    else cmd.Parameters.AddWithValue("@InventarioInicial", EP.InventarioInicial);

                    cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                    cmd.Parameters.AddWithValue("@Total", EP.Total);

                    if (EP.idPromocion == -1) cmd.Parameters.AddWithValue("@idPromocion", null);

                    else cmd.Parameters.AddWithValue("@idPromocion", EP.idPromocion);



                    cmd.Parameters.AddWithValue("@Activo", EP.Activo);

                    cmd.Parameters.AddWithValue("@fHH", EP.fHH);



                    if (EP.idCredito == 0 || EP.idCredito == -1) cmd.Parameters.AddWithValue("@idCred", null);

                    else cmd.Parameters.AddWithValue("@idCred", EP.idCredito);



                    cmd.Parameters.AddWithValue("@Descuento", EP.Descuento);



                    cmd.Connection = conn;



                    cmd.ExecuteNonQuery();

                }

                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }

        }







        [WebMethod]

        public void i_EntregaProductosHH2(String CompanyCode, List<String> Ls_EntregaP)
        {

            List<EntregaProducto> L_EntregaP = new List<EntregaProducto>();

            //String[] OBJ = Ls_EntregaP.Split('|');



            foreach (String obj in Ls_EntregaP)
            {

                String[] EP = obj.Split(',');

                L_EntregaP.Add(new EntregaProducto(int.Parse(EP[0]), int.Parse(EP[1]), int.Parse(EP[2]), int.Parse(EP[3]), float.Parse(EP[4]), int.Parse(EP[5])));

            }







            DB_OpenConn(CompanyCode);

            foreach (EntregaProducto EP in L_EntregaP)
            {

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_EntregaProducto(@idDetalleVisita, @idProducto, @InventarioInicial, @Cantidad, @Total, @idPromocion)";

                cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                if (EP.InventarioInicial == -1) cmd.Parameters.AddWithValue("@InventarioInicial", null);

                else cmd.Parameters.AddWithValue("@InventarioInicial", EP.InventarioInicial);

                cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                cmd.Parameters.AddWithValue("@Total", EP.Total);

                if (EP.idPromocion == -1) cmd.Parameters.AddWithValue("@idPromocion", null);

                else cmd.Parameters.AddWithValue("@idPromocion", EP.idPromocion);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }

            DB_CloseConn();

        }







        [WebMethod]

        public String s_EntregaProducto(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_EntregaProducto()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<EntregaProducto> L_EntregaProducto = new List<EntregaProducto>();



            int cont = 0;

            while (r.Read() && cont <= 100)
            {

                //public DetalleVisita(int id, int idVisitaCliente, int idCliente, int idEstatus, String Fecha, double Latitud, double Longitud, String Entrada, String Salida, bool Dentro, String ApellidoP, String ApellidoM, String Nombre, String Estatus) 

                int inventarioIni, idPromocion;

                try { inventarioIni = r.GetInt32("InventarioInicial"); }

                catch (Exception e) { inventarioIni = 0; }

                try { idPromocion = r.GetInt32("idPromocion"); }

                catch (Exception e) { idPromocion = 0; }

                L_EntregaProducto.Add(new EntregaProducto(r.GetInt32("idDetalleVisita"), inventarioIni, r.GetInt32("idProducto"), r.GetInt32("Cantidad"), r.GetFloat("Total"), idPromocion,

                    r.GetString("NombreTienda"), r.GetInt32("idVisitaCliente"), r.GetString("Nombre"), r.GetString("idUsuario_Op")));



                cont++;

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_EntregaProducto);



            return json;



        }





        [WebMethod]

        public String s_EntregaProducto2(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_EntregaProducto()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<EntregaProducto> L_EntregaProducto = new List<EntregaProducto>();



            int cont = 0;

            while (r.Read() && cont <= 100)
            {



                cont++;

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_EntregaProducto);



            return json;



        }





        [WebMethod]

        public String s_EntregaProducto_ADMN(String CompanyCode, int idDetalleVisita)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_EntregaProducto_ADMN(@idDetalleVisita)";

            cmd.Parameters.AddWithValue("@idDetalleVisita", idDetalleVisita);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<EntregaProducto> L_EntregaProducto = new List<EntregaProducto>();



            while (r.Read())
            {

                int inventarioIni, idPromocion, idCred;

                try { inventarioIni = r.GetInt32("InventarioInicial"); }

                catch (Exception e) { inventarioIni = 0; }

                try { idPromocion = r.GetInt32("idPromocion"); }

                catch (Exception e) { idPromocion = 0; }

                try { idCred = r.GetInt32("idCred"); }

                catch (Exception e) { idCred = 0; }

                L_EntregaProducto.Add(new EntregaProducto(r.GetInt32("idDetalleVisita"), r.GetInt32("idProducto"), inventarioIni, r.GetInt32("Cantidad"), r.GetFloat("Total"),

                    idPromocion, idCred, r.GetFloat("Descuento"), r.GetBoolean("Activo"),

                    r.GetString("NombreTienda"), r.GetInt32("idVisitaCliente"), r.GetString("Nombre"), r.GetString("idUsuario_Op")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_EntregaProducto);



            return json;



        }









        [WebMethod]

        public void d_EntregaProducto(String CompanyCode, int idDetalleVisita, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_EntregaProducto(@idDetalleVisita, @idUsuario)";

            cmd.Parameters.AddWithValue("@idDetalleVisita", idDetalleVisita);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }





        #endregion
        
        #region -------------------------------| TIPO EQUIPO |------------------------------



        [WebMethod]

        public void i_TipoEquipo(String CompanyCode, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_TipoEquipo(@Nombre)";

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_TipoEquipo(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_TipoEquipo()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<TipoEquipo> L_TipoEquipo = new List<TipoEquipo>();

            while (r.Read())
            {

                L_TipoEquipo.Add(new TipoEquipo(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_TipoEquipo);



            return json;



        }



        [WebMethod]

        public List<TipoEquipo> sL_TipoEquipo(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_TipoEquipo()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<TipoEquipo> L_TipoEquipo = new List<TipoEquipo>();

            while (r.Read())
            {

                L_TipoEquipo.Add(new TipoEquipo(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            return L_TipoEquipo;



        }





        [WebMethod]

        public void u_TipoEquipo(String CompanyCode, int id, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_TipoEquipo(@id, @Nombre)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_TipoEquipo(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_TipoEquipo(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| EQUIPO |-----------------------------------



        [WebMethod]

        public void i_Equipo(String CompanyCode, int idTipo, String NoSerie, String Modelo, String Descripcion)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Equipo(@idTipo, @NoSerie, @Modelo, @Descripcion)";

            cmd.Parameters.AddWithValue("@idTipo", idTipo);

            cmd.Parameters.AddWithValue("@NoSerie", NoSerie);

            cmd.Parameters.AddWithValue("@Modelo", Modelo);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Equipo(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Equipo()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Equipo> L_Equipo = new List<Equipo>();

            while (r.Read())
            {

                String fDesc;

                try { fDesc = r.GetString("fDesc"); }

                catch (Exception) { fDesc = ""; }

                L_Equipo.Add(new Equipo(r.GetInt32("id"), r.GetInt32("idTipo"), r.GetString("NoSerie"), r.GetString("Modelo"), r.GetString("Descripcion"), r.GetString("fAlta"), fDesc, r.GetString("Tipo")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Equipo);



            return json;



        }



        [WebMethod]

        public List<Equipo> sL_Equipo(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Equipo()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Equipo> L_Equipo = new List<Equipo>();

            while (r.Read())
            {

                String fDesc;

                try { fDesc = r.GetString("fDesc"); }

                catch (Exception) { fDesc = ""; }

                L_Equipo.Add(new Equipo(r.GetInt32("id"), r.GetInt32("idTipo"), r.GetString("NoSerie"), r.GetString("Modelo"), r.GetString("Descripcion"), r.GetString("fAlta"), fDesc, r.GetString("Tipo")));

            }





            DB_CloseConn();



            return L_Equipo;



        }





        [WebMethod]

        public void u_Equipo(String CompanyCode, int id, int idTipo, String NoSerie, String Modelo, String Descripcion, String fDesc)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Equipo(@id, @idTipo, @NoSerie, @Modelo, @Descripcion, @fDesc)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idTipo", idTipo);

            cmd.Parameters.AddWithValue("@NoSerie", NoSerie);

            cmd.Parameters.AddWithValue("@Modelo", Modelo);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@fDesc", fDesc);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Equipo(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Equipo(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| EQUIPO USUARIO |---------------------------



        [WebMethod]

        public void i_EquipoUsuario(String CompanyCode, int idEquipo, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_EquipoUsuario(@idEquipo, @idUsuario)";

            cmd.Parameters.AddWithValue("@idEquipo", idEquipo);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_EquipoUsuario(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_EquipoUsuario()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<EquipoUsuario> L_EquipoUsuario = new List<EquipoUsuario>();

            while (r.Read())
            {

                String fDesc;

                try { fDesc = r.GetString("fDesc"); }

                catch (Exception) { fDesc = ""; }

                L_EquipoUsuario.Add(new EquipoUsuario(r.GetInt32("id"), r.GetInt32("idEquipo"), r.GetString("Nickname"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Nombre"), r.GetString("Tipo"), r.GetString("Modelo"), r.GetString("NoSerie"), r.GetString("fCreacion")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_EquipoUsuario);



            return json;



        }



        [WebMethod]

        public List<EquipoUsuario> sL_EquipoUsuario(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_EquipoUsuario()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<EquipoUsuario> L_EquipoUsuario = new List<EquipoUsuario>();

            while (r.Read())
            {

                String fDesc;

                try { fDesc = r.GetString("fDesc"); }

                catch (Exception) { fDesc = ""; }

                L_EquipoUsuario.Add(new EquipoUsuario(r.GetInt32("id"), r.GetInt32("idEquipo"), r.GetString("Nickname"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Nombre"), r.GetString("Tipo"), r.GetString("Modelo"), r.GetString("NoSerie"), r.GetString("fCreacion")));

            }





            DB_CloseConn();



            return L_EquipoUsuario;



        }





        [WebMethod]

        public void u_EquipoUsuario(String CompanyCode, int id, int idEquipo, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_EquipoUsuario(@id, @idEquipo, @idUsuario)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idEquipo", idEquipo);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_EquipoUsuario(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_EquipoUsuario(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| FACTURA |----------------------------------



        [WebMethod]

        public void i_Factura(String CompanyCode, String Folio, int idCliente, float Monto, String Detalle, String fLimite)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Factura(@Folio, @idCliente, @Monto, @Detalle, @fLimite)";

            cmd.Parameters.AddWithValue("@Folio", Folio);

            cmd.Parameters.AddWithValue("@idCliente", idCliente);

            cmd.Parameters.AddWithValue("@Monto", Monto);

            cmd.Parameters.AddWithValue("@Detalle", Detalle);

            cmd.Parameters.AddWithValue("@fLimite", fLimite);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Factura(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Factura()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Factura> L_Factura = new List<Factura>();

            while (r.Read())
            {

                L_Factura.Add(new Factura(r.GetInt32("id"), r.GetString("Folio"), r.GetInt32("idCliente"), r.GetFloat("Monto"), r.GetString("Detalle"), r.GetString("fCreacion"), r.GetString("fLimite"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Factura);



            return json;



        }



        [WebMethod]

        public List<Factura> sL_Factura(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Factura()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Factura> L_Factura = new List<Factura>();

            while (r.Read())
            {

                L_Factura.Add(new Factura(r.GetInt32("id"), r.GetString("Folio"), r.GetInt32("idCliente"), r.GetFloat("Monto"), r.GetString("Detalle"), r.GetString("fCreacion"), r.GetString("fLimite"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            return L_Factura;



        }





        [WebMethod]

        public void u_Factura(String CompanyCode, int id, String Folio, int idCliente, float Monto, String Detalle, String fLimite)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Factura(@id, @Folio, @idCliente, @Monto, @Detalle, @fLimite)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Folio", Folio);

            cmd.Parameters.AddWithValue("@idCliente", idCliente);

            cmd.Parameters.AddWithValue("@Monto", Monto);

            cmd.Parameters.AddWithValue("@Detalle", Detalle);

            cmd.Parameters.AddWithValue("@fLimite", fLimite);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Factura(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Factura(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| USUARIO CARGA FACTURA |--------------------



        [WebMethod]

        public void i_UsuarioCargaFactura(String CompanyCode, String idUsuario, int idFactura)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_UsuarioCargaFactura(@idUsuario, @idFactura)";

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

            cmd.Parameters.AddWithValue("@idFactura", idFactura);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_UsuarioCargaFactura(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_UsuarioCargaFactura()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<UsuarioCargaFactura> L_UsuarioCargaFactura = new List<UsuarioCargaFactura>();

            while (r.Read())
            {

                L_UsuarioCargaFactura.Add(new UsuarioCargaFactura(r.GetInt32("id"), r.GetString("Folio"), r.GetString("idUsuario"), r.GetString("uApellidoP"), r.GetString("uApellidoM"), r.GetString("uNombre"), r.GetInt32("idFactura"), r.GetDateTime("fCargado")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_UsuarioCargaFactura);



            return json;



        }



        [WebMethod]

        public List<UsuarioCargaFactura> sL_UsuarioCargaFactura(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_UsuarioCargaFactura()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<UsuarioCargaFactura> L_UsuarioCargaFactura = new List<UsuarioCargaFactura>();

            while (r.Read())
            {

                L_UsuarioCargaFactura.Add(new UsuarioCargaFactura(r.GetInt32("id"), r.GetString("Folio"), r.GetString("idUsuario"), r.GetString("uApellidoP"), r.GetString("uApellidoM"), r.GetString("uNombre"), r.GetInt32("idFactura"), r.GetDateTime("fCargado")));

            }





            DB_CloseConn();



            return L_UsuarioCargaFactura;



        }





        [WebMethod]

        public void u_UsuarioCargaFactura(String CompanyCode, int id, String idUsuario, int idFactura)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_UsuarioCargaFactura(@id, @idUsuario, @idFactura)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

            cmd.Parameters.AddWithValue("@idFactura", idFactura);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_UsuarioCargaFactura(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_UsuarioCargaFactura(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| LIQUIDACION |------------------------------



        [WebMethod]

        public void i_Liquidacion_OLD(String CompanyCode, String idUsuario_Resp, String idUsuario_Op, float Monto)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Liquidacion(@idUsuario_Resp, @idUsuario_Op, @Monto)";

            cmd.Parameters.AddWithValue("@idUsuario_Resp", idUsuario_Resp);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            cmd.Parameters.AddWithValue("@Monto", Monto);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void i_Liquidacion(String CompanyCode, String idUsuario_Resp, String idUsuario_Op, float Monto, int idRuta, DateTime fDestinado, int idCredito, String Descripcion)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();//CALL i_Liquidacion_Liq(...);

            cmd.CommandText = "CALL i_Liquidacion_ADMN(@idUsuario_Resp, @idUsuario_Op, @Monto, @idRuta, @fDestinado, @idCredito, @Descripcion)";

            cmd.Parameters.AddWithValue("@idUsuario_Resp", idUsuario_Resp);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            cmd.Parameters.AddWithValue("@Monto", Monto);



            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@fDestinado", fDestinado);

            if (idCredito == 0) cmd.Parameters.AddWithValue("@idCredito", null);

            else cmd.Parameters.AddWithValue("@idCredito", idCredito);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }







        [WebMethod]

        public String s_Liquidacion(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Liquidacion()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Liquidacion> L_Liquidacion = new List<Liquidacion>();

            while (r.Read())
            {

                L_Liquidacion.Add(new Liquidacion(r.GetInt32("id"), r.GetString("idUsuario_Resp"), r.GetString("id_Usuario_Op"), r.GetFloat("Monto"), r.GetDateTime("fCreacion"), r.GetString("vApellidoP"), r.GetString("vApellidoM"), r.GetString("vNombre"), r.GetString("sApellidoP"), r.GetString("sApellidoM"), r.GetString("sNombre")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Liquidacion);



            return json;



        }



        [WebMethod]

        public List<Liquidacion> sL_Liquidacion(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Liquidacion()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Liquidacion> L_Liquidacion = new List<Liquidacion>();

            while (r.Read())
            {

                L_Liquidacion.Add(new Liquidacion(r.GetInt32("id"), r.GetString("idUsuario_Resp"), r.GetString("id_Usuario_Op"), r.GetFloat("Monto"), r.GetDateTime("fCreacion"), r.GetString("vApellidoP"), r.GetString("vApellidoM"), r.GetString("vNombre"), r.GetString("sApellidoP"), r.GetString("sApellidoM"), r.GetString("sNombre")));

            }





            DB_CloseConn();



            return L_Liquidacion;



        }





        [WebMethod]

        public void u_Liquidacion(String CompanyCode, int id, String idUsuario_Resp, String idUsuario_Op, float Monto)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Liquidacion(@id, @idUsuario_Resp, @idUsuario_Op, @Monto)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idUsuario_Resp", idUsuario_Resp);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            cmd.Parameters.AddWithValue("@Monto", Monto);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Liquidacion(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Liquidacion(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion
        
        #region -------------------------------| PAGO |-------------------------------------



        [WebMethod]

        public void i_Pago(String CompanyCode, int idDetalleVisita, int idTipoPago, float Monto, int idFactura)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Pago(@idDetalleVisita, @idTipoPago, @Monto, @idFactura)";

            cmd.Parameters.AddWithValue("@idDetalleVisita", idDetalleVisita);

            cmd.Parameters.AddWithValue("@idTipoPago", idTipoPago);

            cmd.Parameters.AddWithValue("@Monto", Monto);

            if (idFactura == -1) cmd.Parameters.AddWithValue("@idFactura", null);

            else cmd.Parameters.AddWithValue("@idFactura", idFactura);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Pago(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Pago()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<PagoVisita> L_Pago = new List<PagoVisita>();

            while (r.Read())
            {   //int id, int idDetalleVisita, int idTipoPago, float Monto, int idFactura, String fPago, int idCliente, int idEstatus, String Fecha, String ApellidoP, String ApellidoM, String Nombre, String Estatus

                int idFac;

                try { idFac = r.GetInt32("idFactura"); }

                catch (Exception) { idFac = 0; }

                L_Pago.Add(new PagoVisita(r.GetInt32("id"), r.GetInt32("idDetalleVisita"), r.GetInt32("idTipoPago"), r.GetFloat("Monto"), idFac, r.GetDateTime("fPago"), r.GetInt32("idCliente"), r.GetInt32("idEstatus"), r.GetString("Fecha"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Nombre"), r.GetString("Estatus"), r.GetString("TipoPago")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Pago);



            return json;



        }



        [WebMethod]

        public List<PagoVisita> sL_Pago(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Pago()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<PagoVisita> L_Pago = new List<PagoVisita>();

            while (r.Read())
            {   //int id, int idDetalleVisita, int idTipoPago, float Monto, int idFactura, String fPago, int idCliente, int idEstatus, String Fecha, String ApellidoP, String ApellidoM, String Nombre, String Estatus

                int idFac;

                try { idFac = r.GetInt32("idFactura"); }

                catch (Exception) { idFac = 0; }

                L_Pago.Add(new PagoVisita(r.GetInt32("id"), r.GetInt32("idDetalleVisita"), r.GetInt32("idTipoPago"), r.GetFloat("Monto"), idFac, r.GetDateTime("fPago"), r.GetInt32("idCliente"), r.GetInt32("idEstatus"), r.GetString("Fecha"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Nombre"), r.GetString("Estatus"), r.GetString("TipoPago")));

            }





            DB_CloseConn();



            return L_Pago;



        }





        [WebMethod]

        public void u_Pago(String CompanyCode, int id, int idDetalleVisita, int idTipoPago, float Monto, int idFactura)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Liquidacion(@id, @idDetalleVisita, @idTipoPago, @Monto, @idFactura)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idDetalleVisita", idDetalleVisita);

            cmd.Parameters.AddWithValue("@idTipoPago", idTipoPago);

            cmd.Parameters.AddWithValue("@Monto", Monto);

            if (idFactura == -1) cmd.Parameters.AddWithValue("@idFactura", null);

            else cmd.Parameters.AddWithValue("@idFactura", idFactura);

            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Pago(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Pago(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }







        #endregion
        
        #region -------------------------------| COBRANZA |---------------------------------



        [WebMethod]

        public String s_Cobranza(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Cobranza()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Cobranza> L_Cobranza = new List<Cobranza>();

            while (r.Read())
            {

                L_Cobranza.Add(new Cobranza(r.GetString("id_Usuario_Op"), r.GetFloat("Liquidado"), r.GetFloat("PagadoCliente"), r.GetFloat("EntregadoCliente"), r.GetFloat("ALiquidar"), r.GetFloat("PendienteLiquidar"), r.GetFloat("PendienteCobrar")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Cobranza);



            return json;



        }



        [WebMethod]

        public List<Cobranza> sL_Cobranza(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Cobranza()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Cobranza> L_Cobranza = new List<Cobranza>();

            while (r.Read())
            {

                L_Cobranza.Add(new Cobranza(r.GetString("id_Usuario_Op"), r.GetFloat("Liquidado"), r.GetFloat("PagadoCliente"), r.GetFloat("EntregadoCliente"), r.GetFloat("ALiquidar"), r.GetFloat("PendienteLiquidar"), r.GetFloat("PendienteCobrar")));

            }





            DB_CloseConn();



            return L_Cobranza;

        }







        #endregion
        
        #region -------------------------------| DEVOLUCION PRODUCTO |----------------------



        [WebMethod]

        public void i_Devoluciones(String CompanyCode, String JSON)
        {

            var jsonSerialiser = new JavaScriptSerializer();





            List<Devolucion> L_DProducto = new List<Devolucion>();

            L_DProducto = jsonSerialiser.Deserialize<List<Devolucion>>(JSON);



            DB_OpenConn(CompanyCode);

            foreach (Devolucion EP in L_DProducto)
            {

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_Devolucion(@idDetalleVisita, @idProducto, @idCausaDev, @Cantidad, @Total, @nAutorizacion)";

                cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                cmd.Parameters.AddWithValue("@idCausaDev", EP.idCausaDevolucion);

                cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                cmd.Parameters.AddWithValue("@Total", EP.Total);

                cmd.Parameters.AddWithValue("@nAutorizacion", EP.nAutorizacion);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }

            DB_CloseConn();

        }



        [WebMethod]

        public void i_DevolucionesHH(String CompanyCode, String Ls_DevolP)
        {

            try
            {

                List<Devolucion> L_DevolP = new List<Devolucion>();

                String[] OBJ = Ls_DevolP.Split('|');



                foreach (String obj in OBJ)
                {

                    String[] EP = obj.Split(',');

                    L_DevolP.Add(new Devolucion(0, int.Parse(EP[0]), int.Parse(EP[1]), int.Parse(EP[2]), int.Parse(EP[3]), float.Parse(EP[4]), "", false));

                }







                DB_OpenConn(CompanyCode);

                foreach (Devolucion EP in L_DevolP)
                {

                    MySqlCommand cmd = new MySqlCommand();

                    cmd.CommandText = "CALL i_Devolucion(@idDetalleVisita, @idProducto, @idCausaDev, @Cantidad, @Total, @nAutorizacion)";

                    cmd.Parameters.AddWithValue("@idDetalleVisita", EP.idDetalleVisita);

                    cmd.Parameters.AddWithValue("@idProducto", EP.idProducto);

                    cmd.Parameters.AddWithValue("@idCausaDev", EP.idCausaDevolucion);

                    cmd.Parameters.AddWithValue("@Cantidad", EP.Cantidad);

                    cmd.Parameters.AddWithValue("@Total", EP.Total);

                    cmd.Parameters.AddWithValue("@nAutorizacion", EP.nAutorizacion);



                    cmd.Connection = conn;



                    cmd.ExecuteNonQuery();

                }

                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }





        [WebMethod]

        public String s_Devolucion(String CompanyCode, int idRuta, String fFin)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_DevolucionLiq(@idRuta, @fFin)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@fFin", fFin);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Devolucion> L_OBJ = new List<Devolucion>();

            while (r.Read())
            {

                //public VentaDiaRuta(String Ruta, DateTime Fecha, int idCliente, int idDetalleVisita, String NombreTienda, float Contado, float Credito, float Consignacion, float Total)

                L_OBJ.Add(new Devolucion(r.GetInt32("idDetalleVisita"), r.GetString("Ruta"), r.GetString("NombreTienda"), r.GetString("Producto"), r.GetInt32("Cantidad"), r.GetFloat("Total"), r.GetString("Descripcion"), r.GetDateTime("Entrada")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }



        [WebMethod]

        public String s_Devolucion_All(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Devolucion()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Devolucion> L_OBJ = new List<Devolucion>();

            while (r.Read())
            {

                //public VentaDiaRuta(String Ruta, DateTime Fecha, int idCliente, int idDetalleVisita, String NombreTienda, float Contado, float Credito, float Consignacion, float Total)

                L_OBJ.Add(new Devolucion(r.GetInt32("idDetalleVisita"), r.GetString("Ruta"), r.GetString("NombreTienda"), r.GetString("Producto"), r.GetInt32("Cantidad"), r.GetFloat("Total"), r.GetString("Descripcion"), r.GetDateTime("Entrada")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }





        #endregion
        
        #region -------------------------------| REGISTRO RUTA |----------------------------



        [WebMethod]

        public int i_RegistroRuta(String CompanyCode, String idUsuario, int idRuta,

                                                        int iOdometro, double iLatitud, double iLongitud, DateTime iFecha,

                                                        int fOdometro, double fLatitud, double fLongitud, DateTime fFecha)
        {

            try
            {

                int id = 0;



                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_RegistroRuta(@idUsuario, @idRuta, @iOdometro, @iLatitud, @iLongitud, @iFecha, @fOdometro, @fLatitud, @fLongitud, @fFecha)";

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

                cmd.Parameters.AddWithValue("@idRuta", idRuta);



                cmd.Parameters.AddWithValue("@iOdometro", iOdometro);

                cmd.Parameters.AddWithValue("@iLatitud", iLatitud);

                cmd.Parameters.AddWithValue("@iLongitud", iLongitud);

                cmd.Parameters.AddWithValue("@iFecha", iFecha);



                if (fOdometro == 0) cmd.Parameters.AddWithValue("@fOdometro", null);

                else cmd.Parameters.AddWithValue("@fOdometro", fOdometro);



                if (fLatitud == 0) cmd.Parameters.AddWithValue("@fLatitud", null);

                else cmd.Parameters.AddWithValue("@fLatitud", fLatitud);



                if (fLongitud == 0) cmd.Parameters.AddWithValue("@fLongitud", null);

                else cmd.Parameters.AddWithValue("@fLongitud", fLongitud);



                if (fFecha == new DateTime()) cmd.Parameters.AddWithValue("@fFecha", null);

                else cmd.Parameters.AddWithValue("@fFecha", fFecha);



                cmd.Connection = conn;



                //cmd.ExecuteNonQuery();



                MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {

                    id = r.GetInt32("id");

                }



                DB_CloseConn();





                //--------------------------------------------------------------------







                return id;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }

        }



        [WebMethod]

        public void c_RegistroRuta(String CompanyCode, int id, int fOdometro, double fLatitud, double fLongitud, String fFecha)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL c_RegistroRuta(@id, @fOdometro, @fLatitud, @fLongitud, @fFecha)";

                cmd.Parameters.AddWithValue("@id", id);



                cmd.Parameters.AddWithValue("@fOdometro", fOdometro);

                cmd.Parameters.AddWithValue("@fLatitud", fLatitud);

                cmd.Parameters.AddWithValue("@fLongitud", fLongitud);

                cmd.Parameters.AddWithValue("@fFecha", fFecha);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();



                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }

        }





        [WebMethod]

        public List<RegistroRuta> sL_RegRuta(String CompanyCode)
        {

            List<RegistroRuta> L_Cobranza = new List<RegistroRuta>();





            return L_Cobranza;

        }





        [WebMethod]

        public void ii_RegistrosRuta(String CompanyCode, List<RegistroRuta> L_RegRuta)
        {

            foreach (RegistroRuta RR in L_RegRuta)
            {

                i_RegistroRuta(CompanyCode, RR.idUsuario, RR.idRuta, RR.iOdometro, RR.iLatitud, RR.iLongitud, RR.iFecha,

                                                RR.fOdometro, RR.fLatitud, RR.fLongitud, RR.fFecha);

            }

        }



        [WebMethod]

        public void i_RegistrosRuta(String CompanyCode, String Ls_RegRuta)
        {

            try
            {

                List<RegistroRuta> L_RegRuta = new List<RegistroRuta>();

                String[] OBJ = Ls_RegRuta.Split('|');



                foreach (String obj in OBJ)
                {

                    String[] RRS = obj.Split(',');



                    RegistroRuta RR = new RegistroRuta();

                    RR.id = int.Parse(RRS[0]);

                    RR.idUsuario = RRS[1].ToString();

                    RR.idRuta = int.Parse(RRS[2]);



                    RR.iOdometro = int.Parse(RRS[3]);

                    RR.iLatitud = double.Parse(RRS[4]);

                    RR.iLongitud = double.Parse(RRS[5]);

                    RR.iFecha = DateTime.Parse(RRS[6]);



                    RR.fOdometro = int.Parse(RRS[7]);

                    RR.fLatitud = double.Parse(RRS[8]);

                    RR.fLongitud = double.Parse(RRS[9]);

                    RR.fFecha = DateTime.Parse(RRS[10]);





                    i_RegistroRuta(CompanyCode, RR.idUsuario, RR.idRuta, RR.iOdometro, RR.iLatitud, RR.iLongitud, RR.iFecha,

                                                    RR.fOdometro, RR.fLatitud, RR.fLongitud, RR.fFecha);

                }

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }







        #endregion
        
        
        #region -------------------------------| LOG |--------------------------------------



        [WebMethod]

        public List<Log> sL_CambiosTabla(String CompanyCode, DateTime Fecha, String idUsuario)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_CambiosTabla(@Fecha, @Usuario)";

                cmd.Parameters.AddWithValue("@Fecha", Fecha);

                cmd.Parameters.AddWithValue("@Usuario", idUsuario);



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Log> L_LOG = new List<Log>();

                while (r.Read())
                {

                    L_LOG.Add(new Log(r.GetString("Nombre"), r.GetInt32("CAMBIOS"), r.GetDateTime("NOW"), r.GetDateTime("Fecha")));

                }





                DB_CloseConn();



                return L_LOG;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public List<Log> sL_CambiosTablaGral(String CompanyCode, DateTime Fecha)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_CambiosTablaGral(@Fecha)";

                cmd.Parameters.AddWithValue("@Fecha", Fecha);



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Log> L_LOG = new List<Log>();

                while (r.Read())
                {

                    L_LOG.Add(new Log(r.GetString("Nombre"), r.GetInt32("CAMBIOS"), r.GetDateTime("NOW"), r.GetDateTime("Fecha")));

                }





                DB_CloseConn();



                return L_LOG;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }





        }







        #endregion
        
        #region -------------------------------| RUTA.MARCA |-------------------------------



        [WebMethod]

        public String s_RutaMarca(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_RutaMarca()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<RutaMarca> L_RutaM = new List<RutaMarca>();

            while (r.Read())
            {

                L_RutaM.Add(new RutaMarca(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetInt32("idMarca")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_RutaM);



            return json;



        }



        [WebMethod]

        public List<RutaMarca> sL_RutaMarca(String CompanyCode)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_RutaMarca()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<RutaMarca> L_RutaM = new List<RutaMarca>();

                while (r.Read())
                {

                    L_RutaM.Add(new RutaMarca(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetInt32("idMarca")));

                }





                DB_CloseConn();



                return L_RutaM;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        #endregion
        
        #region -------------------------------| CREDITO |----------------------------------



        [WebMethod]

        public String s_Credito(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Credito()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Credito> L_Credito = new List<Credito>();

            while (r.Read())
            {

                L_Credito.Add(new Credito(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Credito);



            return json;



        }



        [WebMethod]

        public List<Credito> sL_Credito(String CompanyCode)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_Credito()";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Credito> L_Credito = new List<Credito>();

                while (r.Read())
                {

                    L_Credito.Add(new Credito(r.GetInt32("id"), r.GetString("Nombre")));

                }





                DB_CloseConn();



                return L_Credito;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }

        }



        #endregion

                
        #region -------------------------------| MASIVO |----------------------------------





        [WebMethod]

        public void i_msv_Usuarios(String CompanyCode, String CSV_TEXT)
        {

            String SP_R = "\n";

            String SP_B = ",";



            List<String> L_UsuarioToReset = new List<String>();



            String[] RowsClt = CSV_TEXT.Split(new string[] { SP_R }, StringSplitOptions.None);

            List<String[]> Clt = new List<String[]>();

            for (int i = 0; i < RowsClt.Length; i++)
            {

                Clt.Add(RowsClt[i].Split(new string[] { SP_B }, StringSplitOptions.None));

            }



            String Output = "";

            bool bndFrstRow = false;

            foreach (String[] Row in Clt)
            {

                if (bndFrstRow && Row.Length > 1)
                {

                    if (!L_UsuarioToReset.Contains(Row[17]))

                        L_UsuarioToReset.Add(Row[17]);



                    //INSERT INTO Cliente(id, idCedis, NombreTienda, Nombre, ApellidoP, ApellidoM, Celular, Correo, fCreacion) values(8839, 1, 'ABTS LAURA', 'LAURA JIMENEZ', '-', '-', '-', '-', NOW());

                    Output += "INSERT INTO Cliente(id, idCedis, NombreTienda, Nombre, ApellidoP, ApellidoM, Celular, Correo, fCreacion) " +

                                "values(" + 0 + ", " + Row[1] + ", '" + Row[2] + "', '" +

                                    Row[3] + "', '" + Row[4] + "', '" + Row[5] + "', '" + Row[6] + "', '" + Row[7] + "', NOW());\n";



                    Output += "INSERT INTO Direccion(id, idCliente, Calle, NumeroExt, NumeroInt, CodigoPostal, Colonia, idMunicipio, Latitud, Longitud) " +

                                "values(0, (SELECT last_insert_id()), '" + Row[8] + "', '" + Row[9] + "', '" + Row[10] + "', '" + Row[11] + "', " +

                                "'" + Row[12] + "', " + Row[13] + ", " + Row[14] + ", " + Row[15] + ");\n";



                    Output += "INSERT INTO VisitaCliente(idRuta, idUsuario_Op, idDireccion, fApartirDe, Activo) " +

                                "values(" + Row[16] + ", '" + Row[17] + "', (SELECT last_insert_id()), '" + Row[18] + "', true );\n" +

                              "INSERT INTO DiaVisita(idVisitaCliente, Dia, idFrecuencia, Secuencia) values( (SELECT last_insert_id()), " + Row[19] + ", 1, " + Row[21] + ");\n";

                    //"INSERT INTO DiaVisita(idVisitaCliente, Dia, idFrecuencia, Secuencia) values( (SELECT last_insert_id()), " + Row[19] + ", " + Row[20] + ", " + Row[21] + ");\n";



                }

                else if (!bndFrstRow)

                    bndFrstRow = true;



            }











            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = Output;





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            foreach (String Us in L_UsuarioToReset)
            {

                i_ResetVisitas(CompanyCode, Us);

            }











            DB_CloseConn();

        }





        [WebMethod]

        public void u_msv_Visitas(String CompanyCode, String CSV_TEXT)
        {

            String SP_R = "\n";

            String SP_B = ",";



            String[] RowsClt = CSV_TEXT.Split(new string[] { SP_R }, StringSplitOptions.None);

            List<String[]> Clt = new List<String[]>();

            for (int i = 0; i < RowsClt.Length; i++)
            {

                Clt.Add(RowsClt[i].Split(new string[] { SP_B }, StringSplitOptions.None));

            }



            String Output = "";



            bool bndFrstRow = false;

            int a = 1;





            String Consult_idVisitaC = "SELECT * FROM (";







            foreach (String[] Row in Clt)
            {

                if (bndFrstRow && Row.Length > 1)
                {

                    //SELECT VC.id FROM VisitaCliente VC  LEFT JOIN Direccion D  ON VC.idDireccion = D.id LEFT JOIN Cliente C ON D.idCliente = C.id WHERE C.id = 	6276

                    //Output += " union (SELECT VC.id FROM VisitaCliente VC  LEFT JOIN Direccion D  ON VC.idDireccion = D.id LEFT JOIN Cliente C ON D.idCliente = C.id WHERE C.id = 	" + Row[2] + " limit 1) ";



                    Output += " union (SELECT VC.id, " + a + " FROM VisitaCliente VC  LEFT JOIN Direccion D  ON VC.idDireccion = D.id LEFT JOIN Cliente C ON D.idCliente = C.id WHERE C.id = 	" + Row[3] + " limit 1) ";

                    a++;

                }

                else if (!bndFrstRow)

                    bndFrstRow = true;

            }



            DB_OpenConn(CompanyCode);

            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = Consult_idVisitaC + Output.Substring(6) + ") as fff;";

            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<UsuarioCarga> L_UsuarioCarga = new List<UsuarioCarga>();

            List<String> L_idVisitaClts = new List<String>();

            while (r.Read())
            {

                //L_UsuarioCarga.Add(new UsuarioCarga(r.GetString("idUsuario"), r.GetInt32("Cantidad"), r.GetFloat("Total"), r.GetDateTime("fCargado"), r.GetString("Usuario"), r.GetString("Productos"), r.GetString("Cantidades"), r.GetString("Montos")));

                L_idVisitaClts.Add(r.GetInt32("id").ToString());

            }

            DB_CloseConn();







            Output = "UPDATE VisitaCliente SET Activo = 0 WHERE idRuta = " + Clt[1][4].Trim() + " AND idUsuario_Op = '" + Clt[1][5].Trim() + "';";





            bndFrstRow = false;

            int indx = 0;

            foreach (String[] Row in Clt)
            {

                if (bndFrstRow && Row.Length > 1)
                {

                    //UPDATE DiaVisita SET Dia = 6, Secuencia =	14	 WHERE idVisitaCliente = (select VC.id from VisitaCliente VC left join Direccion D on VC.idDireccion = D.id left join Cliente C on D.idCliente = C.id where C.id = 	8122);

                    Output += "UPDATE DiaVisita SET Dia = " + Row[1] + ", Secuencia = " + Row[2] + " WHERE idVisitaCliente = (select VC.id from VisitaCliente VC left join Direccion D on VC.idDireccion = D.id left join Cliente C on D.idCliente = C.id where C.id = 	" + Row[3] + " and idUsuario_Op = '" + Row[5] + "' limit 1);\n";



                    //UPDATE VisitaCliente set idRuta = 20, idUsuario_Op = 'JOSECORDEROA' where id = 218;

                    Output += "UPDATE VisitaCliente set idRuta = " + Row[4] + ", idUsuario_Op = '" + Row[5] + "', Activo = 1 where id = " + L_idVisitaClts[indx] + ";\n";

                    indx++;

                }

                else if (!bndFrstRow)

                    bndFrstRow = true;



            }











            DB_OpenConn(CompanyCode);



            cmd = new MySqlCommand();

            cmd.CommandText = Output;





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void u_msv_Visitas_TEST(String CompanyCode, String CSV_TEXT, String idUsuario)
        {

            String SP_R = "\n";

            String SP_B = ",";



            String[] RowsClt = CSV_TEXT.Split(new string[] { SP_R }, StringSplitOptions.None);

            List<String[]> Clt = new List<String[]>();

            for (int i = 0; i < RowsClt.Length; i++)
            {

                Clt.Add(RowsClt[i].Split(new string[] { SP_B }, StringSplitOptions.None));

            }



            String Output = "";



            bool bndFrstRow = false;



            DB_OpenConn(CompanyCode);

            MySqlCommand cmd = new MySqlCommand();



            cmd.Connection = conn;



            List<int> L_idVC = new List<int>();





            //Output = "CALL u_DesactivaRecorridos(" + Clt[1][4].Trim() + ", '" + Clt[1][5].Trim() + "');\n";//"UPDATE VisitaCliente SET Activo = 0 WHERE idRuta = " + Clt[1][4].Trim() + " AND idUsuario_Op = '" + Clt[1][5].Trim() + "';";

            cmd.CommandText = "CALL u_DesactivaRecorridos(" + Clt[1][4].Trim() + ", '" + Clt[1][5].Trim() + "');";

            cmd.ExecuteNonQuery();



            foreach (String[] Row in Clt)
            {

                if (bndFrstRow && Row.Length > 1)
                {

                    if (!L_idVC.Contains(int.Parse(Row[6])))
                    {

                        L_idVC.Add(int.Parse(Row[6]));

                        //Dia, Secuencia, idVisitaCliente, idRuta, idUsuario_Op, idUsuario

                        //Output += "CALL u_Recorridos(" + Row[1] + ", " + Row[2] + ", " + Row[6] + ", " + Row[4] + ", '" + Row[5] + "', '" + idUsuario + "');\n";

                        cmd.CommandText = "CALL u_Recorridos(" + Row[1] + ", " + Row[2] + ", " + Row[6] + ", " + Row[4] + ", '" + Row[5] + "', '" + idUsuario + "');";

                        cmd.ExecuteNonQuery();

                    }

                    else
                    {

                        Output += "INSERT INTO VisitaCliente(idRuta, idUsuario_Op, idDireccion, fApartirDe, Activo) " +

                                "values(" + Row[4] + ", '" + Row[5] + "', (SELECT id FROM Direccion WHERE idCliente = " + Row[3] + "), '" + DateTime.Now.ToString("yyyy-MM-dd") + "', true );\n" +

                              "INSERT INTO DiaVisita(idVisitaCliente, Dia, idFrecuencia, Secuencia) values( (SELECT last_insert_id()), " + Row[1] + ", 1, " + Row[2] + ");\n";





                    }



                }

                else if (!bndFrstRow)

                    bndFrstRow = true;

            }



            if (Output.Length > 5)
            {

                cmd.CommandText = Output;

                cmd.ExecuteNonQuery();

            }





            //Output += "CALL i_ResetVisitas('" + Clt[1][5].Trim() + "');";

            cmd.CommandText = "CALL i_ResetVisitas('" + Clt[1][5].Trim() + "');";

            cmd.ExecuteNonQuery();



            /*DB_OpenConn(CompanyCode);
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = Output;
            cmd.Connection = conn;
            cmd.ExecuteNonQuery();*/



            DB_CloseConn();

        }





        #endregion
        
        #region -------------------------------| DASHBOARD |-------------------------------



        [WebMethod]

        public String R_VentadelDia(String CompanyCode, String fIni, String fFin)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_VentadelDia(@fIni, @fFin)";

            cmd.Parameters.AddWithValue("@fIni", fIni);

            cmd.Parameters.AddWithValue("@fFin", fFin);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<VentaDelDia> L_Producto = new List<VentaDelDia>();

            while (r.Read())
            {

                //L_Producto.Add(new VentaDelDia(r.GetString("Ruta"), r.GetDateTime("Fecha"), r.GetFloat("Total")));

                L_Producto.Add(new VentaDelDia(r.GetInt32("idCedis"), r.GetString("idSupervisor"), r.GetString("Ruta"), r.GetDateTime("Fecha"), r.GetFloat("Total")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_Producto);



            return json;



        }





        [WebMethod]

        public String R_ListadoDeClientesPorRuta(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_ListadoDeClientesPorRuta()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<ListadoDeClientesPorRuta> L_Producto = new List<ListadoDeClientesPorRuta>();

            while (r.Read())
            {

                L_Producto.Add(new ListadoDeClientesPorRuta(r.GetString("NombreTienda"), r.GetString("Calle"), r.GetString("NumeroExt"), r.GetString("NumeroInt"), r.GetString("CodigoPostal")

                    , r.GetString("Colonia"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetString("Ruta"), r.GetInt32("Dia"), r.GetInt32("Secuencia"), r.GetInt32("idCliente")

                    , r.GetInt32("idRuta"), r.GetString("idUsuario"), r.GetInt32("idFrecuencia"), r.GetString("Frecuencia"), r.GetDateTime("fCreacion")

                    , r.GetInt32("idVC"), r.GetInt32("idDireccion"), r.GetBoolean("Activo")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_Producto);



            return json;



        }





        [WebMethod]

        public String R_VentaAcumulada(String CompanyCode, DateTime fINI, DateTime fFIN)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_VentaAcumulada(@fINI, @fFIN)";

            cmd.Parameters.AddWithValue("@fINI", fINI);

            cmd.Parameters.AddWithValue("@fFIN", fFIN);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<VentaAcumulada> L_Cliente = new List<VentaAcumulada>();

            int count = 0;

            while (r.Read())
            {



                L_Cliente.Add(new VentaAcumulada(r.GetInt32("id"), r.GetString("NombreTienda"), r.GetString("Calle"), r.GetString("NumeroExt"), r.GetString("Colonia"), r.GetFloat("VentaAcumulada"), r.GetString("Nombre"), r.GetDateTime("fCreacion"), r.GetDateTime("UltimaVisita"), r.GetInt32("DiasSinVisita")));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            var json = js.Serialize(L_Cliente);







            return json;



        }









        [WebMethod]

        public String R_VentadelDia_Cred(String CompanyCode, String fIni, String fFin)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_VentadelDia_Cred(@fIni, @fFin)";

            cmd.Parameters.AddWithValue("@fIni", fIni);

            cmd.Parameters.AddWithValue("@fFin", fFin);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<VentaDelDia> L_Producto = new List<VentaDelDia>();

            while (r.Read())
            {

                L_Producto.Add(new VentaDelDia(r.GetString("Ruta"), r.GetDateTime("Fecha"), r.GetFloat("Total"), r.GetString("TipoVenta")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_Producto);



            return json;



        }





        [WebMethod]

        public String R_VentaDiaRuta(String CompanyCode, int idRuta, String fFin)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_VentaDiaRuta(@idRuta, @fFin)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@fFin", fFin);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<VentaDiaRuta> L_Producto = new List<VentaDiaRuta>();

            while (r.Read())
            {

                //public VentaDiaRuta(String Ruta, DateTime Fecha, int idCliente, int idDetalleVisita, String NombreTienda, float Contado, float Credito, float Consignacion, float Total)

                L_Producto.Add(new VentaDiaRuta(r.GetString("Ruta"), r.GetDateTime("Entrada"), r.GetInt32("idCliente"), r.GetInt32("idDetalleVisita"), r.GetString("NombreTienda"), r.GetFloat("Contado"), r.GetFloat("Credito"), r.GetFloat("Consignacion"), r.GetFloat("Total"), r.GetBoolean("Nuevo")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_Producto);



            return json;



        }







        [WebMethod]

        public String R_ClientesSinVentaNiVisitaDiaRuta(String CompanyCode, int idRuta, String Fecha)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_ClientesSinVentaNiVisitaDiaRuta(@idRuta, @Fecha)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@Fecha", Fecha);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<ClientesSinVentaNiVisitaDiaRuta> L_OBJ = new List<ClientesSinVentaNiVisitaDiaRuta>();

            while (r.Read())
            {

                L_OBJ.Add(new ClientesSinVentaNiVisitaDiaRuta(r.GetInt32("idVisitaCliente"), r.GetString("Ruta"), r.GetString("NombreTienda"), r.GetString("Descripcion")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }



        [WebMethod]

        public String R_LiqVenProducto(String CompanyCode, int idRuta, String fINI, String fFIN)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_LiqVenProducto(@idRuta, @fINI, @fFIN)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@fINI", fINI);

            cmd.Parameters.AddWithValue("@fFIN", fFIN);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<LiqVenProducto> L_OBJ = new List<LiqVenProducto>();

            while (r.Read())
            {

                L_OBJ.Add(new LiqVenProducto(r.GetString("Ruta"), r.GetString("Nombre"), r.GetInt32("Cantidad"), r.GetFloat("Contado"), r.GetFloat("Credito"), r.GetFloat("Consignacion"), r.GetFloat("Total"), r.GetDateTime("Entrada")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }



        [WebMethod]

        public String R_LiquidacionDiaRuta(String CompanyCode, String fINI, String fFIN)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_LiquidacionDiaRuta(@fINI, @fFIN)";

            cmd.Parameters.AddWithValue("@fINI", fINI);

            cmd.Parameters.AddWithValue("@fFIN", fFIN);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<LiquidacionDiaRuta> L_OBJ = new List<LiquidacionDiaRuta>();

            while (r.Read())
            {

                L_OBJ.Add(new LiquidacionDiaRuta(r.GetString("Ruta"), r.GetString("Usuario"), r.GetFloat("Contado"), r.GetFloat("Credito"), r.GetFloat("Consignacion"), r.GetFloat("Total"), r.GetInt32("Inputs"), r.GetDateTime("fDestinado"), r.GetDateTime("fCreacion"), r.GetFloat("Deposito"), r.GetFloat("Diff")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }





        [WebMethod]

        public String R_SumVisitasDiaRuta(String CompanyCode, int idRuta, String Fecha)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_SumVisitasDiaRuta(@idRuta, @Fecha)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@Fecha", Fecha);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<SumVisitasDiaRuta> L_OBJ = new List<SumVisitasDiaRuta>();

            while (r.Read())
            {

                L_OBJ.Add(new SumVisitasDiaRuta(r.GetInt32("CON VENTA"), r.GetInt32("SIN VENTA"), r.GetInt32("NO VISITADOS")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }



        [WebMethod]

        public String vLiq(String CompanyCode, int idRuta, String Fecha)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL vLiq_TMP_soloPorUnTimepoBorrame(@idRuta, @Fecha)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@Fecha", Fecha);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<int> L_OBJ = new List<int>();

            while (r.Read())
            {

                L_OBJ.Add((r.GetInt32("Reg")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }





        [WebMethod]

        public String R_AudtHH(String CompanyCode, String Fecha)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_AudtHH(@Fecha)";

            cmd.Parameters.AddWithValue("@Fecha", Fecha);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<InicioTimeHH> L_OBJ = new List<InicioTimeHH>();

            while (r.Read())
            {

                L_OBJ.Add(new InicioTimeHH(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetString("Nombre"), r.GetDateTime("fHH"), r.GetDateTime("fBD"), r.GetString("Desc"), r.GetInt32("Veces"), r.GetFloat("Diff")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }



        [WebMethod]

        public String R_CoorPedidos(String CompanyCode, String Fecha)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_CoorPedidos(@Fecha)";

            cmd.Parameters.AddWithValue("@Fecha", Fecha);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<CoorPedidos> L_OBJ = new List<CoorPedidos>();

            while (r.Read())
            {

                L_OBJ.Add(new CoorPedidos(r.GetInt32("idRuta"), r.GetString("Nombre"), r.GetInt32("idDireccion"), r.GetInt32("idCliente"), r.GetString("NombreTienda"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetString("Calle"), r.GetString("NumeroExt"), r.GetString("Colonia"), r.GetInt32("idPedido"), r.GetDateTime("Entrada"), r.GetDouble("pLatitud"), r.GetDouble("pLongitud")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            jsonSerialiser.MaxJsonLength = 999999999;

            var json = jsonSerialiser.Serialize(L_OBJ);



            return json;



        }









        #endregion
        
        #region -------------------------------| DEPOSITO |---------------------------------



        [WebMethod]

        public void i_Deposito(String CompanyCode, String idUsuario, int idCuenta, String _idSucursal, float Monto, double Latitud,

                                    double Longitud, bool Dentro, String nRef, String idUsuario_Resp, String Descripcion,

                                    DateTime fDestinado, int idRuta)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Deposito_ADMN(@idUsuario, @idCuenta, @_idSucursal, @Monto, @Latitud, @Longitud, @Dentro, @nRef, @idUsuario_Resp, @Descripcion, @fDestinado, @idRuta)";

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

            if (idCuenta == 0) cmd.Parameters.AddWithValue("@idCuenta", null);

            else cmd.Parameters.AddWithValue("@idCuenta", idCuenta);

            cmd.Parameters.AddWithValue("@_idSucursal", _idSucursal);

            cmd.Parameters.AddWithValue("@Monto", Monto);

            cmd.Parameters.AddWithValue("@Latitud", Latitud);



            cmd.Parameters.AddWithValue("@Longitud", Longitud);

            cmd.Parameters.AddWithValue("@Dentro", Dentro);

            cmd.Parameters.AddWithValue("@nRef", nRef);

            cmd.Parameters.AddWithValue("@idUsuario_Resp", idUsuario_Resp);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);



            cmd.Parameters.AddWithValue("@fDestinado", fDestinado);

            cmd.Parameters.AddWithValue("@idRuta", idRuta);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }





        #endregion
        
        #region -------------------------------| CARGO.ABONO |------------------------------



        [WebMethod]

        public void i_CargoAbono(String CompanyCode, int CargoA, float Monto, String Causa, String idUsuario_Op, String idUsuario_Resp,

                                                DateTime fDestinado, int idRuta)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_CargoAbono_ADMN(@CargoA, @Monto, @Causa, @idUsuario_Op, @idUsuario_Resp, @fDestinado, @idRuta)";

            cmd.Parameters.AddWithValue("@CargoA", CargoA);

            cmd.Parameters.AddWithValue("@Monto", Monto);

            cmd.Parameters.AddWithValue("@Causa", Causa);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            cmd.Parameters.AddWithValue("@idUsuario_Resp", idUsuario_Resp);



            cmd.Parameters.AddWithValue("@fDestinado", fDestinado);

            cmd.Parameters.AddWithValue("@idRuta", idRuta);







            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }





        #endregion
        
        #region -------------------------------| LISTA |------------------------------------

        /* BAR 1 - PLAZA REGIA
         * 232928336
         * 6xh9d6              */



        [WebMethod]

        public void i_Lista(String CompanyCode, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Lista(@Nombre)";

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Lista(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Lista()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Lista> L_Lista = new List<Lista>();

            while (r.Read())
            {

                L_Lista.Add(new Lista(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_Lista);



            return json;



        }





        [WebMethod]

        public void u_Lista(String CompanyCode, int id, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Lista(@id, @Nombre)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@Nombre", Nombre);

            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_Lista(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Lista(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }







        #endregion
        
        #region -------------------------------| LISTA.PRODUCTO |---------------------------



        [WebMethod]

        public void i_ListaProducto(String CompanyCode, int idLista, int idProducto, float PrecioModif, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_ListaProducto(@idLista, @idProducto, @PrecioModif, @idUsuario)";

            cmd.Parameters.AddWithValue("@idLista", idLista);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@PrecioModif", PrecioModif);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void i_ListaProductos(String CompanyCode, int idLista, String idProductos, String idUsuario)
        {

            String[] Productos = idProductos.Split(',');



            //SE ELIMINAN PRIMERO TODOS LOS PRODUCTOS DE LA LISTA A GUARDAR.

            d_ListaProductos(CompanyCode, idLista);



            DB_OpenConn(CompanyCode);



            foreach (String idP in Productos)
            {

                String[] P_PL = idP.Split('|');



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_ListaProducto(@idLista, @idProducto, @PrecioModif, @idUsuario)";

                cmd.Parameters.AddWithValue("@idLista", idLista);

                cmd.Parameters.AddWithValue("@idProducto", P_PL[0]);

                cmd.Parameters.AddWithValue("@PrecioModif", P_PL[1]);

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }







            DB_CloseConn();

        }





        [WebMethod]

        public String s_ListaProducto(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_ListaProducto()";



            cmd.Connection = conn;





            MySqlDataReader r = cmd.ExecuteReader();

            List<ListaProducto> L_ListaProducto = new List<ListaProducto>();

            while (r.Read())
            {

                L_ListaProducto.Add(new ListaProducto(r.GetInt32("idLista"), r.GetInt32("idProducto"), r.GetFloat("PrecioModif"), r.GetString("Lista"), r.GetInt32("idMarca"),

                    r.GetString("Marca"), r.GetInt32("idGrupo"), r.GetString("Grupo"), r.GetString("Nombre"), r.GetFloat("Precio"),

                    r.GetString("Codigo")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_ListaProducto);



            return json;



        }



        [WebMethod]

        public String s_ProductosLista(String CompanyCode, int idLista)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_ProductosLista(@idLista)";

            cmd.Parameters.AddWithValue("@idLista", idLista);



            cmd.Connection = conn;





            MySqlDataReader r = cmd.ExecuteReader();

            List<ListaProducto> L_ListaProducto = new List<ListaProducto>();

            while (r.Read())
            {

                L_ListaProducto.Add(new ListaProducto(r.GetInt32("idLista"), r.GetInt32("idProducto"), r.GetFloat("PrecioModif"), r.GetString("Lista"), r.GetInt32("idMarca"),

                    r.GetString("Marca"), r.GetInt32("idGrupo"), r.GetString("Grupo"), r.GetString("Nombre"), r.GetFloat("Precio"),

                    r.GetString("Codigo")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_ListaProducto);



            return json;



        }





        [WebMethod]

        public void d_ListaProducto(String CompanyCode, int idLista, int idProducto)
        {//SE ELIMINA DE 1 EN 1

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_ListaProducto(@idLista, @idProducto)";

            cmd.Parameters.AddWithValue("@idLista", idLista);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_ListaProductos(String CompanyCode, int idLista)
        {//ELIMINA TODOS LOS PRODUCTOS DE DETERMINADA LISTA

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_ListaProductos(@idLista)";

            cmd.Parameters.AddWithValue("@idLista", idLista);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }





        [WebMethod]

        public List<Producto> s_ListaProductos_Ruta(String CompanyCode, int idRuta)
        {



            try
            {

                //NUEVO.CEDIS

                String[] Code = CompanyCode.Split('.');

                int idCedis = 1;

                try { idCedis = int.Parse(Code[1]); }

                catch (Exception) { }



                //DB_OpenConn(CompanyCode);

                DB_OpenConn(Code[0]);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_ListaProductos_Ruta(@idRuta)";

                cmd.Parameters.AddWithValue("@idRuta", idRuta);



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Producto> L_Producto = new List<Producto>();



                while (r.Read())
                {

                    if (idCedis == r.GetInt32("idCedis"))
                    {

                        L_Producto.Add(new Producto(r.GetInt32("id"), r.GetInt32("idMarca"), r.GetInt32("idGrupo"), r.GetString("Nombre"), r.GetFloat("PrecioModif"), r.GetString("Codigo"), r.GetString("Marca"), r.GetString("Grupo"), r.GetString("idCedis"), r.GetString("Cedis")));

                    }

                }







                DB_CloseConn();



                return L_Producto;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }











        #endregion
        
        #region -------------------------------| LISTA.RUTA |-------------------------------



        [WebMethod]

        public void i_ListaRuta(String CompanyCode, int idRuta, int idLista, String idUsuario)
        {





            try
            {

                DB_OpenConn(CompanyCode);

                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_ListaRuta(@idRuta, @idLista, @idUsuario)";

                cmd.Parameters.AddWithValue("@idRuta", idRuta);

                cmd.Parameters.AddWithValue("@idLista", idLista);

                cmd.Parameters.AddWithValue("@idUsuario", idUsuario);





                cmd.Connection = conn;



                cmd.ExecuteNonQuery();

            }

            catch (MySqlException ex)
            {

                DB_CloseConn();



                if (ex.Number == 1062)
                {

                    d_ListaRuta(CompanyCode, idRuta);

                    i_ListaRuta(CompanyCode, idRuta, idLista, idUsuario);

                }

                else
                {

                    throw new Exception();

                }





            }

            finally
            {

                DB_OpenConn(CompanyCode);

            }







        }



        [WebMethod]

        public String s_ListaRuta(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_ListaRuta()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<ListaRuta> L_ListaProducto = new List<ListaRuta>();

            while (r.Read())
            {

                L_ListaProducto.Add(new ListaRuta(r.GetInt32("idRuta"), r.GetInt32("idLista"), r.GetDateTime("fAlta"), r.GetBoolean("Activo"), r.GetInt32("idCedis"), r.GetString("Ruta"), r.GetString("idSupervisor"), r.GetString("Lista")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_ListaProducto);



            return json;



        }





        [WebMethod]

        public void d_ListaRuta(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_ListaRuta(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }







        #endregion
        
        #region -------------------------------| RUTA.USUARIO |-----------------------------



        [WebMethod]

        public void i_RutaUsuario(String CompanyCode, int idRuta, String idUsuario_Op, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_RutaUsuario(@idRuta, @idUsuario_Op, @idUsuario)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

            /*cmd.Parameters.AddWithValue("@fAlta", fAlta);
            cmd.Parameters.AddWithValue("@Activo", Activo);*/



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_RutaUsuario(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_RutaUsuarioN()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<RutaUsuario> L_RutaUsuario = new List<RutaUsuario>();

            while (r.Read())
            {

                L_RutaUsuario.Add(new RutaUsuario(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetString("idUsuario_Op"), r.GetDateTime("fAlta"), r.GetBoolean("Activo"), r.GetString("Ruta"), r.GetString("Nombre"), r.GetString("ApeP"), r.GetString("ApeM")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_RutaUsuario);



            return json;



        }





        [WebMethod]

        public void u_RutaUsuario(String CompanyCode, int id, int idRuta, String idUsuario_Op, bool Activo)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_RutaUsuario(@id, @idRuta, @idUsuario_Op, @Activo)";

            cmd.Parameters.AddWithValue("@id", id);

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@idUsuario_Op", idUsuario_Op);

            //cmd.Parameters.AddWithValue("@fAlta", fAlta);

            cmd.Parameters.AddWithValue("@Activo", Activo);

            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public void d_RutaUsuario(String CompanyCode, int id)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_RutaUsuario(@id)";

            cmd.Parameters.AddWithValue("@id", id);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }







        #endregion
        
        #region -------------------------------| PAGINA |-----------------------------------



        [WebMethod]

        public void i_Pagina(String CompanyCode, String Nombre)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Pagina(@Nombre)";

            cmd.Parameters.AddWithValue("@Nombre", Nombre);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        [WebMethod]

        public String s_Pagina(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Pagina()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Pagina> L_RutaUsuario = new List<Pagina>();

            while (r.Read())
            {

                L_RutaUsuario.Add(new Pagina(r.GetInt32("id"), r.GetString("Nombre")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_RutaUsuario);



            return json;



        }





        #endregion
        
        #region -------------------------------| PERMISO |-----------------------------------



        [WebMethod]

        public String s_PermisoUsuario(String CompanyCode, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_PermisoUsuario(@idUsuario)";

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Permiso> L_Cliente = new List<Permiso>();

            int count = 0;

            while (r.Read())
            {



                L_Cliente.Add(new Permiso(r.GetString("TipoUsuario"), r.GetString("Pagina"), r.GetBoolean("C"), r.GetBoolean("R"), r.GetBoolean("U"), r.GetBoolean("D"), r.GetInt32("idTipoUsuario"), r.GetInt32("idPagina")));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            var json = js.Serialize(L_Cliente);







            return json;



        }



        [WebMethod]

        public String s_PermisoTipoUsuario(String CompanyCode, int idTipoUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_PermisoTipoUsuario(@idTipoUsuario)";

            cmd.Parameters.AddWithValue("@idTipoUsuario", idTipoUsuario);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Permiso> L_Cliente = new List<Permiso>();

            int count = 0;

            while (r.Read())
            {



                L_Cliente.Add(new Permiso(r.GetString("TipoUsuario"), r.GetString("Pagina"), r.GetBoolean("C"), r.GetBoolean("R"), r.GetBoolean("U"), r.GetBoolean("D"), r.GetInt32("idTipoUsuario"), r.GetInt32("idPagina")));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            var json = js.Serialize(L_Cliente);







            return json;



        }



        [WebMethod]

        public void u_Permiso(String CompanyCode, int idTipoUsuario, int idPagina, bool C, bool R, bool U, bool D)
        {

            KillSleep(CompanyCode, 1);

            try
            {

                i_Permiso(CompanyCode, idTipoUsuario, idPagina, C, R, U, D);

            }

            catch (Exception ex)
            {



            }





            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_Permiso(@idTipoUsuario, @idPagina, @C, @R, @U, @D)";

            cmd.Parameters.AddWithValue("@idTipoUsuario", idTipoUsuario);

            cmd.Parameters.AddWithValue("@idPagina", idPagina);

            cmd.Parameters.AddWithValue("@C", C);

            cmd.Parameters.AddWithValue("@R", R);

            cmd.Parameters.AddWithValue("@U", U);

            cmd.Parameters.AddWithValue("@D", D);

            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

            //KillSleep(CompanyCode, 1);

        }



        [WebMethod]

        public void i_Permiso(String CompanyCode, int idTipoUsuario, int idPagina, bool C, bool R, bool U, bool D)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Permiso(@idTipoUsuario, @idPagina, @C, @R, @U, @D)";

            cmd.Parameters.AddWithValue("@idTipoUsuario", idTipoUsuario);

            cmd.Parameters.AddWithValue("@idPagina", idPagina);

            cmd.Parameters.AddWithValue("@C", C);

            cmd.Parameters.AddWithValue("@R", R);

            cmd.Parameters.AddWithValue("@U", U);

            cmd.Parameters.AddWithValue("@D", D);

            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }





        #endregion
        
        
        #region -------------------------------| CARGA.RUTA |-------------------------------


        [WebMethod]
        public int i_CargaRuta(String CompanyCode, int idRuta, DateTime fAlta, String idUsuario, int Estatus)
        {
            int idCargaRuta = 0;
            DB_OpenConn(CompanyCode);


            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "CALL i_CargaRuta(@idRuta, @fAlta, @idUsuario, @Estatus)";
            cmd.Parameters.AddWithValue("@idRuta", idRuta);
            cmd.Parameters.AddWithValue("@fAlta", fAlta);
            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);
            cmd.Parameters.AddWithValue("@Estatus", Estatus);
            cmd.Connection = conn;
            
            //cmd.ExecuteNonQuery();

            MySqlDataReader r = cmd.ExecuteReader();

            while (r.Read())
            {
                idCargaRuta = r.GetInt32("id");
            }
            
            DB_CloseConn();
            return idCargaRuta;
        }
        
        [WebMethod]
        public String s_CargaRuta(String CompanyCode)
        {
            DB_OpenConn(CompanyCode);
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "CALL s_CargaRuta()";

            cmd.Connection = conn;
            MySqlDataReader r = cmd.ExecuteReader();
            List<CargaRuta> L_CargaRuta = new List<CargaRuta>();
            while (r.Read())
            {
                L_CargaRuta.Add(new CargaRuta(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetDateTime("fAlta"), r.GetString("idUsuario"), r.GetInt32("Estatus")));
            }

            DB_CloseConn();

            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_CargaRuta);

            return json;
        }
        
        [WebMethod]
        public void u_CargaRuta_Estatus(String CompanyCode, int id, int Estatus)
        {
            DB_OpenConn(CompanyCode);

            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "CALL u_CargaRuta_Estatus(@id, @Estatus)";
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@Estatus", Estatus);

            cmd.Connection = conn;

            cmd.ExecuteNonQuery();

            DB_CloseConn();
        }

        [WebMethod]
        public String s_CargaRuta_Ruta(String CompanyCode, int idRuta)
        {
            DB_OpenConn(CompanyCode);

            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "CALL s_CargaRuta()";
            cmd.Connection = conn;

            MySqlDataReader r = cmd.ExecuteReader();
            List<CargaRuta> L_CargaRuta = new List<CargaRuta>();

            while (r.Read())
            {
                //AVG93 XXX FALTA CONSILIAR LOS CAMPOS DEL CONSTRUCTOR.
                L_CargaRuta.Add(new CargaRuta(r.GetInt32("id"), r.GetInt32("idProducto"), r.GetInt32("Cantidad_Propuesta"), r.GetInt32("Cantidad_Requerida"), r.GetInt32("Cantidad_Final"),
                    r.GetInt32("idMarca"), r.GetInt32("idGrupo"), r.GetString("Nombre"), r.GetFloat("Precio"), r.GetString("Codigo"), r.GetString("Marca"), r.GetString("Grupo"), r.GetFloat("PrecioModif")));

            }

            DB_CloseConn();

            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_CargaRuta);

            return json;
        }
        
        [WebMethod]
        public String s_CargaRutaHH(String CompanyCode, int idRuta)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_CargaRutaHH(" + idRuta + ")";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<CargaRuta> L_CargaRuta = new List<CargaRuta>();

            while (r.Read())
            {

                //AVG93 XXX FALTA CONSILIAR LOS CAMPOS DEL CONSTRUCTOR.

                L_CargaRuta.Add(new CargaRuta(r.GetInt32("id"), r.GetInt32("idProducto"), r.GetInt32("Cantidad_Propuesta"), r.GetInt32("Cantidad_Requerida"), r.GetInt32("Cantidad_Final"),

                    r.GetInt32("idMarca"), r.GetInt32("idGrupo"), r.GetString("Nombre"), r.GetFloat("Precio"), r.GetString("Codigo"), r.GetString("Marca"), r.GetString("Grupo"), r.GetFloat("PrecioModif")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_CargaRuta);



            return json;



        }

        
        [WebMethod]
        public List<CargaRuta> s_CargasPendientesAuth(String CompanyCode, int idRuta)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_CargasPendientesAuth(" + idRuta + ")";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<CargaRuta> L_CargaRuta = new List<CargaRuta>();

            while (r.Read())
            {

                L_CargaRuta.Add(new CargaRuta(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetDateTime("fAlta"), r.GetString("idUsuario"), r.GetInt32("Estatus")));

            }





            DB_CloseConn();





            return L_CargaRuta;



        }
        
        [WebMethod]
        public String s_CargaRutaEstatus(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_CargaRutaEstatus()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<CargaRuta> L_CargaRuta = new List<CargaRuta>();

            while (r.Read())
            {

                L_CargaRuta.Add(new CargaRuta(r.GetInt32("id"), r.GetString("Ruta"), r.GetString("Estatus"), r.GetDateTime("fAlta"), r.GetString("Usuario")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_CargaRuta);



            return json;



        }


        [WebMethod]
        public List<CargaRuta> s_CargaRutaRuta(String CompanyCode, int idRuta)
        {
            DB_OpenConn(CompanyCode);

            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "CALL s_CargaRutaRuta(" + idRuta + ")";
            cmd.Connection = conn;

            MySqlDataReader r = cmd.ExecuteReader();
            List<CargaRuta> L_CargaRuta = new List<CargaRuta>();

            while (r.Read())
            {

                L_CargaRuta.Add(new CargaRuta(r.GetInt32("id"), r.GetInt32("idRuta"), r.GetDateTime("fAlta"), r.GetString("idUsuario"), r.GetString("Usuario"),
                    r.GetInt32("Estatus"), r.GetString("Estado"), r.GetFloat("Monto")));

            }

            DB_CloseConn();

            return L_CargaRuta;
        }
        
        
        #endregion
        
        #region -------------------------------| CARGA.DETALLE |----------------------------



        [WebMethod]
        public void i_CargaDetalle(String CompanyCode, int idCargaRuta, int idProducto, int Cantidad_Propuesta, int Cantidad_Requerido, int Cantidad_Final)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_CargaDetalle(@idCargaRuta, @idProducto, @Cantidad_Propuesta, @Cantidad_Requerido, @Cantidad_Final)";

            cmd.Parameters.AddWithValue("@idCargaRuta", idCargaRuta);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@Cantidad_Propuesta", Cantidad_Propuesta);

            cmd.Parameters.AddWithValue("@Cantidad_Requerido", Cantidad_Requerido);

            cmd.Parameters.AddWithValue("@Cantidad_Final", Cantidad_Final);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }
        
        [WebMethod]
        public void i_CargaDetalle_1(String CompanyCode, int idCargaRuta, int idProducto, int Cantidad_Propuesta)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_CargaDetalle_1(@idCargaRuta, @idProducto, @Cantidad_Propuesta)";

            cmd.Parameters.AddWithValue("@idCargaRuta", idCargaRuta);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@Cantidad_Propuesta", Cantidad_Propuesta);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }
                
        [WebMethod]
        public void i_CargaDetalle_1_Group(String CompanyCode, string CR_P_CP, string SP_Row, string SP_Field)
        {
            String[] OBJs = CR_P_CP.Split((char.Parse(SP_Row)));

            DB_OpenConn(CompanyCode);

            foreach (String obj in OBJs)
            {
                String[] fields = obj.Split(char.Parse(SP_Field));

                if (fields[0] != "")
                {
                    MySqlCommand cmd = new MySqlCommand();
                    cmd.CommandText = "CALL i_CargaDetalle_1(@idCargaRuta, @idProducto, @Cantidad_Propuesta)";
                    cmd.Parameters.AddWithValue("@idCargaRuta", fields[0]);
                    cmd.Parameters.AddWithValue("@idProducto", fields[1]);
                    cmd.Parameters.AddWithValue("@Cantidad_Propuesta", fields[2]);
                    
                    cmd.Connection = conn;
                    
                    cmd.ExecuteNonQuery();
                }
            }

            DB_CloseConn();
        }

        
        [WebMethod]
        public void u_CargaDetalle_2(String CompanyCode, int idCargaRuta, int idProducto, int Cantidad_Requerido)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_CargaDetalle_2(@idCargaRuta, @idProducto, @Cantidad_Requerido)";

            cmd.Parameters.AddWithValue("@idCargaRuta", idCargaRuta);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@Cantidad_Requerido", Cantidad_Requerido);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }
        
        [WebMethod]
        public void u_CargaDetalle_3(String CompanyCode, int idCargaRuta, int idProducto, int Cantidad_Final)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL u_CargaDetalle_3(@idCargaRuta, @idProducto, @Cantidad_Final)";

            cmd.Parameters.AddWithValue("@idCargaRuta", idCargaRuta);

            cmd.Parameters.AddWithValue("@idProducto", idProducto);

            cmd.Parameters.AddWithValue("@Cantidad_Final", Cantidad_Final);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }

        [WebMethod]
        public void u_CargaDetalle_3_Group(String CompanyCode, string CR_P_CP, string SP_Row, string SP_Field)
        {
            String[] OBJs = CR_P_CP.Split((char.Parse(SP_Row)));

            DB_OpenConn(CompanyCode);

            string idRuta = "";

            foreach (String obj in OBJs)
            {
                String[] fields = obj.Split(char.Parse(SP_Field));

                idRuta = fields[0];

                if (fields[0] != "")
                {
                    MySqlCommand cmd = new MySqlCommand();
                    cmd.CommandText = "CALL u_CargaDetalle_3(@idCargaRuta, @idProducto, @Cantidad_Propuesta)";
                    cmd.Parameters.AddWithValue("@idCargaRuta", fields[0]);
                    cmd.Parameters.AddWithValue("@idProducto", fields[1]);
                    cmd.Parameters.AddWithValue("@Cantidad_Propuesta", fields[2]);

                    cmd.Connection = conn;

                    cmd.ExecuteNonQuery();
                }
            }


            MySqlCommand cmd2 = new MySqlCommand();
            cmd2.CommandText = "CALL u_CargaRuta_Estatus(((select id from CargaRuta where idRuta = "+ idRuta +" and Estatus < 2 limit 1)), 2)";
            cmd2.Connection = conn;
            cmd2.ExecuteNonQuery();
            DB_CloseConn();
        }


        [WebMethod]
        public void u_CargaDetalle_EstatusRuta(String CompanyCode, int idRuta, int Estatus)
        {
            DB_OpenConn(CompanyCode);           


            MySqlCommand cmd2 = new MySqlCommand();
            cmd2.CommandText = "CALL u_CargaRuta_Estatus(((select id from CargaRuta where idRuta = " + idRuta + " and Estatus < 2 limit 1)), " + Estatus + ")";
            cmd2.Connection = conn;
            cmd2.ExecuteNonQuery();
            DB_CloseConn();
        }


        [WebMethod]
        public String s_CargaDetalle(String CompanyCode, int idCargaRuta)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_CargaDetalle(" + idCargaRuta + ")";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<CargaDetalle> L_CargaDetalle = new List<CargaDetalle>();

            while (r.Read())
            {

                L_CargaDetalle.Add(new CargaDetalle(r.GetInt32("idCargaRuta"), r.GetInt32("idProducto"), r.GetInt32("Cantidad_Propuesta"), r.GetInt32("Cantidad_Requerida"), r.GetInt32("Cantidad_Final"), r.GetString("Nombre"), r.GetInt32("Inventario")));

            }





            DB_CloseConn();



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(L_CargaDetalle);



            return json;



        }

        [WebMethod]
        public List<CargaDetalle> sL_CargaDetalle(String CompanyCode, int idCargaRuta)
        {

            DB_OpenConn(CompanyCode);

            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "CALL s_CargaDetalle(" + idCargaRuta + ")";
            cmd.Connection = conn;
            
            MySqlDataReader r = cmd.ExecuteReader();
            List<CargaDetalle> L_CargaDetalle = new List<CargaDetalle>();
            while (r.Read())
            {
                L_CargaDetalle.Add(new CargaDetalle(r.GetInt32("idCargaRuta"), r.GetInt32("idProducto"), r.GetInt32("Cantidad_Propuesta"), r.GetInt32("Cantidad_Requerida"), r.GetInt32("Cantidad_Final"), r.GetString("Nombre"), r.GetInt32("Inventario")));
            }
            

            DB_CloseConn();

            return L_CargaDetalle;

        }
        


        [WebMethod]
        public List<Producto> R_InventarioPorRuta(String CompanyCode, int idRuta)
        {
            int count = 0;
            
            try
            {
                count = s_CargasPendientesAuth(CompanyCode, idRuta).Count;
            }

            catch (Exception exx) { }


            try
            {
                //NUEVO.CEDIS
                String[] Code = CompanyCode.Split('.');
                int idCedis = 1;
                try { idCedis = int.Parse(Code[1]); }
                catch (Exception) { }

                //DB_OpenConn(CompanyCode);
                DB_OpenConn(Code[0]);
                
                MySqlCommand cmd = new MySqlCommand();
                String CommandTORequest = count == 0 ? "CALL R_InventarioPorRuta(@idRuta)" : "CALL R_InventarioPorRutaPendiente(@idRuta)";
                cmd.CommandText = CommandTORequest;
                cmd.Parameters.AddWithValue("@idRuta", idRuta);
                cmd.Connection = conn;


                MySqlDataReader r = cmd.ExecuteReader();
                List<Producto> L_Producto = new List<Producto>();
                //if (count == 0) { // SOLO ENTRA SI NO SE TIENE NINGUNA CARGA PENDIENTE POR AUTHORIZAR.

                
                while (r.Read())
                {
                    if (true)//if (idCedis == r.GetInt32("idCedis")) // SE ELIMINO LA RESTRICCION DE PRODUCTOS POR CEDIS YA QUE AHORA SE CANALIZAN POR LISTAS DE PRODUCTOS.
                    {
                        L_Producto.Add(new Producto(r.GetInt32("id"), r.GetInt32("idMarca"), r.GetInt32("idGrupo"), r.GetString("Nombre"), r.GetFloat("PrecioModif"), r.GetString("Codigo"), r.GetString("Marca"), r.GetString("Grupo"),
                            r.GetInt32("Cargas"), r.GetInt32("CargasReq"), r.GetInt32("CargasFnl"), r.GetInt32("Ventas"), r.GetInt32("Inventario"), r.GetDateTime("PrimeraCarga"), r.GetDateTime("UltimaCarga")));
                    }
                }

                //} 

                DB_CloseConn();

                return L_Producto;
            }

            catch (Exception Ex)
            {
                DB_CloseConn();
                throw Ex;
            }



        }
        
        [WebMethod]
        public List<Producto> R_InventarioPorRutaPendiente(String CompanyCode, int idRuta)
        {

            try
            {

                //NUEVO.CEDIS

                String[] Code = CompanyCode.Split('.');

                int idCedis = 1;

                try { idCedis = int.Parse(Code[1]); }

                catch (Exception) { }



                //DB_OpenConn(CompanyCode);

                DB_OpenConn(Code[0]);



                MySqlCommand cmd = new MySqlCommand();

                String CommandTORequest = "CALL R_InventarioPorRutaPendiente(@idRuta)";

                cmd.CommandText = CommandTORequest;

                cmd.Parameters.AddWithValue("@idRuta", idRuta);



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<Producto> L_Producto = new List<Producto>();



                while (r.Read())
                {

                    if (true)//if (idCedis == r.GetInt32("idCedis")) // SE ELIMINO LA RESTRICCION DE PRODUCTOS POR CEDIS YA QUE AHORA SE CANALIZAN POR LISTAS DE PRODUCTOS.
                    {

                        L_Producto.Add(new Producto(r.GetInt32("id"), r.GetInt32("idMarca"), r.GetInt32("idGrupo"), r.GetString("Nombre"), r.GetFloat("PrecioModif"), r.GetString("Codigo"), r.GetString("Marca"), r.GetString("Grupo"), r.GetInt32("Cargas"), r.GetInt32("Ventas"), r.GetInt32("Inventario"), r.GetDateTime("PrimeraCarga"), r.GetDateTime("UltimaCarga")));

                    }

                }



                DB_CloseConn();



                return L_Producto;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }
        

        #endregion




        [WebMethod]
        public String s_Cliente_TEST(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Cliente()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Cliente> L_Cliente = new List<Cliente>();

            int count = 0;

            while (r.Read())
            {



                L_Cliente.Add(new Cliente(r.GetInt32("id"), r.GetInt32("idCedis"), r.GetString("NombreTienda"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Celular"), r.GetString("Correo"), r.GetDateTime("fCreacion"), r.GetString("Cedis")));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            var json = js.Serialize(L_Cliente);







            return json;



        }
        
        [WebMethod]
        public void i_ResetVisitas(String CompanyCode, String idUsuario)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_ResetVisitas(@idUsuario)";

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();





            DB_CloseConn();





            //--------------------------------------------------------------------



        }





        [WebMethod]
        public void i_IndicadoresF(String CompanyCode, int idVisitaCliente, int idCliente, int idCedis, int DiaProg, int Secuencia,

                    DateTime Fecha, int idRuta, float Total, String HICedis, String HPrimerClt,

                    String HCierre, String HUltimoClt, Double LatE, Double LonE, int idEstatus)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_IndicadoresF(@idVisitaCliente, @idCliente, @idCedis, @DiaProg, @Secuencia, " +

                                                            "@Fecha, @idRuta, @Total, @HICedis,  @HPrimerClt, @HCierre, @HUltimoClt, @LatE, @LonE, @idEstatus);";



                cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);

                cmd.Parameters.AddWithValue("@idCliente", idCliente);

                cmd.Parameters.AddWithValue("@idCedis", idCedis);

                cmd.Parameters.AddWithValue("@DiaProg", DiaProg);

                cmd.Parameters.AddWithValue("@Secuencia", Secuencia);





                cmd.Parameters.AddWithValue("@Fecha", Fecha);

                cmd.Parameters.AddWithValue("@idRuta", idRuta);

                cmd.Parameters.AddWithValue("@Total", Total);

                cmd.Parameters.AddWithValue("@HICedis", HICedis);



                cmd.Parameters.AddWithValue("@HPrimerClt", HPrimerClt);

                cmd.Parameters.AddWithValue("@HCierre", HCierre);

                cmd.Parameters.AddWithValue("@HUltimoClt", HUltimoClt);

                cmd.Parameters.AddWithValue("@LatE", LatE);

                cmd.Parameters.AddWithValue("@LonE", LonE);

                cmd.Parameters.AddWithValue("@idEstatus", idEstatus);





                cmd.Connection = conn;



                cmd.ExecuteNonQuery();





                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }

            //--------------------------------------------------------------------

        }



        [WebMethod]
        public IndicadoresFijosHH s_IndicadoresF(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            /*MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "CALL i_IndicadoresF(@idVisitaCliente, @idCliente, @idCedis, @DiaProg, @Secuencia, " +
                                                        "@Fecha, @idRuta, @Total, @HICedis,  @HPrimerClt, @HCierre, @HUltimoClt, @LatE, @LonE, @idEstatus);";

            cmd.Parameters.AddWithValue("@idVisitaCliente", idVisitaCliente);
            cmd.Parameters.AddWithValue("@idCliente", idCliente);
            cmd.Parameters.AddWithValue("@idCedis", idCedis);
            cmd.Parameters.AddWithValue("@DiaProg", DiaProg);
            cmd.Parameters.AddWithValue("@Secuencia", Secuencia);


            cmd.Parameters.AddWithValue("@Fecha", Fecha);
            cmd.Parameters.AddWithValue("@idRuta", idRuta);
            cmd.Parameters.AddWithValue("@Total", Total);
            cmd.Parameters.AddWithValue("@HICedis", HICedis);

            cmd.Parameters.AddWithValue("@HPrimerClt", HPrimerClt);
            cmd.Parameters.AddWithValue("@HCierre", HCierre);
            cmd.Parameters.AddWithValue("@HUltimoClt", HUltimoClt);
            cmd.Parameters.AddWithValue("@LatE", LatE);
            cmd.Parameters.AddWithValue("@LonE", LonE);
            cmd.Parameters.AddWithValue("@idEstatus", idEstatus);


            cmd.Connection = conn;

            cmd.ExecuteNonQuery();


            DB_CloseConn();*/



            return new IndicadoresFijosHH();





            //--------------------------------------------------------------------



        }
        

        [WebMethod]
        public void CH_Cliente_Ruta(String CompanyCode, int idRuta, String idUsuario, int idDireccion, int Dia, int idFrec, int Sec, String USR)
        {

            //USR pending to LOG TABLE



            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL CH_Cliente_Ruta(@idRuta, @idUsuario, @idDireccion, @Dia, @idFrec, @Sec, @USR)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);

            cmd.Parameters.AddWithValue("@idDireccion", idDireccion);

            cmd.Parameters.AddWithValue("@Dia", Dia);

            cmd.Parameters.AddWithValue("@idFrec", idFrec);

            cmd.Parameters.AddWithValue("@Sec", Sec);

            cmd.Parameters.AddWithValue("@USR", USR);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();





            DB_CloseConn();





            //--------------------------------------------------------------------



        }

        
        [WebMethod]
        public List<OBJ4T4U> sL_4T4U(String CompanyCode, String User)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL s_4T4U('" + User + "')";



                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                List<OBJ4T4U> L_OBJ4T4U = new List<OBJ4T4U>();

                while (r.Read())
                {

                    L_OBJ4T4U.Add(new OBJ4T4U(r.GetInt32("idVisitaCliente"), r.GetInt32("idRuta"), r.GetString("idUsuario_Op"), r.GetInt32("idDireccion"), r.GetDateTime("fApartirDe"), r.GetBoolean("Activo"),

                                                r.GetInt32("Dia"), r.GetInt32("idFrecuencia"), r.GetInt32("Secuencia"), r.GetInt32("idCliente"),

                                                r.GetString("Calle"), r.GetString("NumeroExt"), r.GetString("NumeroInt"), r.GetString("CodigoPostal"), r.GetString("Colonia"), r.GetInt32("idMunicipio"), r.GetDouble("Latitud"), r.GetDouble("Longitud"),

                                                r.GetInt32("idCedis"), r.GetString("NombreTienda"), r.GetString("Nombre"), r.GetString("ApellidoP"), r.GetString("ApellidoM"), r.GetString("Celular"), r.GetString("Correo"), r.GetDateTime("fCreacion")));

                }





                DB_CloseConn();



                return L_OBJ4T4U;

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }
        

        [WebMethod]
        public List<List<DateTime>> getNextVisit(String CompanyCode)
        {

            List<List<DateTime>> SigFechas = new List<List<DateTime>>();

            List<DateTime> smallList = new List<DateTime>();

            DateTime Until = new DateTime(2015, 6, 30);



            List<DiaVisita> OBJS = s_DiaVisitaIN(CompanyCode);



            foreach (DiaVisita DV in OBJS)
            {

                smallList = new List<DateTime>();

                DateTime D = new DateTime(2015, 2, 18);//NextDay(DV.Codigo, int.Parse(DV.Parametro), DV.fApartir, DV.Dia);

                /*smallList.Add(D);
                D = D.AddDays(1);
                while (D <= Until)
                {
                    D = NextDay(DV.Codigo, int.Parse(DV.Parametro), D, DV.Dia);
                    if (D <= Until)
                        smallList.Add(D);
                    D = D.AddDays(1);
                }*/



                smallList = NextDays(DV.Codigo, int.Parse(DV.Parametro), DV.fApartir, DV.Dia, Until);



                SigFechas.Add(smallList);





                //break;

            }





            return SigFechas;

        }

        
        [WebMethod]
        public String s_RutaDiaVisitas(String CompanyCode, int idRuta, DateTime Fecha)
        {

            List<RutaDiaVisitas> RDV = new List<RutaDiaVisitas>();

            List<DateTime> smallList = new List<DateTime>();

            DateTime Until = Fecha;//DateTime.Today;

            Until = Until.AddMonths(1);



            List<DiaVisita> OBJS = s_DiaVisitaIN(CompanyCode);



            foreach (DiaVisita DV in OBJS)
            {

                smallList = new List<DateTime>();



                /*smallList.Add(D);
                D = D.AddDays(1);
                while (D <= Until)
                {
                    D = NextDay(DV.Codigo, int.Parse(DV.Parametro), D, DV.Dia);
                    if (D <= Until)
                        smallList.Add(D);
                    D = D.AddDays(1);
                }*/

                if (DV.fApartir > Fecha)

                    smallList = NextDays(DV.Codigo, int.Parse(DV.Parametro), DV.fApartir, DV.Dia, Until);

                else

                    smallList = NextDays(DV.Codigo, int.Parse(DV.Parametro), Fecha, DV.Dia, Until);

                if (DV.idRuta == idRuta && smallList.IndexOf(Fecha) > -1)
                {

                    RDV.Add(new RutaDiaVisitas(DV, smallList));

                }







                //break;

            }



            var jsonSerialiser = new JavaScriptSerializer();

            var json = jsonSerialiser.Serialize(RDV);



            return json;

        }

        
        [WebMethod]
        public List<RutaDiaVisitas> sL_RutaDiaVisitas(String CompanyCode, int idRuta, DateTime Fecha)
        {

            List<RutaDiaVisitas> RDV = new List<RutaDiaVisitas>();

            List<DateTime> smallList = new List<DateTime>();

            DateTime Until = Fecha;//DateTime.Today;

            Until = Until.AddMonths(1);



            List<DiaVisita> OBJS = s_DiaVisitaIN(CompanyCode);



            foreach (DiaVisita DV in OBJS)
            {

                smallList = new List<DateTime>();



                /*smallList.Add(D);
                D = D.AddDays(1);
                while (D <= Until)
                {
                    D = NextDay(DV.Codigo, int.Parse(DV.Parametro), D, DV.Dia);
                    if (D <= Until)
                        smallList.Add(D);
                    D = D.AddDays(1);
                }*/

                if (DV.fApartir > Fecha)

                    smallList = NextDays(DV.Codigo, int.Parse(DV.Parametro), DV.fApartir, DV.Dia, Until);

                else

                    smallList = NextDays(DV.Codigo, int.Parse(DV.Parametro), Fecha, DV.Dia, Until);

                if (DV.idRuta == idRuta && smallList.IndexOf(Fecha) > -1)
                {

                    RDV.Add(new RutaDiaVisitas(DV, smallList));

                }







                //break;

            }



            return RDV;

        }

        
        private DateTime NextDay(String Tipo, int Parametro, DateTime fIni, int Dia)
        {

            /*  DIA |   CODIGO  |   PARAMETRO   |   FECHA DE INICIO
             * 
             *  IF  DIARIO
             *      DIA     =>  0
             *      CODIGO  =>  DIARIO
             *      PARAMETRO   =>  NULL
             *      INICIO  =>  ????/??/??
             *      
             *  IF  SEMANAL
             *      DIA     =>  [ 1-7 ]
             *      CODIGO  =>  SEMANAL
             *      PARAMETRO   =>  1
             *      INICIO  =>  ????/??/??
             *      
             *  IF  MENSUAL
             *      DIA     =>  [ 1-7 ]
             *      CODIGO  =>  MENSUAL
             *      PARAMETRO   =>  1
             *      INICIO  =>  ????/??/??
             *      
             *  IF NUMERO
             *      DIA     =>  0
             *      CODIGO  =>  NUMERO
             *      PARAMETRO   =>  [ 1-31 ]
             *      INICIO  =>  ????/??/?? 
             *                
            */

            DateTime DD = fIni;

            switch (Tipo)
            {

                case "DIARIO":

                    break;



                case "SEMANAL":

                    while (DD.DayOfWeek != parseNDay(Dia))

                        DD = DD.AddDays(1);

                    break;



                case "MENSUAL":

                    while (DD.DayOfWeek != parseNDay(Dia))

                        DD = DD.AddDays(1);

                    break;



                case "NUMERO":

                    while (DD.Day != Parametro)

                        DD = DD.AddDays(1);

                    break;

            }



            return DD;

        }
        
        private List<DateTime> NextDays(String Tipo, int Parametro, DateTime fIni, int Dia, DateTime Until)
        {

            List<DateTime> L_D = new List<DateTime>();

            DateTime DD = fIni;

            switch (Tipo)
            {

                case "DIARIO":

                    break;



                case "SEMANAL":

                    while (DD.DayOfWeek != parseNDay(Dia))

                        DD = DD.AddDays(1);



                    L_D.Add(DD);                        //SE AGREGA A LA LISTA.

                    DD = DD.AddDays(7);               //SE LE AGREGA UN DIA A LA FECHA INDICE (PARA QUE NO SE CICLE).



                    while (DD <= Until)                 //BUSCA FECHAS HASTA QUE SE HAYA OBTENIDO UNA MAYOR O IGUAL AL RANGO SELECCIONADO.
                    {

                        while (DD.DayOfWeek != parseNDay(Dia))     //BUSCA FECHA HASTA QUE EL NUMERO DE DIA SE IGUAL AL QUE SE BUSQUE.

                            DD = DD.AddDays(1);         //SE INCREMENTADO DE UN DIA EN UN DIA.

                        if (DD <= Until)

                            L_D.Add(DD);                //SÍ LA FECHA ENCONTRADA ES MENOR O IGUAL A EL RANGO SELECCIONADO SE AGREGA.

                        DD = DD.AddDays(7);           //SE LE AGREGA UN DIA A LA FECHA INDICE (PARA QUE NO SE CICLE).                        

                    }

                    break;



                case "MENSUAL":

                    int nDay = DD.Day;

                    while (DD.DayOfWeek != parseNDay(Dia))

                        DD = DD.AddDays(1);             //SE BUSCA LA PRIMERA FECHA VALIDA.



                    L_D.Add(DD);                        //SE AGREGA A LA LISTA.

                    DD = DD.AddMonths(1);               //SE LE AGREGA UN DIA A LA FECHA INDICE (PARA QUE NO SE CICLE).

                    DD = new DateTime(DD.Year, DD.Month, nDay);     //SE REESTABLECE EL NUMERO DE DIA

                    while (DD <= Until)                 //BUSCA FECHAS HASTA QUE SE HAYA OBTENIDO UNA MAYOR O IGUAL AL RANGO SELECCIONADO.
                    {

                        while (DD.DayOfWeek != parseNDay(Dia))     //BUSCA FECHA HASTA QUE EL NUMERO DE DIA SE IGUAL AL QUE SE BUSQUE.

                            DD = DD.AddDays(1);         //SE INCREMENTADO DE UN DIA EN UN DIA.

                        if (DD <= Until)

                            L_D.Add(DD);                //SÍ LA FECHA ENCONTRADA ES MENOR O IGUAL A EL RANGO SELECCIONADO SE AGREGA.

                        DD = DD.AddMonths(1);           //SE LE AGREGA UN DIA A LA FECHA INDICE (PARA QUE NO SE CICLE).

                        DD = new DateTime(DD.Year, DD.Month, nDay); //SE REESTABLECE EL NUMERO DE DIA

                    }



                    break;



                case "NUMERO":

                    while (DD.Day != Parametro)

                        DD = DD.AddDays(1);             //SE BUSCA LA PRIMERA FECHA VALIDA.



                    L_D.Add(DD);                        //SE AGREGA A LA LISTA.

                    DD = DD.AddDays(1);                 //SE LE AGREGA UN DIA A LA FECHA INDICE (PARA QUE NO SE CICLE).

                    while (DD <= Until)                 //BUSCA FECHAS HASTA QUE SE HAYA OBTENIDO UNA MAYOR O IGUAL AL RANGO SELECCIONADO.
                    {

                        while (DD.Day != Parametro)     //BUSCA FECHA HASTA QUE EL NUMERO DE DIA SE IGUAL AL QUE SE BUSQUE.

                            DD = DD.AddDays(1);         //SE INCREMENTADO DE UN DIA EN UN DIA.

                        if (DD <= Until)

                            L_D.Add(DD);                //SÍ LA FECHA ENCONTRADA ES MENOR O IGUAL A EL RANGO SELECCIONADO SE AGREGA.

                        DD = DD.AddDays(1);             //SE LE AGREGA UN DIA A LA FECHA INDICE (PARA QUE NO SE CICLE).

                    }



                    break;

            }



            return L_D;

        }

        
        private DayOfWeek parseNDay(int NumberDay)
        {

            DayOfWeek DD = DayOfWeek.Sunday;

            switch (NumberDay)
            {

                case 1:

                    DD = DayOfWeek.Monday;

                    break;



                case 2:

                    DD = DayOfWeek.Tuesday;

                    break;



                case 3:

                    DD = DayOfWeek.Wednesday;

                    break;



                case 4:

                    DD = DayOfWeek.Thursday;

                    break;



                case 5:

                    DD = DayOfWeek.Friday;

                    break;



                case 6:

                    DD = DayOfWeek.Saturday;

                    break;



                case 7:

                    DD = DayOfWeek.Sunday;

                    break;

            }



            return DD;

        }



        [WebMethod]
        public bool VerifyHHTime(String CompanyCode, DateTime dtHH, int idRuta, String Desc)
        {

            try
            {

                const double maxDiff = 5.0d;

                bool bnd = false;//*1496 DEBE DE SER FALSE PARA QUE FUNCIONE CORRECTAMENTE.

                DateTime dtSERVER;





                DB_OpenConn(CompanyCode);

                MySqlCommand cmd = new MySqlCommand();

                //cmd.CommandText = "SELECT now() AS SERVERTIME;";

                cmd.CommandText = "CALL VerifyHHTime();";

                cmd.Connection = conn;



                MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {

                    dtSERVER = r.GetDateTime("SERVERTIME");

                    double diff = (dtSERVER - dtHH).TotalHours;

                    if (Math.Abs(diff) < maxDiff)
                    {

                        bnd = true;

                    }

                }



                Desc = bnd ? Desc : "TRY " + Desc;

                i_audtHH_Time(CompanyCode, idRuta, dtHH, Desc);





                DB_CloseConn();





                return bnd;

            }

            catch (Exception ex)
            {

                //INSERTAR REGISTRO DEL ERROR.

                DB_CloseConn();

                throw ex;

            }





        }

        

        [WebMethod]
        public void i_audtHH_Time(String CompanyCode, int idRuta, DateTime fHH, String Desc)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_audtHH_Time(@idRuta, @fHH, @Desc)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@fHH", fHH);

            cmd.Parameters.AddWithValue("@Desc", Desc);



            cmd.Connection = conn;



            cmd.ExecuteNonQuery();





            DB_CloseConn();





            //--------------------------------------------------------------------



        }

        
        [WebMethod]
        public void i_Error(String CompanyCode, DateTime FechaHora, String App, int Linea, String Metodo, String String, String idHH, int idRuta, bool bnd)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Error(@FechaHora, @App, @Linea, @Metodo, @String, @idHH, @idRuta, @bnd)";

            cmd.Parameters.AddWithValue("@FechaHora", FechaHora);

            cmd.Parameters.AddWithValue("@App", App);

            cmd.Parameters.AddWithValue("@Linea", Linea);

            cmd.Parameters.AddWithValue("@Metodo", Metodo);

            cmd.Parameters.AddWithValue("@String", String);

            cmd.Parameters.AddWithValue("@idHH", idHH);

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@bnd", bnd);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();





            DB_CloseConn();





            //--------------------------------------------------------------------



        }

        
        [WebMethod]
        public void i_ErrorOBJ(String CompanyCode, Error E)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Error(@FechaHora, @App, @Linea, @Metodo, @String, @idHH, @idRuta, @bnd)";

            cmd.Parameters.AddWithValue("@FechaHora", E.FechaHora);

            cmd.Parameters.AddWithValue("@App", E.App);

            cmd.Parameters.AddWithValue("@Linea", E.Linea);

            cmd.Parameters.AddWithValue("@Metodo", E.Metodo);

            cmd.Parameters.AddWithValue("@String", E.String);

            cmd.Parameters.AddWithValue("@idHH", E.idHH);

            cmd.Parameters.AddWithValue("@idRuta", E.idRuta);

            cmd.Parameters.AddWithValue("@bnd", E.bnd);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();





            DB_CloseConn();





            //--------------------------------------------------------------------



        }

        
        [WebMethod]
        public void i_Incidencia(String CompanyCode, DateTime Fecha, String App, String String, String Mensaje, int idRuta, String idHH)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL i_Incidencias(@Fecha, @App, @String, @Mensaje, @idRuta, @idHH)";

                cmd.Parameters.AddWithValue("@Fecha", Fecha);

                cmd.Parameters.AddWithValue("@App", App);

                cmd.Parameters.AddWithValue("@String", String);

                cmd.Parameters.AddWithValue("@Mensaje", Mensaje);

                cmd.Parameters.AddWithValue("@idRuta", idRuta);

                cmd.Parameters.AddWithValue("@idHH", idHH);







                cmd.Connection = conn;



                cmd.ExecuteNonQuery();





                DB_CloseConn();





                //--------------------------------------------------------------------

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]
        public Incidencia s_Incidencia(String CompanyCode)
        {

            return new Incidencia();





            //--------------------------------------------------------------------



        }




        [WebMethod]
        public void i_Recorrido(String CompanyCode, int idRuta, Double Latitud, Double Longitud, int Evento, DateTime FechaHH, String Descripcion, String Extra, String Bateria)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL i_Recorrido(@idRuta, @Latitud, @Longitud, @Evento, @FechaHH, @Descripcion, @Extra, @Bateria)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@Latitud", Latitud);

            cmd.Parameters.AddWithValue("@Longitud", Longitud);

            cmd.Parameters.AddWithValue("@Evento", Evento);

            cmd.Parameters.AddWithValue("@FechaHH", FechaHH);

            cmd.Parameters.AddWithValue("@Descripcion", Descripcion);

            cmd.Parameters.AddWithValue("@Extra", Extra);

            cmd.Parameters.AddWithValue("@Bateria", Bateria);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();





            DB_CloseConn();





            //--------------------------------------------------------------------



        }



        [WebMethod]
        public void i_Recorrido_String(String CompanyCode, String Ls_EntregaP)
        {

            try
            {

                List<Recorrido> L_EntregaP = new List<Recorrido>();

                String[] OBJ = Ls_EntregaP.Split('|');



                foreach (String obj in OBJ)
                {

                    String[] EP = obj.Split(',');

                    L_EntregaP.Add(new Recorrido(new DateTime(), int.Parse(EP[0]), double.Parse(EP[1]), double.Parse(EP[2]), int.Parse(EP[3]), DateTime.Parse(EP[4]), EP[5].ToString(), EP[6].ToString(), EP[7].ToString()));

                }







                DB_OpenConn(CompanyCode);

                foreach (Recorrido R in L_EntregaP)
                {

                    MySqlCommand cmd = new MySqlCommand();

                    cmd.CommandText = "CALL i_Recorrido(@idRuta, @Latitud, @Longitud, @Evento, @FechaHH, @Descripcion, @Extra, @Bateria)";

                    cmd.Parameters.AddWithValue("@idRuta", R.idRuta);

                    cmd.Parameters.AddWithValue("@Latitud", R.Latitud);

                    cmd.Parameters.AddWithValue("@Longitud", R.Longitud);

                    cmd.Parameters.AddWithValue("@Evento", R.Evento);

                    cmd.Parameters.AddWithValue("@FechaHH", R.FechaHH);

                    cmd.Parameters.AddWithValue("@Descripcion", R.Descripcion);

                    cmd.Parameters.AddWithValue("@Extra", R.Extra);

                    cmd.Parameters.AddWithValue("@Bateria", R.Bateria);



                    cmd.Connection = conn;



                    cmd.ExecuteNonQuery();

                }

                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]
        public String s_Recorrido(String CompanyCode, int idRuta, DateTime Fecha)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Recorrido(@idRuta, @Fecha)";

            cmd.Parameters.AddWithValue("@idRuta", idRuta);

            cmd.Parameters.AddWithValue("@Fecha", Fecha);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Recorrido> L_Cliente = new List<Recorrido>();

            int count = 0;

            while (r.Read())
            {

                //String r.GetString("idSupervisor"), r.GetDouble("CLat"), r.GetDouble("CLon"), r.GetFloat("DiffMts")



                String Ruta, idSupervisor;

                Double CLat, CLon;

                float DiffMts;

                try { Ruta = r.GetString("Ruta"); }

                catch (Exception) { Ruta = "-"; }

                try { idSupervisor = r.GetString("idSupervisor"); }

                catch (Exception) { idSupervisor = "-"; }



                try { CLat = r.GetDouble("CLat"); }

                catch (Exception) { CLat = 0; }

                try { CLon = r.GetDouble("CLon"); }

                catch (Exception) { CLon = 0; }

                try { DiffMts = r.GetFloat("DiffMts"); }

                catch (Exception) { DiffMts = 0; }



                L_Cliente.Add(new Recorrido(r.GetDateTime("fCreacion"), r.GetInt32("idRuta"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetInt32("Evento"), r.GetDateTime("FechaHH"), r.GetString("Descripcion"), r.GetString("Extra"), r.GetString("Bateria"),

                            Ruta, idSupervisor, CLat, CLon, DiffMts));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            var json = js.Serialize(L_Cliente);







            return json;

        }



        [WebMethod]
        public String R_Recorrido(String CompanyCode, DateTime fIni, DateTime fFin)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_Recorrido(@fIni, @fFin)";

            cmd.CommandTimeout = 300;

            cmd.Parameters.AddWithValue("@fIni", fIni);

            cmd.Parameters.AddWithValue("@fFin", fFin);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Recorrido> L_Cliente = new List<Recorrido>();

            int count = 0;

            while (r.Read())
            {

                //String r.GetString("idSupervisor"), r.GetDouble("CLat"), r.GetDouble("CLon"), r.GetFloat("DiffMts")



                /*String Ruta, idSupervisor;
                Double CLat, CLon;
                float DiffMts;
                try { Ruta = r.GetString("Ruta"); }
                catch (Exception) { Ruta = "-"; }
                try { idSupervisor = r.GetString("idSupervisor"); }
                catch (Exception) { idSupervisor = "-"; }

                try { CLat = r.GetDouble("CLat"); }
                catch (Exception) { CLat = 0; }
                try { CLon = r.GetDouble("CLon"); }
                catch (Exception) { CLon = 0; }
                try { DiffMts = r.GetFloat("DiffMts"); }
                catch (Exception) { DiffMts = 0; }*/



                /*L_Cliente.Add(new Recorrido(r.GetDateTime("fCreacion"), r.GetInt32("idRuta"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetInt32("Evento"), r.GetDateTime("FechaHH"), r.GetString("Descripcion"), r.GetString("Extra"), r.GetString("Bateria"),
                            Ruta, idSupervisor, CLat, CLon, DiffMts));*/

                L_Cliente.Add(new Recorrido(r.GetDateTime("fCreacion"), r.GetInt32("idRuta"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetInt32("Evento"), r.GetDateTime("FechaHH"), r.GetString("Descripcion"), r.GetString("Extra"), r.GetString("Bateria"),

                             r.GetString("Ruta"), r.GetString("idSupervisor"), r.GetDouble("CLat"), r.GetDouble("CLon"), r.GetFloat("DiffMts")));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            js.MaxJsonLength = 999999999;

            var json = js.Serialize(L_Cliente);







            return json;

        }



        private Double rad(Double x)
        {

            return x * Math.PI / 180;

        }



        private double getDistance(Double p1X, Double p1Y, Double p2X, Double p2Y)
        {

            //console.log(p2);

            //console.log(p2.position);

            int R = 6378137; // el radio de la tierra

            double dLat = rad(p2X - p1X);

            double dLong = rad(p2Y - p1Y);

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +

                Math.Cos(rad(p1X)) * Math.Cos(rad(p2X)) *

                Math.Sin(dLong / 2) * Math.Sin(dLong / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            double d = R * c;

            return d; // distancia en metros

        }



        [WebMethod]
        public String R_Recorrido2(String CompanyCode, DateTime fIni, DateTime fFin)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_Recorrido2(@fIni, @fFin)";

            cmd.CommandTimeout = 300;

            cmd.Parameters.AddWithValue("@fIni", fIni);

            cmd.Parameters.AddWithValue("@fFin", fFin);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Recorrido> L_Cliente = new List<Recorrido>();

            int count = 0;

            Recorrido Rec_TMP = new Recorrido();



            List<Recorrido> L_REC_TMP = new List<Recorrido>();

            Double Lat_TMP = 0, Lon_TMP = 0;

            bool bnd = false;

            while (r.Read())
            {

                //if (bnd)                

                if (L_REC_TMP.Count > 0)
                {

                    if (r.GetDouble("Latitud") != 0 && r.GetDouble("Longitud") != 0)
                    {

                        //CALCULA PUNTO MEDIO Ó PUNTO MAS CERCANO AL PUNTO DEL CLIENTE

                        //if (Rec_TMP.CLat != 0 && Rec_TMP.CLat != -1)

                        if (L_REC_TMP[0].CLat != 0 && L_REC_TMP[0].CLat != -1)
                        {

                            //CALCULA EL MAS CERCANO AL CLIENTE.

                            Double DiffANT = getDistance(Lat_TMP, Lon_TMP, L_REC_TMP[0].CLat, L_REC_TMP[0].CLon);

                            Double DiffSIG = getDistance(r.GetDouble("Latitud"), r.GetDouble("Longitud"), L_REC_TMP[0].CLat, L_REC_TMP[0].CLon);



                            L_REC_TMP[0].Bateria = "GPS.EDITADO";

                            if (DiffANT <= DiffSIG)
                            {

                                L_REC_TMP[0].Latitud = Lat_TMP;

                                L_REC_TMP[0].Longitud = Lon_TMP;



                                L_REC_TMP[0].DiffMts = (float)DiffANT;

                            }

                            else
                            {

                                L_REC_TMP[0].Latitud = r.GetDouble("Latitud");

                                L_REC_TMP[0].Longitud = r.GetDouble("Longitud");



                                L_REC_TMP[0].DiffMts = (float)DiffSIG;



                            }



                            L_Cliente.Add(L_REC_TMP[0]);

                            L_REC_TMP.Remove(L_REC_TMP[0]);

                        }

                        else
                        {

                            //CALCULA EL PUNTO MEDIO.

                            L_REC_TMP[0].Latitud = Lat_TMP + ((r.GetDouble("Latitud") - Lat_TMP) / 2);

                            L_REC_TMP[0].Longitud = Lon_TMP + ((r.GetDouble("Longitud") - Lon_TMP) / 2);



                            L_Cliente.Add(L_REC_TMP[0]);

                            L_REC_TMP.Remove(L_REC_TMP[0]);

                        }

                    }

                }







                if (r.GetDouble("Latitud") != 0 && r.GetDouble("Longitud") != 0)
                {//GUARDA LAS ULTIMAS COORDENADAS VALIDAS DE ALGUN MOVIMIENTO.



                    Lat_TMP = r.GetDouble("Latitud");

                    Lon_TMP = r.GetDouble("Longitud");



                    if (r.GetString("Extra") != "-")//SOLO INSERTA PEDIDO CON COORDENADA VALIDA Y QUE SEA UN EVENTO.

                        L_Cliente.Add(new Recorrido(r.GetDateTime("fCreacion"), r.GetInt32("idRuta"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetInt32("Evento"), r.GetDateTime("FechaHH"), r.GetString("Descripcion"), r.GetString("Extra"), r.GetString("Bateria"),

                             r.GetString("Ruta"), r.GetString("idSupervisor"), r.GetDouble("CLat"), r.GetDouble("CLon"), r.GetFloat("DiffMts")));

                }

                else if (r.GetString("Extra") != "-")
                {//SI LAS COORDENADAS NO SON VALIDAS GUARDA EL OBJETO TEMPORAL, PARA DESPUES INSERTARLO.

                    //CAMBIA LA BANDERA PARA EN EL SIGUIENTE CICLO CALCULAR EL PUNTO MEDIO(ENTRE [LAT_TMP, LON_TMP] Y LAS SIGUIENTES COORDENADAS VALIDAS).

                    bnd = true;

                    Rec_TMP = new Recorrido(r.GetDateTime("fCreacion"), r.GetInt32("idRuta"), r.GetDouble("Latitud"), r.GetDouble("Longitud"), r.GetInt32("Evento"), r.GetDateTime("FechaHH"), r.GetString("Descripcion"), r.GetString("Extra"), r.GetString("Bateria"),

                             r.GetString("Ruta"), r.GetString("idSupervisor"), r.GetDouble("CLat"), r.GetDouble("CLon"), r.GetFloat("DiffMts"));

                    L_REC_TMP.Add(Rec_TMP);

                }













                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            js.MaxJsonLength = 999999999;

            var json = js.Serialize(L_Cliente);







            return json;

        }





        
        [WebMethod]
        public String Indicadores_NNEW(String CompanyCode, String fIni, String fFin)
        {

            List<Indicador> L_Rpt = new List<Indicador>();



            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL R_IndicadoresRangeDaysAllRoutes(@fIni, @fFin);";

            cmd.CommandTimeout = 300;

            cmd.Parameters.AddWithValue("@fIni", fIni);

            cmd.Parameters.AddWithValue("@fFin", fFin);



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();



            while (r.FieldCount > 0)
            {

                while (r.Read())
                {

                    Indicador r2 = new Indicador(r.GetInt32("idCliente"), r.GetString("Cedis"), r.GetString("idSupervisor"), r.GetString("Mes"), r.GetString("NombreTienda"),

                        r.GetInt32("Dia"), r.GetInt32("Secuencia"), r.GetString("Evento"), r.GetString("DiaVisitado"), r.GetString("VisitadoDentro"),

                        r.GetString("Fecha"), r.GetString("Ruta"), r.GetString("Total"), r.GetString("HICedis"), r.GetString("HPrimerClt"),

                        r.GetString("HCierre"), r.GetString("DiffMts"),

                        r.GetInt32("Programados"), r.GetInt32("CltsCompra"), r.GetInt32("CltsCerrados"), r.GetInt32("CltsNoCompra"), r.GetInt32("CltsFueraZona"),

                        r.GetInt32("CltsCompraFF"), r.GetString("HUltimoClt"));



                    /*Indicador r2 = new Indicador(r.GetInt32("idCliente"), r.GetString("Cedis"), r.GetString("Supervisor"), r.GetString("Mes"), r.GetString("Nombre"),
                        r.GetInt32("idDia"), r.GetInt32("Secuencia"), r.GetString("Evento"), r.GetString("DiaVisitado"), r.GetString("VisitadoDentro"),
                        r.GetString("Fecha"), r.GetString("Ruta"), r.GetString("Total"), r.GetString("HICedis"), r.GetString("HPrimerClt"),
                        r.GetString("HCierreHH"), r.GetString("Dif.Mts"),
                        CltsProg, r.GetInt32("CltsCompra"), r.GetInt32("CltsCerrados"), r.GetInt32("CltsNoCompra"), r.GetInt32("CltsFueraZona"),
                        r.GetInt32("CltsCompraFF"), r.GetString("HUltimoClt"));*/



                    L_Rpt.Add(r2);

                }



                r.NextResult();

            }









            DB_CloseConn();



            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            js.MaxJsonLength = 999999999;

            var json = js.Serialize(L_Rpt);







            return json;





            //-----------------------------------------------------------------------         









            //return L_Rpt;

        }


        

        #region SERVER FIX TRY ----------------------------------------------------------------------



        [WebMethod]

        public void EnviaMail(String tcAdressTo, String tcAsunto, String tcCuerpo)
        {



            using (var client = new SmtpClient("mail.mid-interactive.com", 2525))

            using (var message = new MailMessage("info@mid-interactive.com", tcAdressTo))
            {



                //message.To.Add("arturo.villalobos@sicamex.mx");



                message.Subject = tcAsunto;

                message.IsBodyHtml = true;

                message.Body = tcCuerpo;





                //client.EnableSsl = true;

                client.Credentials = new NetworkCredential("info@mid-interactive.com", "avg1496");





                try
                {

                    client.Send(message);

                }

                catch (Exception ex)
                {

                    int a = 0;

                }





            }











        }





        [WebMethod]

        public String pingDB(String CompanyCode)
        {

            MySqlConnection conn_n = new MySqlConnection(getConnection(CompanyCode));

            try
            {

                DB_OpenConn_VIP_ping(CompanyCode);





                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "SELECT NOW() AS TIEMPO;";

                cmd.Connection = conn;





                MySqlDataReader r = cmd.ExecuteReader();

                String TXT = "";

                while (r.Read())
                {

                    TXT = r.GetString("TIEMPO");

                }



                DB_CloseConn();



                return TXT;

            }

            catch (Exception Ex)
            {

                try { DB_CloseConn(); }

                catch (Exception exx) { }



                return "ERROR " + CompanyCode;

            }



        }



        [WebMethod]

        public void ClearAllPoolMySQL()
        {

            try
            {

                MySqlConnection.ClearAllPools();

                EnviaMail("arturovillgon@hotmail.com", "ClearAllPoolMySQL",

                    "<h2> SE HA LIMPIADO EL POOL DE CONECCIONES [<strong>" + DateTime.Now + "</strong>]</h2>");

            }

            catch (Exception Ex)
            {

                EnviaMail("arturovillgon@hotmail.com", "ERROR al ClearAllPoolMySQL",

                    "<h2>[<strong>" + DateTime.Now + "</strong>]</h2>" +

                    "<p>" + Ex.Message + "</p>");



            }



        }



        [WebMethod]

        public void KillSleep(String CompanyCode, int TimeElapsed)
        {

            try
            {

                DB_OpenConn_VIP_ping(CompanyCode);





                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL kill_user_processes(@TimeElapsed);";

                cmd.Parameters.AddWithValue("@TimeElapsed", TimeElapsed);



                cmd.Connection = conn;



                cmd.ExecuteNonQuery();



                DB_CloseConn();



            }

            catch (Exception Ex)
            {

                try { DB_CloseConn(); }

                catch (Exception exx) { }

            }



        }



        //kill_user_processes





        [WebMethod]

        public void EnviaMail_test(String SMTP_SENDER, int PORT, String SENDER, String PASS, bool SSL, String tcAdressTo, String tcAsunto, String tcCuerpo)
        {

            /*String SMTP_SENDER = "mail.mid-interactive.com";
            int PORT = 2525;
            String SENDER = "info@mid-interactive.com";
            String PASS = "avg1496";

            SMTP_SENDER = "mocha3001.mochahost.com";
            SENDER = "info@mid-interactive.com";
            PORT = 465;

            SMTP_SENDER = "smtpout.secureserver.net";
            SENDER = "arturo.villalobos@sicamex.mx";
            PASS = "sicamex";
            PORT = 465;*/









            using (var client = new SmtpClient(SMTP_SENDER, PORT))

            using (var message = new MailMessage(SENDER, tcAdressTo))
            {



                //message.To.Add("arturo.villalobos@sicamex.mx");



                message.Subject = tcAsunto;

                message.IsBodyHtml = true;

                message.Body = tcCuerpo;





                if (SSL) client.EnableSsl = true;

                client.Credentials = new NetworkCredential(SENDER, PASS);





                try
                {

                    client.Send(message);

                }

                catch (Exception ex)
                {

                    int a = 0;

                }





            }











        }





        #endregion



        #region -------------------------------| EXHIBIDOR |----------------------------------



        [WebMethod]

        public bool i_Exhibidor(String CompanyCode, int idDireccion, int idMarca, String Tipo, int NumCharolas, int Compartido,

            int Posicion, int SuajesMetalicos, int MetalicosVacios, int SuajesPlasticos, int PlasticosVacios,

            String Foto, String CompTipo, int CompNumCharolas, int CompPosicion, String CompFoto)
        {

            try
            {

                int id = 0;



                DB_OpenConn(CompanyCode);



                try
                {

                    DB_OpenConn(CompanyCode);



                    MySqlCommand cmd = new MySqlCommand();

                    cmd = new MySqlCommand();

                    cmd.CommandText = "CALL i_Exhibidor(@idDireccion, @idMarca, @Tipo, @NumCharolas, @Compartido, @Posicion, @SuajesMetalicos, @MetalicosVacios, @SuajesPlasticos, @PlasticosVacios, @Foto, @CompTipo, @CompNumCharolas, @CompPosicion, @CompFoto)";

                    cmd.Parameters.AddWithValue("@idDireccion", idDireccion);

                    cmd.Parameters.AddWithValue("@idMarca", idMarca);

                    cmd.Parameters.AddWithValue("@Tipo", Tipo);

                    cmd.Parameters.AddWithValue("@NumCharolas", NumCharolas);

                    cmd.Parameters.AddWithValue("@Compartido", Compartido);



                    cmd.Parameters.AddWithValue("@Posicion", Posicion);

                    cmd.Parameters.AddWithValue("@SuajesMetalicos", SuajesMetalicos);

                    cmd.Parameters.AddWithValue("@MetalicosVacios", MetalicosVacios);

                    cmd.Parameters.AddWithValue("@SuajesPlasticos", SuajesPlasticos);

                    cmd.Parameters.AddWithValue("@PlasticosVacios", PlasticosVacios);



                    cmd.Parameters.AddWithValue("@Foto", Foto);

                    cmd.Parameters.AddWithValue("@CompTipo", CompTipo);

                    cmd.Parameters.AddWithValue("@CompNumCharolas", CompNumCharolas);

                    cmd.Parameters.AddWithValue("@CompPosicion", CompPosicion);

                    cmd.Parameters.AddWithValue("@CompFoto", CompFoto);





                    cmd.Connection = conn;



                    cmd.ExecuteNonQuery();





                    DB_CloseConn();







                    //DB_CloseConn();



                    return true;

                }

                catch (Exception ex)
                {

                    try
                    {



                        DB_CloseConn();



                        return false;

                    }

                    catch (Exception Ex)
                    {

                        DB_CloseConn();

                        throw Ex;

                    }



                }

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }













        }



        [WebMethod]

        public String s_Exhibidor(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Exhibidor()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Exhibidor> L_Exhibidor = new List<Exhibidor>();

            int count = 0;

            while (r.Read())
            {

                L_Exhibidor.Add(new Exhibidor(r.GetInt32("idDireccion"), r.GetInt32("idMarca"), r.GetString("Tipo"), r.GetInt32("NumCharolas"), r.GetInt32("Compartido"),

                                r.GetInt32("Posicion"), r.GetInt32("SuajesMetalicos"), r.GetInt32("MetalicosVacios"), r.GetInt32("SuajesPlasticos"), r.GetInt32("PlasticosVacios"),

                                r.GetString("Foto"), r.GetString("CompTipo"), r.GetInt32("CompNumCharolas"), r.GetInt32("CompPosicion"), r.GetString("CompFoto")));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            /*var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_Cliente);*/







            StringBuilder sb = new StringBuilder();

            JavaScriptSerializer js = new JavaScriptSerializer();

            js.MaxJsonLength = 999999999;

            var json = js.Serialize(L_Exhibidor);







            return json;



        }



        [WebMethod]

        public List<Exhibidor> sL_Exhibidor(String CompanyCode)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Exhibidor()";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Exhibidor> L_Exhibidor = new List<Exhibidor>();

            int count = 0;

            while (r.Read())
            {

                L_Exhibidor.Add(new Exhibidor(r.GetInt32("idDireccion"), r.GetInt32("idMarca"), r.GetString("Tipo"), r.GetInt32("NumCharolas"), r.GetInt32("Compartido"),

                                r.GetInt32("Posicion"), r.GetInt32("SuajesMetalicos"), r.GetInt32("MetalicosVacios"), r.GetInt32("SuajesPlasticos"), r.GetInt32("PlasticosVacios"),

                                r.GetString("Foto"), r.GetString("CompTipo"), r.GetInt32("CompNumCharolas"), r.GetInt32("CompPosicion"), r.GetString("CompFoto")));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            /*var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_Cliente);*/





            /*
            StringBuilder sb = new StringBuilder();
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = 999999999;
            var json = js.Serialize(L_Exhibidor);
            */





            return L_Exhibidor;



        }



        [WebMethod]

        public List<Exhibidor> sL_Exhibidor_4U(String CompanyCode, String idUsuario_Op)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL s_Exhibidor_4U('" + idUsuario_Op + "')";



            cmd.Connection = conn;



            MySqlDataReader r = cmd.ExecuteReader();

            List<Exhibidor> L_Exhibidor = new List<Exhibidor>();

            int count = 0;

            while (r.Read())
            {

                L_Exhibidor.Add(new Exhibidor(r.GetInt32("idDireccion"), r.GetInt32("idMarca"), r.GetString("Tipo"), r.GetInt32("NumCharolas"), r.GetInt32("Compartido"),

                                r.GetInt32("Posicion"), r.GetInt32("SuajesMetalicos"), r.GetInt32("MetalicosVacios"), r.GetInt32("SuajesPlasticos"), r.GetInt32("PlasticosVacios"),

                                r.GetString("Foto"), r.GetString("CompTipo"), r.GetInt32("CompNumCharolas"), r.GetInt32("CompPosicion"), r.GetString("CompFoto")));



                count++;

                //if (count == 250) break;

            }





            DB_CloseConn();



            /*var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(L_Cliente);*/





            /*
            StringBuilder sb = new StringBuilder();
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = 999999999;
            var json = js.Serialize(L_Exhibidor);
            */





            return L_Exhibidor;



        }







        [WebMethod]

        public void u_Exhibidor(String CompanyCode, int idDireccion, int idMarca, String Tipo, int NumCharolas, int Compartido,

            int Posicion, int SuajesMetalicos, int MetalicosVacios, int SuajesPlasticos, int PlasticosVacios,

            String Foto, String CompTipo, int CompNumCharolas, int CompPosicion, String CompFoto)
        {

            try
            {

                DB_OpenConn(CompanyCode);



                MySqlCommand cmd = new MySqlCommand();

                cmd.CommandText = "CALL u_Exhibidor(@idDireccion, @idMarca, @Tipo, @NumCharolas, @Compartido, @Posicion, @SuajesMetalicos, @MetalicosVacios, @SuajesPlasticos, @PlasticosVacios, @Foto, @CompTipo, @CompNumCharolas, @CompPosicion, @CompFoto)";

                cmd.Parameters.AddWithValue("@idDireccion", idDireccion);

                cmd.Parameters.AddWithValue("@idMarca", idMarca);

                cmd.Parameters.AddWithValue("@Tipo", Tipo);

                cmd.Parameters.AddWithValue("@NumCharolas", NumCharolas);

                cmd.Parameters.AddWithValue("@Compartido", Compartido);



                cmd.Parameters.AddWithValue("@Posicion", Posicion);

                cmd.Parameters.AddWithValue("@SuajesMetalicos", SuajesMetalicos);

                cmd.Parameters.AddWithValue("@MetalicosVacios", MetalicosVacios);

                cmd.Parameters.AddWithValue("@SuajesPlasticos", SuajesPlasticos);

                cmd.Parameters.AddWithValue("@PlasticosVacios", PlasticosVacios);



                cmd.Parameters.AddWithValue("@Foto", Foto);

                cmd.Parameters.AddWithValue("@CompTipo", CompTipo);

                cmd.Parameters.AddWithValue("@CompNumCharolas", CompNumCharolas);

                cmd.Parameters.AddWithValue("@CompPosicion", CompPosicion);

                cmd.Parameters.AddWithValue("@CompFoto", CompFoto);





                cmd.Connection = conn;



                cmd.ExecuteNonQuery();



                DB_CloseConn();

            }

            catch (Exception Ex)
            {

                DB_CloseConn();

                throw Ex;

            }



        }



        [WebMethod]

        public void d_Exhibidor(String CompanyCode, int idDireccion, int idMarca)
        {

            DB_OpenConn(CompanyCode);



            MySqlCommand cmd = new MySqlCommand();

            cmd.CommandText = "CALL d_Exhibidor(@idDireccion, @idMarca)";

            cmd.Parameters.AddWithValue("@idDireccion", idDireccion);

            cmd.Parameters.AddWithValue("@idMarca", idMarca);





            cmd.Connection = conn;



            cmd.ExecuteNonQuery();



            DB_CloseConn();

        }



        #endregion











    }

}



/*<add key="bydsa" value="Server=sub.sicamex.mx;Database=bydsa_mty;Uid=urmto;Pwd=51c4M3x10115298EAG;" />
    <add key="bydsa_az" value="Database=bydsa_mty;Data Source=us-cdbr-azure-southcentral-e.cloudapp.net;User Id=b18b948d402251;Password=54bed342" />
    <add key="bydsa_test" value="Server=sub.sicamex.mx;Database=pruebasbydsa;Uid=urmto;Pwd=51c4M3x10115298EAG;" />
    <add key="cash" value="Database=cash;Data Source=us-cdbr-azure-southcentral-e.cloudapp.net;User Id=b6234cfab2cd72;Password=f7bbb3bc" />
    <add key="cash_test" value="Server=sub.sicamex.mx;Database=pcash;Uid=urmto;Pwd=51c4M3x10115298EAGa;" />*/





/*
call TMP_fixVENTAMAYO_CASH('
'', 12334
, 'FRANCISCO', '2015-05-12');

OSCARGARZ   101
JOSEMANUE   102
ABELLOPEZ   103
JOSEMANU    104
FRANCISCO   105
IRMAGONZ    106
MARIOALBE   107
ARTUROBER   108
YURIDEJES   109
ANTONIOPRE  110
JUANANTO    111
JOSEANTO    112
LUNAJESUS   113
IBARRAJULIOC 116

call TMP_fixVENTAMAYO_CASH('mata', 	7053                , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('flash', 	7078                , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('venancio', 	7117            , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('cazares', 	7027                , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('fatima', 	7042                , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('la guera', 	7051            , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('mario rodriguez', 	7072        , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('aba payo', 	7047            , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('abarotes s/nuevo', 	7049    , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('olga martinez', 	7129        , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('aba castro', 	7088            , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('aba nvo repueblo', 	7095    , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('abarotes fashion ', 	7106    , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('fruta fco', 	7123            , 'FRANCISCO', '2015-05-12');
call TMP_fixVENTAMAYO_CASH('aba s', 	7126                , 'FRANCISCO', '2015-05-12');

*/



