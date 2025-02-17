 Whack-A-Mole Multiplayer Game

This is a multiplayer Whack-A-Mole game built using ReactJS, NodeJS, Framer Motion, TailwindCSS, MongoDB, and WebSockets. Players can create or join rooms, compete in real-time to click on moles that appear on the board, and see their scores update live.

 Features

Multiplayer game: Play with friends in real-time.
Scoreboard: See real-time score updates for all players.
Points System: Gain points for clicking moles, lose points for clicking empty spaces or cacti.
Individual Timer: See how much playing time is left.

 Project Structure

Backend: NodeJS, WebSockets, MongoDB
Frontend: ReactJS, Framer Motion, TailwindCSS
 System Design

Data Flow

1. Create Room: 
    User creates a room and receives a unique room ID.
    Room details are sent to the server.
2. Join Room: 
    Other users join the room using the room ID.
    Server updates all users in the room.
3. Start Game: 
   Room creator starts the game.
     Server broadcasts the game start and initializes the game board.
4. Gameplay: 
    Users click on the game board.
    Server checks for valid clicks, updates scores, and broadcasts updates.
5. End Game: 
   Timer ends.
     Server calculates final scores and broadcasts the winner.

Usage

1.  On the homepage, choose to create or join a room.
2.  If creating a room, share the room ID with friends.
3.  Join a room using the provided room ID.
4.  When all players are ready, the room creator starts the game.
5.  Click on the moles as they appear to earn points. Avoid clicking on empty spaces or cacti.
6.  The game ends after one minute, and the player with the highest score wins.
