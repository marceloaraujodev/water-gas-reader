# **Water-Gas Reader**

## **Description**
A backend service for reading water and gas meter values from images using the Google Gemini API. This service supports uploading images, confirming readings, and listing past measurements for specific customers.

---

## **Features**
- **`POST /upload`**: Upload an image to be processed and read by the Gemini API.
- **`PATCH /confirm`**: Confirm or correct the reading value for a given measurement.
- **`GET /<customer code>/list`**: Retrieve a list of measurements for a specified customer, with optional filtering by measurement type.

---

## **Setup**

### **Prerequisites**
- Node.js (v18 or later)
- Docker
- Docker Compose

### **Installation**

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd water-gas-reader
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory with the following content:
    
    ```plaintext
    GEMINI_API_KEY=<your-gemini-api-key>
    PORT=<your-port>
    MONGODB_URI=<your-mongodb-uri>
    ```

4. **Build and run the application with Docker:**

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images and start the application along with a MongoDB container.

---

## **API Endpoints**

### **POST /upload**
**Description**: Upload an image in base64 format to be processed by the Gemini API.

**Status Codes:**
- **200 OK**: Successfully processed the image and returned the reading information.
- **400 Bad Request**: The request was invalid or missing required data.
- **409 Conflict**: A conflict occurred, such as a duplicate report.

### **PATCH /confirm**
**Description**: Confirm or correct the value read for a specific measurement.

**Status Codes:**
- **200 OK**: Successfully confirmed or corrected the measurement value.
- **400 Bad Request**: The request was invalid or missing required data.
- **404 Not Found**: The specified measurement was not found.
- **409 Conflict**: A conflict occurred, such as a duplicate confirmation.


### **GET /<customer code>/list**
**Description**: Retrieve a list of measurements for a specified customer, with optional filtering by measurement type.

**Status Codes:**
- **200 OK**: Successfully retrieved the list of measurements.
- **400 Bad Request**: The request was invalid or included an unsupported measurement type.
- **404 Not Found**: No measurements were found for the specified customer.


