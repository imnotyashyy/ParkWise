// ======================================
// PARKWISE - JAVASCRIPT PHASE 1
// ======================================

window.addEventListener("load", () => {

    // Hide loader
    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }, 1200);

    initializeMap();

});

// ======================================
// MAP
// ======================================

let map;

let selectedParking = null;

function initializeMap(){

    map = L.map("map").setView([28.6139,77.2090],14);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {

            attribution:"© OpenStreetMap",

            maxZoom:19

        }

    ).addTo(map);

    loadParkingMarkers();

    getCurrentLocation();

}

// ======================================
// PARKING DATA
// ======================================

const parkingData=[

{

name:"Connaught Place Parking",

lat:28.6315,

lng:77.2167,

price:40,

available:true

},

{

name:"Rajiv Chowk Parking",

lat:28.6297,

lng:77.2139,

price:35,

available:false

},

{

name:"DLF Mall Parking",

lat:28.6182,

lng:77.2234,

price:50,

available:true

},

{

name:"Metro Parking",

lat:28.6211,

lng:77.2104,

price:45,

available:true

}

];

// ======================================
// ICONS
// ======================================

const greenIcon=L.icon({

iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",

shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

iconSize:[25,41],

iconAnchor:[12,41]

});

const redIcon=L.icon({

iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

iconSize:[25,41],

iconAnchor:[12,41]

});

// ======================================
// LOAD PARKINGS
// ======================================

function loadParkingMarkers(){

parkingData.forEach((parking)=>{

const marker=L.marker(

[parking.lat,parking.lng],

{

icon:parking.available ? greenIcon : redIcon

}

).addTo(map);

marker.bindPopup(`

<h3>${parking.name}</h3>

<p>₹${parking.price}/hour</p>

<p>${parking.available ? "🟢 Available":"🔴 Occupied"}</p>

<button onclick="bookParking('${parking.name}')">

Reserve

</button>

`);

});

}

// ======================================
// BOOK PARKING
// ======================================

function bookParking(name){

selectedParking=name;

const modal=document.getElementById("reservationModal");

document.getElementById("selectedParking").innerHTML=

`<b>${name}</b>`;

modal.style.display="flex";

}

window.bookParking=bookParking;

// ======================================
// CLOSE MODAL
// ======================================

document.querySelector(".close").onclick=()=>{

document.getElementById("reservationModal").style.display="none";

}

// ======================================
// CONFIRM BOOKING
// ======================================

document.getElementById("confirmReservation")

.addEventListener("click",()=>{

document.getElementById("reservationModal").style.display="none";

showToast(

"Parking Reserved Successfully ✅"

);

});

// ======================================
// USER LOCATION
// ======================================

function getCurrentLocation(){

if(!navigator.geolocation) return;

navigator.geolocation.getCurrentPosition(position=>{

const lat=position.coords.latitude;

const lng=position.coords.longitude;

L.marker([lat,lng])

.addTo(map)

.bindPopup("📍 You are here")

.openPopup();

map.flyTo([lat,lng],15);

});

}

// ======================================
// TOAST MESSAGE
// ======================================

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},500);

},3000);

}

// ======================================
// FIND PARKING BUTTON
// ======================================

document.getElementById("findParking")

.addEventListener("click",()=>{

document.querySelector(".mapSection")

.scrollIntoView({

behavior:"smooth"

});

});
// ======================================
// PARKWISE - JAVASCRIPT PHASE 3B
// ======================================

// ----------------------------
// Search Parking
// ----------------------------

const searchInput = document.querySelector(".searchBar input");
const searchButton = document.querySelector(".searchBar button");

searchButton.addEventListener("click", searchParking);

searchInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        searchParking();

    }

});

function searchParking(){

    const query = searchInput.value.toLowerCase().trim();

    if(query===""){

        showToast("Please enter a location.");

        return;

    }

    const result = parkingData.find(parking =>
        parking.name.toLowerCase().includes(query)
    );

    if(result){

        map.flyTo([result.lat,result.lng],17,{
            animate:true,
            duration:2
        });

        showToast("Found: "+result.name);

    }else{

        showToast("No parking found.");

    }

}

// ----------------------------
// Reservation Timer
// ----------------------------

let reservationInterval;

function startReservation(){

    let seconds = 900;

    const timer = document.createElement("div");

    timer.className = "reservationTimer";

    document.body.appendChild(timer);

    reservationInterval = setInterval(()=>{

        let min = Math.floor(seconds/60);

        let sec = seconds%60;

        timer.innerHTML=`
        🚗 Reservation Active
        <br><br>
        <strong>${min}:${sec.toString().padStart(2,"0")}</strong>
        `;

        seconds--;

        if(seconds<0){

            clearInterval(reservationInterval);

            timer.innerHTML="❌ Reservation Expired";

            setTimeout(()=>{

                timer.remove();

            },3000);

        }

    },1000);

}

// ----------------------------
// Confirm Booking
// ----------------------------

document.getElementById("confirmReservation")
.addEventListener("click",()=>{

    document.getElementById("reservationModal").style.display="none";

    startReservation();

    showToast("Booking Confirmed!");

});

// ----------------------------
// Animated Counters
// ----------------------------

function counter(id,target){

    const element=document.getElementById(id);

    if(!element) return;

    let current=0;

    const step=Math.ceil(target/100);

    const animation=setInterval(()=>{

        current+=step;

        if(current>=target){

            current=target;

            clearInterval(animation);

        }

        element.innerHTML=current.toLocaleString();

    },20);

}

counter("driversCount",15000);

counter("parkingCount",850);

// ----------------------------
// Navbar Effect
// ----------------------------

window.addEventListener("scroll",()=>{

    const nav=document.querySelector("nav");

    if(window.scrollY>40){

        nav.style.padding="15px 7%";

        nav.style.boxShadow="0 10px 30px rgba(0,0,0,.1)";

    }else{

        nav.style.padding="20px 7%";

        nav.style.boxShadow="none";

    }

});

// ----------------------------
// Reveal Animation
// ----------------------------

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0px)";

}

});

});

document.querySelectorAll("section").forEach(section=>{

section.style.opacity="0";

section.style.transform="translateY(70px)";

section.style.transition="1s";

observer.observe(section);

});

// ----------------------------
// Floating Location Button
// ----------------------------

const locationBtn=document.createElement("button");

locationBtn.className="locationButton";

locationBtn.innerHTML="📍";

document.body.appendChild(locationBtn);

locationBtn.onclick=()=>{

    getCurrentLocation();

};

// ----------------------------
// Back To Top Button
// ----------------------------

const topBtn=document.createElement("button");

topBtn.className="topButton";

topBtn.innerHTML="⬆";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ======================================
// END OF PHASE 3B
// ======================================
