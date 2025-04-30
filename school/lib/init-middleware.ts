import { NextApiRequest, NextApiResponse } from 'next';

// Define a proper middleware function type
type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: (err?: any) => void
) => void;

export default function initMiddleware(middleware: Middleware) {
  return (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) return reject(result);
        return resolve();
      });
    });
}
