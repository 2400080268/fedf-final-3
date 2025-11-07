# Virtual Art Gallery

A fully functional virtual art gallery website with user authentication, gallery browsing, order placement, and announcements.

## Features

- **User Authentication**: Signup and Login with name, email, and password
- **Art Gallery**: Browse and view digital artworks
- **Order Placement**: Place orders for artworks with notification popups
- **Profile**: View your orders in your profile
- **Announcements**: View gallery announcements

## Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: Local JSON files

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Start the Backend Server

From the `server` directory:
```bash
npm start
```

The server will run on `http://localhost:5000`

### 4. Start the React App

From the `client` directory:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Project Structure

```
├── server/
│   ├── server.js          # Express backend server
│   ├── data/              # JSON data files (auto-created)
│   │   ├── users.json
│   │   ├── art.json
│   │   ├── orders.json
│   │   └── announcements.json
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Gallery.js
│   │   │   ├── Profile.js
│   │   │   └── Announcements.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Default Artworks

The gallery comes with 3 default artworks:
- Stellar Night by AI Artist - $50
- Cyber City by N.E.ON - $75
- Digital Bloom by Codey - $60

## Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Log in with your credentials
3. **Browse Gallery**: View available artworks on the home page
4. **Place Order**: Click "Place Order" on any artwork (requires login)
5. **View Orders**: Check your profile to see all your orders
6. **Announcements**: View gallery announcements

## Notes

- User data is stored in local JSON files
- Passwords are stored in plain text (for demo purposes only - use bcrypt in production)
- The server automatically creates data files on first run

