declare var handTrack: any;
const handTrackPrams = {
	maxNumBoxes: 2,
	scoreThreshold: 0.7,
};

const model: Promise<{
	detect: (video: HTMLVideoElement) => {};
	renderPredictions: (
		predictions: any,
		canvas: HTMLCanvasElement,
		context: CanvasRenderingContext2D,
		video: HTMLVideoElement
	) => {};
}> =
	// i will promisify this function to be easier to work with
	new Promise((resolve, reject) => {
		handTrack
			.load(handTrackPrams)
			.then((loadedModel: any) => {
				// remove spinner
				document.querySelector("#spinner")?.remove();
				resolve(loadedModel);
			})
			.catch((err: any) => {
				reject(err);
			});
	});

export async function getCoordinatesFromVideoHandTrack(
	video: HTMLVideoElement
) {
	const loadedModel = await model;
	return await loadedModel.detect(video);
}

export async function renderPredictions(
	inputVideo: HTMLVideoElement,
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D,
	video: HTMLVideoElement
) {
	const predictions = await getCoordinatesFromVideoHandTrack(inputVideo);
	const loadedModel = await model;
	loadedModel.renderPredictions(predictions, canvas, context, video);
}
