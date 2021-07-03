//variables
let InputFileGiven = false;
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');


//Event listener to see if image is uploaded by user
inputElement.addEventListener('change', (e) => {
    console.log("Change")
    if (e.target.files[0]) {
        InputFileGiven = true
        console.log("Input file given")
        imgElement.src = URL.createObjectURL(e.target.files[0]);
    }

}, false);

//Custom upload button to trigger choose file default button
document.getElementById('buttonid').addEventListener('click', openDialog);

//trigger click to choose file button
function openDialog() {
    document.getElementById('fileInput').click();
}

//Function to resize the image
function ResizeImage() {
    if (InputFileGiven) {
        //take source image
        let SourceImage = cv.imread(imgElement);
        //output image
        let OutputImage = new cv.Mat();
        let height = parseInt(document.getElementById("height").value)
        let width = parseInt(document.getElementById("width").value)
            //resize parameters
        let ImageOutputSize = new cv.Size(width, height);
        //resize image
        cv.resize(SourceImage, OutputImage, ImageOutputSize, 0, 0, cv.INTER_AREA);
        cv.imshow('canvasOutput', OutputImage);
        //configure downloading elements
        let outputImgElement = document.getElementById('canvasOutput');
        let DownloadElement = document.getElementById('downloadButton')
        let GeneratedUrl = outputImgElement.toDataURL("image/png");
        //unhide download button
        DownloadElement.style.display = "block"
            //give coverted image name
        DownloadElement.setAttribute("download", "covertedImage-" + height + "-" + width);
        //set the downloading link
        DownloadElement.setAttribute("href", GeneratedUrl)
            //delete as the input and output image as resizing is done
        SourceImage.delete();
        OutputImage.delete()

    }


}

//to clear the loading message
function onOpenCvReady() {
    document.getElementById('status').innerHTML = '';
}