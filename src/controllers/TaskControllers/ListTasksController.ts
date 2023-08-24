import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import prisma from '../../lib/prisma'

export async function ListTasksController(request: FastifyRequest) {
  try {
    const paramsSchema = z.object({
      tableId: z.string().uuid(),
    })

    const { tableId } = paramsSchema.parse(request.params)

    console.log('CAIU AQUI, REDIS NÃO FUNCIONOU')
    const tasks = await prisma.task.findMany({
      where: {
        taskTableId: tableId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        isFinished: task.isFinished,
        createdAt: task.createdAt,
      }
    })
  } catch (error) {
    console.error(error)
  }
}
