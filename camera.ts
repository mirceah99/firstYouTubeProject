export async function startCamera(cameraPreview?: HTMLVideoElement) {
	// get media stream
	const stream = await navigator.mediaDevices.getUserMedia({
		video: true,
		audio: false,
	});
	if (cameraPreview) cameraPreview.srcObject = stream;
	return stream;
}

export function closeCamera(stream: MediaStream) {
	if (stream)
		stream.getTracks().forEach(function (track) {
			track.stop();
		});
}
