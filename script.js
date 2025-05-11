// Handle registration
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Registration successful!');
  } else {
    alert('Please fill in both fields!');
  }
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (username === storedUsername && password === storedPassword) {
    alert('Login successful!');
  } else {
    alert('Incorrect username or password!');
  }
});

// Handle search and filter
document.getElementById('search').addEventListener('input', filterRecipes);
document.getElementById('categoryFilter').addEventListener('change', filterRecipes);

function filterRecipes() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value;
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  const filteredRecipes = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchTerm) && 
      (categoryFilter === "" || recipe.category === categoryFilter);
  });

  displayRecipes(filteredRecipes);
}

// Display recipes
function displayRecipes(recipes) {
  const recipeList = document.getElementById('recipeList');
  recipeList.innerHTML = '';
  
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}" alt="${recipe.name}">
      <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
    `;
    recipeList.appendChild(recipeCard);
  });
}

// View recipe
function viewRecipe(id) {
  const recipe = JSON.parse(localStorage.getItem('recipes'))[id];
  window.location.href = `recipe-detail.html?id=${id}`;
}

// Handle saving recipe
document.getElementById('saveRecipe').addEventListener('click', function() {
  const recipe = getRecipeFromLocalStorage();
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  savedRecipes.push(recipe);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  alert('Recipe saved!');
});

// Get recipe data from localStorage
function getRecipeFromLocalStorage() {
  const id = window.location.search.split('=')[1];
  return JSON.parse(localStorage.getItem('recipes'))[id];
}

