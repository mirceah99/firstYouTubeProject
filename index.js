var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { startCamera, closeCamera } from "./camera.js";
import { renderPredictions, } from "./detectPosition.js";
const qSel = document.querySelector.bind(document);
// get HTMLElements
const startCamButton = qSel("#start-camera");
const stopCamButton = qSel("#stop-camera");
const coordFromVideo = qSel("#coord-video-handtrackjs");
const startDetectionButton = qSel("#start-detection");
const stopDetectionButton = qSel("#stop-detection");
const cameraPreview = qSel("#camera-preview");
const handTjsDetectionsCanvas = qSel("#handTjs-detection");
const processFrameButton = qSel("#process-frame");
let interval;
let stream;
// handle clicks
startCamButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    stream = yield startCamera(cameraPreview);
}));
stopCamButton.addEventListener("click", () => {
    if (stream)
        closeCamera(stream);
});
coordFromVideo.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    renderPredictions(cameraPreview, handTjsDetectionsCanvas, handTjsDetectionsCanvas.getContext("2d"), cameraPreview);
}));
startDetectionButton.addEventListener("click", () => {
    interval = setInterval(() => {
        coordFromVideo.click();
    }, 100);
});
stopDetectionButton.addEventListener("click", () => {
    clearInterval(interval);
});
