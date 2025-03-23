const btnJoke = document.getElementById("btnJoke");
btnJoke.addEventListener("click", getJoke);

const listJokes = document.getElementById("listJokes");

let arrayJokes = [];
let numJoke = 0;

let chart = null;

// SI HAY CHISTES ALMACENADOS, IMPRIME LA LISTA DE CHISTES POR PANTALLA
function printJokes() {
  if (localStorage.getItem("jokes")) {
    arrayJokes = [];
    listJokes.innerHTML = "";
    numJoke = 0;
    let dataJokes = JSON.parse(localStorage.getItem("jokes"));
    dataJokes.forEach((dataJoke) => {
      const jokeBox = document.createElement("p");
      jokeBox.setAttribute("class", "joke");
      jokeBox.innerText = dataJoke;

      const deleteBox = document.createElement("button");
      deleteBox.setAttribute("class", "btnDelete");
      deleteBox.setAttribute("onclick", "deleteJoke(" + numJoke + ")");
      deleteBox.innerText = "Delete";

      jokeBox.appendChild(deleteBox);
      listJokes.appendChild(jokeBox);

      arrayJokes.push(dataJoke);
      numJoke++;
    });
    showCanvas(arrayJokes);
  }
}

//CREAMOS LA CARTA DE CADA CHISTE
function createJokeCard(data) {
  const jokeBox = document.createElement("p");
  jokeBox.setAttribute("class", "joke");
  jokeBox.innerText = data.value;

  const deleteBox = document.createElement("button");
  deleteBox.setAttribute("class", "btnDelete");
  deleteBox.setAttribute("onclick", "deleteJoke(" + numJoke + ")");
  deleteBox.innerText = "Delete";

  jokeBox.appendChild(deleteBox);
  listJokes.appendChild(jokeBox);
  numJoke++;
}

//OBTENEMOS UN CHISTE ALEATORIO DE LA API DE CHUCK NORRIS
function getJoke() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((res) => res.json())
    .then((joke) => {
      createJokeCard(joke);
      arrayJokes.push(joke.value);
      localStorage.setItem("jokes", JSON.stringify(arrayJokes));

      showCanvas(arrayJokes);
    })
    .catch((error) => console.log("ERROR TO LOAD JOKE", error));
}

//REALIZAMOS LA GRÁFICA CON EL ID DEL CHISTE (x) Y LONGITUD DE CARACTERES (y)
function showCanvas(arrayJokes) {
  if (chart) {
    chart.destroy();
  }

  const names = [];
  const lengths = [];

  for (let i = 1; i <= arrayJokes.length; i++) {
    names.push("Joke" + i);
    lengths.push(arrayJokes[i - 1].length);
  }

  const ctx = document.getElementById("myCanvas").getContext("2d");

  const graphic = {
    labels: names,
    datasets: [
      {
        label: "Number of characters",
        data: lengths,
        backgroundColor: "rgba(205, 63, 16, 0.9)",
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 1,
      },
    ],
  };

  chart = new Chart(ctx, {
    type: "bar", // Tipo de gráfico: 'bar', 'line', 'pie', etc.
    data: graphic,
    options: {
      scales: {
        // y: {
        //   beginAtZero: true
        // }
      },
      plugins: {
        title: {
          display: true,
          text: "Graphic Chuck Norris Jokes",
        },
      },
    },
  });
}

//BORRAMOS EL CHISTE SEGÚN SU ÍNDICE DEL ARRAY DE CHISTES
function deleteJoke(idToDelete) {
  arrayJokes = arrayJokes.filter((_, index) => index != idToDelete);
  localStorage.setItem("jokes", JSON.stringify(arrayJokes));
  printJokes();
}

printJokes();
