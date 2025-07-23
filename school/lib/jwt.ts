import { SignJWT, decodeJwt, jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET_KEY || 'my-first-jwt-secret-key';
const encoder = new TextEncoder();
const secretKey = encoder.encode(secret);

// Generate JWT
export const generateToken = async (userId: string, role: string) => {
  const jwt = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secretKey);

  return jwt;
};

// Verify JWT
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.log('Token is invalid', error);
    return null;
  }
};

export const decodeToken = (token: string): string | null => {
  try {
    const decoded = decodeJwt(token);

    if (decoded.userId && decoded.role) {
      return decoded.role as string;
    } else {
      console.error('Decoded token is missing required fields.');
      return null;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
