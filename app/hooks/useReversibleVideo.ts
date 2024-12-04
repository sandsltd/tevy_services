import { useEffect, useRef } from 'react';

export const useReversibleVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const overlayVideo = overlayVideoRef.current;
    if (!video || !overlayVideo) return;

    // Preload both videos
    video.load();
    overlayVideo.load();

    const handleEnded = () => {
      // Start overlay video slightly before main video ends
      overlayVideo.currentTime = 0;
      overlayVideo.style.opacity = '1';
      overlayVideo.play().then(() => {
        // Reset main video while overlay is playing
        video.currentTime = 0;
        video.play().then(() => {
          // Hide overlay once main video is ready
          overlayVideo.style.opacity = '0';
        });
      });
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

  return { videoRef, overlayVideoRef };
}; 