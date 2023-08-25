// Import necessary modules and libraries
const express = require('express'); // Express.js for server
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const bcrypt = require('bcryptjs'); // For hashing passwords

const app = express();
app.use(bodyParser.json());

// Mock database for demonstration purposes
const usersDB = [];
const itemsDB = [];

// Middleware to check if a user is authenticated
function authenticateUser(req, res, next) {
    // Check if user is logged in by verifying their session or token
    // For simplicity, we're not implementing real authentication here
    const isLoggedIn = true; // Placeholder for actual authentication check

    if (isLoggedIn) {
        next(); // Move to the next middleware or route handler
    } else {
        res.status(401).json({ message: 'Authentication required' });
    }
}

// Endpoint to create a new user account
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Store the user in the database
    usersDB.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
});

// Endpoint for user login
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Find the user in the database by username
//     const user = usersDB.find(user => user.username === username);

//     if (user && bcrypt.compareSync(password, user.password)) {
//         // Create a session/token and send it back to the client for future authenticated requests
//         const sessionToken = 'example_session_token'; // Replace with actual token generation
//         res.json({ message: 'Login successful', token: sessionToken });
//     } else {
//         res.status(401).json({ message: 'Login failed' });
//     }
// });

function signIn (username,password) {   

    const usersDB = [{username: "teste", password: bcrypt.hashSync("senha", 10)}];

    // Find the user in the database by username
    const user = usersDB.find(user => user.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        // Create a session/token and send it back to the client for future authenticated requests
        const sessionToken = 'example_session_token'; // Replace with actual token generation
        return { message: 'Login successful', token: sessionToken };
        
    } else {
        return { message: 'Login failed' };
    }
}

app.post('/login', (req,res)=> {
    const { username, password } = req.body;
    var message = signIn(username,password)
    if (message.token) {
        res.json(message);
    } else {
        res.json(message).status(401);
    }
});

// Protected route: Create an item (requires authentication)
app.post('/items', authenticateUser, (req, res) => {
    const { title, description } = req.body;

    // Store the item in the database
    itemsDB.push({ title, description });

    res.status(201).json({ message: 'Item created successfully' });
});

// Protected route: Get all items (requires authentication)
app.get('/items', authenticateUser, (req, res) => {
    res.json(itemsDB);
});

// Protected route: Update an item (requires authentication)
app.put('/items/:itemName', authenticateUser, (req, res) => {
    const itemName = req.params.itemName;
    const { title, description } = req.body;

    // Find the item in the database by Title and update its properties
    const item = itemsDB.find(item => item.title === itemName);
    if (item) {
        item.title = title;
        item.description = description;
        res.json({ message: 'Item updated successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Protected route: Delete an item (requires authentication)
app.delete('/items/:itemName', authenticateUser, (req, res) => {
    const itemName = req.params.itemName;

    // Find the index of the item in the database by ID and remove it
    const itemIndex = itemsDB.findIndex(item => item.title === itemName);
    
    if (itemIndex !== -1) {
        itemsDB.splice(itemIndex, 1);
        res.json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = signIn; 