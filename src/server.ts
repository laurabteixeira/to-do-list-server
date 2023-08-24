import fastify from 'fastify'
import { TaskRouter } from './routes/task.routes'
import { TaskTableRouter } from './routes/task.table.routes'

const app = fastify()

app.register(TaskTableRouter)
app.register(TaskRouter)

app.listen({ port: 3333 }).then(() => {
  console.log('🐰 HTTP server is running on http://localhost:3333 🐰')
})
