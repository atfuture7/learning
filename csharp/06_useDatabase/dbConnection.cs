using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*
 * Database object
 */
namespace _06_useDatabase
{

    class dbConnection
    {
        private string sql_string;      // query SQL
        private string strConn;         // connection string
        System.Data.SqlClient.SqlDataAdapter da_1;  // db adapter

        public string Sql
        {
            set { sql_string = value; }
        }

        public string connectionString
        {
            set { strConn = value; }
        }

        public System.Data.DataSet GetConnection
        {
            get { return MyDataSet(); }
        }

        // open a connection to database
        // retrieve data and then close connection.
        // Prepare data at onLoad
        private System.Data.DataSet MyDataSet()
        {
            System.Data.SqlClient.SqlConnection conn = new System.Data.SqlClient.SqlConnection(strConn);
            conn.Open();

            da_1 = new System.Data.SqlClient.SqlDataAdapter(sql_string, conn);
            System.Data.DataSet dtSet = new System.Data.DataSet();
            da_1.Fill(dtSet, "Table_Data_1");
            conn.Close();

            return dtSet;

        }

        // hmm..... it seems that system somehow keep connection even though
        // conn was closed at onLoad
        public void updateDatabase(System.Data.DataSet ds)
        {
            System.Data.SqlClient.SqlCommandBuilder cb = new System.Data.SqlClient.SqlCommandBuilder(da_1);
            cb.DataAdapter.Update(ds.Tables[0]);

        }
    }
}
