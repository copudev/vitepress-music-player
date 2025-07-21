/* 暗色主题适配 - 使用VitePress的暗色主题类 */
.dark .music-player,
html.dark .music-player {/* 暗色主题适配 - 使用VitePress的暗色主题类 */
.dark .music-player,
html.dark .music-player {
  background: rgba(15, 15, 15, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 16px 40px rgba(0, 0, 0, 0.3),
    0 8px 20px rgba(0, 0, 0, 0.2),
    inset <template>
  <div class="music-player" :class="{ 'expanded': isExpanded }" v-show="true">
    <div class="mini-player" @click="toggleExpanded" v-if="!isExpanded && playlist.length > 0">
      <div class="mini-info">
        <img :src="currentTrack.cover" :alt="currentTrack.title" class="mini-cover">
        <div class="mini-text">
          <div class="mini-title">{{ currentTrack.title }}</div>
          <div class="mini-artist">{{ currentTrack.artist }}</div>
        </div>
      </div>
      <div class="mini-controls">
        <button @click.stop="togglePlay" class="mini-play-btn">
          <svg v-if="!isPlaying" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
        <button @click.stop="toggleExpanded" class="expand-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14l5-5 5 5z"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="full-player" v-if="isExpanded">
      <div class="player-header">
        <h3>音乐播放器</h3>
        <button @click="toggleExpanded" class="close-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <div class="current-track" v-if="currentTrack">
        <img :src="currentTrack.cover" :alt="currentTrack.title" class="track-cover">
        <div class="track-info">
          <h4 class="track-title">{{ currentTrack.title }}</h4>
          <p class="track-artist">{{ currentTrack.artist }}</p>
          <p class="track-album">{{ currentTrack.album }}</p>
        </div>
      </div>

      <div class="player-controls">
        <div class="control-buttons">
          <button @click="playPrevious" class="control-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button @click="togglePlay" class="play-btn">
            <svg v-if="!isPlaying" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          <button @click="playNext" class="control-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        <div class="progress-container">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar" @click="seekTo" ref="progressBar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
            <div class="progress-thumb" :style="{ left: progressPercent + '%' }"></div>
          </div>
          <span class="time">{{ formatTime(duration) }}</span>
        </div>

        <div class="volume-container">
          <button @click="toggleMute" class="volume-btn">
            <svg v-if="volume === 0" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
            <svg v-else-if="volume < 0.5" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <div class="volume-bar" @click="setVolume" ref="volumeBar">
            <div class="volume-fill" :style="{ width: (volume * 100) + '%' }"></div>
            <div class="volume-thumb" :style="{ left: (volume * 100) + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="playlist">
        <h4>播放列表</h4>
        <div class="track-list">
          <div 
            v-for="(track, index) in playlist" 
            :key="track.id"
            :class="['track-item', { active: currentTrackIndex === index }]"
            @click="playTrack(index)"
          >
            <img :src="track.cover" :alt="track.title" class="track-item-cover">
            <div class="track-item-info">
              <div class="track-item-title">{{ track.title }}</div>
              <div class="track-item-artist">{{ track.artist }}</div>
            </div>
            <!--<div class="track-duration">{{ track.duration }}</div>-->
          </div>
        </div>
      </div>
    </div>

    <audio 
      ref="audio" 
      @timeupdate="updateTime" 
      @loadedmetadata="loadedMetadata"
      @ended="playNext"
      @error="handleAudioError"
      preload="metadata"
      :playbackRate="1.0"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { playlist, getBestAudioFormat } from '../utils/musicData'
import type { Track, AudioFormat } from '../types'

const isExpanded = ref(false)
const isPlaying = ref(false)
const currentTrackIndex = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.7)
const previousVolume = ref(0.7)
const audio = ref<HTMLAudioElement>()
const progressBar = ref<HTMLElement>()
const volumeBar = ref<HTMLElement>()

const currentTrack = computed(() => playlist[currentTrackIndex.value])
const progressPercent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const togglePlay = async () => {
  if (!audio.value) return

  audio.value.playbackRate = 1.0

  audio.value.volume = volume.value
  
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    try {
      await audio.value.play()
    } catch (error) {
      console.error('播放失败:', error)
    }
  }
  isPlaying.value = !isPlaying.value
}

const playTrack = async (index: number) => {
  if (!audio.value) return
  
  currentTrackIndex.value = index
  const track = currentTrack.value

  audio.value.pause()
  audio.value.currentTime = 0
  currentTime.value = 0
  duration.value = 0
  isPlaying.value = false

  const audioUrl = getBestAudioFormat(track)

  audio.value.src = audioUrl

  audio.value.playbackRate = 1.0
  audio.value.preservesPitch = false

  try {
    audio.value.load()
    await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        audio.value?.removeEventListener('canplay', onCanPlay)
        audio.value?.removeEventListener('error', onError)
        reject(new Error('音频加载超时'))
      }, 10000)
      
      const onCanPlay = () => {
        clearTimeout(timeoutId)
        audio.value?.removeEventListener('canplay', onCanPlay)
        audio.value?.removeEventListener('error', onError)
        if (audio.value) {
          audio.value.playbackRate = 1.0
        }
        resolve(true)
      }
      const onError = (e: Event) => {
        clearTimeout(timeoutId)
        audio.value?.removeEventListener('canplay', onCanPlay)
        audio.value?.removeEventListener('error', onError)
        reject(e)
      }
      audio.value?.addEventListener('canplay', onCanPlay)
      audio.value?.addEventListener('error', onError)
    })

    audio.value.playbackRate = 1.0
    await audio.value.play()
    isPlaying.value = true
  } catch (error) {
    console.error('播放失败:', error)
    isPlaying.value = false
    currentTime.value = 0
    duration.value = 0
  }
}

const playNext = () => {
  const nextIndex = (currentTrackIndex.value + 1) % playlist.length
  playTrack(nextIndex)
}

const playPrevious = () => {
  const prevIndex = currentTrackIndex.value === 0 
    ? playlist.length - 1 
    : currentTrackIndex.value - 1
  playTrack(prevIndex)
}

const updateTime = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime

    if (Math.abs(audio.value.playbackRate - 1.0) > 0.01) {
      audio.value.playbackRate = 1.0
    }
  }
}

const loadedMetadata = () => {
  if (audio.value) {
    duration.value = audio.value.duration
    audio.value.playbackRate = 1.0
  }
}

const handleAudioError = async (event: Event) => {
  console.error('音频播放错误:', event)
  console.error('错误详情:', audio.value?.error)
  
  const currentTrack = playlist[currentTrackIndex.value]
  
  if (audio.value?.error) {
    const errorCode = audio.value.error.code
    const errorMessages: Record<number, string> = {
      1: 'MEDIA_ERR_ABORTED - 播放被用户中止',
      2: 'MEDIA_ERR_NETWORK - 网络错误',
      3: 'MEDIA_ERR_DECODE - 解码错误，可能是格式不支持',
      4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - 音频格式不支持'
    }
    
    const errorMessage = errorMessages[errorCode] || '未知错误'
    console.error(`错误代码 ${errorCode}: ${errorMessage}`)

    if (errorCode === 3 || errorCode === 4) {
      await tryFallbackFormat(currentTrack)
      return
    }
  }

  setTimeout(() => {
    if (audio.value) {
      audio.value.load()
    }
  }, 1000)
}

const tryFallbackFormat = async (track: Track) => {
  if (!track.formats) return
  const currentUrl = audio.value?.src
  const formatOptions: AudioFormat[] = ['mp3', 'wav', 'ogg']
  
  for (const format of formatOptions) {
    const url = track.formats[format]
    if (url && url !== currentUrl) {
      try {
        if (audio.value) {
          audio.value.src = url
          audio.value.load()

          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('加载超时'))
            }, 5000)
            
            const onCanPlay = () => {
              clearTimeout(timeout)
              audio.value?.removeEventListener('canplay', onCanPlay)
              audio.value?.removeEventListener('error', onError)
              resolve()
            }
            
            const onError = () => {
              clearTimeout(timeout)
              audio.value?.removeEventListener('canplay', onCanPlay)
              audio.value?.removeEventListener('error', onError)
              reject(new Error('加载失败'))
            }
            
            audio.value?.addEventListener('canplay', onCanPlay)
            audio.value?.addEventListener('error', onError)
          })
          
          return
        }
      } catch (error) {
        continue
      }
    }
  }
  
  isPlaying.value = false
}

const seekTo = (event: MouseEvent) => {
  if (!audio.value || !progressBar.value) return
  
  const rect = progressBar.value.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  const seekTime = percent * duration.value
  
  audio.value.currentTime = seekTime
  currentTime.value = seekTime
}

const setVolume = (event: MouseEvent) => {
  if (!audio.value || !volumeBar.value) return
  
  const rect = volumeBar.value.getBoundingClientRect()
  const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  
  volume.value = percent
  audio.value.volume = percent

  if (percent > 0) {
    previousVolume.value = percent
  }
}

const toggleMute = () => {
  if (!audio.value) return
  
  if (volume.value === 0) {
    volume.value = previousVolume.value
  } else {
    previousVolume.value = volume.value
    volume.value = 0
  }
  
  audio.value.volume = volume.value
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00'
  
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

watch(volume, (newVolume) => {
  if (audio.value) {
    audio.value.volume = newVolume
  }
})

onMounted(() => {
  if (audio.value) {
    audio.value.volume = volume.value

    const initialAudioUrl = getBestAudioFormat(currentTrack.value)
    audio.value.src = initialAudioUrl
    
    audio.value.playbackRate = 1.0
    
    audio.value.addEventListener('loadstart', () => {
      console.log('开始加载音频文件')
    })
    
    audio.value.addEventListener('loadeddata', () => {
      console.log('音频数据加载完成')
      
      try {
        const audioElement = audio.value as any
        const hasDecodeInfo = audioElement.webkitAudioDecodedByteCount !== undefined
        console.log('音频解码信息:', hasDecodeInfo ? '可获取' : '不可获取')
      } catch (e) {
        console.log('音频解码信息: 不支持检测')
      }
    })
    
    audio.value.addEventListener('canplaythrough', () => {
      console.log('音频可以完整播放')
    })
  }
})
</script>

<style scoped>
.music-player {
  position: fixed !important;
  bottom: 24px !important;
  right: 24px !important;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 4px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 10000 !important;
  transition: all 0.3s ease;
  max-height: 80vh;
  overflow: hidden;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}

.music-player:hover {
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.12),
    0 6px 20px rgba(0, 0, 0, 0.06);
}

.music-player.expanded {
  width: 420px;
  height: auto;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.1),
    0 8px 24px rgba(0, 0, 0, 0.06);
}

.mini-player {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  width: 340px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 16px;
  position: relative;
  visibility: visible !important;
  opacity: 1 !important;
}

.mini-player:hover {
  transform: translateY(-1px);
}

.mini-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.mini-cover {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mini-text {
  flex: 1;
  min-width: 0;
}

.mini-title {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.mini-artist {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
  line-height: 1.2;
}

.mini-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.mini-play-btn, .expand-btn {
  background: rgba(255, 255, 255, 0.8);
  border: none;
  color: #555;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.mini-play-btn:hover, .expand-btn:hover {
  background: #007bff;
  color: white;
  transform: scale(1.05);
}

.full-player {
  width: 420px;
  padding: 24px;
}

.player-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.player-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.close-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1a1a1a;
}

.current-track {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.track-cover {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.track-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.track-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.track-artist {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #666;
}

.track-album {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.player-controls {
  margin-bottom: 24px;
  background: rgba(248, 250, 252, 0.5);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.control-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}

.control-btn, .play-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  background: #007bff;
  color: white;
  padding: 12px;
}

.control-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1a1a1a;
}

.play-btn:hover {
  background: #0056b3;
  transform: scale(1.05);
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0;
}

.time {
  font-size: 12px;
  color: #666;
  min-width: 40px;
  font-variant-numeric: tabular-nums;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border-radius: 3px;
  transition: width 0.1s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #007bff;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: white;
  border: 2px solid #007bff;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.progress-bar:hover .progress-thumb {
  opacity: 1;
}

/* 音量控制 */
.volume-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.volume-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.volume-btn:hover {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.volume-bar {
  flex: 1;
  height: 6px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  min-width: 80px;
  max-width: 140px;
}

.volume-fill {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border-radius: 3px;
  transition: width 0.2s ease;
  position: relative;
}

.volume-fill::after {
  content: '';
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #007bff;
}

.volume-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: white;
  border: 2px solid #007bff;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.volume-bar:hover .volume-thumb {
  opacity: 1;
}

/* 播放列表 */
.playlist {
  margin-top: 16px;
}

.playlist h4 {
  margin: 0 0 16px 0;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
}

.track-list {
  max-height: 240px;
  overflow-y: auto;
  padding: 4px 12px 4px 0;
  margin: -4px -12px -4px 0;
  will-change: auto;
  transform: translateZ(0);
  scroll-behavior: auto;
  overscroll-behavior: contain;
}

.track-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  border: 1px solid transparent;
  contain: layout style paint;
  will-change: auto;
}

.track-item:first-child {
  margin-top: 2px;
}

.track-item:last-child {
  margin-bottom: 2px;
}

.track-item:hover {
  background: rgba(0, 123, 255, 0.05);
  border-color: rgba(0, 123, 255, 0.15);
}

.track-item.active {
  background: rgba(0, 123, 255, 0.08);
  border-color: rgba(0, 123, 255, 0.2);
}

.track-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #007bff;
  border-radius: 0 1px 1px 0;
}

.track-item-cover {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.track-item-info {
  flex: 1;
  min-width: 0;
}

.track-item-title {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.track-item-artist {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
  line-height: 1.2;
}

.track-duration {
  font-size: 12px;
  color: #999;
  font-weight: 500;
  min-width: 40px;
  text-align: right;
}

/* 暗色主题适配 */
.dark .music-player,
html.dark .music-player {
  background: rgba(24, 24, 27, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.1);
}

.dark .music-player.expanded,
html.dark .music-player.expanded {
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.3),
    0 8px 24px rgba(0, 0, 0, 0.2);
}

.dark .mini-title, .dark .player-header h3, .dark .track-title, .dark .track-item-title, .dark .playlist h4,
html.dark .mini-title, html.dark .player-header h3, html.dark .track-title, html.dark .track-item-title, html.dark .playlist h4 {
  color: #e4e4e7;
}

.dark .mini-artist, .dark .track-artist, .dark .track-item-artist,
html.dark .mini-artist, html.dark .track-artist, html.dark .track-item-artist {
  color: #a1a1aa;
}

.dark .current-track,
html.dark .current-track {
  background: rgba(39, 39, 42, 0.8);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark .mini-play-btn, .dark .expand-btn,
html.dark .mini-play-btn, html.dark .expand-btn {
  background: rgba(39, 39, 42, 0.8);
  color: #a1a1aa;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.dark .mini-play-btn:hover, .dark .expand-btn:hover,
html.dark .mini-play-btn:hover, html.dark .expand-btn:hover {
  background: #007bff;
  color: white;
}

.dark .control-btn:hover, .dark .close-btn:hover, .dark .volume-btn:hover,
html.dark .control-btn:hover, html.dark .close-btn:hover, html.dark .volume-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e4e4e7;
}

.dark .track-item:hover,
html.dark .track-item:hover {
  background: rgba(0, 123, 255, 0.08);
  border-color: rgba(0, 123, 255, 0.2);
}

.dark .track-item.active,
html.dark .track-item.active {
  background: rgba(0, 123, 255, 0.12);
  border-color: rgba(0, 123, 255, 0.3);
}

.dark .track-item.active::before,
html.dark .track-item.active::before {
  background: #3b82f6;
}

.dark .player-controls,
html.dark .player-controls {
  background: rgba(39, 39, 42, 0.5);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark .volume-btn:hover,
html.dark .volume-btn:hover {
  background: rgba(0, 123, 255, 0.15);
  color: #3b82f6;
}

.dark .volume-bar,
html.dark .volume-bar {
  background: rgba(255, 255, 255, 0.08);
}

.dark .progress-bar,
html.dark .progress-bar {
  background: rgba(255, 255, 255, 0.08);
}

.dark .track-list::-webkit-scrollbar-track,
html.dark .track-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.02);
}

.dark .track-list::-webkit-scrollbar-thumb,
html.dark .track-list::-webkit-scrollbar-thumb {
  background: rgba(0, 123, 255, 0.4);
}

.dark .track-list::-webkit-scrollbar-thumb:hover,
html.dark .track-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 123, 255, 0.6);
}

.dark .time,
html.dark .time {
  color: #a1a1aa;
}

.dark .track-duration,
html.dark .track-duration {
  color: #71717a;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .music-player {
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  
  .music-player.expanded {
    width: auto;
  }
  
  .full-player {
    width: auto;
    padding: 20px;
  }
  
  .mini-player {
    width: auto;
    padding: 14px 18px;
  }
  
  .mini-cover {
    width: 42px;
    height: 42px;
  }
  
  .mini-title {
    font-size: 15px;
  }
  
  .mini-artist {
    font-size: 13px;
  }
  
  .track-list {
    max-height: 200px;
    padding: 6px 10px 6px 0;
    margin: -6px -10px -6px 0;
  }
  
  .track-item {
    padding: 10px 12px;
    margin-bottom: 4px;
  }
  
  .track-item-cover {
    width: 36px;
    height: 36px;
  }
  
  .current-track {
    padding: 18px;
    gap: 16px;
  }
  
  .track-cover {
    width: 80px;
    height: 80px;
  }
  
  .volume-container {
    gap: 8px;
  }
  
  .volume-bar {
    min-width: 60px;
    max-width: 100px;
  }
  
  .player-controls {
    padding: 12px;
  }
}

.track-list::-webkit-scrollbar {
  width: 6px;
}

.track-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  margin: 4px 0;
  border: 1px solid rgba(0, 0, 0, 0.02);
}

.track-list::-webkit-scrollbar-thumb {
  background: rgba(0, 123, 255, 0.3);
  border-radius: 3px;
  transition: background 0.2s ease;
  border: 1px solid rgba(0, 123, 255, 0.1);
}

.track-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 123, 255, 0.5);
  border-color: rgba(0, 123, 255, 0.2);
}

.track-list {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 123, 255, 0.3) rgba(0, 0, 0, 0.04);
}
</style>