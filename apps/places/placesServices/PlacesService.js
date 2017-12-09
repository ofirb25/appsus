
import EventBusService from '../../../services/EventBusService.js'
var places = [
    {
        id: 100,
        name: 'Times Square',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        photos: ['https://www.nycgo.com/images/venues/152/times-square-at-night_jen-davis_121__x_large.jpg', 'http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1475261147/times-square-nyc-food-EAT0916.jpg?itok=GpQTB9qQ'],
        lat: 40.7589,
        lng: -73.9851,
        tag: 'fun',
        tagIcon: 'assets/marker-icons/food.svg'
    },
    {
        id: 102,
        name: 'Emprie State',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        photos: ['http://www.esbnyc.com/sites/default/files/styles/module_image__600x338_/public/default_images/brs_0330.jpg?itok=PrpAgC4u', 'https://media.timeout.com/images/101705309/image.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Q6L9shPaC0zdUKMoMjSDkVyfoAtew9-CTwftaXH_JWU5lAfV'],
        lat: 40.7484,
        lng: -73.9857,
        tag: 'fun',
        tagIcon: 'assets/marker-icons/food.svg'
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
            deleteMarker()
            addMarker({ lat: placeToSave.lat, lng: placeToSave.lng }, placeToSave.name, placeToSave)
        }
        resolve(placeToSave)
    });
};

function deletePlace(placeId) {
    var placeIdx = getPlaceIdx(placeId)
    return new Promise((resolve, reject) => {
        deleteMarker(placeIdx)
        places.splice(placeIdx, 1);
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
        tag: '',
        tagIcon: 'assets/marker-icons/food.svg'
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

function addMarker(pos, title, place) {
    let marker = new google.maps.Marker({
        position: pos,
        title: title
    });
    marker.setMap(gMap);
    marker.addListener('click', function () {
        EventBusService.$emit('changeSelected', place);
    });
    gMarkers.push(marker)
}

function deleteMarker(placeIdx) {
    if (!placeIdx && placeIdx !== 0) {
        gMarkers[gMarkers.length - 1].setMap(null)
        gMarkers.splice(gMarkers.length - 1, 1)
    }
    else {
        gMarkers[markerIdx].setMap(null)
        gMarkers.splice(markerIdx, 1)
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

function getMarkerImg(placeTag) {
    var markers = {
        fun: 'assets/marker-icons/fun.png}'
    }
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
    deleteMarker
}

