let addToy = false;
const BASE_URL = "http://localhost:3000/toys"


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('form')

  fetchToys();

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    let newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    let reqPackage = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "POST",
      body: JSON.stringify(newToy)
    }

    fetch(BASE_URL, reqPackage)
      .then(res => res.json())
      .then(data => renderToy(data))

      document.querySelector('form').reset()
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch(BASE_URL)
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => renderToy(toy)))
}

function renderToy(toy) {
  let collection = document.querySelector('#toy-collection')

  let card = document.createElement('div')
      card.classList.add("card")

  let header = document.createElement('h2')
      header.innerHTML = toy.name

  let img = document.createElement('img')
      img.src = toy.image 
      img.classList.add("toy-avatar")

  let likes = document.createElement('p')
      likes.id = `likes-${toy.id}`
      likes.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
      button.classList.add('like-btn')
      button.innerText = "Like <3"

  card.append(header, img, likes, button)
  collection.appendChild(card)

  button.addEventListener('click', () => {increaseLikes(`likes-${toy.id}`)})
}

function increaseLikes(elementId) {
  let likes = document.getElementById(elementId)
      

  let newLikes = {
    likes: (+likes.innerText.split(" ")[0]) + 1
  }

  let reqPackage = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(newLikes)
  }

  let toyId = elementId.split("-")[1]

  fetch(BASE_URL + `/${toyId}`, reqPackage)
    .then(resp => resp.json())
    .then(toy => {
      console.log(toy, likes)
      likes.innerText = `${newLikes.likes} likes`
    })
}


