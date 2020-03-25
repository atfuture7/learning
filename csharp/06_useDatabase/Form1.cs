using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

/*
 * Exercise for connecting to MSSQL Express mdf file
 */
namespace _06_useDatabase
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        dbConnection objConn;   // connextion 
        string connStr;         // string for database connection
        DataSet ds;             // dataset retrieved from load
        int maxRows;            // row counts
        int inc = 0;            // current record

        // Show one record
        private void NavigateRecords()
        {
            DataRow dRow;           // 
            dRow = ds.Tables[0].Rows[inc];
            txtFirstName.Text = dRow.ItemArray.GetValue(1).ToString();
            txtSurname.Text = dRow.ItemArray.GetValue(2).ToString();
            txtJobTitle.Text = dRow.ItemArray.GetValue(3).ToString();
            txtDepartment.Text = dRow.ItemArray.GetValue(4).ToString();
        }

        // load table content at very begining. And then close connection immediately.
        private void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                objConn = new dbConnection();
                // db connection string already set in application properties. 
                // an application-generated id string 
                connStr = Properties.Settings.Default.employeesConnectionString;
                objConn.connectionString = connStr;
                objConn.Sql = Properties.Settings.Default.SQL;  // SQL: select * 

                ds = objConn.GetConnection;
                maxRows = ds.Tables[0].Rows.Count;  // only one query. therefor only one table/view

                NavigateRecords();

            } catch ( Exception err)
            {
                MessageBox.Show(err.Message);
            }

        }

        // show next record
        private void btnNext_Click(object sender, EventArgs e)
        {
            inc++;
            if (inc < maxRows)
            {
                NavigateRecords();
            } else
            {
                MessageBox.Show("No more rows!\r\nReset to the First!");
                inc = 0;
                NavigateRecords();
            }
        }

        // show last record
        private void btnToLast_Click(object sender, EventArgs e)
        {
            inc = maxRows-1 ;
            NavigateRecords();

        }

        // show first record
        private void btnToFirst_Click(object sender, EventArgs e)
        {
            inc = 0;
            NavigateRecords();
        }

        // clear text boxes for new input
        private void btnAdd_Click(object sender, EventArgs e)
        {
            txtFirstName.Clear();
            txtSurname.Clear();
            txtJobTitle.Clear();
            txtDepartment.Clear();

            btnAdd.Enabled = false;
            btnSave.Enabled = true;
            btnCancel.Enabled = true;
        }

        // refill data when Add cancelled
        private void btnCancel_Click(object sender, EventArgs e)
        {
            btnAdd.Enabled = true;
            btnSave.Enabled = false;
            btnCancel.Enabled = false;

            NavigateRecords();
        }

        // add a new record
        private void btnSave_Click(object sender, EventArgs e)
        {
            DataRow row = ds.Tables[0].NewRow();
            row[1] = txtFirstName.Text;
            row[2] = txtSurname.Text;
            row[3] = txtJobTitle.Text;
            row[4] = txtDepartment.Text;
            ds.Tables[0].Rows.Add(row);

            try
            {
                objConn.updateDatabase(ds);
                inc = maxRows; 
                maxRows += 1;
                MessageBox.Show("Database updated!");
            } catch (Exception err)
            {
                MessageBox.Show(err.Message);
            }

        }

        // update current record
        private void btnUpdate_Click(object sender, EventArgs e)
        {
            DataRow row = ds.Tables[0].Rows[inc];
            row[1] = txtFirstName.Text;
            row[2] = txtSurname.Text;
            row[3] = txtJobTitle.Text;
            row[4] = txtDepartment.Text;
 
            try
            {
                objConn.updateDatabase(ds);
                MessageBox.Show("Database updated!");
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
            }

        }

        // delete a record
        private void btnDelete_Click(object sender, EventArgs e)
        {
            ds.Tables[0].Rows[inc].Delete();
            try
            {
                objConn.updateDatabase(ds);
                inc = 0;
                maxRows = ds.Tables[0].Rows.Count;
                NavigateRecords();
                MessageBox.Show("Row deleted!");
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
            }

        }
    }
}
