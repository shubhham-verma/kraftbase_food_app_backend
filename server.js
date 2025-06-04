const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connect_db = require('./config/db');

dotenv.config();

connect_db();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 8000;
// const PORT = 8000; 

// app.use('/api/add', require('./routes/user_service/add_user_route'))
// app.use('/api/get', require('./routes/user_service/get_restaurant_route'))
// app.use('/api/order', require('./routes/user_service/place_order'));

// app.use('/api/rating', require('./routes/user_service/add_rating'));

// app.use('/api/restaurant', require('./routes/restaurant_service/get_restaurants.js'));
// app.use('/api/restaurant', require('./routes/restaurant_service/get_menus.js'));
// app.use('/api/restaurant', require('./routes/restaurant_service/add_menu.js'));
// app.use('/api/restaurant', require('./routes/restaurant_service/add_restaurant.js'));
// app.use('/api/restaurant', require('./routes/restaurant_service/update_restaurant.js'));
// app.use('/api/restaurant', require('./routes/restaurant_service/update_menu.js'));

// app.use('/api/agent', require('./routes/agent_service/get_agents.js'));
// app.use('/api/agent', require('./routes/agent_service/add_agent.js'));
// app.use('/api/agent', require('./routes/agent_service/update_agent.js'));

app.use('/api/user', require('./routes/user_service'));
app.use('/api/restaurant', require('./routes/restaurant_service'));
app.use('/api/agent', require('./routes/agent_service'));


app.get('/', (req, res) => {
    // res.send('Server is running');
    return res.status(200).json({
        message: 'Server is running',
        status: 'success change'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

