import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryListEl = document.querySelector('.gallery');

galleryListEl.insertAdjacentHTML('afterbegin', createGalleryItemPreview(galleryItems));

galleryListEl.addEventListener('click',showFullSizeImage);


function createGalleryItemPreview(galleryItems) {
  return galleryItems.map(({preview, original, description,}) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`}).join('');
};

function showFullSizeImage(event) {
  event.preventDefault();

  if(!event.target.classList.contains('gallery__image')){
    return;
  }

  const instance = basicLightbox.create(`
  <img src="${event.target.dataset.source}"> width="800" height="600">
  `, {
    onShow: () => {window.addEventListener('keydown', onKeyDownEsc)},
    onClose: () => {window.removeEventListener('keydown', onKeyDownEsc)}
  }) 

  const onKeyDownEsc = event => {
    if(event.code === 'Escape') {
      instance.close()
    }
  }
  
  instance.show();
};