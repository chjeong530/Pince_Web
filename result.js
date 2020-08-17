
function loadItems() {
  return fetch('./result.json')
  .then(response => response.json())
  .then(json => json.items);
}

function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createImagesHTMLString(item)).join('');
}

function createImagesHTMLString(item) {
  // return ` <img src="${item.image}" alt="${item.name}", class="item_thumbnail"> `
  return `
   <div class="item_wrapper">
   <img src="${item.image}" id="${item.name}", class="item_thumbnail ${item.name}"> 
   <img src="component/selector.png" id="${item.name}", class="selector ${item.name}"> 
   </div>`
}

function displayPreviewItems(src) {
  const container = document.querySelector('.preview');
  container.innerHTML = 
  `
  <img src="${src}" class="preview_item" />
  `
}

let selectedImageName;
function setSelectedImageName(items){
  if (!selectedImageName)
  {
    selectedImageName = items[0]["name"];
  }
  console.log(selectedImageName);
  const selectedImage = document.getElementById(selectedImageName);
  const selectedClassName = `selector ${selectedImageName}`;
  const selectedImageIcon = document.getElementsByClassName(selectedClassName);
  displayPreviewItems(selectedImage.getAttribute('src'));

  selectedImage.classList.add('overlay');
  selectedImageIcon[0].style.display = "block";
}

function onButtonClick(event, items){
  let tempSelectedImageName = event.target.id;
  if(tempSelectedImageName) {

    const selectedImage = document.getElementById(selectedImageName);
    const tempImage = document.getElementById(tempSelectedImageName);
    const selectedClassName = `selector ${selectedImageName}`;
    const tempClassName = `selector ${tempSelectedImageName}`;

    console.log(tempImage);

    const selectedImageIcon = document.getElementsByClassName(selectedClassName);
    const tempImageIcon = document.getElementsByClassName(tempClassName);

    if (selectedImageName !== tempSelectedImageName){
      selectedImage.classList.remove('overlay');
      selectedImageIcon[0].style.display = "none";

      tempImage.classList.add('overlay');
      tempImageIcon[0].style.display = "block";

      selectedImageName = tempSelectedImageName

      displayPreviewItems(tempImage.getAttribute('src'));
    }
  }
}

function setEventListners(items) {
  const selectedImages = document.querySelector('.items');
  selectedImages.addEventListener('click', () => onButtonClick(event, items));
}

// main
// 0. show image (9)
// 1. select image (3)
// 2. next page

// 1. select image
loadItems()
.then(items => {
  displayItems(items);
  setEventListners(items);
  setSelectedImageName(items);
})
.catch(console.log);