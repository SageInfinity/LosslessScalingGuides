import React, { useState, useMemo, useRef, useEffect } from 'react';
import './VideoPlayer.css';

interface VideoPlayerProps {
  url: string;
  title?: string;
  aspectRatio?: string;
  thumbnail?: string | null; 
  maxWidth?: string;
  className?: string;
  shadow?: boolean;
  borderRadius?: number;
  autoThumbnail?: boolean; 
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  url, 
  title = "Video Player",
  aspectRatio = "16/9",
  thumbnail = undefined,
  maxWidth = "100%",
  className = "",
  shadow = true,
  borderRadius = 12,
  autoThumbnail = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [gdriveError, setGdriveError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  
  const videoSource = useMemo(() => {
    try {
      setError(null);
      setGdriveError(false);
      
      
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
        
        if (!videoId) throw new Error("Invalid YouTube URL");
        
        
        if (autoThumbnail && !thumbnail) {
          setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
        }
        
        return {
          type: 'youtube',
          src: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
          id: videoId
        };
      }

      
      if (url.includes('drive.google.com')) {
        const patterns = [
          /\/file\/d\/([^\/]+)/,
          /\/d\/([^\/]+)/,
          /id=([^&]+)/,
          /folders\/([^\/]+)(?:\?.*)?$/
        ];
        
        let fileId: string | null = null;
        
        for (const pattern of patterns) {
          const match = url.match(pattern);
          if (match && match[1]) {
            fileId = match[1];
            break;
          }
        }
        
        if (!fileId) throw new Error("Couldn't extract Google Drive file ID");
        
        return {
          type: 'gdrive',
          src: `https://drive.google.com/file/d/${fileId}/preview`,
          id: fileId
        };
      }

      // Direct video
      if (url.match(/\.(mp4|webm|ogg|mov|mkv|avi)$/i)) {
        return {
          type: 'direct',
          src: url,
          id: null
        };
      }

      throw new Error("Unsupported video source");
    } catch (err) {
      setError(err.message || "Invalid video URL");
      return null;
    }
  }, [url, autoThumbnail, thumbnail]);

  useEffect(() => {
    if (!videoSource || videoSource.type !== 'gdrive') return;
    
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://drive.google.com') return;
      if (event.data?.type === 'embed-error') {
        setGdriveError(true);
        setError("Google Drive: Permission denied. Make sure the file is shared publicly.");
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [videoSource]);

  
  useEffect(() => {
    if (thumbnail !== undefined) {
      setThumbnailUrl(thumbnail);
    }
  }, [thumbnail]);


  const aspectRatioStyle = useMemo(() => {
    const [width, height] = aspectRatio.split('/').map(Number);
    return { paddingBottom: `${(height / width) * 100}%` };
  }, [aspectRatio]);

  const handlePlay = () => setIsPlaying(true);


  const containerStyle = {
    maxWidth,
    borderRadius: `${borderRadius}px`,
    boxShadow: shadow ? '0 6px 20px rgba(0, 0, 0, 0.15)' : 'none'
  };

  if (error) {
    return (
      <div 
        className={`video-container ${className}`}
        style={containerStyle}
      >
        <div className="video-error">
          <div>Video Error</div>
          <p>{error}</p>
          {videoSource?.type === 'gdrive' && (
            <div className="gdrive-help">
              <p>Google Drive requires:</p>
              <ol>
                <li>File must be shared publicly</li>
                <li>Right-click file → Share → General access → "Anyone with the link"</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`video-container ${className}`}
      ref={containerRef}
      style={containerStyle}
    >
      <div className="video-wrapper" style={aspectRatioStyle}>
        {!isPlaying && thumbnailUrl ? (
          <div className="video-thumbnail" onClick={handlePlay}>
            <img 
              src={thumbnailUrl} 
              alt={`${title} thumbnail`} 
              className="thumbnail-image"
              style={{ borderRadius: `${borderRadius}px` }}
              onError={() => setThumbnailUrl(null)}
            />
            <div className="play-button">
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            </div>
          </div>
        ) : videoSource ? (
          videoSource.type === 'youtube' || videoSource.type === 'gdrive' ? (
            <iframe
              ref={iframeRef}
              src={isPlaying ? videoSource.src : ''}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{ borderRadius: `${borderRadius}px` }}
              onError={() => {
                if (videoSource.type === 'gdrive') setGdriveError(true);
                setError("Failed to load video player");
              }}
            />
          ) : (
            <video 
              controls 
              autoPlay
              style={{ borderRadius: `${borderRadius}px` }}
            >
              <source src={videoSource.src} type={`video/${videoSource.src.split('.').pop()}`} />
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <div className="video-error">Invalid video source</div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
