# @copudev/vitepress-music-player

<p align="center">
  <img src="https://img.shields.io/npm/v/@copudev/vitepress-music-player?style=for-the-badge&color=007bff" alt="NPM Version">
  <img src="https://img.shields.io/github/stars/copudev/vitepress-music-player?style=for-the-badge&color=ffd700" alt="GitHub Stars">
  <img src="https://img.shields.io/npm/dm/@copudev/vitepress-music-player?style=for-the-badge&color=00d4aa" alt="NPM Downloads">
  <img src="https://img.shields.io/github/license/copudev/vitepress-music-player?style=for-the-badge&color=green" alt="License">
</p>

<p align="center">
  <h3 align="center">🎵 现代化VitePress音乐播放器组件</h3>
  <p align="center">支持FLAC高质量音频 • 暗色主题适配 • 完全响应式设计</p>
</p>

<p align="center">
  <a href="#-快速开始"><strong>快速开始</strong></a> •
  <a href="#-特性"><strong>特性</strong></a> •
  <a href="#-安装"><strong>安装</strong></a> •
  <a href="#-使用方法"><strong>使用</strong></a> •
  <a href="#-配置选项"><strong>配置</strong></a>
</p>

---

## ✨ 特性

<table>
  <tr>
    <td>🎵</td>
    <td><strong>多格式支持</strong></td>
    <td>MP3, FLAC, WAV, OGG等音频格式，智能格式检测与降级</td>
  </tr>
  <tr>
    <td>🌓</td>
    <td><strong>暗色主题</strong></td>
    <td>完美适配VitePress暗色模式，自动主题切换</td>
  </tr>
  <tr>
    <td>📱</td>
    <td><strong>响应式设计</strong></td>
    <td>完美支持桌面和移动端，自适应布局</td>
  </tr>
  <tr>
    <td>🎮</td>
    <td><strong>完整控制</strong></td>
    <td>播放/暂停、上下曲、进度条、音量控制</td>
  </tr>
  <tr>
    <td>📋</td>
    <td><strong>播放列表</strong></td>
    <td>智能播放列表管理，支持动态添加删除</td>
  </tr>
  <tr>
    <td>🎯</td>
    <td><strong>迷你模式</strong></td>
    <td>不干扰阅读的浮动迷你播放器</td>
  </tr>
  <tr>
    <td>⚡</td>
    <td><strong>TypeScript</strong></td>
    <td>完整的类型支持，更好的开发体验</td>
  </tr>
  <tr>
    <td>🔧</td>
    <td><strong>高度可定制</strong></td>
    <td>CSS变量和主题定制，适应各种设计风格</td>
  </tr>
</table>

## 🚀 快速开始

### 安装

选择你喜欢的包管理器：

```bash
# NPM
npm install @copudev/vitepress-music-player

# Yarn
yarn add @copudev/vitepress-music-player

# PNPM
pnpm add @copudev/vitepress-music-player
```

### 基础使用

**第1步：注册组件**

在你的VitePress主题中注册组件：

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import MusicPlayer from '@copudev/vitepress-music-player'
import '@copudev/vitepress-music-player/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MusicPlayer', MusicPlayer)
  }
}
```

**第2步：在布局中使用**

```vue
<template>
  <Layout>
    <!-- 你的内容 -->
    <MusicPlayer />
  </Layout>
</template>
```

就这么简单！🎉 播放器会自动显示在页面右下角。

## 🎵 使用方法

### 基础播放列表

创建你的音乐播放列表：

```typescript
import { ref } from 'vue'
import type { Track } from '@copudev/vitepress-music-player'

const myPlaylist = ref<Track[]>([
  {
    id: '1',
    title: '夜曲',
    artist: '周杰伦',
    album: '十一月的萧邦',
    url: '/music/nocturne.mp3',
    cover: '/music/covers/nocturne.jpg'
  },
  {
    id: '2', 
    title: '千里之外',
    artist: '周杰伦 ft. 费玉清',
    album: '依然范特西',
    url: '/music/thousands-miles-away.mp3',
    cover: '/music/covers/thousands-miles-away.jpg'
  }
])
```

```vue
<template>
  <MusicPlayer :playlist="myPlaylist" />
</template>
```

### 高质量音频支持 🎧

组件智能检测浏览器支持的音频格式，**优先使用高质量格式**：

```typescript
{
  id: 'high-quality',
  title: '高品质音乐',
  artist: '音乐家',
  album: '发烧碟',
  url: '/music/song.mp3',           // 默认兼容格式
  cover: '/music/covers/song.jpg',
  formats: {
    mp3: '/music/song.mp3',         // 标准MP3 (320kbps)
    flac: '/music/song.flac',       // 🌟 无损FLAC (优先)
    wav: '/music/song.wav',         // 无压缩WAV
    ogg: '/music/song.ogg'          // 开源OGG
  }
}
```

> 💡 **智能降级**：如果浏览器不支持FLAC，会自动降级到MP3等兼容格式

### 动态管理播放列表

```typescript
import { addTrack, removeTrack } from '@copudev/vitepress-music-player'

// 添加新歌曲
addTrack({
  title: '新歌',
  artist: '歌手',
  album: '新专辑',
  url: '/music/new-song.mp3',
  cover: '/music/covers/new-cover.jpg'
})

// 删除歌曲
removeTrack('song-id')
```

## ⚙️ 配置选项

### 组件Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `playlist` | `Track[]` | `[]` | 播放列表 |
| `autoPlay` | `boolean` | `false` | 自动播放 |
| `volume` | `number` | `0.7` | 默认音量 (0-1) |
| `loop` | `boolean` | `false` | 循环播放 |
| `expanded` | `boolean` | `false` | 默认展开播放器 |

### 完整配置示例

```vue
<template>
  <MusicPlayer 
    :playlist="myPlaylist"
    :autoPlay="false"
    :volume="0.8"
    :loop="true"
    :expanded="false"
  />
</template>
```

### Track 接口定义

```typescript
interface Track {
  id: string              // 唯一标识符
  title: string           // 歌曲名称
  artist: string          // 艺术家
  album: string           // 专辑名称
  url: string            // 默认音频文件URL
  cover: string          // 封面图片URL
  formats?: {            // 多格式支持（可选）
    mp3?: string         // MP3格式URL
    flac?: string        // FLAC格式URL  
    wav?: string         // WAV格式URL
    ogg?: string         // OGG格式URL
  }
}
```

## 🎨 主题定制

### CSS 变量定制

```css
/* 自定义主题颜色 */
:root {
  /* 播放器背景和文字 */
  --music-player-bg: rgba(255, 255, 255, 0.95);
  --music-player-text: #1a1a1a;
  --music-player-border: rgba(0, 0, 0, 0.06);
  
  /* 主题色 */
  --music-player-primary: #007bff;
  --music-player-primary-hover: #0056b3;
  
  /* 进度条样式 */
  --music-player-progress-bg: rgba(0, 0, 0, 0.08);
  --music-player-progress-fill: linear-gradient(90deg, #007bff, #0056b3);
}

/* 暗色主题适配 */
.dark {
  --music-player-bg: rgba(24, 24, 27, 0.95);
  --music-player-text: #e4e4e7;
  --music-player-border: rgba(255, 255, 255, 0.08);
  --music-player-progress-bg: rgba(255, 255, 255, 0.08);
}
```

### 自定义样式

```css
/* 自定义播放器位置 */
.music-player {
  bottom: 100px !important;
  right: 50px !important;
}

/* 迷你播放器圆角 */
.mini-player {
  border-radius: 25px !important;
  backdrop-filter: blur(20px) !important;
}

/* 自定义封面样式 */
.track-cover {
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}
```

## 🛠️ 工具函数

组件提供了丰富的工具函数：

```typescript
import { 
  getBestAudioFormat,
  getShuffledPlaylist,
  getTracksByArtist,
  getTracksByAlbum,
  searchTracks
} from '@copudev/vitepress-music-player'

// 获取最佳音频格式
const audioUrl = getBestAudioFormat(track)

// 获取随机播放列表
const shuffledList = getShuffledPlaylist()

// 按艺术家筛选
const artistTracks = getTracksByArtist('周杰伦')

// 按专辑筛选
const albumTracks = getTracksByAlbum('十一月的萧邦')

// 搜索歌曲（标题/艺术家/专辑）
const searchResults = searchTracks('夜曲')
```

## 📱 响应式支持

组件完美支持各种设备：

| 设备类型 | 屏幕宽度 | 播放器表现 |
|----------|----------|------------|
| 桌面端 | ≥ 768px | 完整功能，右下角浮动 |
| 平板 | 768px - 480px | 适配布局，保持全功能 |
| 手机 | < 480px | 底部固定，优化触控 |

## 🌍 浏览器兼容性

| 浏览器 | 版本要求 | MP3 | FLAC | WAV | OGG |
|--------|----------|-----|------|-----|-----|
| Chrome | ≥ 88 | ✅ | ✅ | ✅ | ✅ |
| Firefox | ≥ 78 | ✅ | ✅ | ✅ | ✅ |
| Safari | ≥ 14 | ✅ | ❌ | ✅ | ❌ |
| Edge | ≥ 88 | ✅ | ✅ | ✅ | ✅ |

> 📝 **自动降级**：不支持的格式会自动降级到兼容格式

## 🗂️ 文件结构建议

推荐的音乐文件组织结构：

```
public/
├── music/
│   ├── covers/                    # 封面图片
│   │   ├── nocturne.jpg
│   │   ├── thousands-miles-away.jpg
│   │   └── default.jpg           # 默认封面
│   │
│   ├── mp3/                      # MP3文件
│   │   ├── nocturne.mp3
│   │   └── thousands-miles-away.mp3
│   │
│   ├── flac/                     # FLAC高质量文件
│   │   ├── nocturne.flac
│   │   └── thousands-miles-away.flac
│   │
│   └── wav/                      # WAV无损文件
│       ├── nocturne.wav
│       └── thousands-miles-away.wav
```

## 🚀 高级用法

### 事件监听

```vue
<template>
  <MusicPlayer 
    @play="onPlay"
    @pause="onPause" 
    @track-change="onTrackChange"
    @volume-change="onVolumeChange"
  />
</template>

<script setup>
const onPlay = (track) => {
  console.log('开始播放:', track.title)
}

const onPause = (track) => {
  console.log('暂停播放:', track.title)
}

const onTrackChange = (track, index) => {
  console.log('切换歌曲:', track.title, '索引:', index)
}

const onVolumeChange = (volume) => {
  console.log('音量变化:', volume)
}
</script>
```

### 程序控制播放器

```typescript
// 获取播放器实例
const musicPlayerRef = ref()

// 播放指定歌曲
musicPlayerRef.value?.playTrack(2)

// 播放/暂停
musicPlayerRef.value?.togglePlay()

// 设置音量
musicPlayerRef.value?.setVolume(0.8)

// 切换展开状态
musicPlayerRef.value?.toggleExpanded()
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/copudev/vitepress-music-player.git
cd vitepress-music-player

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm type-check

# 代码检查
pnpm lint
```

### 提交规范

我们使用[约定式提交](https://conventionalcommits.org/)：

```bash
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式化
refactor: 重构代码
test: 添加测试
chore: 构建工具或依赖更新
```

### 问题反馈

- 🐛 **Bug报告**：[Issues](https://github.com/copudev/vitepress-music-player/issues)
- 💡 **功能建议**：[Discussions](https://github.com/copudev/vitepress-music-player/discussions)
- ❓ **使用问题**：[Discussions Q&A](https://github.com/copudev/vitepress-music-player/discussions/categories/q-a)

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。

```
MIT License - 你可以自由地使用、修改、分发本项目
```

## 🙏 致谢

感谢这些优秀的开源项目：

- [VitePress](https://vitepress.dev/) - 现代化的静态站点生成器
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript

## 📈 项目状态

- ✅ **稳定版本**：v1.0.0
- 🔄 **活跃维护**：定期更新和bug修复
- 📦 **NPM发布**：自动化发布流程
- 🧪 **测试覆盖**：持续集成测试

## 🌟 支持项目

如果这个项目对你有帮助，请：

1. ⭐ **给个Star** - 这是对我们最大的鼓励
2. 🐛 **反馈问题** - 帮助我们改进
3. 💡 **提出建议** - 让项目变得更好
4. 🔄 **分享推荐** - 让更多人受益

---

<p align="center">
  <strong>用 ❤️ 制作 by <a href="https://github.com/copudev">@copudev</a></strong>
</p>

<p align="center">
  <a href="#top">回到顶部 ⬆️</a>
</p>
