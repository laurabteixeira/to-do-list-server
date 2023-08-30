import prisma from '../../lib/prisma'
import redis from '../../lib/redis'

export default async function CreateTaskTableController() {
  try {
    const taskTable = await prisma.taskTable.create({
      data: {},
    })
    redis.clear('taskTableList')

    return taskTable
  } catch (error) {
    console.error(error)
    throw error
  }
}
