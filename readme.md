# Kraftbase Food Delivery Backend

This is the backend for a food delivery app, supporting user, restaurant, and delivery agent microservices.

## https://kraftbasefoodappbackend-production.up.railway.app/
---

## **Getting Started**

1. **Install dependencies:**  
   `npm install`

2. **Set up your `.env` file:**  
   ```
   MONGO_URI=mongodb://localhost:27017/yourdbname
   PORT=8000
   JWT_SECRET=secret_key
   ```

3. **Start the server:**  
   `npm start`

---

## **API Endpoints**

### **User Service**

| Method | Endpoint                                 | Description                                      |
|--------|------------------------------------------|--------------------------------------------------|
| POST   | `/api/user/add_user`                     | Register a new user                              |
| GET    | `/api/user/online_restaurants?hour=14:00`| Get all restaurants online at a given hour       |
| POST   | `/api/user/place_order`                  | Place an order                                   |
| PUT    | `/api/user/order/update-items`           | Update order items (user can change menu items)  |
| POST   | `/api/user/add_rating`                   | Leave ratings for orders and delivery agents     |

**Sample: Add User**
```json
POST /api/user/add_user
{
  "user_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "address": "Delhi, India"
}
```

**Sample: Get Online Restaurants**
```
GET /api/user/online_restaurants?hour=14:00
```

**Sample: Place Order**
```json
POST /api/user/place_order
{
  "user_id": "6658b5e7e2b7e2e8c8a1b2c3",
  "restaurant_id": "6658b5e7e2b7e2e8c8a1b2c4",
  "menu": [
    { "menu_id": "6658b5e7e2b7e2e8c8a1b2d1", "quantity": 2 }
  ]
}
```

**Sample: Update Order Items**
```json
PUT /api/user/order/update-items
{
  "order_id": "6658b5e7e2b7e2e8c8a1b2c6",
  "new_items": [
    { "menu_id": "6658b5e7e2b7e2e8c8a1b2d1", "quantity": 3 }
  ]
}
```

**Sample: Add Rating**
```json
POST /api/user/add_rating
{
  "user_id": "6658b5e7e2b7e2e8c8a1b2c3",
  "order_id": "6658b5e7e2b7e2e8c8a1b2c6",
  "order_rating": 5,
  "agent_rating": 4,
  "restaurant_rating": 5,
  "comment": "Great delivery!"
}
```

---

### **Restaurant Service**

| Method | Endpoint                        | Description                                      |
|--------|---------------------------------|--------------------------------------------------|
| POST   | `/api/restaurant/add_menu`      | Add a new menu item to a restaurant              |
| POST   | `/api/restaurant/add_restaurant`| Add a new restaurant                             |
| GET    | `/api/restaurant/get_menu`      | Get all menu items                               |
| GET    | `/api/restaurant/get_restaurants`| Get all restaurants                             |
| PUT    | `/api/restaurant/update_menu`   | Update menu item (name, price, availability)      |
| PUT    | `/api/restaurant/update_restaurant`| Update restaurant info (status, open hours, etc.)|
| PUT    | `/api/restaurant/update_order`  | Restaurant updates order status (`accepted`, `rejected`, `preparing`) |

**Sample: Add Menu Item**
```json
POST /api/restaurant/add_menu
{
  "name": "Veg Pizza",
  "description": "Delicious pizza with veggies",
  "price": 299,
  "available": true,
  "restaurant_id": "6658b5e7e2b7e2e8c8a1b2c4"
}
```

**Sample: Add Restaurant**
```json
POST /api/restaurant/add_restaurant
{
  "name": "Pizza Palace",
  "address": "123 Main St",
  "phone": "1234567890",
  "isOnline": true,
  "openHours": [
    { "start": "09:00", "end": "22:00" }
  ]
}
```

**Sample: Get All Menu Items**
```
GET /api/restaurant/get_menu
```

**Sample: Get All Restaurants**
```
GET /api/restaurant/get_restaurants
```

**Sample: Update Menu Item**
```json
PUT /api/restaurant/update_menu
{
  "menu_id": "6658b5e7e2b7e2e8c8a1b2d1",
  "name": "Paneer Pizza",
  "price": 349,
  "available": false,
  "description": "Now with extra paneer!"
}
```

**Sample: Update Restaurant**
```json
PUT /api/restaurant/update_restaurant
{
  "restaurant_id": "6658b5e7e2b7e2e8c8a1b2c4",
  "isOnline": false,
  "openHours": [
    { "start": "10:00", "end": "20:00" }
  ]
}
```

**Sample: Update Order Status (Restaurant)**
```json
PUT /api/restaurant/update_order
{
  "order_id": "6658b5e7e2b7e2e8c8a1b2c6",
  "status": "accepted"
}
```
_Allowed status: `"accepted"`, `"rejected"`, `"preparing"`_

---

### **Delivery Agent Service**

| Method | Endpoint                        | Description                                      |
|--------|---------------------------------|--------------------------------------------------|
| POST   | `/api/agent/add_agent`          | Add a new delivery agent                         |
| GET    | `/api/agent/get_agents`         | Get all delivery agents                          |
| PUT    | `/api/agent/update_agent`       | Update delivery agent info (name, phone, status) |
| PUT    | `/api/agent/order/update-status`| Agent updates order status (`delivering`, `delivered`, `cancelled`) |

**Sample: Add Delivery Agent**
```json
POST /api/agent/add_agent
{
  "name": "Ravi Kumar",
  "phone": "9876543210"
}
```

**Sample: Get All Delivery Agents**
```
GET /api/agent/get_agents
```

**Sample: Update Delivery Agent**
```json
PUT /api/agent/update_agent
{
  "agent_id": "6658b5e7e2b7e2e8c8a1b2e1",
  "name": "Ravi K.",
  "phone": "9123456789",
  "isAvailable": false
}
```

**Sample: Update Order Status (Agent)**
```json
PUT /api/agent/order/update-status
{
  "order_id": "6658b5e7e2b7e2e8c8a1b2c6",
  "status": "delivered"
}
```
_Allowed status: `"delivering"`, `"delivered"`, `"cancelled"`_

---

## **Order Status Flow**

- **User** places order → status: `placed`
- **Restaurant** updates status: `accepted`, `rejected`, `preparing`
- **Agent** updates status: `delivering`, `delivered`, `cancelled`

---

## **Ratings**

- Users can rate both restaurants and delivery agents after order completion.
- Ratings are averaged and stored in the respective documents.

---

## **Notes**

- All endpoints expect and return JSON.
- Use valid MongoDB ObjectIds for all IDs.
- No authentication is implemented (open API for assignment scope).

---

## **Contact**

For any issues, please contact the project maintainer.
