// Function to convert string representation of numbers to actual numbers
function convertToNumber(str) {
    if (str.endsWith('K')) {
      return parseFloat(str) * 1000;
    }
    return parseInt(str);
}
  
// Fetch data from the server
d3.json('http://127.0.0.1:5000/games/reviews').then((data) => {
    let games = data;
  
    // Convert Plays and Reviews to numbers
    games.forEach(game => {
        game.Plays = convertToNumber(game.Plays);
        game.Reviews = convertToNumber(game.Reviews);
    });
  
    // Get the canvas element
    let scatterCanvas = document.getElementById('scatterPlot');
  
    // Create the scatter plot
    new Chart(scatterCanvas, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Games',
            data: games.map(game => ({ x: game.Plays, y: game.Reviews, title:game.Title })),
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 8,
            pointHoverRadius: 10,
          }],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Scatter Plot of Games by Number of Plays vs. Number of Reviews',
          },
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Number of Plays',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Reviews',
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.raw.title;
                },
              },
            },
          },
        },
    });
  });