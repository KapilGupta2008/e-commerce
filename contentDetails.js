// contentDetails.js

// Function to create image section
function createImageSection(product) {
  const imageSection = document.createElement('div');
  imageSection.id = 'imageSection';

  const imgTag = document.createElement('img');
  imgTag.src = product.preview;
  imgTag.alt = product.name;

  imageSection.appendChild(imgTag);

  return imageSection;
}

// Function to create product details section
function createProductDetails(product) {
  const productDetails = document.createElement('div');
  productDetails.id = 'productDetails';

  const h1Tag = document.createElement('h1');
  h1Tag.textContent = product.name;

  const pTag = document.createElement('p');
  pTag.textContent = product.description;

  const priceTag = document.createElement('p');
  priceTag.textContent = `Price: ₹${product.price}`;

  productDetails.appendChild(h1Tag);
  productDetails.appendChild(pTag);
  productDetails.appendChild(priceTag);

  return productDetails;
}

// Function to create product preview section
function createProductPreview(product) {
  const productPreview = document.createElement('div');
  productPreview.id = 'productPreview';

  const imgTagProductPreview = document.createElement('img');
  imgTagProductPreview.src = product.preview;
  imgTagProductPreview.alt = product.name;

  productPreview.appendChild(imgTagProductPreview);

  return productPreview;
}

// Function to create dynamic content details
function dynamicContentDetails(product) {
  if (!product) {
    console.error('Product not found');
    return;
  }

  const mainContainer = document.createElement('div');
  mainContainer.id = 'containerD';

  const imageSection = createImageSection(product);
  const productDetails = createProductDetails(product);
  const productPreview = createProductPreview(product);

  mainContainer.appendChild(imageSection);
  mainContainer.appendChild(productDetails);
  mainContainer.appendChild(productPreview);

  return mainContainer;
}

// Get the product ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch product details from productlist.json
fetch('productlist.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Find the product details from the JSON data
    const productDetails = data.find(product => product.id === productId);

    if (!productDetails) {
      console.error('Product not found');
      return;
    }

    const mainContainer = dynamicContentDetails(productDetails);
    document.getElementById('containerProduct').appendChild(mainContainer);
  })
  .catch(error => console.error('Error fetching product details:', error));