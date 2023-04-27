/*
Things to-do for this lab:
=============================================
[X] - Fetch new cards
[X] - Make new cards with proper elements 
[] - Add a new toy with POST. Make sure it adds to the page without reloading
[] - Increase a toys likes via the "like button" Do this with PATCH. Make sure it add without reloading the page 
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

//Likes button event listener
  // document.querySelector("")
//Event Handlers 
// ============================================
  function handleSubmit (e) {
    e.preventDefault()

    let formData = Object.fromEntries(new FormData(e.target))

    renderToyCards(formData)
    makeNewToy(formData)
  }
// Fetches 
// ============================================
// Fetch a new toy
  function getAllToys () {
    fetch("http://localhost:3000/toys") 
      .then(response => response.json())
      .then(toys => toys.forEach(toy => renderToyCards(toy)))
  }
  function makeNewToy (formData) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        ...formData,
        "Likes": 0
      })
    })
      .then(response => response.json())
      .then(newToy => renderToyCards(newToy))
  }
// Render Dom Functions
// ============================================
// Make a toy card with required elements
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
    p.textContent = `${toy.likes} Likes`
    
    let button = document.createElement("button")
    button.textContent = "Like ❤️"
    button.classList.add("like-btn")
    button.id = toy.id
    
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
