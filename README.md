# scanner

每日美股 Top 20 爆发小盘股筛选 + 开盘 09:30–09:45 ET 狙击雷达（纯前端 PWA）。

## 部署到 GitHub Pages
1. 新建仓库（如 `scanner`），把本目录所有文件放在仓库根目录并推送。
2. 仓库 Settings → Pages → Source 选 `Deploy from a branch`，Branch 选 `main` / `(root)`。
3. 访问 `https://<用户名>.github.io/scanner/`（必须是 HTTPS）。

## 安装成 App
- **Android / 电脑 Chrome、Edge**：打开网址 → 地址栏安装图标 / 菜单「安装应用」。
- **iPhone Safari**：分享按钮 → 「添加到主屏幕」。

## 说明
- FMP API Key、本金、监控名单保存在浏览器 localStorage，不会上传。
- 行情请求始终走网络，Service Worker 只缓存页面与静态资源（离线可打开界面，但无行情）。
- 更新页面后，把 `sw.js` 里的 `CACHE = 'scanner-v1'` 改成 `v2`，用户才会拿到新版。
