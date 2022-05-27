let WIDTH, 
    HEIGHT,
    pixels = [];

const imageURL = "https://i.redd.it/kxov0rcoi4p21.png",
    SCALE = 0.5;

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

    log(imgData);

    for (let i = 0; i < data.length; i += 4) {
	pixels.push(new Pixel(data[i], data[i + 1], data[i + 2], data[i + 3]));
    }
    console.log(pixels);

    ani();
}

function ani() {
    //requestAnimationFrame(ani);
}

init();
