const productContainer = document.getElementById('card');
// const loadingElement = document.getElementById('loading');

// Fetching API
async function apiFetching() {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        // Check if the response status is not OK (e.g., 404, 500)
        // If it's not OK, throw an error to handle it in the catch block      
        if (!response.ok)
            throw new Error(`Failed to fetch products. Status: ${response.status}`);
        console.log('fetch products. Status: ', response.status);
        
        console.log(response);
        const products = await response.json()
        console.log(products);

        document.getElementById('loading').remove()
        displayCards(products)

    } catch (error) {
        productContainer.innerHTML = `
        <div class="col-12 text-center text-danger">
            <h2>${error.message}</h2>
        </div>
    `;
        console.error(error);
    }
}

function displayCards(products) {
    products.forEach(product => {
        const card = `
        <div class="col-md-4 col-lg-3 d-flex">
            <div class="card h-100 d-flex flex-column">
                <!-- Product Image -->
                <img src="${product.image}" class="cardimages" alt="Product Image">
                <div class="card-body d-flex flex-column">
                    <!-- Product Title -->
                    <h5 class="card-title">${product.title}</h5> 
                    <!-- Product Description -->
                    <p class="card-text text-muted">${product.description.slice(0, 100)}...</p> 
                    
                    <!-- Spacer to push the price and button to the bottom -->
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <span class="fw-bold">$${product.price}</span>
                        <a href="viewdetails.html?id=${product.id}" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
         </div>
        `
        productContainer.innerHTML += card
    })
}



apiFetching()