let addToy = false;

// function createCard (toy) {
//   let card = document.createElement("div")
//   card.classList.add("card")

//   let h2 = document.createElement("h2")
//   h2.textContent = toy.name

//   let img = document.createElement("img")
//   img.classList.add("toy-avatar")
//   img.src = toy.image

//   let p = document.createElement("p")
//   p.textContent = `${toy.likes} Likes`

//   let button = document.createElement("button")
//   button.textContent = "Like ❤️"
//   button.classList.add("like-btn")
//   button.id = toy.id

//   let toyCollection = document.getElementById("toy-collection")

//   toyCollection.appendChild(card)
//   card.append (h2, img, p, button)
// }

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys") 
    .then(response => response.json())
    .then(toys => toys.forEach(toy => createCard(toy)))
    
  function createCard (toy) {
    let card = document.createElement("div")
    card.classList.add("card")
    
    let h2 = document.createElement("h2")
    h2.textContent = toy.name
    
    let img = document.createElement("img")
    img.classList.add("toy-avatar")
    img.src = toy.image
    
    let p = document.createElement("p")
    p.textContent = `${toy.likes} Likes`
    
    let button = document.createElement("button")
    button.textContent = "Like ❤️"
    button.classList.add("like-btn")
    button.id = toy.id
    
    let toyCollection = document.getElementById("toy-collection")
    
    toyCollection.appendChild(card)
    card.append (h2, img, p, button)
  }
});
