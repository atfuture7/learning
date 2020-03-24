using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _04_menu
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void mnuQuit_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Really Quit?", "Exit", MessageBoxButtons.OKCancel) == DialogResult.OK )
            {
                Application.Exit();
            }
                    
        }

        private void mnuViewImage_Click(object sender, EventArgs e)
        {
            openFD.Title = "Insert an Image";
            openFD.InitialDirectory = System.Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            openFD.FileName = "";
            openFD.Filter = "JPEG Images|*.jpg|GIF Images|*.gif|BITMAPS|*.bmp";

            if (openFD.ShowDialog() == DialogResult.Cancel)
            {
                MessageBox.Show("Operation Cancelled");
            } else
            {
                pictureBox1.Image = Image.FromFile(openFD.FileName);
            }
       }

        private void mnuViewTextBoxes_Click(object sender, EventArgs e)
        {
            mnuViewTextBoxes.Checked = !mnuViewTextBoxes.Checked;
           
            textBox1.Visible = mnuViewTextBoxes.Checked;
            textBox2.Visible = mnuViewTextBoxes.Checked;

        }

        private void mnuOpen_Click(object sender, EventArgs e)
        {
            openFD.InitialDirectory = "c:";
            openFD.Title = "Open a Text File";
            openFD.FileName = "";
            openFD.Filter = "Text Files|*.txt|World Documents|*.doc";

            if ( openFD.ShowDialog() != DialogResult.Cancel )
            {
                richTextBox1.LoadFile(
                    openFD.FileName,
                    RichTextBoxStreamType.PlainText);

            }

        }

        private void mnuSave_Click(object sender, EventArgs e)
        {
            saveFD.InitialDirectory = System.Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            saveFD.Title = "Save a Text File";
            saveFD.FileName = "";
            saveFD.Filter = "Text Files|*.txt|All Files|*.*";

            if (saveFD.ShowDialog() != DialogResult.Cancel)
            {
                richTextBox1.SaveFile(
                    saveFD.FileName, 
                    RichTextBoxStreamType.PlainText);
                richTextBox1.Text = ""; //clear screen after save
                //ref https://docs.microsoft.com/en-us/dotnet/api/system.windows.forms.richtextbox.text?view=netframework-4.8
            }
        }
    }
}
