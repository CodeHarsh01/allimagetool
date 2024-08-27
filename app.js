const fileInput = document.getElementById("Fileinput");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const originalImg = document.querySelector(".image-wrapper img");
  if (!originalImg) {
    originalImg = new Image();
    document.querySelector(".image-wrapper").appendChild(originalImg);
  }

  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    originalImg.src = reader.result;

    originalImg.onload = () => {
      const downloadBtn = document.getElementById("downloadbtn");

      downloadBtn.addEventListener("click", () => {
        const levelElement = document.getElementById("level");

        const levelValue = parseFloat(levelElement.value) / 100;

        const canvas = document.createElement('canvas');
        canvas.width = originalImg.width;
        canvas.height = originalImg.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);

        const compressedImgUrl = canvas.toDataURL("image/jpeg", levelValue);

        downloadBtn.href = compressedImgUrl;
        downloadBtn.download = "compressed_image.jpg";
      });
    };
  };
});