import express from 'express';
import cors from 'cors';
import petRouter from "./routers/petRouters.js"

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/api', petRouter); // all /api/pet/findByStatus calls will be proxied

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
