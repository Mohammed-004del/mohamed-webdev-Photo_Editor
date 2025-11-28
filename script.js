let Saturate = document.getElementById("Saturate_input");
let Contrast = document.getElementById("Contrast_input");
let Brightness = document.getElementById("Brightness_input");
let Sepia = document.getElementById("Sepia_input");
let Grayscale = document.getElementById("Grayscale_input");
let Blur = document.getElementById("Blur_input");
let Hue_Rotate = document.getElementById("Hue_Rotate_input");
let Reset = document.getElementById("Reset_btn");
let Download = document.getElementById("Download_btn");
let image = document.getElementsByClassName("image")[0];
let img = document.getElementById("img");  
let upload = document.getElementById("upload");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');


function resetvalue(){
    ctx.filter = 'none';
    Saturate.value = '100';
    Contrast.value = '100';
    Brightness.value = '100';
    Sepia.value = '0';
    Grayscale.value = '0';
    Blur.value = '0';
    Hue_Rotate.value = '0';
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}

window.onload = function(){
    Reset.style.display = 'none';
    Download.style.display = 'none';
    image.style.display = 'none';
}

upload.onchange = function(){
    resetvalue();
    Reset.style.display = 'block';
    Download.style.display = 'block';
    image.style.display = 'block';

    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
        img.src = file.result;
    }
    img.onload = function(){
        canvas.width = img.width;  
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = 'none';
    }
}

let filters = document.querySelectorAll(".inputs input");
for(let i = 0 ; i < filters.length ; i++){
    filters[i].addEventListener('input' , function(){
        ctx.filter = `
            saturate(${Saturate.value}%)
            contrast(${Contrast.value}%)
            brightness(${Brightness.value}%)
            sepia(${Sepia.value}%)
            grayscale(${Grayscale.value})
            blur(${Blur.value}px)
            hue-rotate(${Hue_Rotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
}


Download.onclick = function(){
    Download.href = canvas.toDataURL("image/png");
}