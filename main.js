// Elements select karna
const imageInput = document.getElementById("imageInput");
const addButton = document.querySelector("nav button");
const picsContainer = document.querySelector(".pics_cntr");

// LocalStorage se saved images load
let savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];

// Page load hote hi saved images display
savedImages.forEach(imgData => {
    createImageCard(imgData);
});

// ADD button click
addButton.addEventListener("click", () => {
    const file = imageInput.files[0];
    if (!file) {
        alert("Please select an image first!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const imageURL = event.target.result;

        createImageCard(imageURL);

        savedImages.push(imageURL);
        localStorage.setItem("galleryImages", JSON.stringify(savedImages));
    };
    reader.readAsDataURL(file);

    imageInput.value = "";
});

// Function to create image card
function createImageCard(imageURL) {
    const imgWrapper = document.createElement("div");
    imgWrapper.style.position = "relative";

    const img = document.createElement("img");
    img.src = imageURL;
    img.style.cursor = "pointer";

    // ✅ Image click → open overlay modal
    img.addEventListener("click", () => {
        openImageModal(imageURL);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.classList.add("delete-btn");
    delBtn.style.position = "absolute";
    delBtn.style.top = "5px";
    delBtn.style.right = "5px";
    delBtn.style.background = "black";
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.borderRadius = "100%";
    delBtn.style.cursor = "pointer";
    delBtn.style.width = "25px";
    delBtn.style.height = "25px";
    delBtn.style.display = "flex";
    delBtn.style.alignItems = "center";
    delBtn.style.justifyContent = "center";

    delBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // ✅ click bubble hone se rokta hai
        picsContainer.removeChild(imgWrapper);
        savedImages = savedImages.filter(img => img !== imageURL);
        localStorage.setItem("galleryImages", JSON.stringify(savedImages));
    });

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(delBtn);
    picsContainer.appendChild(imgWrapper);
}

// ✅ Function to create & show overlay modal
function openImageModal(imageURL) {
    // Overlay div
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.8)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    // Image inside modal
    const bigImg = document.createElement("img");
    bigImg.src = imageURL;
    bigImg.style.maxWidth = "90%";
    bigImg.style.maxHeight = "90%";
    bigImg.style.borderRadius = "10px";
    bigImg.style.boxShadow = "0 0 20px rgba(255,255,255,0.5)";

    // Close modal when clicked
    overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
}

// ✅ Static HTML me already present images ke liye modal open event lagao
document.querySelectorAll('.pics_cntr img').forEach(img => {
    img.style.cursor = "pointer"; // hover pe pata chale clickable hai
    img.addEventListener('click', () => {
        openImageModal(img.src);
    });
});


