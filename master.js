let WIDTH, 
	HEIGHT,
	pixels = [],
	particles = [];

const imageURL = "https://i.redd.it/kxov0rcoi4p21.png",
	N = 10,
	SCALE = 1;

const canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");


const requestAnimationFrame =
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;

let img = new Image();
img.src = imageURL;
img.setAttribute("crossOrigin", "");
img.onload = e => init(e);

function init(e) {
	const { naturalHeight, naturalWidth } = e.path[0];

	WIDTH = naturalWidth;
	HEIGHT = naturalHeight;

	canvas.setAttribute("width", WIDTH * SCALE);
	canvas.setAttribute("height", HEIGHT * SCALE);

	ctx.drawImage(img, 0, 0, WIDTH * SCALE, HEIGHT * SCALE);

	let imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
	let data = imgData.data;

	for (let i = 0; i < data.length; i += 4) {
		// Add pixels in grey scale
		const pixel = new Pixel(data[i], data[i + 1], data[i + 2], data[i + 3]); 
		const luminance = pixel.luminance();
		pixel.update({
			r: luminance,
			g: luminance,
			b: luminance
		});
		pixels.push(pixel);
	}
	console.log(pixels);

	const newData = ctx.createImageData(imgData.width, imgData.height);

	let pixelIdx = 0;
	for (let i = 0; i < newData.data.length; i+= 4) {
		const {r, g, b, a} = pixels[pixelIdx].getData();
		newData.data[i] = r;
		newData.data[i + 1] = g;
		newData.data[i + 2] = b;
		newData.data[i + 3] = a;
		pixelIdx++;
	}

	for (let i = 0; i < N; i++) {
		const pos = new Vector(0, 0);
		const part = new Particle({pos});
		particles.push(part);
	}
	console.log(particles);

	ctx.putImageData(newData, 0, 0);

	ani();
}

function ani() {
	//requestAnimationFrame(ani);
}
