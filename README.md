# K-Pop Zone 幸运抽奖活动 (K-Pop Lottery Forum)

这是一个模拟 K-Pop 论坛抽奖活动的 React 应用。包含 AI 评论分析、倒计时、自动抽奖和庆祝特效。

## 功能特性

*   🎵 **K-Pop 主题 UI**: 霓虹风格设计，Glassmorphism 效果。
*   🤖 **AI 驱动**: 使用 Gemini API 分析粉丝评论的“应援指数 (Fan Hype)”。
*   ⏱️ **实时倒计时**: 自动计算活动截止时间。
*   🎰 **公平抽奖**: 倒计时结束后自动开启抽奖轮盘。
*   🎉 **庆祝仪式**: 获奖者公布时的彩带特效和弹窗。

## 运行项目

### 前置要求

*   Node.js (v18 或更高版本)
*   Google Gemini API Key

### 安装与启动

1.  克隆仓库并安装依赖：
    ```bash
    npm install
    ```

2.  设置环境变量：
    在根目录创建 `.env` 文件，并填入你的 Gemini API Key：
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

3.  启动开发服务器：
    ```bash
    npm run dev
    ```

4.  打开浏览器访问 `http://localhost:5173`。

## 技术栈

*   React 18
*   TypeScript
*   Vite
*   Tailwind CSS (CDN)
*   Google GenAI SDK

## 注意事项

本项目目前使用 CDN 加载 Tailwind CSS 以保持配置简单。如果在生产环境使用，建议配置本地 PostCSS 处理。
