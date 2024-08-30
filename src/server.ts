import fastify from "fastify";
import cors from '@fastify/cors'
import { createMeasure } from "./routes/create-measure";
import { errorHandler } from "./error-handler";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)
app.register(createMeasure)

app.listen({ port: 3333 }).then(() => {
  console.log('Server Running!')
})