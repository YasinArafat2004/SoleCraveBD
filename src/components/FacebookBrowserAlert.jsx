import { useState, useEffect } from 'react';

const FacebookBrowserAlert = () => {
  const [isFacebookBrowser, setIsFacebookBrowser] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Check if the user agent indicates it's a Facebook or Instagram in-app browser
    if (/FBAN|FBAV|Instagram/.test(userAgent)) {
      setIsFacebookBrowser(true);
    }
  }, []);

  if (!isFacebookBrowser) {
    return null;
  }

  return (
    <div className="fb-browser-alert">
      <p>
        For the best experience, please tap the <strong>「...」</strong> menu at the top right and select <strong>"Open in Browser"</strong>.
      </p>
      <button onClick={() => setIsFacebookBrowser(false)} className="fb-alert-close">
        Dismiss
      </button>
    </div>
  );
};

export default FacebookBrowserAlert;