


//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
////MASUKKAN API KE SINI 👇👇👇👇👇//
const apiKey = "mkccoxpbSeR7g3YJHEJqapWi";
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////


const hasilInput = document.querySelector("#hasilInput");
const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const result = document.getElementById("result");
const content = document.querySelector(".content");
const label = document.querySelector(".label");
const loaderRemove = document.querySelector(".loader-remove");
const arrowRight = document.querySelector(".fa-arrow-right");
const arrowDown = document.querySelector(".fa-arrow-down");
const loader = document.querySelector(".container-loader");
const btnRemove = document.querySelector('.btnRemove');
const labelDownload = document.querySelector('.labelDownload');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.files.length) {
    console.error("Error: No image selected");
    return;
  }
  const formData = new FormData();
  formData.append("image_file", input.files[0]);
  button.disabled = true;
  loader.style.display = "flex";
  loaderRemove.style.display = "block";
  arrowRight.style.display = "none";
  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "post",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  })
    .then((res) => res.blob())
    .then((data) => {
      /////SETELAH BERhasilInput MENGHAPUS BACKGROUND 
      btnRemove.style.width = "auto"
      btnRemove.style.padding = "0 5px"
      btnRemove.style.borderRadius = '8px';
      labelDownload.style.display = "block";
      btnRemove.onclick = downloadResultImage;
      const url = URL.createObjectURL(data);
      result.src = url;
      hasilInput.style.display = "none";
      result.style.display = "block";
      loaderRemove.classList.remove("loader-remove");
      hasilInput.style.display = "none";
      arrowRight.style.display = "none";
      arrowDown.style.display = "block";
      button.disabled = false;
    });
});


///function untuk menambahhkan gambar yang ingin di hapus background nya
input.addEventListener('change', (e) => {
  arrowRight.style.display = "block";
  arrowDown.style.display = "none";
 
  loaderRemove.style.display = "none";
  btnRemove.style.width = "10%";
  labelDownload.style.display = "none";
  content.style.display = "block";
  label.style.display = "none";
  hasilInput.style.display = "block";
  result.style.display = "none";
  btnRemove.onclick = null;
  
  ///memasukkan gambar yang ingin di hapus background nya
  hasilInput.src = URL.createObjectURL(e.target.files[0]);
});


/// function untuk mendownload hasilInput gambar png 
function downloadResultImage() {
  const resultImage = document.getElementById("result");
  if (resultImage.src && resultImage.src !== "") {
    const link = document.createElement("a");
    link.href = resultImage.src;
    link.download = "result_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error("Result image source is not available.");
  }
}
