import { Context } from 'hono'
import { LinkData } from '../types/linkData'
import { SEVEN_DAYS } from '../config'

export const redirectHandler = async (c: Context) => {
  const id = c.req.param('id');
  const data = await c.env.LINKS.get(id);

  if (!data) {
    return c.text('Not found', 404);
  }

  const ld: LinkData = JSON.parse(data);

  // Expiration check (if not using TTL)
  // if (Date.now() - ld.createdAt > SEVEN_DAYS) {
  //   return c.text('Link expired', 410); // 410 = Gone
  // }

  ld.hits++;
  await c.env.LINKS.put(id, JSON.stringify(ld));

  return c.redirect(ld.url);
};
