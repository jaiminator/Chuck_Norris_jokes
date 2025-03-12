const btnJoke = document.getElementById('btnJoke');
btnJoke.addEventListener('click', getJoke);

const listJokes = document.getElementById('listJokes');

let arrayJokes = [];

// SI HAY CHISTES ALMACENADOS...
if (localStorage.getItem('jokes')) {
    let dataJokes = JSON.parse(localStorage.getItem('jokes'));
    dataJokes.forEach(dataJoke => {
        const jokeBox = document.createElement('p');
        jokeBox.setAttribute('class', 'joke');
        jokeBox.innerText = dataJoke;
    
        const deleteBox = document.createElement('button');
        deleteBox.setAttribute('class', 'btnDelete');
        deleteBox.setAttribute('onclick', 'deleteJoke()');
        deleteBox.innerText = 'Delete';

        jokeBox.appendChild(deleteBox);
        listJokes.appendChild(jokeBox);

        arrayJokes.push(dataJoke);
    });
}

//CREAMOS LA CARTA DE CADA CHISTE
function createJokeCard(data){
    const jokeBox = document.createElement('p');
    jokeBox.setAttribute('class', 'joke');
    jokeBox.innerText = data.value;

    const deleteBox = document.createElement('button');
    deleteBox.setAttribute('class', 'btnDelete');
    deleteBox.setAttribute('onclick', 'deleteJoke()');
    deleteBox.innerText = 'Delete';

    jokeBox.appendChild(deleteBox);
    listJokes.appendChild(jokeBox);
} 

//OBTENEMOS UN CHISTE ALEATORIO DE LA API DE CHUCK NORRIS
function getJoke() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(res => res.json())
        .then(joke => {
            createJokeCard(joke);
            arrayJokes.push(joke.value);
            localStorage.setItem('jokes', JSON.stringify(arrayJokes));
        })
        .catch(error => console.log('ERROR TO LOAD JOKE', error))
}

//BORRAMOS EL CHISTE SEGÚN SU ÍNDICE DEL ARRAY DE CHISTES
function deleteJoke() {
    alert("DELETE DELETE!");
}