import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const CookieBanner: React.FC = () => {
  const GA_MEASUREMENT_ID = "G-5ZW5WVLK7T"; // <-- replace with your GA ID
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    } else if (consent === "accepted") {
      loadGtag();
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    document.cookie = `cookie_consent=accepted; path=/; max-age=${60 * 60 * 24 * 365}`;
    loadGtag();
    setShow(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "rejected");
    document.cookie = `cookie_consent=rejected; path=/; max-age=${60 * 60 * 24 * 365}`;
    clearGACookies();
    setShow(false);
  };

  const dismissBanner = () => {
    // just hide banner without saving preference
    setShow(false);
  };

  const loadGtag = () => {
    if (window.gtag) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
    `;
    document.head.appendChild(inlineScript);
  };

  const clearGACookies = () => {
    const cookies = ["_ga", "_gid", "_gat", "_gcl_au"];
    cookies.forEach((name) => {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    });

    if (window.gtag) {
      try {
        // console.log("upding consent");
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
        });
      } catch (e) {
        console.warn("Error updating gtag consent", e);
      }
      delete window.gtag;
    }
  };

  if (!show) return null;

  return (
    <div style={styles.banner}>
      <div style={styles.content} className="cookie_banner">
        <p style={styles.text} className="banner_text">
          By clicking <strong>“Accept All Cookies”</strong>, you agree to the storing of cookies on your
          device to enhance navigation, analyze usage, and assist in marketing efforts.
        </p>
        <div style={styles.buttons} className="banner_btns">
          <button style={styles.reject} onClick={rejectCookies}>
            Reject All
          </button>
          <button style={styles.accept} onClick={acceptCookies}>
            Accept All Cookies
          </button>
          <button style={styles.closeBtn} onClick={dismissBanner}>
          ✕
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default CookieBanner;

const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffffff",
    color: "#000000ff",
    padding: "16px 24px",
    zIndex: 10000,
    boxShadow: "0 -2px 10px rgba(0,0,0,0.15)",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    position: "relative",
  },
  text: {
    flex: 1,
    fontSize: "14px",
    lineHeight: "1.5",
    margin: 0,
  },
  buttons: {
    display: "flex",
    gap: "10px",
    flexShrink: 0,
  },
  settings: {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  reject: {
    backgroundColor: "#ff6700",
    color: "#ffffffff",
    border: "1px solid #fff",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
  },
  accept: {
    backgroundColor: "#ff6700",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#000000ff",
    fontSize: "18px",
    cursor: "pointer",
    padding: "8px 12px",
    fontWeight: 900,
  },
};
