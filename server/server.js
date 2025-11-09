const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to accept requests from your Vercel frontend
app.use(cors({
  origin: ['https://fedf-final-3-rfng6h798-2400080268s-projects.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Helper functions to read/write to our JSON "databases"
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const readData = (file) => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return [];
  }
};

const writeData = (file, data) => {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Initialize default data files
const initializeData = () => {
  const usersPath = path.join(dataDir, 'users.json');
  const artPath = path.join(dataDir, 'art.json');
  const ordersPath = path.join(dataDir, 'orders.json');
  const announcementsPath = path.join(dataDir, 'announcements.json');

  if (!fs.existsSync(usersPath)) {
    writeData('users.json', []);
  }
  if (!fs.existsSync(artPath)) {
    const defaultArt = [
      { "id": "a1", "title": "Stellar Night", "artist": "AI Artist", "price": 50, "image": "https://via.placeholder.com/300" },
      { "id": "a2", "title": "Cyber City", "artist": "N.E.ON", "price": 75, "image": "https://via.placeholder.com/300" },
      { "id": "a3", "title": "Digital Bloom", "artist": "Codey", "price": 60, "image": "https://via.placeholder.com/300" }
    ];
    writeData('art.json', defaultArt);
  }
  if (!fs.existsSync(ordersPath)) {
    writeData('orders.json', []);
  }
  if (!fs.existsSync(announcementsPath)) {
    const defaultAnnouncements = [
      { "id": "ann1", "title": "Welcome to Virtual Art Gallery", "content": "Explore our collection of digital artworks!", "date": new Date().toISOString() },
      { "id": "ann2", "title": "New Collection Coming Soon", "content": "Stay tuned for our latest digital art pieces!", "date": new Date().toISOString() }
    ];
    writeData('announcements.json', defaultAnnouncements);
  }
};

initializeData();

// --- API Endpoints ---

// 1. Signup
app.post('/signup', (req, res) => {
  const { name, email, phone, address, city, country, dateOfBirth, password } = req.body;
  const users = readData('users.json');
  
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = { 
    id: Date.now().toString(), 
    name, 
    email, 
    phone: phone || '',
    address: address || '',
    city: city || '',
    country: country || '',
    dateOfBirth: dateOfBirth || '',
    password 
  };
  users.push(newUser);
  writeData('users.json', users);
  
  console.log("New user signed up:", { id: newUser.id, name: newUser.name, email: newUser.email });
  res.status(201).json({ message: "User created successfully" });
});

// 2. Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readData('users.json');
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const userToSend = { 
    id: user.id, 
    name: user.name, 
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    country: user.country || '',
    dateOfBirth: user.dateOfBirth || ''
  };
  console.log("User logged in:", userToSend);
  res.status(200).json({ message: "Login successful", user: userToSend });
});

// 3. Get All Art
app.get('/api/gallery', (req, res) => {
  const art = readData('art.json');
  res.status(200).json(art);
});

// 4. Place an Order
app.post('/api/order', (req, res) => {
  const { userId, artId, artTitle } = req.body;
  const orders = readData('orders.json');
  
  const newOrder = { 
    orderId: `ord-${Date.now()}`, 
    userId, 
    artId, 
    artTitle, 
    orderDate: new Date().toISOString() 
  };
  
  orders.push(newOrder);
  writeData('orders.json', orders);
  
  console.log("New order placed:", newOrder);
  res.status(201).json({ message: "Order placed successfully!", order: newOrder });
});

// 5. Get My Orders
app.get('/api/my-orders/:userId', (req, res) => {
  const { userId } = req.params;
  const orders = readData('orders.json');
  
  const myOrders = orders.filter(order => order.userId === userId);
  res.status(200).json(myOrders);
});

// 6. Get Announcements
app.get('/api/announcements', (req, res) => {
  const announcements = readData('announcements.json');
  res.status(200).json(announcements);
});

// Root route - API info
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ 
    message: 'Virtual Art Gallery API Server',
    endpoints: {
      'POST /signup': 'Create a new user account',
      'POST /login': 'Login with email and password',
      'GET /api/gallery': 'Get all artworks',
      'POST /api/order': 'Place an order',
      'GET /api/my-orders/:userId': 'Get user orders',
      'GET /api/announcements': 'Get announcements'
    },
    note: 'Access the React app at http://localhost:3000'
  });
});

// If a client build exists, serve it (useful for deploying server + client together)
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server accessible on all network interfaces`);
});

