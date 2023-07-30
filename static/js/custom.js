// Event listener for the gameDropdown
document.getElementById("gameDropdown").addEventListener("change", function () {
    const selectedGame = this.value; // Get the selected game title
  
    // Use d3.json to fetch the JSON data
    d3.json('http://127.0.0.1:5000/games/genrevsplays')
      .then((data) => {
        // Find the selected game in the data
        const selectedGameData = data.find((game) => game.Title === selectedGame);
  
        // Update the panel with genre and plays information
        updatePanel(selectedGameData);
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  });
  
  // Function to update the panel with genre and plays information
  function updatePanel(gameData) {
    const panelGenre = document.getElementById("panelGenre");
    const panelPlays = document.getElementById("panelPlays");
  
    if (gameData) {
      panelGenre.textContent = gameData.Genres;
      panelPlays.textContent = gameData.Plays;
    } else {
      // If the selected game data is not found, reset the panel content
      panelGenre.textContent = "";
      panelPlays.textContent = "";
    }
  }

  // Function to update the panel with genre and plays information
function updatePanel(gameData) {
    const panelGenre = document.getElementById("panelGenre");
    const panelPlays = document.getElementById("panelPlays");
  
    if (gameData) {
      // Parse the genres by removing extra quotes and single quotes
      const genres = gameData.Genres.replace(/['"]/g, '').split(',').map(genre => genre.trim());
      panelGenre.textContent = genres.join(', ');
      panelPlays.textContent = gameData.Plays;
    } else {
      // If the selected game data is not found, reset the panel content
      panelGenre.textContent = "";
      panelPlays.textContent = "";
    }
}