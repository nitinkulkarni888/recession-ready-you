
import React, { useEffect, useRef } from 'react';

const AdSenseTest = () => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only attempt to load ads if the component is mounted and window.adsbygoogle exists
    if (adRef.current && window.adsbygoogle !== undefined) {
      try {
        // @ts-ignore - AdSense is not typed in TypeScript
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense load error', error);
      }
    }
  }, []);

  return (
    <div className="my-4 text-center">
      <div className="text-xs text-gray-500 mb-1">Advertisement</div>
      <div ref={adRef}>
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
