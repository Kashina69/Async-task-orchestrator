import { parentPort, workerData } from 'worker_threads';

let progress = 0;
const { uuid, settings } = workerData;

const interval = setInterval(() => {
    progress += 10;
    parentPort.postMessage({ type: 'progress', uuid, progress });

    if (progress >= 100) {
        clearInterval(interval);
        parentPort.postMessage({ type: 'done', uuid });
    }
}, settings.delay || 500);
