import prisma from '../../lib/prisma'

export default async function ListTaskTablesControler() {
  try {
    const taskTables = await prisma.taskTable.findMany({
      include: {
        tasks: true,
      },
    })

    return taskTables
  } catch (error) {
    console.error(error)
    throw error
  }
}
