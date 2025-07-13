let model, maxPredictions, currentStream = null;

// Load model once video dimulakan
async function initModel() {
  const modelURL = "https://teachablemachine.withgoogle.com/models/xDrwhZRqN/model.json";
  const metadataURL = "https://teachablemachine.withgoogle.com/models/xDrwhZRqN/metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  console.log("Model berjaya dimuat.");
  loopPrediction();
}

function loopPrediction() {
  const video = document.getElementById("camera");

  setInterval(async () => {
    if (!model || !video) return;
    const prediction = await model.predict(video);
    let result = "";

    prediction.forEach(pred => {
      if (pred.probability > 0.8 && pred.className !== "Empty") {
        result += `${pred.className} (${(pred.probability * 100).toFixed(1)}%)<br>`;
      }
    });

    const label = document.getElementById("labelContainer");
    label.innerHTML = result || "Mengesan...";
  }, 500);
}

async function startCamera(facingMode = "environment") {
  const video = document.getElementById("camera");

  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: { facingMode: { ideal: facingMode } },
    audio: false
  };

  try {
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = currentStream;

    video.onloadedmetadata = () => {
      video.play();
      initModel(); // model dimuat selepas video ready
    };
  } catch (err) {
    console.error("Gagal buka kamera:", err);
    alert("Kamera gagal dibuka: " + err.message);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  startCamera("environment");
});
