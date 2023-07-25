from flask import Flask, jsonify
import sqlite3
import pandas as pd

app = Flask(__name__)

@app.route('/games')
def display_games():
    # Create a connection to the SQLite database
    conn = sqlite3.connect('games.db')

    # Query the 'games' table with any parameter you need
    query = "SELECT * FROM games where Title == 'Elden Ring'"
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