require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const connection = require('./config/db'); 
const { userRouter } = require("./routes/user.router");
const { cartRouter } = require("./routes/cart.router");
const { menRouter } = require("./routes/men.router");
const { ladiesRouter } = require("./routes/ladies.router");
const { DividendRouter } = require("./routes/dividend.router");
const { homeRouter } = require("./routes/home.router");
const { kidRouter } = require("./routes/kids.router");
const { saleRouter } = require("./routes/sale.router");
const { sportRouter } = require("./routes/sports.router");
const { authenticate } = require("./middlewares/auth.middlewares");


app.use(cors({
  origin: 'https://fabulous-biscuit-bdef63.netlify.app'
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Server is running fine ...`);
});
const contactInfo = {
    email: 'support@example.com',
    phone: '+1 234 567 890',
    address: '1234 Fashion St, Style City, SC 56789',
  };
  
  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'To track your order, log in to your account and navigate to the Orders section. You can view the status of your order there.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase. Please visit our Returns page for more information and to initiate a return.',
    },
    {
      question: 'How can I change my order?',
      answer: 'Once an order is placed, it cannot be changed. If you need to modify your order, please contact our support team as soon as possible.',
    },
  ];

  app.get('/api/contact-info', (req, res) => {
    res.json(contactInfo);
  });
  
  app.get('/api/faqs', (req, res) => {
    res.json(faqs);
  });
// for all the user Routes
app.use("/user", userRouter);
// for all the products Routes
app.use("/products/men", menRouter);
app.use("/products/ladies", ladiesRouter);
app.use("/products/dividends", DividendRouter);
app.use("/products/home", homeRouter);
app.use("/products/kids", kidRouter);
app.use("/products/sale", saleRouter);
app.use("/products/sport", sportRouter);
// for all the cart Routes

app.use("/cart", authenticate, cartRouter);


app.listen(PORT, async () => {
    try {
        await connection; 
        console.log(`Server is running on port ${PORT} and database also connected...`);
    } catch (error) {
        console.error(`Failed to connect to the database:`, error);
    }
});
