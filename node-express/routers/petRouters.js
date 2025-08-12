import express from 'express';
import axios from 'axios';

const petRouters = express.Router();

petRouters.get('/pet/findByStatus', async (req, res) => {
    try {
        const { status } = req.query; // get ?status= from query
        const url = `https://petstore.swagger.io/v2/pet/findByStatus?status=${encodeURIComponent(status || 'available')}`;
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: "Back-end Error" });
        } else {
            res.status(500).json({ message: "Back-end Error 500" });
        }
    }
});

export default petRouters;
