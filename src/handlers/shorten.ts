import { Context } from 'hono';
import { generateId } from '../utils/idGenerator';
import { LinkData } from '../types/linkData';
import { SEVEN_DAYS } from '../config';

export const shortenHandler = async (c: Context) => {
  const { url } = await c.req.json();
  if (!url) {
    return c.text('Missing URL', 400);
  }

  const id = generateId(); 
  const ld: LinkData = {
    url: url,
    createdAt: Date.now(),
    hits: 0,
  };

  // TTL to delete in 7 days
  await c.env.LINKS.put(id, JSON.stringify(ld), {
    expirationTtl: SEVEN_DAYS / 1000, // TTL in seconds
  });


  const origin = new URL(c.req.url).origin;

  return c.json({ short: `${origin}/${id}` });
};
