import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import prisma from '../../lib/prisma'

export async function DeleteTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<{ success: boolean }> {
  try {
    const paramsSchema = z.object({
      taskId: z.string().uuid(),
    })

    const { taskId } = paramsSchema.parse(request.params)

    const deleteResult = await prisma.task
      .delete({
        where: {
          id: taskId,
        },
      })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }))

    if (!deleteResult.success) {
      return reply.status(422).send()
    }

    return deleteResult
  } catch (error) {
    console.error(error)
    throw error
  }
}
