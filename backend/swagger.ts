import swaggerAutogen from 'swagger-autogen'

const outputFile = './public/swagger.json'
const endpointsFiles = [
  "./*.ts",
  "./routes/*.ts",
  "./controllers/*.ts",
  "./models/*.ts",
]

// Run the script
swaggerAutogen(outputFile, endpointsFiles)
