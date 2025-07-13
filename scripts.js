window.addEventListener("DOMContentLoaded", startCamera);

function startCamera() {
  const video = document.getElementById("camera");

  const constraints = {
    video: {
      facingMode: { ideal: "environment" } // cuba kamera belakang
    },
    audio: false
  };

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Kamera gagal dibuka:", error);
        alert("Gagal buka kamera: " + error.message);
      });
  } else {
    alert("Browser anda tidak menyokong kamera.");
  }
}
