
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera as CameraIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CameraAnimation = () => {
  const cameraRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const camera = cameraRef.current;
    const container = containerRef.current;

    if (!camera || !container) return;

    // Initial camera setup
    gsap.set(camera, {
      scale: 1,
      opacity: 1,
      position: 'fixed',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      zIndex: 20,
    });

    // Animation for camera zoom effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
        pinSpacing: true,
      }
    });

    tl.to(camera, {
      scale: 15,
      opacity: 0,
      duration: 3,
      ease: 'power2.inOut',
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen relative overflow-hidden bg-navy">
      <div ref={cameraRef} className="camera-container">
        <div className="camera-body w-60 h-40 bg-black rounded-lg relative shadow-xl flex flex-col items-center justify-center">
          {/* Camera lens */}
          <div className="camera-lens w-28 h-28 bg-navy-light rounded-full border-8 border-gray-700 relative flex items-center justify-center">
            <div className="inner-lens w-16 h-16 bg-black rounded-full border-2 border-gold">
              <div className="lens-reflection absolute w-4 h-4 bg-white rounded-full opacity-50 top-2 right-2"></div>
            </div>
          </div>
          
          {/* Camera details */}
          <div className="camera-details absolute top-3 right-3 flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-6 h-2 rounded-sm bg-gray-700"></div>
          </div>
          
          {/* Camera grip */}
          <div className="camera-grip absolute -right-4 top-1/4 w-4 h-16 bg-gray-800 rounded-r-lg"></div>
          
          {/* Camera brand */}
          <div className="absolute top-3 left-3 text-xs text-gold font-bold">PixelPro</div>
          
          {/* Camera flash */}
          <div className="camera-flash absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-300 rounded-sm"></div>
        </div>
      </div>

      {/* Content that appears after the animation */}
      <div className="content-after-camera opacity-0 pointer-events-none">
        <h2 className="text-2xl text-white text-center">Scroll to explore</h2>
      </div>
    </div>
  );
};

export default CameraAnimation;
