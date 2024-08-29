import { Request, Response } from 'express';
import {mongooseConnect} from '../lib/mongooseConnect';
import Bill from '../models/bill';


const validMeasureTypes: string[] = ['WATER', 'GAS'];

export async function getList(req: Request, res: Response): Promise<Response>{
  await mongooseConnect();

  // clients code
  const {customerId} = req.params;
  // measuermen type
  const measureType = req.query.measure_type;

  // filters all customers readings.
  const bills = await Bill.find({ 
    customerCode: customerId, 
  });

  // data validation
  if(typeof measureType === 'string'){
    if(!validMeasureTypes.includes(measureType)){
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: 'Tipo de medição não permitida',
        message:"Parâmetro measure type diferente de WATER ou GAS"
      }); 
    }
  }

  if(!bills){
    return res.status(404).json({
      error_code: "MEASURES_NOT_FOUND",
      error_description: '"Nenhuma leitura encontrada',
      message: 'Nenhum registro encontrado'
    });
  }

  return res.status(200).json({
    customer_code: customerId,
    measures: bills.map(bill => ({
      measure_uuid: bill.measure_uuid,
      measure_datetime: bill.measureDateTime,
      measure_type: bill.measureType,
      has_confirmed: bill.has_confirmed,
      // measure_value: bill.measurement
    }))
  
  });

  // return res.status(200).json({success: true});
}