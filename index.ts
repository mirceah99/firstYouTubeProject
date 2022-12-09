import { startCamera, closeCamera } from "./camera.js";
import {
	getCoordinatesFromVideoHandTrack,
	renderPredictions,
} from "./detectPosition.js";
const qSel = document.querySelector.bind(document);

// get HTMLElements
const startCamButton = qSel("#start-camera") as HTMLButtonElement;
const stopCamButton = qSel("#stop-camera") as HTMLButtonElement;
const coordFromVideo = qSel("#coord-video-handtrackjs") as HTMLButtonElement;
const startDetectionButton = qSel("#start-detection") as HTMLButtonElement;
const stopDetectionButton = qSel("#stop-detection") as HTMLButtonElement;
const cameraPreview = qSel("#camera-preview") as HTMLVideoElement;
const handTjsDetectionsCanvas = qSel("#handTjs-detection") as HTMLCanvasElement;
const processFrameButton = qSel("#process-frame");
let interval: number;
let stream: MediaStream;

// handle clicks
startCamButton.addEventListener("click", async () => {
	stream = await startCamera(cameraPreview);
});
stopCamButton.addEventListener("click", () => {
	if (stream) closeCamera(stream);
});
coordFromVideo.addEventListener("click", async () => {
	renderPredictions(
		cameraPreview,
		handTjsDetectionsCanvas,
		handTjsDetectionsCanvas.getContext("2d")!,
		cameraPreview
	);
});

startDetectionButton.addEventListener("click", () => {
	interval = setInterval(() => {
		coordFromVideo.click();
	}, 100);
});
stopDetectionButton.addEventListener("click", () => {
	clearInterval(interval);
});
