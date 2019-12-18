window.onload = () => {
    document.getElementById('create-map-btn').addEventListener('click', createMap)
}

function createMap() {
    const map = {
        title: mapObj[0].title,
        description: mapObj[0].description,
        slides: arrObj
    }

    axios.post('/maps', map)
        .then(response => window.location.assign('/maps'))
        .catch(err => console.log(err))
}

// function getDomain() {
//     return process.env.NODE_ENV === 'dev' ?
//         '' : 'https://herokuapp.com'
// }