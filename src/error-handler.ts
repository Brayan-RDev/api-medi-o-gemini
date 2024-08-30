import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error_code: 'INVALID_DATA',
      error_description: error.flatten().fieldErrors
    })
  }
}