import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Hono本体
const app = new Hono();

// CORS（フロントのOriginを許可）
app.use(
  '/*',
  cors({
    origin: 'http://localhost:3000',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

// 確認用
app.get('/', (c) => c.text('Hono backend running'));

// POST /entries
app.post('/entries', async (c) => {
  const body = await c.req.json();

  console.log('[POST /entries] payload:', body);

  return c.json({
    status: 'ok',
    received: body,
  });
});

// GET /entries（空でOK）
app.get('/entries', (c) => c.json([]));

//ポート指定してサーバー起動（3000ではなく4000）
export default {
  port: 4000,
  fetch: app.fetch,
};
