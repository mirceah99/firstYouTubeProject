const startCamButton = document.querySelector("#start-camera");
const stopCamButton = document.querySelector("#stop-camera");
const processFrameButton = document.querySelector("#process-frame");
let cameraPreview = document.querySelector("#video");
let canvas = document.querySelector("#canvas");
let canvas2 = document.querySelector("#canvas-2");
let stream = null;
let interval = null;

//open camera
startCamButton.addEventListener("click", async function () {
	// get media stream
	stream = await navigator.mediaDevices.getUserMedia({
		video: true,
		audio: false,
	});

	// get track
	cameraPreview.srcObject = stream;
	// interval = setInterval(processFrame.bind(this, canvas), 100);
});

//stop camera
stopCamButton.addEventListener("click", () => {
	stream.getTracks().forEach(function (track) {
		track.stop();
	});
	clearInterval(interval);
});

//form image to matrix

// function (canvas) {

//  }

function fromColorToBlackAndWhite(imageArray) {
	for (i = 0; i < imageArray.length; i += 4 /**R G B + alpha */) {
		const total = (imageArray[i] + imageArray[i + 1] + imageArray[i + 2]) / 3;
		imageArray[i] = total;
		imageArray[i + 1] = total;
		imageArray[i + 2] = total;
	}
}

processFrameButton.addEventListener("click", processFrame.bind(this, canvas));

function processFrame(canvas) {
	console.log("start interval");
	canvas
		.getContext("2d")
		.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
	const img = canvas
		.getContext("2d")
		.getImageData(0, 0, canvas.width, canvas.height);

	fromColorToBlackAndWhite(img.data);
	applyVerticalEdgeDetection(img.data, canvas.width, canvas.height);
	canvas.getContext("2d").putImageData(img, 0, 0);
	// canvas.getContext("2d").putImageData(img, 0, 0);
}

function applyVerticalEdgeDetection(blackWhiteImageArray, width, height) {
	console.log("height", height);
	console.log("width", width);
	console.log(
		"total",
		height * width * 4,
		"length",
		blackWhiteImageArray.length
	);

	const position = (50 * width + 50) * 4;
	console.log(
		`blackWhiteImageArray[${position}]`,
		blackWhiteImageArray[position]
	);
	window.blackWhiteImageArray = [...blackWhiteImageArray];
	const result = new Array(width).fill([]);
	/* vertical filter
		-1	0	1
		-2	0	2
		-1	0	1
	*/

	for (i = 1; i < width - 1; i++) {
		for (j = 1; j < height - 1; j++) {
			const leftUpperCorner =
				blackWhiteImageArray[((j - 1) * width + (i - 1)) * 4];
			const leftMiddle = blackWhiteImageArray[(j * width + (i - 1)) * 4];
			const leftDown = blackWhiteImageArray[((j + 1) * width + (i - 1)) * 4];
			const rightUpperCorner =
				blackWhiteImageArray[((j - 1) * width + (i + 1)) * 4];
			const rightMiddle = blackWhiteImageArray[(j * width + (i + 1)) * 4];
			const rightDown = blackWhiteImageArray[((j + 1) * width + (i + 1)) * 4];
			result[i][j] =
				(-leftUpperCorner -
					2 * leftMiddle -
					leftDown +
					rightUpperCorner +
					2 * rightMiddle +
					rightDown +
					255 * 4) /
				8;

			if (j === 120 && i === 120) {
				console.log("leftUpperCorner", leftUpperCorner);
				console.log("leftMiddle", leftMiddle);
				console.log("leftDown", leftDown);
				console.log("rightUpperCorner", rightUpperCorner);
				console.log("rightMiddle", rightMiddle);
				console.log("rightDown", rightDown);

				console.log(`result[${i}][${j}]`, result[i][j]);
				// console.log(blackWhiteImageArray[i * j]);
			}
		}
	}

	// console.log(result);
	/* write the response */
	// for (i = 1; i < width - 1; i++) {
	// 	for (j = 1; j < height - 1; j++) {
	// 		const position = (j * width + i) * 4;
	// 		blackWhiteImageArray[position] = result[i][j];
	// 		blackWhiteImageArray[position + 1] = result[i][j];
	// 		blackWhiteImageArray[position + 2] = result[i][j];
	// 	}
	// }
}

handTrack;
