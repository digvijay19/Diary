var images = fs.readdirSync("./public/images");
var imageCount = -1;
var currentImage = '1.jpg';
var nextImage;

function previousImage(){
	(imageCount == 0) && (imageCount = images.length-1) || (imageCount--)
	var src = document.getElementById("imageCanvas").src;
	document.getElementById("imageCanvas").src = src.replace(currentImage,images[imageCount]);
	currentImage = images[imageCount];
}
function nextImage(){
	if(imageCount == images.length-1)
		imageCount = 0;
	else
		imageCount++;
	var src = document.getElementById("imageCanvas").src;
	document.getElementById("imageCanvas").src = src.replace(currentImage,images[imageCount]);
	currentImage = images[imageCount];
}