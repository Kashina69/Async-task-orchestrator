import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const settingsTemplate = () => ({
    delay: Math.floor(Math.random() * 400 + 100)
});

const sendJob = async (uuid) => {
    const settings = settingsTemplate();
    const res = await axios.post('http://localhost:3000/compute', { uuid, settings });
    console.log(`[SIM] Job ${uuid} →`, res.data.message);
};

(async () => {
    const uuids = [uuidv4(), uuidv4(), uuidv4(), uuidv4()];

    for (let i = 0; i < uuids.length; i++) {
        await sendJob(uuids[i]);
        await new Promise((r) => setTimeout(r, 3000));
    }
})();
