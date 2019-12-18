window.onload = () => {
    document.getElementById('create-map-btn').addEventListener('click', editMap)
}

function editMap() {
    const map = {
        title: mapObj[0].title,
        description: mapObj[0].description,
        slides: arrObj
    }

    axios.post(`/maps/${mapObj[0].id}/edit`, map)
        .then(response => window.location.assign('/maps'))
        .catch(err => console.log(err))
}

// function getDomain() {
//     return process.env.NODE_ENV === 'dev' ?
//         '' : 'https://herokuapp.com'
// }