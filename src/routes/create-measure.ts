import { errorCodes, FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { Base64 } from 'js-base64';
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { processingImageToMeasurement } from "../lib/gemini";
import { generateImageUrl } from "../lib/generateImageUrl";

export async function createMeasure(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/upload',
    {
      schema: {
        body: z.object({
          image: z.string({ required_error: 'Image is required' }).refine(Base64.isValid),
          customer_code: z.string({ required_error: 'Customer_code is required' }),
          measure_datetime: z.coerce.date({ required_error: 'Measure_datetime is required' }),
          measure_type: z.string({ required_error: 'Measure_type is required' }),
        })
      }
    }, async (request, reply) => {
      const { image, customer_code, measure_datetime, measure_type } = request.body

      if(customer_code.replace(/\s+/g, "") === '') {
        reply.status(400).send({
          error_code: 'INVALID_DATA',
          error_description: 'O código do cliente não pode ser vazio',
        })
      }

      if(measure_type.toUpperCase() !== "WATER" || measure_type.toUpperCase() !== "GAS"){
        reply.status(400).send({
          error_code: 'INVALID_DATA',
          error_description: "O tipo de medição deve ser 'WATER' ou 'GAS'",
        })
      }

      const measure_value = await processingImageToMeasurement(image)
      const image_url = generateImageUrl(image).url

      // const customer = await prisma.customer.create({
      //   data: {
      //     customer_code,
      //     Measurement: {
      //       createMany: {
      //         data: [
      //           {
      //             measure_value: measure_value,
      //             measure_type: measure_type,
      //             measure_datetime: measure_datetime,
      //             image_url: image_url
      //           },
      //         ]
      //       }
      //     }
      //   }
      // })

      // const measurement = await prisma.measurement.findFirst({
      //   where: {
      //     customer_id: customer.id,
      //     measure_datetime: measure_datetime,
      //   },
      //   select: {
      //     measure_uuid: true, 
      //   },
      // });

      // reply.status(200).send({
      //   "image_url": image_url,
      //   "measure_value": measure_value,
      //   "measure_uuid": measurement?.measure_uuid
      // })
    })
}