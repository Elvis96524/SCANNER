// 公开配置（不含任何密钥）。
// 启用 GitHub Token 登录：把 ghRepo 改成你的【私有】仓库 "用户名/仓库名"，该仓库根目录放 config.json：
//   {"token":"你的FMP API Key","limit":250}
// defaultMode 设为 'token' 则默认显示 Token 登录框。
window.SCANNER_CFG = {
  ghRepo: '',            // 例如 'yourname/scanner-secret'
  ghPath: 'config.json',
  defaultMode: 'pw'      // 'pw' = ID/密码，'token' = GitHub Token
};
