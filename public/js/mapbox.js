window.onload = () => {
    document.getElementById('create-map-btn').addEventListener('click', createMap)
}

function createMap() {
    const map = {
        title: mapObj[0].title,
        slides: arrObj
    }

    axios.post('/maps', map)
        .then(response => window.location.assign('/home'))
        .catch(err => console.log(err))
}