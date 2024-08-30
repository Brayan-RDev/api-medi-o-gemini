import crypto from 'crypto';

export function generateImageUrl(image: string) {
  const id = crypto.randomBytes(16).toString('hex');
  const expiraEm = Date.now() + 60 * 60 * 1000;
  const links = new Map();

  links.set(id, { image, expiraEm });

  return { url: `http://localhost:3000/link/${id}` };
}