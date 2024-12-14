import { Hono } from 'hono'
import auth from './routers/auth'
import user from './routers/users'
import post from './routers/posts'

const app = new Hono().basePath('/api/v1');

app.get('/health', (c) => {
  return c.text('Hello Hono!')
});

app.route('/auth', auth).route('/users', user).route('/posts', post);

app.notFound((c) => {
  return c.json('Not Found', 404)
});

export default app;
