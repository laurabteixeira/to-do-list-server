import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import prisma from '../../lib/prisma'
import redis from '../../lib/redis'

export async function UpdateTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<{ success: boolean }> {
  try {
    const paramsSchema = z.object({
      taskId: z.string().uuid(),
    })

    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      isFinished: z.coerce.boolean().default(false),
    })

    const { taskId } = paramsSchema.parse(request.params)
    const { title, description, isFinished } = bodySchema.parse(request.body)

    const updateResult = await prisma.task
      .update({
        where: {
          id: taskId,
        },
        data: {
          title,
          description,
          isFinished,
        },
      })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }))

    if (!updateResult.success) {
      return reply.status(422).send()
    }
    redis.clear('todoList')

    return updateResult
  } catch (error) {
    console.error(error)
    throw error
  }
}
