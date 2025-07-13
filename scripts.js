function startCamera() {
  const video = document.getElementById('camera');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
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
