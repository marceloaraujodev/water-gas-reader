Water-Gas Reader
Description
A backend service for reading water and gas meter values from images using the Google Gemini API. This service supports uploading images, confirming readings, and listing past measurements for specific customers.

Features
POST /upload: Upload an image to be processed and read by the Gemini API.
PATCH /confirm: Confirm or correct the reading value for a given measurement.
GET /<customer code>/list: Retrieve a list of measurements for a specified customer, with optional filtering by measurement type.
Setup
Prerequisites
Node.js (v18 or later)
Docker
Docker Compose
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
cd water-gas-reader
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory with the following content:
GEMINI_API_KEY=<your-gemini-api-key>
PORT
MONGODB_URI

plaintext
Copy code
Build and run the application with Docker:

bash
Copy code
docker-compose up --build
This command will build the Docker images and start the application along with a MongoDB container.

API Endpoints
POST /upload
Description: Upload an image in base64 format to be processed by the Gemini API.

Request Body:

json
Copy code
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" or "GAS"
}
Response:

200 OK:

json
Copy code
{
  "image_url": "string",
  "measure_value": integer,
  "measure_uuid": "string"
}
400 Bad Request:

json
Copy code
{
  "error_code": "INVALID_DATA",
  "error_description": "<description>"
}
409 Conflict:

json
Copy code
{
  "error_code": "DOUBLE_REPORT",
  "error_description": "Leitura do mês já realizada"
}
PATCH /confirm
Description: Confirm or correct the value read for a specific measurement.

Request Body:

json
Copy code
{
  "measure_uuid": "string",
  "confirmed_value": integer
}
Response:

200 OK:

json
Copy code
{
  "success": true
}
400 Bad Request:

json
Copy code
{
  "error_code": "INVALID_DATA",
  "error_description": "<description>"
}
404 Not Found:

json
Copy code
{
  "error_code": "MEASURE_NOT_FOUND",
  "error_description": "Leitura não encontrada"
}
409 Conflict:

json
Copy code
{
  "error_code": "CONFIRMATION_DUPLICATE",
  "error_description": "Leitura já confirmada"
}
GET /<customer code>/list
Description: List measurements for a specific customer, with optional filtering by measurement type.

Query Parameters:

measure_type (optional): "WATER" or "GAS"
Response:

200 OK:

json
Copy code
{
  "customer_code": "string",
  "measures": [
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": boolean,
      "image_url": "string"
    }
  ]
}
400 Bad Request:

json
Copy code
{
  "error_code": "INVALID_TYPE",
  "error_description": "Tipo de medição não permitida"
}
404 Not Found:

json
Copy code
{
  "error_code": "MEASURES_NOT_FOUND",
  "error_description": "Nenhuma leitura encontrada"
}
Testing
You can manually test the endpoints using tools like Postman or cURL. Ensure that Docker containers are up and running before performing tests.