console.log("Bienvenido a la clika");

//This is an array for the cards pre-made
const cards = [
   {
    name: "Gato waton",
    image: "https://images.pexels.com/photos/30029657/pexels-photo-30029657.jpeg",
    description: "gato gordo"
    },
    {
    name: "Gato Tonoto",
    image: "https://images.pexels.com/photos/29595978/pexels-photo-29595978.jpeg",
    description: "gato tonoto"
    },
    {
    name: "Gato desenfocado",
    image: "https://images.pexels.com/photos/32623341/pexels-photo-32623341.jpeg",
    description: "gato desenfocado"
    },
];

const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");

const travelerProfileDetails = document.querySelector(".traveler-profile__details");

const placesGalleryList = document.querySelector(".places-gallery__list");

const modalImageView = document.querySelector("#modal-image-view");

const ModalNewPlace = document.querySelector("#modal-new-place");

const travelerProfilEditBtn = document.querySelector("#button-edit");

const modalProfile = document.querySelector("#modal-profile")

const profileName = document.querySelector("#profile-name");

const profileDescription = document.querySelector("#profile-description");

const travelerProfileName = document.querySelector("#traveler-profile__name");

const travelerProfileBio = document.querySelector(".traveler-profile__bio");

const modalClose = Array.from(document.querySelectorAll(".modal__close"));

//modalForms here is where we save all the forms in the index.html
const modalForms = Array.from(document.querySelectorAll(".modal__form"));


//CreateCard made a new card and give events like delete, expand and like to the card.
const createCard = (card) => {
    const templatePlaceCard = 
    document.querySelector("#template-place-card")
    .content.cloneNode(true);

    const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
    const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");

    placeCardImage.src = card.image ;
    placeCardImage.alt = card.description;
    placeCardTitle.textContent = card.name;

    //this listener fill the image and title in a card with the info on the modal
    placeCardImage.addEventListener("click", () => {
        modalImageView.classList.toggle("modal_is-opened");
        const modalImage = modalImageView.querySelector(".modal__image");
        const modalCaption = modalImageView.querySelector(".modal__caption");
        modalImage.src = placeCardImage.src;
        modalImage.alt = placeCardImage.alt;
        modalCaption.textContent = placeCardImage.textContent;
    })

    //this is the const and listener to delete a card
    const placeCardDeleteButton = templatePlaceCard.querySelector(
        ".place-card__delete-button"
    );

    placeCardDeleteButton.addEventListener("click", (evt) => {
        console.log(evt);
        evt.target.closest(".place-card").remove();
    });

    //Here is the const and listener to like a card
    const placeCardLikeButton = templatePlaceCard.querySelector(
        ".place-card__like-button"
    );

    placeCardLikeButton.addEventListener("click", () =>{
        console.log("Me encorazona");
        placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
    })

    //placesGalleryList add the card to templatePlaceCard
    placesGalleryList.appendChild(templatePlaceCard);
}

//This function take all the inputs in a form an then validates the data using the required fields
const validarBoton = (modalInputs) => {
    return modalInputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

console.dir(travelerProfileDetails);

//This open the modal to add a new card
travelerProfileAddPlaceBtn.addEventListener("click", () => {
    ModalNewPlace.classList.toggle("modal_is-opened");
    
});


console.log("Arreglo de modals: ", modalClose);

//this foreach close all the close-modal
modalClose.forEach((modalClose) => {
    modalClose.addEventListener("click", (evt) => {
        console.log("Esta funcionando");
        let modal = evt.target.closest(".modal");
        modal.classList.toggle("modal_is-opened");
    })
})


//this make a new card from a form
ModalNewPlace.addEventListener("submit", (evt) => {
    const tempCard = {}
    const modalForms = ModalNewPlace.querySelector(".modal__form");
    const modalInputs = Array.from(modalForms.querySelectorAll(".modal__input"));
    evt.preventDefault();
    modalInputs.forEach((modalInput) => {
        console.log(modalInput.value);
        tempCard[modalInput.name] = modalInput.value;
    });
    console.log(tempCard);
    createCard(tempCard);
});


//This help to validate the input in the form
modalForms.forEach((modalForm) => {
    const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
    const modalButton = modalForm.querySelector(".modal__button");
    modalButton.disabled = false;

    modalButton.disabled = validarBoton(modalInputs);

    modalInputs.forEach((modalInput) => {
        modalInput.addEventListener("input", () => {
            console.log("Se activa este evento");
            modalButton.disabled = validarBoton(modalInputs);

            let modalError = modalForm.querySelector("#" + modalInput.id + "-error");
            if (!modalInput.validity.valid) {
                modalError.textContent = "Hay un error!";
                modalError.classList.add("modal__error_visible");
            } else {
                modalError.textContent = "";
                modalError.classList.remove("modal__error_visible");
            }
        });
    });
});

cards.forEach((card) => {
    createCard(card);
});

//This listener modify the profile
modalProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    travelerProfileBio.textContent = profileDescription.value;
    travelerProfileName.textContent = profileName.value;
    modalProfile.classList.toggle("modal_is-opened");
});

//this copy the current info in the perfil to the edit modal
travelerProfilEditBtn.addEventListener("click", () => {
    console.log("Si jalaa?")
    profileName.value = travelerProfileName.textContent;
    profileDescription.value = travelerProfileBio.textContent;
    modalProfile.classList.toggle("modal_is-opened");
});
