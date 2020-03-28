using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace GettingStartedLib
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in both code and config file together.
    public class CalculatorService : ICalculator
    {
        public double Add(double n1, double n2)
        {
            double result = n1 + n2;
            Console.WriteLine("Receive add({0}, {1})", n1, n2);

            Console.WriteLine("Returns: {0}", result);
            return result;
        }
        public double Substract(double n1, double n2)
        {
            double result = n1 - n2;
            Console.WriteLine("Receive Substract({0}, {1})", n1, n2);

            Console.WriteLine("Returns: {0}", result);
            return result;
        }
        public double Multiply(double n1, double n2)
        {
            double result = n1 * n2;
            Console.WriteLine("Receive Multiply({0}, {1})", n1, n2);

            Console.WriteLine("Returns: {0}", result);
            return result;
        }
        public double Divide(double n1, double n2)
        {
            double result = n1 / n2;
            Console.WriteLine("Receive devide({0}, {1})", n1, n2);

            Console.WriteLine("Returns: {0}", result);
            return result;
        }

    }
}
