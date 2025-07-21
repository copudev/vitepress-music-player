// src/types/index.ts

// 音频格式类型
export type AudioFormat = 'mp3' | 'wav' | 'ogg' | 'flac'

// 音频格式映射接口
export interface AudioFormats {
  mp3?: string
  wav?: string
  ogg?: string
  flac?: string
}

// 音轨接口
export interface Track {
  id: string
  title: string
  artist: string
  album: string
  url: string
  cover: string
  formats?: AudioFormats
}

// 组件Props接口
export interface MusicPlayerProps {
  playlist?: Track[]
  autoPlay?: boolean
  volume?: number
  loop?: boolean
  expanded?: boolean
}

// 组件事件接口
export interface MusicPlayerEmits {
  play: [track: Track]
  pause: [track: Track]
  next: [track: Track]
  previous: [track: Track]
  ended: [track: Track]
  'track-change': [track: Track, index: number]
  'volume-change': [volume: number]
}