import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import auth from './routers/auth'
import user from './routers/users'
import post from './routers/posts'

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

app.route('/auth', auth).route('/users', user).route('/posts', post);

app.notFound((c) => {
  return c.json('Not Found', 404)
});

export default app;
