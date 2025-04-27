
import React, { useEffect, useRef } from 'react';

// Add type declaration for the adsbygoogle property on Window
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseTest = () => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only attempt to load ads if the component is mounted and window.adsbygoogle exists
    try {
      if (adRef.current && typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense load error', error);
    }
  }, []);

  return (
    <div className="my-6 text-center relative">
      <div className="text-xs text-gray-500 mb-1">Advertisement</div>
      <div ref={adRef} className="min-height-ad">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3899023431262335"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default AdSenseTest;
