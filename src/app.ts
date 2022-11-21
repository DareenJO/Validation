import express from 'express';
import parkRouter from './routes/parkingRout';

const app = express();
app.use(express.json());

app.use('/api/v1/park', parkRouter);

app.listen(5000)