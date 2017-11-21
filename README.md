# IoT Readings
Store and fetch readings from an IoT sensor.

## Getting Started

### Prerequisites

- Git
- Node.js ^8.2.1 and npm ^5.3.0
- PostgreSQL ^9.5

### Setup

- Run **npm install** to install dependencies.
- Run **npm start** to start the server.
- Run **npm test** to run the unit test.
- Run **npm run lint** to see the result from eslint.
- Run **npm run coverage** to generate test coverage.

### Testing

- You can use Chrome Tool Postman https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en
- Add Postman Extension to chrome and use below APIs to test.
- Run **npm test** to test the application with mocha.

###### Add a reading -

- **POST** localhost:4000/api/readings/add
- Payload : {reading: 5.5, timestamp : 125250150250, sensorType : 'temperature'}

###### Fetch all or aggregate readings -

- **POST** localhost:4000/api/readings/get
- Payload : {fromDate: 115250150250, toDate : 128250150250, sensorType(Optional) : 'temperature'}
- **POST** localhost:4000/api/readings/agg
- Payload : {agg: 'max/min/avg', fromDate: 115250150250, toDate : 128250150250, sensorType(Optional) : 'temperature'}
