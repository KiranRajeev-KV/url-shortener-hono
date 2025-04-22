import { Hono } from 'hono'
import { shortenHandler } from './handlers/shorten'
import { redirectHandler } from './handlers/redirect'
import { statsHandler } from './handlers/stats'

const app = new Hono()

app.post('/shorten', shortenHandler)
app.get('/:id', redirectHandler)
app.get('/stats/:id', statsHandler)

app.get('/', (c) => {
  return c.html(`<p>Server Active</p>`)
})

export default app
