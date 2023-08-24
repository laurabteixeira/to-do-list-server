import { FastifyInstance } from 'fastify'
import CreateTaskController from '../controllers/TaskControllers/CreateTaskController'
import { ListTasksController } from '../controllers/TaskControllers/ListTasksController'
import { DeleteTaskController } from '../controllers/TaskControllers/DeleteTaskController'
import { UpdateTaskController } from '../controllers/TaskControllers/UpdateTaskController'

export async function TaskRouter(app: FastifyInstance) {
  app.post('/task/:tableId', (request) => CreateTaskController(request))

  app.get('/task/:tableId', (request) => ListTasksController(request))

  app.delete('/task/:taskId', (request, reply) =>
    DeleteTaskController(request, reply),
  )

  app.put('/task/:taskId', (request, reply) =>
    UpdateTaskController(request, reply),
  )
}
