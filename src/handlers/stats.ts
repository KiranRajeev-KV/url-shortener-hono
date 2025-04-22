import { Context } from 'hono';
import { LinkData } from '../types/linkData';
import { SEVEN_DAYS } from '../config';

export const statsHandler = async (c: Context) => {
  const id = c.req.param('id');
  const data = await c.env.LINKS.get(id);

  if (!data) {
    return c.text('Not found', 404);
  }

  const ld: LinkData = JSON.parse(data);

  return c.json({
    url: ld.url,
    createdAt: new Date(ld.createdAt).toISOString(),
    hits: ld.hits,
    expired: Date.now() - ld.createdAt > SEVEN_DAYS,
  });
};
