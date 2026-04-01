import { jwtVerify, SignJWT } from 'jose';
import { z } from 'zod';

const tempTokenSchema = z.object({
  provider: z.string(),
  providerUserId: z.string(),
  email: z.string().optional(),
});

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createAccessToken(userId: number) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
}

export async function createTempToken(providerUserId: string, email: string) {
  return await new SignJWT({ providerUserId, email, provider: 'naver' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(secret);
}

export async function verifyTempToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return tempTokenSchema.parse(payload);
  } catch (err) {
    throw new Error('Invalid or expired tempToken', { cause: err });
  }
}
