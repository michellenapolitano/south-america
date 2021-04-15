var Airtable = require("airtable");
console.log(Airtable);

Airtable.configure({
  apiKey: 'keyjvY2X7mfBlj7p9',
  endpointUrl: 'https://api.airtable.com'
});
// Replace with the ID of the base you are using (the Elastic Collection). You can use
// Airtable's interactive API documentation for help finding this ID.
var base = Airtable.base('appeweg8FpllM9vSL');

base("southamerica.table").select({
  limit: 101
}).eachPage(gotPageOfArt, gotAllArt);

var art = [];

function gotPageOfArt(records, fetchNextPage) {
  console.log("gotPageOfArt)");
  // add the records from this page to our books array
  art.push(...records);
  // request more pages
  fetchNextPage();
}

function gotAllArt(err) {
  console.log("gotAllArt()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogArt();
  showArt();
}

function consoleLogArt() {
  console.log("consoleLogArt()");
  art.forEach((art) => {
    console.log("Art:", art);
  });
}

function showArt() {
  console.log("showArt()");
  art.forEach((art) => {

    // var artTitle = document.createElement("h1");
    // artTitle.innerText = art.fields.title;
    // document.body.append(artTitle);

    // var name0fGeo = document.createElement("p");
    // name0fGeo.innerText = art.fields.geography;
    // document.body.append(name0fGeo);

    // var artImage = document.createElement("img");
    // artImage.src = art.fields.media_file[0].url;
    // document.body.append(artImage);

    var artContainer = document.createElement("div");
    artContainer.classList.add("art-container");
    document.querySelector(".container").append(artContainer);

    var artTitle = document.createElement("h1");
    artTitle.classList.add("art-title");
    artTitle.innerText = art.fields.title;
    artContainer.append(artTitle);


    var name0fGeo = document.createElement("h4");
    name0fGeo.classList.add("art-geo");
    name0fGeo.innerText = art.fields.geography;
    artContainer.append(name0fGeo);

    var artDescription = document.createElement("p");
    artDescription.classList.add("art-description");
    artDescription.innerText = art.fields.description;
    artContainer.append(artDescription);

    var artImage = document.createElement("img");
    artImage.classList.add("art-image");
    artImage.src = art.fields.media_file[0].url;
    artContainer.append(artImage);

    // var artURL = document.createElement("link");
    // artURL.classList.add("art-url");
    // artURL.innerHTML = art.fields.link;
    // artContainer.append(artURL);


    artContainer.addEventListener("click", function(){
      artDescription.classList.toggle("active");
      artImage.classList.toggle("active");
      artTitle.classList.toggle("active");
      name0fGeo.classList.toggle("active");
      artURL.classList.toggle("active");
    })
      });
}