// 导入主组件
import MusicPlayer from './components/MusicPlayer.vue'

// 导入工具函数
import { 
  getBestAudioFormat, 
  addTrack, 
  removeTrack,
  getShuffledPlaylist,
  getTracksByArtist,
  getTracksByAlbum,
  searchTracks,
  defaultCover,
  playlist
} from './utils/musicData'

// 导出类型
export type { 
  Track, 
  AudioFormat, 
  AudioFormats, 
  MusicPlayerProps
} from './types'

// 导出组件
export { MusicPlayer }

// 导出工具函数
export {
  getBestAudioFormat,
  addTrack,
  removeTrack,
  getShuffledPlaylist,
  getTracksByArtist,
  getTracksByAlbum,
  searchTracks,
  defaultCover,
  playlist
}

// 默认导出主组件
export default MusicPlayer