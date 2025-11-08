document.addEventListener("DOMContentLoaded", () => {
  const bottomNav = document.querySelector(".bottom-nav");
  if (!bottomNav) return;

  // Detect Apple or Android device using user agent
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isAndroid = /android/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

  if (isAndroid || isIOS) {
    // Show on mobile devices
    bottomNav.style.display = "block";
  } else {
    // Hide on PCs or other devices
    bottomNav.style.display = "none";
  }
});
