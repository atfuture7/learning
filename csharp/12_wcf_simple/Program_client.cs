using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GettingStartedClient.ServiceReference1;

namespace GettingStartedClient
{
    class Program
    {
        static void Main(string[] args)
        {
            // 1. create an instance of the wcf
            CalculatorClient client = new CalculatorClient();

            // 2. call the service operation :add
            double value1 = 100.00D;
            double value2 = 15.99D;
            double result = client.Add(value1, value2);
            Console.WriteLine("Add({0}, {1}) = {2}", value1, value2, result);

            // call the service operation :substract
            value1 = 145.00D;
            value2 = 76.54D;
            result = client.Substract(value1, value2);
            Console.WriteLine("Substaract({0}, {1}) = {2}", value1, value2, result);

            // call the service operation :add
            value1 = 9.00D;
            value2 = 81.25D;
            result = client.Multiply(value1, value2);
            Console.WriteLine("Multiply({0}, {1}) = {2}", value1, value2, result);

            // call the service operation :add
            value1 = 22.00D;
            value2 = 7.00D;
            result = client.Divide(value1, value2);
            Console.WriteLine("Divide({0}, {1}) = {2}", value1, value2, result);

            // 3. close client, close connection, clear resource
            Console.WriteLine("\nPress <Enter> to terminate client.");
            Console.ReadLine();
            client.Close();

        }
    }
}
