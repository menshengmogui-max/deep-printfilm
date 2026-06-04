# AI 漫剧工场 · API 站点修改指南

本文面向**二次开发 / 私有化部署**场景，说明如何在代码中将默认 API 站点 `https://api.gitcc.com` 改为你的自有网关或其它兼容 OpenAI 格式的 API 地址。

> **与「模型配置」的区别**  
> - **模型配置**（应用内弹窗）：配置 API Key、切换模型名称，保存在浏览器本地。  
> - **本文**：修改**源码与部署配置**，更换整个项目请求的 API **域名（站点）**。

---

## 一、请求是怎么发出去的？

浏览器里的前端**不会**在多数环境下直接访问 `https://api.gitcc.com`，而是访问同源的 **`/api-proxy`**，再由各环境的代理转发到真实 API：

```text
浏览器  →  /api-proxy/v1/chat/completions  →  代理层  →  https://api.gitcc.com/v1/chat/completions
```

| 运行方式 | 谁来做代理 |
|----------|------------|
| `npm run dev` / `npm run preview` | `vite.config.ts` |
| Docker / Nginx 部署 | `nginx.conf` |
| Electron 桌面版 | `electron/main.cjs` |

业务代码里通过 `types/model.ts` 的提供商 `baseUrl` 和 `services/modelRegistry.ts` 的 `getApiBaseUrlForModel()` 决定：若判定为「默认 API 站点」，则把请求地址改成 `/api-proxy`。

因此改站点需要同时改：**前端默认值** + **三处代理目标** + **域名判定逻辑**。

---

## 二、推荐改法（先改一处，再全局替换）

### 1. 统一常量（优先改这里）

文件：**`types/model.ts`**

```typescript
export const DEPEI_PROVIDER_BASE_URL = 'https://api.gitcc.com';
```

将 `https://api.gitcc.com` 改成你的 API 根地址，例如：

```typescript
export const DEPEI_PROVIDER_BASE_URL = 'https://api.example.com';
```

说明：

- 内置模型提供商 `BUILTIN_PROVIDERS` 使用此常量。
- `components/ModelConfig/AddModelForm.tsx` 只允许添加与**该 baseUrl 一致**的提供商下的自定义模型。

改完后，仍需完成下文 **第三节** 的代理与域名判定，否则本地/Docker 仍可能转发到旧地址。

### 2. 全局搜索替换（避免遗漏）

在项目根目录执行搜索（IDE 全局搜索即可），查找：

| 搜索内容 | 说明 |
|----------|------|
| `api.gitcc.com` | API 域名（含 Host 头、代理目标） |
| `https://api.gitcc.com` | 完整 API 根 URL |

把与 **API 请求 / 代理** 相关的命中项改为你的新域名。**不要**误改仅用于官网展示的 `www.gitcc.com`（见第四节）。

---

## 三、必改文件清单

以下文件与 **API 站点** 强相关，换域名时建议逐项修改。

### 1. 前端默认 API 地址

| 文件 | 位置 / 说明 |
|------|-------------|
| `types/model.ts` | `DEPEI_PROVIDER_BASE_URL`（**主入口，建议最先改**） |
| `services/modelConfigService.ts` | `DEFAULT_PROVIDER.baseUrl`、`name` 中的 `api.gitcc.com` |
| `services/geminiService.ts` | `DEFAULT_API_BASE = 'https://api.gitcc.com'`；`getDefaultApiBase()` 内与 `DEFAULT_API_BASE === 'https://api.gitcc.com'` 的比较也需改为新 URL |
| `services/adapters/chatAdapter.ts` | `verifyApiKey` 中 `baseUrl \|\| 'https://api.gitcc.com'` 的默认值 |

### 2. 代理：开发 / 预览（Vite）

文件：**`vite.config.ts`**

两处 `server.proxy` 与 `preview.proxy` 中的 `target`：

```typescript
target: 'https://api.gitcc.com',
```

改为你的 API 根地址，例如：

```typescript
target: 'https://api.example.com',
```

修改后需**重启** `npm run dev` 或 `npm run preview`。

### 3. 代理：Docker / 生产 Nginx

文件：**`nginx.conf`**

需修改 `location ~ ^/api-proxy/` 块内与上游相关的配置，至少包括：

| 配置项 | 当前示例 | 你要改成 |
|--------|----------|----------|
| `proxy_pass` | `https://api.gitcc.com/$path...` | `https://你的API域名/$path...` |
| `proxy_set_header Host` | `api.gitcc.com` | 你的 API 主机名（无协议） |
| `proxy_set_header Origin` | `https://api.gitcc.com` | `https://你的API域名` |
| `proxy_set_header Referer` | `https://api.gitcc.com/` | `https://你的API域名/` |

修改后重新构建并启动容器，例如：

```bash
docker compose up -d --build
```

### 4. 代理：Electron 桌面端

文件：**`electron/main.cjs`**

```javascript
const API_PROXY_TARGET = 'https://api.gitcc.com';
```

改为你的 API 根地址。修改后需重新执行 `npm run electron:build`（或 `electron:dev`）打包。

### 5. 域名判定（走 `/api-proxy` 的关键逻辑）

文件：**`services/modelRegistry.ts`**

函数 `isGitccApiBaseUrl()` 当前写死为：

```typescript
return new URL(baseUrl).hostname === 'api.gitcc.com';
```

若你只改了 `DEPEI_PROVIDER_BASE_URL` 而**没有**改这里，浏览器可能仍直接请求新域名（跨域），或无法走代理。

**做法（二选一）：**

- **A.** 将 `'api.gitcc.com'` 改为你的 API 主机名，例如 `'api.example.com'`。  
- **B.** 改为读取 `types/model.ts` 中的常量，避免两处不一致，例如：

```typescript
import { DEPEI_PROVIDER_BASE_URL } from '../types/model';

function isGitccApiBaseUrl(baseUrl: string): boolean {
  try {
    return new URL(baseUrl).hostname === new URL(DEPEI_PROVIDER_BASE_URL).hostname;
  } catch {
    return false;
  }
}
```

同时检查 **`services/geminiService.ts`** 中 `getDefaultApiBase()`：  
若存在 `DEFAULT_API_BASE === 'https://api.gitcc.com'` 的判断，应改为与你的 `DEFAULT_API_BASE` 新值一致，否则本地开发可能不走 `/api-proxy`。

---

## 四、通常不必改 API 站点的文件

以下包含 `gitcc.com` 但多为**官网、Logo、SEO**，与 API 转发无关；除非你要整体换品牌，否则可保留：

| 文件 | 用途 |
|------|------|
| `index.html` | 页面 meta、结构化数据、图标 |
| `public/sitemap.xml`、`public/robots.txt` | SEO |
| `App.tsx`、`components/Sidebar.tsx`、`components/Onboarding/*` | 官网链接、Logo 图床 |
| `components/ModelConfig/GlobalSettings.tsx` | 「立即购买」跳转到 API 官网 |
| `components/Onboarding/ApiKeyPage.tsx` | 购买 / 咨询链接 |

若私有化部署不需要跳转 GitCC，可自行替换为你们的文档或控制台地址。

---

## 五、修改后如何验证

### 1. 本地开发

```bash
npm install
npm run dev
```

1. 在应用内配置有效 API Key。  
2. 打开浏览器开发者工具 → **Network**。  
3. 触发一次对话或出图（如解析剧本）。  
4. 确认：  
   - 请求 URL 为 **`http://localhost:3000/api-proxy/...`**（或你的 dev 端口）；  
   - **不应**再出现对旧域名 `api.gitcc.com` 的跨域直连（除非你故意不走代理）。

### 2. Docker 部署

```bash
docker compose up -d --build
```

访问 `http://localhost:3005`，同样查看 Network 中是否为 **`/api-proxy/...`**，并在容器日志中确认 Nginx 无 `502` / `no resolver defined` 等错误。

### 3. API Key 验证

在 **模型配置 → 全局配置** 点击「验证并保存」。失败时检查：

- 新 API 是否兼容 `/v1/chat/completions` 验证请求；  
- 代理 `target` 与 `Host` 头是否与上游要求一致；  
- 新站点是否为 **HTTPS** 且证书有效。

---

## 六、自建 API 网关时注意

1. **接口兼容性**  
   项目默认按 OpenAI 风格组织路径（如 `/v1/chat/completions`、`/v1/videos`、部分图片走 chat/completions）。自建网关需转发或实现相同路径，或在「模型配置」里为自定义模型填写对应 **Endpoint**。

2. **CORS**  
   务必让前端走 `/api-proxy`，不要长期依赖浏览器直连第三方 API；否则需在后端配置 CORS。

3. **请求体大小**  
   Nginx 已设置 `client_max_body_size 50m` 以支持带 base64 图片的请求；自建代理请同步放宽限制。

4. **超时**  
   视频生成较慢，`nginx.conf` 中 `proxy_read_timeout` 等为 600s；网关超时可参考调整。

5. **localStorage 旧配置**  
   用户浏览器若缓存了旧提供商 `baseUrl`（如 `api.antsk.cn`），`modelRegistry` 加载时会尝试用内置提供商覆盖 `antsk` 的 `baseUrl`。换站点后建议用户清除站点数据，或你在代码中提高 `BUILTIN_PROVIDERS` 合并逻辑的优先级（已内置覆盖 `baseUrl`）。

---

## 七、修改项速查表

将 `api.gitcc.com` / `https://api.gitcc.com` 替换为你的站点时，可按表勾选：

| 序号 | 文件 | 是否必改 |
|------|------|----------|
| 1 | `types/model.ts` → `DEPEI_PROVIDER_BASE_URL` | 必改 |
| 2 | `vite.config.ts` → `proxy.target`（2 处） | 必改 |
| 3 | `nginx.conf` → `proxy_pass`、`Host`、`Origin`、`Referer` | Docker 部署必改 |
| 4 | `electron/main.cjs` → `API_PROXY_TARGET` | 桌面版必改 |
| 5 | `services/modelRegistry.ts` → `isGitccApiBaseUrl` 主机名 | 必改 |
| 6 | `services/geminiService.ts` → `DEFAULT_API_BASE` 及本地代理判断 | 必改 |
| 7 | `services/modelConfigService.ts` → `DEFAULT_PROVIDER` | 建议改 |
| 8 | `services/adapters/chatAdapter.ts` → 默认 `baseUrl` | 建议改 |

---

## 八、相关文档

- 应用内模型与 Key 配置：[模型配置指南.md](./模型配置指南.md)  
- 安装与部署：[README.md](./README.md)

---

*若你希望将 API 主机名抽成单一环境变量（如 `.env` + Vite `define`），需要在上述文件基础上增加构建时注入，本指南描述的是当前仓库的静态配置方式。*
