const express = require('express');
const cors = require('cors');
const clientRouter = require('../routes/client.router');
const sellerRouter = require('../routes/seller.router');
const authRouter = require('../routes/auth.router');
const productRouter = require('../routes/product.router');
const adminRouter = require('../routes/admin.router');
const errorMiddleware = require('../middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/seller', sellerRouter);
app.use(errorMiddleware);

module.exports = app;
