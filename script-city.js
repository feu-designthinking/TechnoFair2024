const city = body.querySelector('#city-map');
const swoosh = document.createElement('audio');

const sizes = {
    md: "24px",
    sm: "22px"
}

const pins = {
    diliman: gDrivePhoto("https://drive.google.com/file/d/1vdJkuxNMITlL-S9jLhIqj7iBdSrN8M9H/view?usp=drive_link"),
    facebook: gDrivePhoto("https://drive.google.com/file/d/1vsD76Or__rIGzhlO28pCxrN2-l2YijYa/view?usp=drive_link"),
    history: gDrivePhoto("https://drive.google.com/file/d/1ZaW5G1f-DyvC7i2L9_dnYqsl5elzmSIh/view?usp=drive_link"),
    infomercial: gDrivePhoto("https://drive.google.com/file/d/1Fcus_jSkBg3VBXwM2LGufOuXdVaLHSOU/view?usp=drive_link"),
    pitch: gDrivePhoto("https://drive.google.com/file/d/10N1IEq_D5WXtkfo0VRqlv6GuTci3RIqV/view?usp=drive_link"),
    poster: gDrivePhoto("https://drive.google.com/file/d/1uHlMB9RebIQ32jgD8qYF1fAfoVE2q_sY/view?usp=sharing"),
    techno: gDrivePhoto("https://drive.google.com/file/d/1KD5COzaIf7IB3ZOw3Sg8ohXFtTtPE__t/view?usp=drive_link")
}

const assets = {
    airbus: newAsset("airbus", 200, 120, 800, gDrivePhoto("https://drive.google.com/file/d/1SOPHJvbL5MFqqmNUjzkZunxjfHu2lA0b/view?usp=drive_link")),
    apartment: newAsset("apartment", 132, 575, 285, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/apartment.png"),
    bakery: newAsset("bakery", 120, 480, 220, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/bakery.png"),
    balloon: newAsset("balloon", 90, 100, 520, gDrivePhoto("https://drive.google.com/file/d/1G-bYbdqcLjNGRQmLqMYxNyqONJMF282G/view?usp=drive_link")),
    bank: newAsset("bank", 100, 280, 530,  "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/bank.png"),
    blueBldg: newAsset("blue-bldg", 110, 488, 85, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/blue-building.png"),
    cafe: newAsset("cafe", 95, 342, 872, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/cafe.png"),
    corner: newAsset("corner", 95, 380, 1100, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/corner.png"),
    feuAlabang: newAsset("feu-alabang", 190, 350, 340, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/FEU-Building.png"),
    feuDiliman: newAsset("feu-diliman", 210, 410, 620, "https://cdn.glitch.com/1e04e99f-b859-4c58-a916-69aa5ce193aa%2Ftriplets.png"),
    feuTech: newAsset("feu-tech", 105, 485, 495, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/beige.png"),
    helicopter: newAsset("helicopter", 120, 120, 500, gDrivePhoto("https://drive.google.com/file/d/1wC5bM9wi4Acz9jbK3nzpHom9xvo4hApl/view?usp=drive_link")),
    hospital: newAsset("hospital", 160, 470, 820, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/hospital.png"),
    lbBldg: newAsset("lb-bldg", 160, 200, 658, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/LB-building.png"),
    pharmacy: newAsset("pharmacy", 120, 595, 700, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/pharmacy.png"),
    tallest: newAsset("tallest", 95, 280, 990, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/tallest.png"),
    triplets: newAsset("triplets", 150, 190, 365, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/small_triplets.png"),
    whale: newAsset("whale", 50, 780, 980, gDrivePhoto("https://drive.google.com/file/d/13Mcmbt6M1YgPE_UCuQtododaVQ_HxvTM/view?usp=drive_link")),
    white: newAsset("white", 110, 566, 610, "https://cdn.glitch.me/1e04e99f-b859-4c58-a916-69aa5ce193aa/white.png"),
    windmill: newAsset("windmill", 100, 280, 150, gDrivePhoto("https://drive.google.com/file/d/1e75SRPxgm6vkkV-nzATQSSDj3ddtEeS3/view?usp=drive_link")),
    yacht: newAsset("yacht", 132, 780, 420, gDrivePhoto("https://drive.google.com/file/d/1-Wht4G9PLOsddgoIfdTsBK9ff96hIMYT/view?usp=drive_link"))
}

function addAsset(asset, tenantName, tenantPin, directLink) {
    if (directLink == "") {
        asset.classList.add('mute');
        asset.onmouseover = function(){};
        asset.onmouseout = function(){};
        var overlays = asset.querySelectorAll('.overlay');
        for (var i = 0; i < overlays.length; i++) {
            overlays[i].style.display = "none";
        }
    } else {
        asset.querySelector('.txt').innerHTML = tenantName.toUpperCase();
        asset.querySelector('.pin').style.backgroundImage = "url(" + tenantPin + ")";
        asset.setAttribute('onclick', 'window.open("' + directLink + '", "_blank")');
    }
    city.appendChild(asset);
}

function newAsset(thisID, thisWidth, thisTop, thisLeft, imgURL) {
    var txt = document.createElement('div');
    txt.classList.add('txt');
    txt.classList.add('overlay');

    var pin = document.createElement('div');
    pin.classList.add('pin');
    pin.classList.add('overlay');

    var sprite = document.createElement('img');
    sprite.setAttribute('src', imgURL);
    sprite.classList.add('sprite');

    var div = document.createElement('div');
    div.classList.add('asset');
    div.setAttribute('id', thisID);
    div.appendChild(sprite);
    div.appendChild(pin);
    div.appendChild(txt);
    div.onmouseover = playSound;
    div.onmouseout = stopSound;
    div.style.width = thisWidth.toString() + "px";
    div.style.top = thisTop.toString() + "px";
    div.style.left = thisLeft.toString() + "px";

    return div;
}

function setTextSize(asset, size) {
    var txt = asset.querySelector('.txt');
    txt.style.fontSize = size;
}

function showLabels() {
    var labels = city.querySelectorAll('.txt');
    for(var i = 0; i < labels.length; i++) {
        labels[i].style.opacity = "1";
        labels[i].style.width = "264px";
    }
    console.log(labels);
}

function playSound(){
    swoosh.play();
}

function stopSound() {
    swoosh.stop();
    swoosh.currentTime = 0;
}

swoosh.setAttribute('src',"https://cdn.glitch.com/546a765c-09a6-48da-a4be-14fc266c8c7f%2Fswoosh2.mp3?v=1614870466456");
body.appendChild(swoosh)