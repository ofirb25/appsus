import EventBusService from '../../../services/EventBusService.js'

var places = [
    {
        id: 100,
        name: 'Times Square',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        photos: ['https://www.nycgo.com/images/venues/152/times-square-at-night_jen-davis_121__x_large.jpg', 'http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1475261147/times-square-nyc-food-EAT0916.jpg?itok=GpQTB9qQ'],
        lat: 40.7589,
        lng: -73.9851,
        tag: 'shopping',
    },
    {
        id: 102,
        name: 'Emprie State',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        photos: ['http://www.esbnyc.com/sites/default/files/styles/module_image__600x338_/public/default_images/brs_0330.jpg?itok=PrpAgC4u', 'https://media.timeout.com/images/101705309/image.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Q6L9shPaC0zdUKMoMjSDkVyfoAtew9-CTwftaXH_JWU5lAfV'],
        lat: 40.7484,
        lng: -73.9857,
        tag: 'fun',
    },
]

function getPlaces() {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve(places)
            }, 1000)
        } else {
            reject('error!');
        }
    })
}

function getPlaceById(placeId) {
    return new Promise((resolve, reject) => {
        var placeIdx = getPlaceIdx(placeId)
        resolve(places[placeIdx]);
    });
};

function getMap() {
    return gMap
}

function savePlace(placeToSave) {
    return new Promise((resolve, reject) => {
        if (placeToSave.id) {
            let placeIdx = places.findIndex(place => {
                return placeToSave.id === place.id
            })
            places.splice(placeIdx, 1, placeToSave)
        }
        else {
            placeToSave.id = _getNextId();
            placeToSave.lat = +placeToSave.lat
            placeToSave.lng = +placeToSave.lng
            places.push(placeToSave);
            EventBusService.$emit('changePlacesCount');                                            
            deleteMarker()
        }
        addMarker({ lat: placeToSave.lat, lng: placeToSave.lng }, placeToSave.name, placeToSave)
        resolve(placeToSave)
    });
};

function deletePlace(placeId) {
    var placeIdx = getPlaceIdx(placeId)
    return new Promise((resolve, reject) => {
        deleteMarker(placeIdx)
        places.splice(placeIdx, 1);
        EventBusService.$emit('changePlacesCount');        
        resolve(places);
    });
}


function getPlaceIdx(placeId) {
    return places.findIndex(place => place.id === placeId)
}

function _getNextId() {
    var maxId = places.reduce((acc, place) => {
        return (place.id > acc) ? place.id : acc
    }, 0);
    return maxId + 1;
};


function emptyPlace() {
    return {
        name: '',
        description: '',
        photos: ['https://bulma.io/images/placeholders/1280x960.png'],
        lat: '',
        lng: '',
        tag: 'fun',
    }
}


var gMap;
var gMarkers = []
function displayMap(locationObj) {
    // Create a map object and specify the DOM element for display.
    gMap = new google.maps.Map(document.querySelector('#map'), {
        center: { lat: places[0].lat, lng: places[0].lng },
        zoom: 12
    });
    places.forEach(place => {
        addMarker({ lat: place.lat, lng: place.lng }, place.name, place)
    });
}
var gSelectedMarkerIdx = null;

function addMarker(pos, title, place) {
    let marker = new google.maps.Marker({
        position: pos,
        title: title,
        icon: place ? {
            url: `assets/marker-icons/${place.tag}.png`,
            scaledSize: new google.maps.Size(20, 20)
        } : ''
    });
    
    marker.setMap(gMap);
    marker.addListener('click', function () {
        setMarker(place)
    });
    gMarkers.push(marker)
}

function setMarker(place) {
    var markerIdx = getPlaceIdx(place.id);
    
        if (gSelectedMarkerIdx !== null) {
            gMarkers[gSelectedMarkerIdx].setIcon(`assets/marker-icons/${place.tag}.png`)
        }
        gSelectedMarkerIdx = markerIdx;
        gMarkers[gSelectedMarkerIdx].setIcon(`assets/marker-icons/marker.png`)
        //set marker as selected
        gMarkers
        EventBusService.$emit('changeSelected', place);

}

function deleteMarker(placeIdx) {
    if (!placeIdx && placeIdx !== 0) {
        gMarkers[gMarkers.length - 1].setMap(null)
        gMarkers.splice(gMarkers.length - 1, 1)
    }
    else {
        gMarkers[placeIdx].setMap(null)
        gMarkers.splice(placeIdx, 1)
        
    }
}

function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position);
            }, () => reject('cant find location'));

        } else {
            reject('browser not support.')
        }
    })
}

function getLocation(query) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyB6ZAQiNEXagLdD5SAJNtDjWmItieR5uVQ`)
        .then(res => res.json())
        .then(data => data)
        .catch('connection error')
}

function searchPlace(query) {
    if (!query.trim()) return Promise.resolve(places)
    var results = []
    return new Promise((resolve, reject) => {
        results = places.filter(place => {
            return place.name.toLowerCase().includes(query.toLowerCase())
        });
        if (results.length) {
            resolve(results)
        }
        else reject([])
    })
}

function getWeather() {
    var userPos;
    return getUserLocation()
    .then(pos=> {
        userPos = {lat:pos.coords.latitude,lng:pos.coords.longitude};
        console.log(userPos)
        return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${userPos.lat}&lon=${userPos.lng}&appid=fb2824293153f132b2a8c3356c8001a4&units=metric`)
        .then(res => res.json())
        .catch(err => console.log('err', err));
    });
   
}


export default {
    getPlaces,
    getPlaceById,
    deletePlace,
    emptyPlace,
    savePlace,
    displayMap,
    getUserLocation,
    getLocation,
    getMap,
    searchPlace,
    addMarker,
    deleteMarker,
    setMarker,
    places,
    getWeather
}

