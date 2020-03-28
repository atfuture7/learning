using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using GettingStartedLib;
using System.ServiceModel.Description;

namespace GettingStartedHost
{
    class Program
    {
        static void Main(string[] args)
        {
            // 1. create uri
            Uri baseAddress = new Uri("http://localhost:8000/GettingStarted/");

            // 2. create a servoce host instance
            ServiceHost selfHost = new ServiceHost(typeof(CalculatorService), baseAddress);

            try
            {
                // 3. Add a service endpoint 
                selfHost.AddServiceEndpoint(typeof(ICalculator), new WSHttpBinding(), "CalculatorService");

                // 4. enable metadata exchange 
                ServiceMetadataBehavior smb = new ServiceMetadataBehavior();
                smb.HttpGetEnabled = true;
                selfHost.Description.Behaviors.Add(smb);

                // 5. start the service
                selfHost.Open();
                Console.WriteLine("The service is ready.");

                // close the service host to stop service 
                Console.WriteLine("Press <Enter> to terminate the service.");
                Console.WriteLine();
                Console.ReadLine();
                selfHost.Close();

            } catch (CommunicationException ce)
            {
                Console.WriteLine("An exxception occurred: {0}", ce.Message);
                selfHost.Abort();
            }
        }
    }
}
