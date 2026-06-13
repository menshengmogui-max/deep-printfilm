import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const DEFAULT_API_PROXY_TARGET = 'https://api.gitcc.com';

const normalizeTarget = (target?: string | string[]): string => {
  const value = Array.isArray(target) ? target[0] : target;
  if (!value || !/^https?:\/\//i.test(value)) return DEFAULT_API_PROXY_TARGET;
  return value.replace(/\/+$/, '');
};

const createApiProxy = () => ({
  target: DEFAULT_API_PROXY_TARGET,
  changeOrigin: true,
  rewrite: (p: string) => p.replace(/^\/api-proxy/, ''),
  router: (req: any) => normalizeTarget(req.headers['x-api-base-url']),
  configure: (proxy: any) => {
    proxy.on('proxyReq', (proxyReq: any, req: any) => {
      const target = normalizeTarget(req.headers['x-api-base-url']);
      try {
        const u = new URL(target);
        proxyReq.setHeader('host', u.host);
        proxyReq.setHeader('origin', target);
        proxyReq.setHeader('referer', `${target}/`);
      } catch (_) {}
      proxyReq.removeHeader('x-api-base-url');
    });
  },
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api-proxy': createApiProxy(),
        },
      },
      preview: {
        port: 3005,
        host: '0.0.0.0',
        proxy: {
          '/api-proxy': createApiProxy(),
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.ANTSK_API_KEY),
        'process.env.ANTSK_API_KEY': JSON.stringify(env.ANTSK_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
