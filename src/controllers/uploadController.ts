import { Request, Response } from 'express';
import {mongooseConnect} from '../lib/mongooseConnect';
import Bill from '../models/bill';
import { isValidBase64Image, isValidString, isValidDate, isValidMeasureType } from '../utils/validation';
import { uploadFile } from '../services/googleAIClient';
import { result } from '../services/googleAIRequestReading';
import path from 'path';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from 'dotenv';
dotenv.config();

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.GOOGLE_AI_STUDIO_API_KEY as string);

mongooseConnect();

// {
//   "image": "base64",
//   "customer_code": "string",
//   "measure_datetime": "datetime",
//   "measure_type": "WATER" ou "GAS" string
//   }

// GOOGLE_AI_STUDIO_API_KEY

export const upload = async (req: Request, res: Response) => {

  // const { image, customer_code: customerCode, measure_datetime: measureDateTime, measure_type: measureType } = req.body;
  // // console.log('customer code value:',customerCode)

  // // validate data returns true or false
  // const isImageTypeValid = isValidBase64Image(image)
  // const isCustomerCodeValid = isValidString(customerCode)
  // const isMeasureDateTimeValid = isValidDate(measureDateTime)
  // const isMeasureTypeValid = isValidMeasureType(measureType)
 
  // // safe guards for inputs ✔️
  // if (!isImageTypeValid || !isCustomerCodeValid || !isMeasureDateTimeValid || !isMeasureTypeValid){
  //   return res.status(400).json(
  //     { 
  //       error_code: "INVALID_DATA",
  //       error_description: "Os dados fornecidos no corpo da requisição são inválidos"
  //     }
  //   );
  // }

  // // convert date string to date object for validity and methods usability
  // const measureDate = new Date(measureDateTime)

  // // gets date and month from the converted date object
  // const year = measureDate.getFullYear();
  // const month = measureDate.getMonth() + 1;

  // // start and end of month
  // const startOfMonth = new Date(year, month - 1, 1);
  // const endOfMonth = new Date(year, month, 1);

  // // check if read already exists - water and gas have separate documents on db
  // const existingReading = await Bill.findOne({
  //   customerCode,
  //   measureType,
  //   measureDateTime: {
  //     $gte: startOfMonth,
  //     $lte: endOfMonth,
  //   }
  // })

  // // save guards for existing readings.
  // if (existingReading) {
  //   return res.status(409).json(
  //     {
  //       error_code: "DOUBLE_REPORT",
  //       error_description: "Leitura do mês já realizada",
  //       message: "Já existe uma leitura para este tipo no mês atual"
  //     }
  //   );
  // }

  // //DATABASE
  // const bill = new Bill({
  //   image,
  //   customerCode,
  //   measureDateTime: measureDateTime,
  //   measureType: measureType,
  // });

  // // saves document on DB - Only 2 documents per customer per month will be created
  // bill.save();

  // LLM file uploading - file path needs to be change hard coded for now
  const responseUpload = await uploadFile();
  // receive response from LLM | what I receive from LLM will return inthe response
  console.log(responseUpload)

  const responseMimeType = responseUpload.file.mimeType;
  const responseUri = responseUpload.file.uri;

  // reading result 
  const imgReadingResult = await result(responseMimeType, responseUri);
  const meterReading = imgReadingResult.response.text();
  console.log('this is the response for the meterReading: ', meterReading);

  // if all are successful return this
  return res.status(200).json({
    //// requirements 
      image_url: 'string',
      measure_value: 5, //'integer'
      measure_uuid: 'string',
      message: 'Operação realizada com sucesso'
  })
}