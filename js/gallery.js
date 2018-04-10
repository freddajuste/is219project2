// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
function GalleryImage(location, description, date, url) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.location = new location;
	this.description = new description;
	this.date = new date;
	this.url = new url;
}
function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	if (mCurrentIndex < mImages.length){
		$('#photo').attr('src', mImages[mCurrentIndex].url);
		$('p.location').text("Location: " + mImages[mCurrentIndex].location);
		$('p.description').text("Description: " + mImages[mCurrentIndex].description);
		$('p.date').text("Date: " + mImages[mCurrentIndex].date);
		mCurrentIndex = mCurrentIndex + 1;
	}else{
		mCurrentIndex = 0;
	}
	//
	console.log('swap photo');
	
}
// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson = "";

var mURL = "images.json";
var $_GET = getQueryParams(document.location.search);

	if($_GET["json"] === undefined){
		console.log("No extra Json");
	}else{
	
	mUrl = $_GET["json"];
	}
mRequest.onreadystatechange = function() {
      if (mRequest.readyState == 4 && mRequest.status == 200) {
          try {
               	// Let’s try and see if we can parse JSON
		mJson = JSON.parse(mRequest.responseText);
		
		} catch(err) {
		console.log("this is the error" + err.message)
		}
	}
};
mRequest.open("GET",mURL, true);

mRequest.send();





// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';
var $_GET = getQueryParams(document.location.search);

	if($_GET["json"] === undefined){
		console.log("No extra Json");
	}else{
	
	mUrl = $_GET["json"];
	}


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

	$('.moreIndicator').click(function(){
		//alert("hola");
		if($( this ).hasClass('rot90')){
			$( this ).removeClass('rot90');
			$( this ).addClass('rot270');
			$('.details').eq(0).show();	
		}else{
			$( this ).removeClass('rot270');
			$( this ).addClass('rot90');
			$('.details').eq(0).hide();	
		}

	});

	$('#nextPhoto').click(function(){
		
		mLastFrameTime = new Date().getTime();
		mCurrentIndex = mCurrentIndex + 1;
		//alert("testing");
		if (mCurrentIndex < mImages.length){
		
		$('#photo').attr('src', mImages[mCurrentIndex].url);
		$('p.location').text("Location: " + mImages[mCurrentIndex].location);
		$('p.description').text("Description: " + mImages[mCurrentIndex].description);
		$('p.date').text("Date: " + mImages[mCurrentIndex].date);
		
		}else{
		mCurrentIndex = 0;
		$('#photo').attr('src', mImages[mCurrentIndex].url);
		$('p.location').text("Location: " + mImages[mCurrentIndex].location);
		$('p.description').text("Description: " + mImages[mCurrentIndex].description);
		$('p.date').text("Date: " + mImages[mCurrentIndex].date);
		}
		


	});

	$('#prevPhoto').click(function(){
		mLastFrameTime = new Date().getTime();
		mCurrentIndex = mCurrentIndex - 1;
		//alert("testing");
		if (mCurrentIndex >= 0 ){
			;
			$('#photo').attr('src', mImages[mCurrentIndex].url);
			$('p.location').text("Location: " + mImages[mCurrentIndex].location);
			$('p.description').text("Description: " + mImages[mCurrentIndex].description);
			$('p.date').text("Date: " + mImages[mCurrentIndex].date);

		
		}else{
			mCurrentIndex = mImages.length - 1;
			$('#photo').attr('src', mImages[mCurrentIndex].url);
			$('p.location').text("Location: " + mImages[mCurrentIndex].location);
			$('p.description').text("Description: " + mImages[mCurrentIndex].description);
			$('p.date').text("Date: " + mImages[mCurrentIndex].date);
		}
		

	});
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');
	
	if(mJson.images == undefined){
		alert("The JSON file is invalid,  Default Gallery will play");
		window.location.href = "index.html?json=images.json" ;
	}
	mJson.images.forEach( function (image)
		{
			mImages.push(new GalleryImage(image.imgLocation, image.description, image.date, image.imgPath));
		});

}, false);


function getQueryParams(qs) {
 qs = qs.split("+").join(" ");
 var params = {},
 tokens,
 re = /[?&]?([^=]+)=([^&]*)/g;
 while (tokens = re.exec(qs)) {
 params[decodeURIComponent(tokens[1])]
 = decodeURIComponent(tokens[2]);
 }
 return params;
}