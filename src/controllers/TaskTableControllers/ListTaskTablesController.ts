import { Task } from '@prisma/client'
import prisma from '../../lib/prisma'
import redis from '../../lib/redis'

export default async function ListTaskTablesControler() {
  try {
    const listsInCache = await redis.get('taskTableList')

    if (!listsInCache) {
      const taskTables = await prisma.taskTable.findMany({
        include: {
          tasks: true,
        },
      })
      redis.set('taskTableList', JSON.stringify(taskTables))
      return taskTables.map((taskTable) => {
        return {
          id: taskTable.id,
          tasks: taskTable.tasks,
          createdAt: taskTable.createdAt,
        }
      })
    }
    interface CachedTaskTable {
      id: string
      tasks: Task[]
      createdAt: Date
    } // Para tipar os dados que vem do cache.

    return (JSON.parse(listsInCache ?? '') as CachedTaskTable[]).map(
      (taskTable) => {
        return {
          id: taskTable.id,
          tasks: taskTable.tasks,
          createdAt: taskTable.createdAt,
        }
      },
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}
