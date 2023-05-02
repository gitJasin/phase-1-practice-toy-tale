/*
Things to-do for this lab:
=============================================
[X] - Fetch new cards
[X] - Make new cards with proper elements 
[X] - Add a new toy with POST. Make sure it adds to the page without reloading
[X] - Increase a toys likes via the "like button" Do this with PATCH. Make sure it add without reloading the page 
*/

let addToy = false;

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

// Event listeners 
// ============================================
//Create toy button event listener, form with submit button
  document.querySelector("form.add-toy-form").addEventListener("submit", handleSubmit)

//Event Handlers 
// ============================================
  function handleSubmit (e) {
    e.preventDefault()

    let formData = Object.fromEntries(new FormData(e.target))
    let toyObj = {
      ...formData,
      likes: 0
    }

    renderToyCards(toyObj)
    postNewToy(toyObj)
  }
// Fetches 
// ============================================
// Fetch a new toy
  function getAllToys () {
    fetch("http://localhost:3000/toys") 
      .then(response => response.json())
      .then(toys => toys.forEach(toy => renderToyCards(toy)))
  }
  //POSTs a new toy 
  function postNewToy (toyObj) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify(toyObj)
    })
      .then(response => response.json())
      .then(newToy => renderToyCards(newToy))
    }
  //PATCHs toy likes +1
  function updateToyLikes (toy) {
    console.log(toy)
    let numberOfLikes = toy.likes
    console.log(numberOfLikes)
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes += 1
      })
    })
      .then(response => response.json())
      .then(updatedToy => document.getElementById(`${updatedToy.id}`).textContent = `${updatedToy.likes} Likes`) 
    }

// Render DOM Functions
// ============================================
// Make a toy card with required elements and append it to the DOM
  function renderToyCards (toy) {
    // Build toy card
    let card = document.createElement("div")
    card.classList.add("card")
    
    let h2 = document.createElement("h2")
    h2.textContent = toy.name
    
    let img = document.createElement("img")
    img.classList.add("toy-avatar")
    img.src = toy.image
    
    let p = document.createElement("p")
    p.id = toy.id
    p.textContent = `${toy.likes} Likes`
    
    let button = document.createElement("button")
    button.textContent = "Like ❤️"
    button.classList.add("like-btn")
    button.addEventListener("click", () => {
      updateToyLikes(toy)
    })

    let toyCollection = document.getElementById("toy-collection")
    // Add card to toy collection div
    toyCollection.appendChild(card)
    card.append (h2, img, p, button)
  }

// Initial Render 
  function initialize () {
    getAllToys()
  }
  initialize()
});
