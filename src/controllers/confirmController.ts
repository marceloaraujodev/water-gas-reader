import { Request, Response } from 'express';
import {mongooseConnect} from '../lib/mongooseConnect';
import Bill from '../models/bill';

await mongooseConnect();

export async function confirm (req: Request, res: Response): Promise<Response> {

  const {measure_uuid, confirmed_value} = req.body;

  // Validate the input types
  if (!measure_uuid || typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
      message: 'Os dados fornecidos no corpo da requisição são inválidos'
    });
  }

  const confirmed = await Bill.findOne({measure_uuid: measure_uuid});

  if (!confirmed) {
    return res.status(404).json({
      error_code: "MEASURE_NOT_FOUND",
      error_description: 'Leitura do mês já realizada',
      message: 'Leitura não encontrada'
    })
  }

  if(confirmed.confirmed_value === true) {
    return res.status(409).json({ 
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: '"Leitura do mês já realizada',
      message: 'Leitura já confirmada'
    })
  }

  // marked item as confirmed, confirmed_value is a boolean in db;
  confirmed.confirmed_value = true;
  await confirmed.save();

  return res.status(200).json({
    success: true,
    message: 'Operação realizada com sucesso'
  })
}