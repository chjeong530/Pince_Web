function loadItems() {
  return fetch('./data.json')
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

let totalSelectedImages = new Set();
function onButtonClick(event, items){
  let selectedImageName = event.target.id;
  // const selectedImage = document.querySelector(".item_thumbnail");
  // const selectedImage = document.getElementsByClassName(selectedImageName);
  const selectedImage = document.getElementById(selectedImageName);
  // const selectedImageIcon = document.querySelector(".selector ${item.name}");
  const className = `selector ${selectedImageName}`;
  const selectedImageIcon = document.getElementsByClassName(className);
  console.log(selectedImageIcon);

  if (totalSelectedImages.size < 3){
    if(totalSelectedImages.has(selectedImageName) === false){
      totalSelectedImages = totalSelectedImages.add(selectedImageName)
      selectedImage.classList.add('overlay');
      selectedImageIcon[0].style.display = "block";
      // displaySelector(selectedImageName);
    }
    else{
      totalSelectedImages.delete(selectedImageName)
      selectedImage.classList.remove('overlay');
      selectedImageIcon[0].style.display = "none";
    }
  }else{
    if(totalSelectedImages.has(selectedImageName)){
      totalSelectedImages.delete(selectedImageName)
      selectedImage.classList.remove('overlay');
      selectedImageIcon[0].style.display = "none";
    }
  }
  console.log(totalSelectedImages);
  // console.log(totalSelectedImages.size);
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
})
.catch(console.log);