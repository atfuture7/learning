using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _09_pieChart
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            double[] pie_point = new double[] { 35, 32, 23, 7, 3 };
            string[] series_text = new string[] { "Chrome", "Internet Exploer", "Firefox", "Safari", "Others" };

            chart1.Series["Series1"].Points.DataBindXY(series_text, pie_point);

            for (int i = 0; i < pie_point.Length; i++)
            {
                chart1.Series["Series1"].Points[i]["Exploded"] = "True";

            }
        }
    }
}
