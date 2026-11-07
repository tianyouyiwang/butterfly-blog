# 技术与成长笔记

基于 Hexo 与 Butterfly 的中文个人博客。文章放在 `source/_posts/`，站点设置在 `_config.yml`，主题设置在 `_config.butterfly.yml`。

## 本地预览

需要 Node.js 22 和 pnpm 11。首次运行：

```powershell
pnpm install --frozen-lockfile
pnpm server
```

浏览器打开 <http://localhost:4000>。修改文章后运行 `pnpm build` 可重新生成静态网页。

## 发布到 GitHub Pages

1. 在 GitHub 创建一个仓库。推荐命名为 `你的用户名.github.io`；使用其他仓库名也可以，网址会变为 `https://你的用户名.github.io/仓库名/`。
2. 把本项目文件上传到仓库的 `main` 分支。不要上传 `node_modules/` 或 `public/`。
3. 打开仓库 **Settings → Pages**，将 **Build and deployment → Source** 设为 **GitHub Actions**。
4. 打开 **Actions** 等待 `Publish blog to GitHub Pages` 完成，然后访问 Pages 页面显示的网址。

发布流程会自动生成正确的网址，无须在 `_config.yml` 中填写 GitHub 用户名。示例文章和“关于”页中的占位内容请在正式公开前修改。

## 写文章

```powershell
pnpm exec hexo new "文章标题"
```

新文件会出现在 `source/_posts/`。也可以直接创建 Markdown 文件。

主题文档：<https://butterfly.js.org/>；Hexo 部署文档：<https://hexo.io/docs/github-pages>。
