import { Request, Response } from 'express';
import {mongooseConnect} from '../lib/mongooseConnect';
import Bill from '../models/bill';
import { isValidBase64Image, isValidString, isValidDate, isValidMeasureType } from '../utils/validation';
import { uploadFile } from '../services/uploadImage';
import { result } from '../services/requestReading';
import path from 'path';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { v4 as uuidv4 } from 'uuid';
import { saveBase64ImageToTemp } from '../utils/saveBase64ImageToTemp';
import dotenv from 'dotenv';
dotenv.config();

mongooseConnect();

export const upload = async (req: Request, res: Response) => {
  try {
    const { image, customer_code: customerCode, measure_datetime: measureDateTime, measure_type: measureType } = req.body;
  
    // validate data returns true or false
    const isImageTypeValid = isValidBase64Image(image)
    const isCustomerCodeValid = isValidString(customerCode)
    const isMeasureDateTimeValid = isValidDate(measureDateTime)
    const isMeasureTypeValid = isValidMeasureType(measureType)
   
    // safe guards for inputs ✔️
    if (!isImageTypeValid || !isCustomerCodeValid || !isMeasureDateTimeValid || !isMeasureTypeValid){
      return res.status(400).json(
        { 
          error_code: "INVALID_DATA",
          error_description: "Os dados fornecidos no corpo da requisição são inválidos"
        }
      );
    }
  
    // convert date string to date object for validity and methods usability
    const measureDate = new Date(measureDateTime)
  
    // gets date and month from the converted date object
    const year = measureDate.getFullYear();
    const month = measureDate.getMonth() + 1;
  
    // start and end of month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
  
    // check if read already exists - water and gas have separate documents on db
    const existingReading = await Bill.findOne({
      customerCode,
      measureType,
      measureDateTime: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      }
    })
  
    // save guards for existing readings.
    if (existingReading) {
      return res.status(409).json(
        {
          error_code: "DOUBLE_REPORT",
          error_description: "Leitura do mês já realizada",
          message: "Já existe uma leitura para este tipo no mês atual"
        }
      );
    }
  
    // receives the base64 encoded string and sends to the function to be stored in a temp folder
    const filePath = saveBase64ImageToTemp(req.body.image)
  
    // LLM file uploading - file path needs to be change hard coded for now
    const responseUpload = await uploadFile(filePath);
    // receive response from LLM | what I receive from LLM will return inthe response
    console.log(responseUpload)
  
    const responseMimeType = responseUpload.file.mimeType;
    const responseUri = responseUpload.file.uri;
  
    // reading result 
    // const imgReadingResult = result(responseMimeType, responseUri);
    const meterValue:string = await result(responseMimeType, responseUri);
    console.log('meterValue >>>>',meterValue)
    const meterCount = Number(meterValue);
    console.log('meterCount------', meterCount);
  
    // reading error
    if(!Number(meterCount)){
      return res.status(400).json(
        { 
          error_code: "READING_ERROR",
          error_description: "Ocorreu um erro ao ler a leitura, tente novamente mais tarde."
        }
      );
    }

    // save to the database
    const bill = new Bill({
      image,
      customerCode,
      measureDateTime: measureDateTime,
      measureType: measureType,
      measure_uuid: uuidv4(),
      measurement: meterCount
    });
  
    // saves document on DB - Only 2 documents per customer per month will be created
    bill.save();
  
    // if all are successful return this
    return res.status(200).json({
      //// requirements 
        image_url: responseUpload.file.uri,
        measure_value: meterCount, //'integer'
        measure_uuid: uuidv4(),
        message: 'Operação realizada com sucesso'
    })
    
  } catch (error) {
    return res.status(500).json({
      //// requirements 
      error_code: "Internal Server Error, please try again",
      error_description: "Ocorreu um erro interno no servidor, por favor tente novamente."
    })
  }

}