# 技术与成长笔记

基于 Hexo 与 Butterfly 的中文个人博客，发布地址：<https://tianyouyiwang.github.io/butterfly-blog/>。

文章放在 `source/_posts/`，站点设置在 `_config.yml`，主题设置在 `_config.butterfly.yml`。

## 本地预览

需要 Node.js 22 和 pnpm 11。首次运行：

```powershell
pnpm install --frozen-lockfile
pnpm server
```

浏览器打开 <http://localhost:4000>。修改文章后运行 `pnpm build` 可重新生成静态网页。

## 发布更新

将文章和配置更新提交到 `main` 分支后，GitHub Actions 会自动构建并发布。不要上传 `node_modules/` 或 `public/`。

发布流程会自动生成正确的网址，无须在 `_config.yml` 中填写 GitHub 用户名。

## 写文章

```powershell
pnpm exec hexo new "文章标题"
```

新文件会出现在 `source/_posts/`。也可以直接创建 Markdown 文件。

主题文档：<https://butterfly.js.org/>；Hexo 部署文档：<https://hexo.io/docs/github-pages>。

## 点赞与评论

文章页使用 [Waline](https://waline.js.org/) 提供点赞和评论。评论服务地址为 `https://butterfly-blog-waline.vercel.app`，管理员在该地址的 `/ui` 页面审核评论。

在 Waline 的 Vercel 项目 Production 环境中保持 `COMMENT_AUDIT=true`，让每条新评论经审核后才公开；`SECURE_DOMAINS` 应包含 `tianyouyiwang.github.io` 和 `butterfly-blog-waline.vercel.app`。修改服务端环境变量后须重新部署 Waline。点赞无需审核。

本地预览和 GitHub Pages 使用相同的 Waline 服务。如果以后更换服务地址，请同步更新 `_config.butterfly.yml` 中的 `waline.serverURL` 与 Vercel 项目的 `SECURE_DOMAINS`。
