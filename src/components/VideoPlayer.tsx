import React, { useRef, useEffect, useState, useCallback } from "react";
import { Icon } from "@iconify/react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  fallbackContent?: React.ReactNode;
}

interface VideoCache {
  [key: string]: {
    blob: Blob;
    timestamp: number;
    url: string;
  };
}

class VideoCacheManager {
  private static instance: VideoCacheManager;
  private cache: VideoCache = {};
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000;
  private readonly MAX_CACHE_SIZE = 50;

  static getInstance(): VideoCacheManager {
    if (!VideoCacheManager.instance) {
      VideoCacheManager.instance = new VideoCacheManager();
    }
    return VideoCacheManager.instance;
  }

  async getCachedVideo(src: string): Promise<string | null> {
    const cached = this.cache[src];
    if (cached) {
      if (Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.url;
      } else {
        this.removeCachedVideo(src);
      }
    }
    return null;
  }

  async cacheVideo(src: string): Promise<string> {
    try {
      const cached = await this.getCachedVideo(src);
      if (cached) return cached;

      const response = await fetch(src);
      if (!response.ok)
        throw new Error(`Failed to fetch video: ${response.statusText}`);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (Object.keys(this.cache).length >= this.MAX_CACHE_SIZE) {
        this.cleanupOldestCache();
      }

      this.cache[src] = {
        blob,
        timestamp: Date.now(),
        url,
      };

      return url;
    } catch (error) {
      console.warn("Failed to cache video:", error);
      return src;
    }
  }

  private removeCachedVideo(src: string): void {
    const cached = this.cache[src];
    if (cached) {
      URL.revokeObjectURL(cached.url);
      delete this.cache[src];
    }
  }

  private cleanupOldestCache(): void {
    const entries = Object.entries(this.cache);
    entries.sort(([, a], [, b]) => a.timestamp - b.timestamp);

    const toRemove = Math.ceil(entries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      this.removeCachedVideo(entries[i][0]);
    }
  }

  cleanup(): void {
    Object.keys(this.cache).forEach((src) => {
      this.removeCachedVideo(src);
    });
  }
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className = "",
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = false,
  controls = false,
  preload = "none",
  fallbackContent,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [cachedSrc, setCachedSrc] = useState<string>(src);
  const [isInView, setIsInView] = useState(false);

  const cacheManager = VideoCacheManager.getInstance();

  useEffect(() => {
    const cacheVideo = async () => {
      try {
        const cached = await cacheManager.cacheVideo(src);
        setCachedSrc(cached);
      } catch (error) {
        console.warn("Video caching failed, using original source:", error);
        setCachedSrc(src);
      }
    };

    cacheVideo();
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: "50px",
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;

    const attemptPlay = async () => {
      if (isInView && !isPlaying) {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented:", error);
        }
      } else if (!isInView && isPlaying) {
        video.pause();
        setIsPlaying(false);
      }
    };

    attemptPlay();
  }, [isInView, autoPlay, isPlaying]);

  const handleError = useCallback(() => {
    setHasError(true);
    console.error("Video loading error");
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
      }
    };
  }, []);

  if (hasError && fallbackContent) {
    return <>{fallbackContent}</>;
  }

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={cachedSrc}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        preload={preload}
        onError={handleError}
        onPlay={handlePlay}
        className="w-full h-full lg:min-w-xl object-cover"
        style={{ backgroundColor: "#e8d8ba" }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 w-full flex items-center justify-center h-full bg-cherry-cream">
          <div className="text-center">
            <Icon
              icon="ph:warning"
              className="text-gray-400 mx-auto mb-2"
              width={48}
              height={48}
            />
            <p className="text-gray-600 winky-sans-font">
              Failed to load video
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
