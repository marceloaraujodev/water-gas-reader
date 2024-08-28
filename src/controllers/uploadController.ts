import { Request, Response } from 'express';
import {mongooseConnect} from '../lib/mongooseConnect';
import Bill from '../models/bill';
import { isValidBase64Image } from '../utils/validation';

mongooseConnect();

// falta validar customercode, measuredate, measuret type


export const upload = (req: Request, res: Response):Response => {

  const { image, customer_code: customerCode, measure_datetime: measureDateTime, measure_type: measureType } = req.body;

  // validate data
  const isImageTypeValid = isValidBase64Image(image)

  
  // //if no image return response object ✔️
  // if (!isImageTypeValid || !customerCode || !measureDateTime || !measureType){
  //   return res.status(400).json(
  //     { 
  //       error_code: "INVALID_DATA",
  //       error_description: "Os dados fornecidos no corpo da requisição são inválidos"
  //     }
  //   );
  // }

  // //DATABASE
  // const bill = new Bill({
  //   image,
  //   customerCode,
  //   measureDateTime: measureDateTime,
  //   measureType: measureType,
  //   read: false,
  // });

  // bill.save();

  // send image to LLM and await for its response


  // receive response from LLM | what I receive from LLM will return inthe response

 
  return res.status(200).json({
    //// requirements 
      image_url: 'string',
      measure_value: 5, //'integer'
      measure_uuid: 'string',
      message: 'Operação realizada com sucesso'
  })
}