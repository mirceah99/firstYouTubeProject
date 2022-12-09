var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const handTrackPrams = {
    maxNumBoxes: 2,
    scoreThreshold: 0.7,
};
const model = 
// i will promisify this function to be easier to work with
new Promise((resolve, reject) => {
    handTrack
        .load(handTrackPrams)
        .then((loadedModel) => {
        var _a;
        // remove spinner
        (_a = document.querySelector("#spinner")) === null || _a === void 0 ? void 0 : _a.remove();
        resolve(loadedModel);
    })
        .catch((err) => {
        reject(err);
    });
});
export function getCoordinatesFromVideoHandTrack(video) {
    return __awaiter(this, void 0, void 0, function* () {
        const loadedModel = yield model;
        return yield loadedModel.detect(video);
    });
}
export function renderPredictions(inputVideo, canvas, context, video) {
    return __awaiter(this, void 0, void 0, function* () {
        const predictions = yield getCoordinatesFromVideoHandTrack(inputVideo);
        const loadedModel = yield model;
        loadedModel.renderPredictions(predictions, canvas, context, video);
    });
}
