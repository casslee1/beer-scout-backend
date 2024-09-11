import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import usersRouter from './routers/users';

const app = new Hono();

app.use(cors({ origin: 'http://localhost:5173' }));

app.route('/users', usersRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

//
