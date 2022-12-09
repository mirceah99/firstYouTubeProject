var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function startCamera(cameraPreview) {
    return __awaiter(this, void 0, void 0, function* () {
        // get media stream
        const stream = yield navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });
        if (cameraPreview)
            cameraPreview.srcObject = stream;
        return stream;
    });
}
export function closeCamera(stream) {
    if (stream)
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
}
