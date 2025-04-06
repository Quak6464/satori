'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'
import { images } from '@/app/assets/images'
import { audio } from '@/app/assets/audio'

export default function ProfilePage() {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
    // Initialize audio
    if (!audioRef.current) {
      audioRef.current = new Audio(audio.background)
      audioRef.current.loop = true
    }

    // Play/pause based on mute state
    if (!isMuted) {
      audioRef.current.play().catch(console.error)
    } else if (audioRef.current) {
      audioRef.current.pause()
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [isMuted])

  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${images.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Snow Effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              '--size': `${Math.random() * 5 + 2}px`,
              '--left': `${Math.random() * 100}%`,
              '--delay': `-${Math.random() * 10}s`,
              '--duration': `${Math.random() * 3 + 7}s`,
            } as any}
          />
        ))}
      </div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Audio Control */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 left-4 w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center z-20 hover:bg-zinc-800/70 transition-colors"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 mb-8">
          <Image
            src={images.profile}
            alt="Profile"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">bilota.x</h1>

        {/* Welcome Message */}
        <p className="text-center text-xl max-w-2xl mb-12">
          Welcome to my little corner of the world, where every moment feels like a warm hug. 
          Stay, vibe, and let the good energy flow.
        </p>

        {/* Status Card */}
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 mb-12">
          <Image
            src={images.avatar}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h2 className="font-semibold">bilota.x</h2>
            <p className="text-zinc-400">last seen 1 day ago</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          <a href="#" className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
            <Image src="/placeholder.svg" alt="Instagram" width={24} height={24} />
          </a>
          <a href="#" className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
            <Image src="/placeholder.svg" alt="Discord" width={24} height={24} />
          </a>
          <a href="#" className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
            <Image src="/placeholder.svg" alt="YouTube" width={24} height={24} />
          </a>
          <a href="#" className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  )
}

