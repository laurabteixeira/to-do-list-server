import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import prisma from '../../lib/prisma'
import redis from '../../lib/redis'

export default async function CreateTaskController(request: FastifyRequest) {
  try {
    const paramsSchema = z.object({
      tableId: z.string().uuid(),
    })

    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      isFinished: z.coerce.boolean().default(false),
    })

    const { tableId } = paramsSchema.parse(request.params)
    const { title, description, isFinished } = bodySchema.parse(request.body)

    const task = await prisma.task.create({
      data: {
        title,
        description,
        isFinished,
        taskTableId: tableId,
      },
    })
    redis.clear('todoList')

    return task
  } catch (error) {
    console.error(error)
  }
}
