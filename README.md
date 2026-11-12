# scanner

每日美股 Top 20 爆发小盘股筛选 + 开盘 09:30–09:45 ET 狙击雷达（纯前端 PWA，需 ID/密码登录）。

## 一、生成账号与密钥库
1. 浏览器打开 `admin.html`（可本地双击打开，也可部署后访问）。
2. 填入 FMP API Key、每日额度、允许使用的 ID/密码，点「生成并下载 vault.json」。
3. 把 `vault.json` 放在仓库根目录。

> API Key 在 `vault.json` 里是 AES-256-GCM 加密的，只有输入正确 ID/密码才能解出，源码和仓库里都看不到明文。

## 一（附）、用 GitHub Fine-grained Token 登录（可选，权限由 GitHub 控制）
1. 新建一个**私有**仓库（如 `scanner-secret`），根目录放 `config.json`：`{"token":"你的FMP API Key","limit":250}`
2. GitHub → Settings → Developer settings → Fine-grained tokens，给每个人各生成一个：
   Repository access 只选 `scanner-secret`；Permissions → Contents 选 **Read-only**；设置到期日。
3. 编辑本项目的 `config.js`，把 `ghRepo` 改成 `用户名/scanner-secret`（`defaultMode` 设为 `'token'` 可默认显示 Token 登录）。
4. 把 Token 发给要用的人；登录页点「改用 GitHub Token 登录」。要停用某人，在 GitHub 删掉他的 Token 即可，立刻失效。

## 二、部署到 GitHub Pages
1. 把本目录所有文件（含 `.nojekyll`、`vault.json`）推到仓库根目录。
2. Settings → Pages → Branch 选 `main` / `(root)`。
3. 访问 `https://<用户名>.github.io/<仓库名>/`（HTTPS）。

## 三、安装成 App
- 安卓 / 电脑 Chrome、Edge：地址栏安装图标或菜单「安装应用」。
- iPhone Safari：分享 → 「添加到主屏幕」。

## 维护
- 增删账号：在 `admin.html` 重新生成 `vault.json` 覆盖；移除某人后建议同时更换 FMP Key。
- 更新页面后把 `sw.js` 里的 `CACHE` 版本号 +1，已安装设备才会拿到新版。
- API 用量按每台设备的请求次数估算，每日重置。
