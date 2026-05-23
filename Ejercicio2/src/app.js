import express from 'express';
import routes from './routes/index.routes.js';


const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/api', routes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export default app;