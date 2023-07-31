// Function to fetch JSON data from the server using d3.json()
async function fetchDataFromServer() {
    try {
      const jsonData = await d3.json('http://127.0.0.1:5000/games/genreratings'); 
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  // Function to create the bar chart
  async function createBarChart() {
    // Fetch JSON data from the server using d3.json()
    const jsonData = await fetchDataFromServer();
  
    // Filter data based on the rating condition (greater than 4.5)
    const filteredData = jsonData.filter(item => item.Rating > 4.5);
  
    // Count the number of games in each genre
    const genreCounts = {};
    filteredData.forEach(item => {
      const genres = item.Genres.split(',').map(genre => genre.trim());
      genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });
  
    // Generate an array of colors for the genres
    const colorPalette = d3.schemeCategory10; 
    
    // Get the canvas element
    const barPlotCanvas = document.getElementById('barChart');
  
    // Create the bar chart
    const barChart = new Chart(barPlotCanvas, {
      type: 'bar',
      data: {
        labels: Object.keys(genreCounts),
        datasets: [
          {
            label: 'Number of Games',
            data: Object.values(genreCounts),
            backgroundColor: Object.keys(genreCounts).map((genre, index) => colorPalette[index % colorPalette.length]),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 10,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          y: {
            ticks: {
              beginAtZero: true, // Start y-axis from 0
              font: {
                size: 10,
              },
            },
          },
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 10,
          },
        },
      },
    });
  }
  
  // Call the function to create the bar chart when the DOM is ready
  document.addEventListener('DOMContentLoaded', createBarChart);