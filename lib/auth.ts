import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'pascal_super_secret_jwt_key_2026';

export function verifyAdminToken(request: Request): { authenticated: boolean; username?: string; error?: string } {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map((c) => {
        const [k, v] = c.split('=');
        return [k, v];
      })
    );

    const token = cookies['admin_token'];

    if (!token) {
      return { authenticated: false, error: 'Unauthorized: No token provided' };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return { authenticated: true, username: decoded.username };
  } catch (err: any) {
    return { authenticated: false, error: 'Unauthorized: Invalid or expired token' };
  }
}
