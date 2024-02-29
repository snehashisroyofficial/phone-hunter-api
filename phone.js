const loadPhone = async (searchText, isShowAll) => {
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
            <div class="card-actions justify-end">
                <button class="btn w-full bg-green-700 text-white  text-2xl">Buy Now</button>
            </div>
        </div>
        
        `;
        // step:4 appendChild 
        phoneContainer.appendChild(phoneCard);

    })

    //togglespinner parameter value set to false 
    toggleLoadingSpinner(false);

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