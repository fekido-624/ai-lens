let currentStream = null;

function startCamera(facingMode = "environment") {
  const video = document.getElementById("camera");

  // Hentikan stream sebelumnya (kalau ada)
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: {
      facingMode: { ideal: facingMode }
    },
    audio: false
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      currentStream = stream;
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Kamera gagal dibuka:", error);
      alert("Gagal buka kamera: " + error.message);
    });
}
