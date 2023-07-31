let selector = d3.select("#gameDropdown");

// Use the list of game names to populate the select options
d3.json("http://127.0.0.1:5000/games/genrevsplays").then((data) => {
  let games = data;

  for (let i = 0; i < games.length; i++){
    selector
      .append("option")
      .text(games[i].Title)
      .property("value", games[i].Title);
  };
});