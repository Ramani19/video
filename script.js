const canvas = document.getElementById('myCanvas');
const video = document.getElementById('myVideo');
const ctx = canvas.getContext('2d');

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function setCanvasSize() {
    if (isMobile()) {
        canvas.width = 600;
        canvas.height = 1200;
    } else {
        canvas.width = 1280;
        canvas.height = 720;
    }
}

function drawVideo() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isMobile()) {
        // Mobile version
        const scale = 900 / video.videoHeight;
        const scaledWidth = video.videoWidth * scale;
        const xPosition = (canvas.width - scaledWidth) / 2;
        const yPosition = (canvas.height - 900) / 2;

        ctx.drawImage(video, xPosition, yPosition, scaledWidth, 900);
    } else {
        // Desktop version
        ctx.drawImage(video, 0, 0, 480, 640);
    }

    // Request the next animation frame
    requestAnimationFrame(drawVideo);
}

// Set initial canvas size
setCanvasSize();

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

// Start the drawing loop when the video is ready
video.addEventListener('loadedmetadata', () => {
    drawVideo();
});

// Adjust canvas size if window is resized
window.addEventListener('resize', setCanvasSize);