// musicData.ts - 音乐播放列表数据

// 导入类型定义
import type { Track, AudioFormat, AudioFormats } from '../types'

// 音频格式优先级（按浏览器兼容性排序）
const formatPriority: AudioFormat[] = ['mp3', 'wav', 'ogg', 'flac']

// 检测浏览器对FLAC的真实支持情况
function checkFlacSupport(): boolean {
  const audio = new Audio()
  const canPlayFlac = audio.canPlayType('audio/flac')
  
  // 检测浏览器类型
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
  const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1 && !isChrome
  
  // Safari不支持FLAC
  if (isSafari) {
    console.warn('Safari浏览器不支持FLAC格式')
    return false
  }
  
  // 即使浏览器说支持，也要进行实际测试
  return canPlayFlac === 'probably' || canPlayFlac === 'maybe'
}

// 获取最佳音频格式
export function getBestAudioFormat(track: Track): string {
  if (track.formats) {
    const audio = new Audio()
    const supportsFlac = checkFlacSupport()
    
    console.log(`检测 ${track.title} 的音频格式支持:`)
    
    // 如果浏览器不支持FLAC，跳过FLAC格式
    const availableFormats = supportsFlac 
      ? formatPriority 
      : formatPriority.filter(format => format !== 'flac')
    
    console.log(`可用格式: ${availableFormats.join(', ')}`)
    
    for (const format of availableFormats) {
      const url = track.formats[format]
      
      if (url) {
        const mimeTypeMap: Record<AudioFormat, string> = {
          mp3: 'audio/mpeg',
          wav: 'audio/wav',
          ogg: 'audio/ogg',
          flac: 'audio/flac'
        }
        
        const mimeType = mimeTypeMap[format]
        const support = audio.canPlayType(mimeType)

        // console.log(`${format.toUpperCase()}: ${support}`)

        // 对于FLAC，要求更严格的支持度
        if (format === 'flac') {
          if (support === 'probably') {
            // console.log(`✅ 为 ${track.title} 选择高质量FLAC格式`)
            return url
          } else {
            // console.warn(`⚠️ FLAC格式支持度不确定(${support})，跳过`)
            continue
          }
        }
        
        // 对于其他格式，'maybe'也可以接受
        if (support === 'probably' || support === 'maybe') {
          // console.log(`✅ 为 ${track.title} 选择 ${format.toUpperCase()} 格式 (支持度: ${support})`)
          return url
        }
      }
    }
    
    // 如果没有找到支持的格式，强制使用MP3
    if (track.formats.mp3) {
      // console.warn(`🔄 为 ${track.title} 强制使用MP3备用格式`)
      return track.formats.mp3
    }
    
    // 最后的备用方案，按优先级选择第一个可用格式
    for (const format of ['mp3', 'wav', 'ogg']) {
      const url = track.formats[format as AudioFormat]
      if (url) {
        // console.warn(`🆘 为 ${track.title} 使用最后备用格式: ${format.toUpperCase()}`)
        return url
      }
    }
  }
  
  // 回退到默认 URL
  // console.log(`📁 为 ${track.title} 使用默认URL: ${track.url}`)
  return track.url
}

// 示例播放列表（开源版本使用示例数据）
export const playlist: Track[] = [
  {
    id: 'demo-1',
    title: 'Demo Track 1',
    artist: 'Demo Artist',
    album: 'Demo Album',
    url: '/demo/music/demo-track-1.mp3',
    cover: '/demo/music/covers/demo-cover-1.jpg',
    formats: {
      mp3: '/demo/music/demo-track-1.mp3',
      flac: '/demo/music/demo-track-1.flac'
    }
  },
  {
    id: 'demo-2',
    title: 'Demo Track 2',
    artist: 'Another Artist',
    album: 'Another Album',
    url: '/demo/music/demo-track-2.mp3',
    cover: '/demo/music/covers/demo-cover-2.jpg',
    formats: {
      mp3: '/demo/music/demo-track-2.mp3'
    }
  },
  {
    id: 'demo-3',
    title: 'Sample Song',
    artist: 'Sample Artist',
    album: 'Sample Album',
    url: '/demo/music/sample-song.mp3',
    cover: '/demo/music/covers/sample-cover.jpg',
    formats: {
      mp3: '/demo/music/sample-song.mp3',
      wav: '/demo/music/sample-song.wav'
    }
  }
]

// 如果你没有封面图片，可以使用默认封面：
export const defaultCover = '/demo/music/covers/default.jpg'

// 工具函数：添加新歌曲到播放列表
export function addTrack(track: Omit<Track, 'id'>): Track {
  const newTrack: Track = {
    ...track,
    id: Date.now().toString(), // 使用时间戳作为ID
    cover: track.cover || defaultCover // 如果没有封面则使用默认封面
  }
  playlist.push(newTrack)
  return newTrack
}

// 工具函数：根据ID删除歌曲
export function removeTrack(id: string): boolean {
  const index = playlist.findIndex(track => track.id === id)
  if (index > -1) {
    playlist.splice(index, 1)
    return true
  }
  return false
}

// 工具函数：获取随机播放列表
export function getShuffledPlaylist(): Track[] {
  const shuffled = [...playlist]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 工具函数：根据艺术家筛选歌曲
export function getTracksByArtist(artist: string): Track[] {
  return playlist.filter(track => 
    track.artist.toLowerCase().includes(artist.toLowerCase())
  )
}

// 工具函数：根据专辑筛选歌曲
export function getTracksByAlbum(album: string): Track[] {
  return playlist.filter(track => 
    track.album.toLowerCase().includes(album.toLowerCase())
  )
}

// 工具函数：搜索歌曲（按标题、艺术家、专辑）
export function searchTracks(query: string): Track[] {
  const lowercaseQuery = query.toLowerCase()
  return playlist.filter(track => 
    track.title.toLowerCase().includes(lowercaseQuery) ||
    track.artist.toLowerCase().includes(lowercaseQuery) ||
    track.album.toLowerCase().includes(lowercaseQuery)
  )
}

/* 
 * 使用说明：
 * 
 * 1. 这是组件库版本，使用示例音乐数据
 * 2. 用户可以通过props传入自己的播放列表：
 * 
 *    <MusicPlayer :playlist="myPlaylist" />
 * 
 * 3. 或者使用工具函数动态添加：
 * 
 *    import { addTrack } from '@copudev/vitepress-music-player'
 *    
 *    addTrack({
 *      title: '我的歌曲',
 *      artist: '我的艺术家',
 *      album: '我的专辑',
 *      url: '/music/my-song.mp3',
 *      cover: '/music/covers/my-cover.jpg'
 *    })
 * 
 * 4. 支持多种音频格式：
 * 
 *    {
 *      id: 'song-1',
 *      title: '高质量音乐',
 *      artist: '艺术家',
 *      album: '专辑',
 *      url: '/music/song.mp3',          // 默认格式
 *      cover: '/music/covers/song.jpg',
 *      formats: {                       // 多格式支持
 *        mp3: '/music/song.mp3',        // 兼容性最好
 *        flac: '/music/song.flac',      // 高质量
 *        wav: '/music/song.wav',        // 无损
 *        ogg: '/music/song.ogg'         // 开源格式
 *      }
 *    }
 */