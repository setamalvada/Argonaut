window.onload = () => {
    document.getElementById('create-map-btn').addEventListener('click', editMap)
}

function editMap() {
    const map = {
        title: mapObj[0].title,
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