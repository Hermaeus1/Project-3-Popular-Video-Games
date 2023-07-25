import pandas as pd
import sqlite3

# Read the CSV data
df = pd.read_csv('Games.csv')

# Create a connection to a SQLite database
conn = sqlite3.connect('games.db')

# Write the data to a table named 'games'
df.to_sql('games', conn, if_exists='replace', index=False)

# Commit changes and close the connection
conn.commit()
conn.close()