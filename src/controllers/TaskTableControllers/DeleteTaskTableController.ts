import { FastifyRequest } from 'fastify'
import prisma from '../../lib/prisma'
import { z } from 'zod'
import redis from '../../lib/redis'

export default async function DeleteTaskTableController(
  request: FastifyRequest,
) {
  try {
    const paramsSchema = z.object({
      tableId: z.string().uuid(),
    })

    const { tableId } = paramsSchema.parse(request.params)

    const existingTaskTable = await prisma.taskTable.findUnique({
      where: { id: tableId },
      include: {
        tasks: true,
      },
    })

    if (!existingTaskTable) return { message: 'Table not found.' }

    await prisma.task.deleteMany({
      where: {
        taskTableId: tableId,
      },
    })

    await prisma.taskTable.delete({
      where: { id: tableId },
    })

    redis.clear('taskTableList')

    return { message: 'Table deleted successfully.' }
  } catch (error) {
    console.error(error)
    throw error
  }
}
