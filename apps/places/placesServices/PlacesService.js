
import EventBusService from '../../../services/EventBusService.js'
var places = [
    {
        id: 100,
        name: 'Times Square',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        photos: [],
        lat: 40.7589,
        lng: -73.9851,
        tag: 'fun',
        tagIcon : 'assets/marker-icons/food.svg'
    },
    {
        id: 102,
        name: 'Emprie State',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        photos: [],
        lat: 40.7484,
        lng: -73.9857,
        tag: 'fun',
        tagIcon : 'assets/marker-icons/food.svg'
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

function savePlace(place) {
    return new Promise((resolve, reject) => {
        place.id = _getNextId()
        places.push(place);
        resolve(place)
    });
};

function deletePlace(placeId) {
    var placeIdx = getPlaceIdx(placeId)
    return new Promise((resolve, reject) => {
        places.splice(placeIdx, 1);
        resolve(mails);
    });
}

function getPlaceIdx(placeId) {
    return places.findIndex(place => place.id === placeId)
}

function _getNextId() {
    var maxId = mails.reduce((acc, place) => {
        return (place.id > acc) ? note.id : acc
    }, 0);
    return maxId + 1;
};


function emptyPlace() {
    return {
        id: 100,
        name: 'Times Square',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        photos: [],
        lat: '',
        lng: '',
        tag: ''
    }
}

var gMap;
function displayMap(locationObj) {
    // Create a map object and specify the DOM element for display.
    gMap = new google.maps.Map(document.querySelector('#map'), {
        center: { lat: places[0].lat, lng: places[0].lng },
        zoom: 12
    });
    places.forEach(place => {
        var marker = new google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map: gMap,
            title: place.name,
            // icon : 'assets/marker-icons/food.svg'
        });
        marker.addListener('click', function() {
            EventBusService.$emit('changeSelected',place);
            // this.$router.push('/places/place/'+place.id);
          });
    });
}

function getLocation() {
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
        fun : 'assets/marker-icons/fun.png}'
    }
}

export default {
    getPlaces,
    getPlaceById,
    deletePlace,
    searchPlace,
    emptyPlace,
    savePlace,
    displayMap,
    getLocation
}






function searchPlace(query) {
    // if(!query.trim()) return Promise.resolve(mails)
    // var results = []
    // return new Promise((resolve, reject) => {
    //     results = mails.filter(mail => {
    //         return mail.title.toLowerCase().includes(query.toLowerCase()) ||
    //             mail.text.toLowerCase().includes(query.toLowerCase()) ||
    //             mail.sender.toLowerCase().includes(query.toLowerCase());
    //     });
    //     if (results.length) {
    //         console.log('res', results);
    //         resolve(results)
    //     }
    //     else reject([])
    // })

}