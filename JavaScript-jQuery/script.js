// kutsu funktiota, jolla haetaan tuoteryhmät valintalistaan, kun sivu avataan
haeKategoriat();
haejanaytaTuotteet(); //luo tuotekortit

function haeKategoriat() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            const kategorianapit = $("#kategoriat"); // 

            categories.forEach(category => {
                const painike = $("<button>")
                    .addClass("btn btn-secondary m-1")
                    .text(category)
                    .on("click", function () {
                        haejanaytaKategorianTuotteet(category);
                    });

                kategorianapit.append(painike); // lisätään napit jQueryllä
            });
        })
        .catch(error => {
            console.error("Virhe haettaessa kategorioita:", error);
            $("#kategoriat").html("<p class='text-danger'>Kategorioiden lataus epäonnistui.</p>");
        });
}


// hae ja näytä tuotteet tuoteryhmävalinnan mukaan  
function haejanaytaKategorianTuotteet(category) {

    if (!category) return;

    fetch(`https://fakestoreapi.com/products/category/${category}`) //hae osoitteesta
        .then(response => { return response.json() }) // käsitellään vastaus ja parsitaan se
        .then(data => printtaaTuotteet(data)) // kutsutaan funktiota, joka tulostaa vastauksena saadut datan tuotekorttina käyttöliittymään
        .catch(err => console.log('failed', err)) // virheenkäsittely
}


// FUNKTIO hae kaikki tuotteet
function haejanaytaTuotteet() {

    fetch('https://fakestoreapi.com/products') //hae osoitteesta
        .then(response => { return response.json() }) // käsitellään vastaus ja parsitaan se
        .then(data => printtaaTuotteet(data)) // kutsutaan funktiota, joka tulostaa vastauksena saadut datan tuotekorttina käyttöliittymään
        .catch(err => console.log('failed', err)) // virheenkäsittely
}


function printtaaTuotteet(products) {
    let tuotteet = $("#tuotelista");
    tuotteet.empty();

    $.each(products, function (index, tuote) {
        let tuoteDiv = $("<div>").addClass("col m-2").hide(); // Piilotetaan ensin, että voi häivyttää (fade)

        let korttiDiv = $("<div>").addClass("card h-100").css("width", "18em");

        let kuva = $("<img>")
            .addClass("card-img-top p-2")
            .css({ height: "200px", objectFit: "contain" })
            .attr("src", tuote.image);

        let korttiBodyDiv = $("<div>").addClass("card-body");

        let titleDiv = $("<div>")
            .addClass("card-title")
            .text(tuote.title);

        let priceDiv = $("<div>")
            .addClass("card-text")
            .text(`Hinta: ${tuote.price} €`);

        let ostosnappi = $("<img>")
            .attr("src", "ostoskori.png")
            .attr("width", 50)
            .css("float", "right")
            .on("click", function () {
                alert("Tämä tuote lisättiin ostokoriin: " + tuote.title);
            })
            .on("mouseover", function () {
                $(this).css({
                    transform: "scale(1.1)",
                    transition: "transform 0.2s ease",
                    cursor: "pointer"
                });
            })
            .on("mouseout", function () {
                $(this).css("transform", "scale(1)");
            });

        korttiBodyDiv
            .append(titleDiv)
            .append(priceDiv)
            .append(ostosnappi);

        korttiDiv
            .append(kuva)
            .append(korttiBodyDiv);

        tuoteDiv.append(korttiDiv);

        tuotteet.append(tuoteDiv);
        tuoteDiv.fadeIn(800); // Fadein
    });
}