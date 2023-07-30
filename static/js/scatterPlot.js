// Function to convert string representation of numbers to actual numbers
function convertToNumber(str) {
    if (str.endsWith('K')) {
      return parseFloat(str) * 1000;
    }
    return parseInt(str);
  }
  
  // Fetch data from the server
  fetch('http://127.0.0.1:5000/games/reviews')
    .then(response => response.json())
    .then(data => {
      // Assuming the data returned from the server is in the same format as the previous sample data
      const games = data;
  
      // Convert Plays and Reviews to numbers
      games.forEach(game => {
        game.Plays = convertToNumber(game.Plays);
        game.Reviews = convertToNumber(game.Reviews);
      });
  
      // Get the canvas element
      const scatterCanvas = document.getElementById('scatterPlot');
  
      // Create the scatter plot
      new Chart(scatterCanvas, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Games',
            data: games.map(game => ({ x: game.Plays, y: 99, r: game.Reviews })),
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
            text: 'Scatter Plot of Games by Number of Plays, Rating (99), and Number of Reviews',
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
                text: 'Rating (99)',
              },
            },
          },
        },
      });
    })
    .catch(error => console.error('Error fetching data:', error));