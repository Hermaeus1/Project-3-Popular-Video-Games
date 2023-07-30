document.addEventListener("DOMContentLoaded", function () {
    function init() {
        const dropdownMenu = d3.select("#gameDropdown")
    
        // d3.json to fetch JSON data
        d3.json('http://127.0.0.1:5000/games/genrevsplays')
            .then((data) => {
            const games = data;
    
            // Create options for each game title and add to dropdown
            games.forEach((game) => {
                const title = game.Title;
                const option = document.createElement("option");
                option.value = title;
                option.textContent = title;
                dropdownMenu.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching JSON:", error);
        });       
    }
});