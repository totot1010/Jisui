import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { prettyJSON } from 'hono/pretty-json';
import { HTTPException } from 'hono/http-exception';
import auth from './routers/auth'
import user from './routers/users'
import post from './routers/posts'
import { requiredAuth } from './routers/middleware';

const app = new Hono().basePath('/api/v1');
app.use(prettyJSON());
app.use(logger());
app.use(cors({
  origin: ['http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}
));

app.get('/health', (c) => {
  return c.text('Hello Hono!')
});

app.route('/', auth);
app.route('/', user);
app.route('/', post);

app.notFound((c) => {
  return c.json('Not Found', 404)
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    console.error(err);
    return err.getResponse();
  }
  return c.json({ message: 'Internal Server Error' }, 500);
});

console.log(`Server is running on http://localhost:8787`);

serve({
  fetch: app.fetch,
  port: 8787,
})
