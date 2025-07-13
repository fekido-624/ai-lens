let currentStream = null;

const video     = document.getElementById('camera');
const frontBtn  = document.getElementById('frontBtn');
const rearBtn   = document.getElementById('rearBtn');

frontBtn.addEventListener('click', () => startCamera('user'));
rearBtn .addEventListener('click', () => startCamera('environment'));

function startCamera(facingMode = 'environment') {

  // Hentikan stream lama jika ada
  if (currentStream) {
    currentStream.getTracks().forEach(t => t.stop());
  }

  const constraints = {
    audio: false,
    video: {facingMode: {ideal: facingMode}}
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
    })
    .catch(err => {
      console.error('Gagal buka kamera:', err);
      alert('Tak dapat akses kamera: ' + err.message);
    });
}
