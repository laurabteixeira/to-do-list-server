import { FastifyInstance } from 'fastify'
import CreateTaskTableController from '../controllers/TaskTableControllers/CreateTaskTableController'
import DeleteTaskTableController from '../controllers/TaskTableControllers/DeleteTaskTableController'
import ListTaskTablesControler from '../controllers/TaskTableControllers/ListTaskTablesController'

export async function TaskTableRouter(app: FastifyInstance) {
  app.post('/table', () => CreateTaskTableController())

  app.delete('/table/:tableId', (request) => DeleteTaskTableController(request))

  app.get('/table', () => ListTaskTablesControler())
}
