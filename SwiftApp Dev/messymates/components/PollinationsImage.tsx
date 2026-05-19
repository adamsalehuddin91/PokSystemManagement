'use client'
import { useState } from 'react'

interface Props {
  src: string
  alt: string
  className?: string
  skeletonClassName?: string
}

export default function PollinationsImage({ src, alt, className = '', skeletonClassName = '' }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="relative w-full h-full">
      {!loaded && !error && (
        <div className={`absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse ${skeletonClassName}`} />
      )}
      {error && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300 text-xs">
          ✦
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}
