let model, webcam, labelContainer, maxPredictions;
let currentStream = null;

// Inisialisasi Teachable Machine
async function initTM() {
    const URL = "./model/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.createElement("div");
    labelContainer.setAttribute("id", "labelContainer");
    document.body.appendChild(labelContainer);
}

// Mula kamera + pengecaman live
async function startCamera(facingMode = "environment") {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        video: { facingMode: { ideal: facingMode } },
        audio: false
    };

    try {
        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.getElementById("camera");
        video.srcObject = currentStream;

        video.onloadedmetadata = async () => {
            video.play();
            await initTM();
            loopDetection();
        };
    } catch (err) {
        alert("Kamera gagal dibuka: " + err.message);
    }
}

// Loop detection setiap 500ms
function loopDetection() {
    setInterval(async () => {
        if (!model) return;

        const video = document.getElementById("camera");
        const prediction = await model.predict(video);

        labelContainer.innerHTML = ""; // clear sebelum update

        prediction.forEach(pred => {
            if (pred.probability > 0.8) {
                const label = `${pred.className} (${(pred.probability * 100).toFixed(1)}%)`;
                labelContainer.innerHTML += `<div style="color:white;font-size:20px">${label}</div>`;
            }
        });
    }, 500);
}

// Mula auto kamera belakang bila page load
window.addEventListener("DOMContentLoaded", () => {
    startCamera("environment");
});
