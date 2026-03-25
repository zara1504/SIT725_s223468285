const clickMe = () => {
    alert("Hello from the Cows... Moo Moo!");
};

const submitForm = () => {
    let formData = {};

    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted:", formData);

    $('#first_name').val('');
    $('#last_name').val('');
    $('#email').val('');

    $('#modal1').modal('close');

    M.toast({ html: 'Thanks! Your message has been sent to Zara :)' });
};

function loadCards(cards) {
    const cardSection = document.getElementById("card-section");

    cardSection.innerHTML = "";

    cards.forEach(card => {
        const cardHTML = `
        <div class="col s12 m4 center-align">
          <div class="card">

            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${card.image}">
            </div>

            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">
                ${card.title}
                <i class="material-icons right">more_vert</i>
              </span>
            </div>

            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">
                ${card.title}
                <i class="material-icons right">close</i>
              </span>
              <p>${card.description}</p>
            </div>

          </div>
        </div>
        `;

        cardSection.innerHTML += cardHTML;
    });
}

$(document).ready(function () {

    $('.materialboxed').materialbox();
    $('.modal').modal();

    $('#clickMeButton').click(() => {
        clickMe();
    });

    $('#formSubmit').click((e) => {
        e.preventDefault();
        submitForm();
    });

    fetch('http://localhost:3001/api/projects')
        .then(response => response.json())
        .then(response => loadCards(response.data))
        .catch(err => console.error("Error loading cards:", err));
});