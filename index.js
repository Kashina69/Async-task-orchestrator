import express from 'express';
import JobManager from './core/jobManager.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const jobManager = new JobManager();

app.use(bodyParser.json());

app.post('/compute', async (req, res) => {
    const { uuid, settings } = req.body;

    if (!uuid || !settings) {
        return res.status(400).json({ error: 'UUID and settings are required' });
    }

    try {
        const status = await jobManager.handleJobRequest(uuid, settings);
        res.status(202).json({ message: 'Job received', status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process job' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
