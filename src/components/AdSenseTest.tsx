
import React, { useEffect } from 'react';

const AdSenseTest = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense load error', error);
    }
  }, []);

  return (
    <div className="my-4">
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3899023431262335"
        data-ad-slot="1234567890"  // Replace with your actual ad slot
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseTest;
