window.addEventListener("DOMContentLoaded", startCamera);

function startCamera() {
  const video = document.getElementById('camera');

  const constraints = {
    video: {
      facingMode: { exact: "environment" } // guna kamera belakang
    }
  };

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(error => {
        console.error("Kamera gagal dibuka:", error);
        alert("Kamera gagal dibuka: " + error.message);
      });
  } else {
    alert("Browser anda tidak menyokong kamera.");
  }
}
