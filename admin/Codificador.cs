using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminWeb
{
    class Codificador
    {
        int cHV = 10;                                                                       //LONGITUD DE HASH ARRAY.

        public String Codifica(String Texto)
        {
            Texto = Texto + "\n";                                                           //SE LE AGREGA EL '\n' PARA CODIFICARLO Y PODER SACARLO DESPUES.

            char[] LetrasTexto;
            char[] DTexto = Texto.ToCharArray();

            int longTXT = Texto.Length;
            int HS_added = 0;
            /*SE CREARA EL ARREGLO CON UNA CANTIDAD QUE SEA UN MULTIPLO DE 'cHV'.
                PARA QUE SE COMPLETEN BLOQUES PARA HACER EL HASH.*/
            if ((float)longTXT / (float)cHV > (int)longTXT / (int)cHV)
                LetrasTexto = new char[(int)((longTXT / cHV) * cHV + cHV)];
            else
                LetrasTexto = new char[longTXT];

            //SE PASA EL TEXTO A CODIFICAR A EL ARREGLO DEL TAMAÑO CORRECTO.
            for (int i = 0; i < longTXT; i++)
            {
                LetrasTexto[i] = DTexto[i];
            }

            //SE CREA EL ARREGLO A DONDE SE PASARA EL TEXTO YA CODIFICADO.
            char[] CodifTexto = new char[LetrasTexto.Length + (LetrasTexto.Length / cHV)];


            for (int i = 0; i < LetrasTexto.Length; i += cHV)
            {
                char l;                                                                     //LETRA A CODIFICAR.
                int HV = 0;                                                                 //HASH VALUE.

                //EN ESTE 'for' SE OBTENDRA EL VALOR DE HASH.
                for (int j = 0; j < cHV; j++)
                {
                    l = LetrasTexto[j + i];

                    if (j == 0)
                        HV = ((int)l);

                    if (j == 1 || j == 2)
                        HV -= ((int)l);

                    if (j == cHV - 1)
                        HV += ((int)l / 2);
                }

                //EN ESTE 'for' SE APLICARA EL VALOR DE HASH A LAS LETRAS (cHV).
                for (int k = 0; k <= cHV; k++)
                {
                    if (k < cHV)
                    {
                        l = LetrasTexto[i + k];
                        if (HV > 0)
                            HV = HV * -1;

                        CodifTexto[i + k + HS_added] = (char)(((int)l) + ((HV + (k * k)) * -1));
                    }
                    else
                    {
                        CodifTexto[i + k + HS_added] = (char)(HV * -1);
                        HS_added++;
                    }
                }
            }

            return new string(CodifTexto);
        }

        public String DeCodifica(String Texto)
        {
            String strDecodof = null;

            if (Texto != null)
            {
                Texto = Texto.Replace("\r\n", String.Empty);

                char[] CodifTexto = Texto.ToCharArray();
                char[] DecodifTexto = new char[Texto.Length];
                int HS_added = 0;

                for (int i = cHV; i < Texto.Length; i += cHV + 1)
                {
                    char l;                                                                 //LETRA A CODIFICAR.
                    int HV = (int)CodifTexto[i];                                            //HASH VALUE.

                    //EN ESTE 'for' SE OBTENDRA EL VALOR DE HASH.
                    for (int j = 0; j < cHV; j++)
                    {
                        l = CodifTexto[j + (i - cHV)];

                        char cLegible = (char)(l - (HV - (j * j)));

                        DecodifTexto[j + (i - cHV) - HS_added] = cLegible;
                    }
                    HS_added++;
                }
                strDecodof = new String(DecodifTexto).Replace("\0", String.Empty);
            }

            return strDecodof;
        }


        public void Set_Code(int Code)
        {
            this.cHV = Code;
        }
    }

}