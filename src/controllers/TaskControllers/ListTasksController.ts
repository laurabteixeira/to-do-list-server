import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import prisma from '../../lib/prisma'
import redis from '../../lib/redis'
import { Task } from '@prisma/client'

export async function ListTasksController(request: FastifyRequest) {
  try {
    const paramsSchema = z.object({
      tableId: z.string().uuid(),
    })

    const { tableId } = paramsSchema.parse(request.params)
    const listsInCache = await redis.get('todoList')

    if (!listsInCache) {
      const tasks = await prisma.task.findMany({
        where: {
          taskTableId: tableId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      })
      redis.set('todoList', JSON.stringify(tasks))

      return tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          isFinished: task.isFinished,
          createdAt: task.createdAt,
        }
      })
    }

    return JSON.parse(listsInCache ?? '').map((task: Task) => {
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
