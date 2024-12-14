import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono()
app.use(prettyJSON());
app.use(logger());
app.use(cors({
  origin: ['http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}
));

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

export default app;
