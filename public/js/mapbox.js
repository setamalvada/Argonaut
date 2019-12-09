/*mapboxgl.accessToken = 'pk.eyJ1IjoiaXJvbm1vZHVsZTIiLCJhIjoiY2szZnQzdzN0MDdzNjNjbzQ5amZ5M24wMyJ9.1AdiIc2dD4lw7Toih03G0Q';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-77.04, 38.907],
    zoom: 11.15,
});

console.log(map)

map.on('load', function() {
    map.loadImage('https://img.icons8.com/android/24/000000/marker.png', function(error, image) {
        if (error) throw error;
        map.addImage('marker', image);
        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0, 0]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "marker",
                "icon-size": 1
            }
        });
    });
});


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("blogSlides");
    var dots = document.getElementsByClassName("blogSlider__dots--dot");
    if (n > slides.length) {
        slideIndex = 1
            // map.center = [-77.04, 38.907]
            //map.flyTo({center: [-77.04, 38.907]})

    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

document.getElementById('fly').addEventListener('click', function() {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
    map.flyTo({
        center: [-74.50 + (Math.random() - 0.5) * 10,
            40 + (Math.random() - 0.5) * 10
        ]
    });
});

document.getElementById('fly2').addEventListener('click', function() {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
    map.flyTo({
        center: [-74.50 + (Math.random() - 0.5) * 10,
            40 + (Math.random() - 0.5) * 10
        ]
    });
});*/

window.onload = () => {
    document.getElementById('create-map-btn').addEventListener('click', createMap)
}

function createMap() {
    const map = {
        title: 'dummy map',
        slides: arrObj
    }

    axios.post('/maps', map)
        .then(response => window.location.assign('/home'))
        .catch(err => console.log(err))
}