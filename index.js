document.addEventListener("DOMContentLoaded", () => {
  const bottomNav = document.getElementById("bottom-nav");
  if (!bottomNav) return;

  // Detect Apple or Android device
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isAndroid = /android/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

  if (isAndroid || isIOS) {
    // ✅ Show on mobile devices
    bottomNav.style.display = "flex";
    bottomNav.style.flexDirection = "row";
    bottomNav.style.justifyContent = "space-between";
    bottomNav.style.alignItems = "center"; // optional: centers vertically
  } else {
    // 🚫 Hide on PC and other devices
    bottomNav.style.display = "none";
  }
});
