const loadPhone = async (searchText = 'samsung', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';    // clar phone container cards before adding new cards
    console.log(phones);


    // show all button 
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }

    else (
        showAllContainer.classList.add('hidden')
    )

    //

    //Only showing 10 results 

    if (!isShowAll) {
        phones = phones.slice(0, 10)

    }




    phones.forEach(phone => {

        //step: 1 create a div tag
        const phoneCard = document.createElement('div');    //we create a new div

        // step:2 classlist add 
        phoneCard.classList = `card  bg-base-100 shadow-xl`;   // we insert new class

        //step: 3
        phoneCard.innerHTML = `
        
         <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-green-700 text-white  text-2xl">Show Details</button>
            </div>
        </div>
        
        `;
        // step:4 appendChild 
        phoneContainer.appendChild(phoneCard);

    })

    //togglespinner parameter value set to false 
    toggleLoadingSpinner(false);

}



// show details 
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}

//modal show
const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
    
<h1 class="text-3xl font-bold text-center">${phone.name}</h1>
<img class="p-10 mx-auto" src="${phone.image}" alt="">
<p><span class="font-bold">DISPLAY: </span>${phone.mainFeatures.displaySize}</p>
<p><span class="font-bold">MEMORY: </span>${phone.mainFeatures.memory}</p>
<p><span class="font-bold">CHIPSET: </span>${phone.mainFeatures.chipSet}</p>
<p><span class="font-bold">STORAGE: </span>${phone.mainFeatures.storage}</p>
<p><span class="font-bold">GPS: </span>${phone.others?.GPS || 'No GPS Available'}</p>
<p><span class="font-bold">RELEASE DATE: </span>${phone.releaseDate}</p>

    `;

    show_details_modal.showModal();
}

// onclick event handler to search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);  //play loading spinner
    const searchFeild = document.getElementById('search-field');
    const searchText = searchFeild.value;
    loadPhone(searchText, isShowAll);
}



// // Event handler to search button
// document.getElementById('button').addEventListener('click', function () {
//     toggleLoadingSpinner(true);  //play loading spinner
//     const searchFeild2 = document.getElementById("search-field2");
//     const searchText2 = searchFeild2.value;
//     loadPhone(searchText2);

// })





// create and target spinner  using arrow function 
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingSpinner.classList.remove('hidden');

    }

    else {
        loadingSpinner.classList.add('hidden')
    }


}



const handleShowAll = () => {
    handleSearch(true);
}

loadPhone()