const MAIN_URL = 'https://usersdogs.dmytrominochkin.cloud/';

async function getDogs() {
    const url = MAIN_URL + 'dogs';
    try {
        return await $.get(url);
    } catch (error) {
        console.log(error);
        $('.dog').append(`<p class="error">Error</p>`);
    } finally {
        $('.loading_gif').hide();
    }
}

function modalOpen(dog) {
    $('body').css("overflow", "hidden");
    $(".modal").addClass("show").html(`
        <div class="modal_body" style="top: ${window.pageYOffset}px">
            <img class="modal_photo" src="${MAIN_URL + dog.dogImage}" alt="dog">
            <div class="modal_content">
                <h2 class="modal_name">${dog.title}</h2>
                <p class="modal_suptitle">Sex</p>
                <h3 class="modal_sex">${dog.sex.toLowerCase()}</h3>
                <p class="modal_suptitle">Age</p>
                <h3 class="modal_age">${dog.age}</h3>
                <p class="modal_suptitle">Personality</p>
                <p class="modal_description">${dog.description}</p>
                <button class="modal_btn">
                    <img class="modal_phone" src="phone-solid.svg">
                    Adopt Me
                </button>
            </div>
        </div>
    `);
}

function modalClose() {
    $("body").css("overflow", "auto")
    $(".modal").removeClass("show");
}

async function renderPage() {
    
    $('.dog').append(`<img class="loading_gif" src="loading.gif" alt="loading">`);

    const dogs = await getDogs();

    $('.dog').append(`
        <ul class="dog_list">
        </ul>

        <div class="modal">
        </div>
    `);
    
    dogs.forEach(item => {
        const dogHTML = `
            <img class="dog_img" src=${MAIN_URL + item.dogImage} alt="dog">
            <div class="dog_text">
                <h2 class="dog_name">${item.title}</h2>
                <p class="dog_sex">${item.sex.toLowerCase()}</p>
            </div>
        `;
        const dog = $("<li></li>").html(dogHTML).addClass("dog_item").click(() => modalOpen(item));  
        $('.dog_list').append(dog);
    });
    
    $(document).on({
        "click": e => {
            if (!e.target.closest(".modal_body") && !e.target.closest(".dog_item")) modalClose();
        },
        "keyup": e => {
            if (e.code === "Escape") modalClose();
        }
    })
}

renderPage();