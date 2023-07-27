from flask import Flask, jsonify
import sqlite3
import pandas as pd

app = Flask(__name__)

#Below code pulls all the games by Title in alphabetical order
@app.route('/games')
def display_games():
    # Create a connection to the SQLite database
    conn = sqlite3.connect('games.db')

    # Query the 'games' table with any parameter you need
    query = "SELECT Title FROM games ORDER BY Title;"
    df = pd.read_sql_query(query, conn)

    # Close the connection
    conn.close()

    # Convert the DataFrame to a dictionary to make it easier to work with in Flask
    games_dict = df.to_dict('records')

    # Return the games dictionary as JSON
    return jsonify(games_dict)

#Below code pulls all the games by title and rating and displays by rating in descending order
@app.route('/games/rating')
#Define a new function
def display_games_ratings():
    # Create a connection to the SQLite database
    conn = sqlite3.connect('games.db')

    # Query the 'games' table with any parameter you need
    query = "SELECT Title, Rating FROM games ORDER BY Rating DESC;"
    df = pd.read_sql_query(query, conn)

    # Close the connection
    conn.close()

    # Convert the DataFrame to a dictionary to make it easier to work with in Flask
    games_dict = df.to_dict('records')

    # Return the games dictionary as JSON
    return jsonify(games_dict)

#Below code pulls all the games titles, reviews, and plays and displays all games with more than 0 reviews by reviews in descending order
@app.route('/games/reviews')
#Define a new function
def display_games_reviews():
    # Create a connection to the SQLite database
    conn = sqlite3.connect('games.db')

    # Query the 'games' table with any parameter you need
    query = "SELECT Title, Reviews, Plays FROM games WHERE Reviews >0 ORDER BY Reviews DESC;"
    df = pd.read_sql_query(query, conn)

    # Close the connection
    conn.close()

    # Convert the DataFrame to a dictionary to make it easier to work with in Flask
    games_dict = df.to_dict('records')

    # Return the games dictionary as JSON
    return jsonify(games_dict)


#Below code pulls all the games titles and plays then displays all games with more than 100 plays by plays in descending order
@app.route('/games/plays')
#Define a new function
def display_games_plays():
    # Create a connection to the SQLite database
    conn = sqlite3.connect('games.db')

    # Query the 'games' table with any parameter you need
    query = "SELECT Title, Plays FROM games WHERE Plays >100 ORDER BY Plays DESC;"
    df = pd.read_sql_query(query, conn)

    # Close the connection
    conn.close()

    # Convert the DataFrame to a dictionary to make it easier to work with in Flask
    games_dict = df.to_dict('records')

    # Return the games dictionary as JSON
    return jsonify(games_dict)

#Below code pulls all the games titles, genres, and plays and sorts them by plays in numerical descending order filtering all games with less than 100 plays
@app.route('/games/genrevsplays')
#Define a new function
def display_games_genrevsplays():
    # Create a connection to the SQLite database
    conn = sqlite3.connect('games.db')

    # Query the 'games' table with any parameter you need
    query = "SELECT Title, Genres, Plays FROM games WHERE Plays >= 100 ORDER BY Plays DESC;"
    df = pd.read_sql_query(query, conn)

    # Close the connection
    conn.close()

    # Convert the DataFrame to a dictionary to make it easier to work with in Flask
    games_dict = df.to_dict('records')

    # Return the games dictionary as JSON
    return jsonify(games_dict)

#Below code pulls all the games titles, genres, and ratings and sorts them by ratings in numerical descending order filtering all games with a rating of 4.0 or higher
@app.route('/games/genreratings')
#Define a new function
def display_games_genreratings():
    # Create a connection to the SQLite database
    conn = sqlite3.connect('games.db')

    # Query the 'games' table with any parameter you need
    query = "SELECT Title, Genres, Rating FROM games WHERE Rating >= 4.0 ORDER BY Rating DESC;"
    df = pd.read_sql_query(query, conn)

    # Close the connection
    conn.close()

    # Convert the DataFrame to a dictionary to make it easier to work with in Flask
    games_dict = df.to_dict('records')

    # Return the games dictionary as JSON
    return jsonify(games_dict)

#Following code allows the user to input a number they want for the top played however many games they choose
@app.route('/games/top/<int:num>')
def display_games_top10(num):
    # Create a connection to the SQLite database
    conn = sqlite3.connect('games.db')

    # Query the 'games' table with any parameter you need
    query = "SELECT Title, Plays FROM games ORDER BY Plays DESC LIMIT ?;"
    df = pd.read_sql_query(query, conn, params=(num,))

    # Close the connection
    conn.close()

    # Convert the DataFrame to a dictionary to make it easier to work with in Flask
    games_dict = df.to_dict('records')

    # Return the games dictionary as JSON
    return jsonify(games_dict)

if __name__ == "__main__":
    app.run(debug=True)