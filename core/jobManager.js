import { Worker } from 'worker_threads';
import Queue from './queue.js';
import isSettingsEqual from '../utils/uuidHelper.js';
import logger from '../utils/logger.js';

class JobManager {
    constructor() {
        this.runningJobs = new Map();
        this.queue = new Queue(4);
    }

    handleJobRequest(uuid, settings) {
        return new Promise((resolve) => {
            if (this.runningJobs.has(uuid)) {
                const existing = this.runningJobs.get(uuid);
                if (!isSettingsEqual(existing.settings, settings)) {
                    existing.worker.terminate();
                    this.runningJobs.delete(uuid);
                    logger.cancel(uuid);
                } else {
                    logger.skip(uuid);
                    return resolve('Duplicate job skipped');
                }
            }

            const job = { uuid, settings };
            this.queue.enqueue(job, (jobToRun) => this.startWorker(jobToRun));
            resolve('Job queued');
        });
    }

    startWorker({ uuid, settings }) {
        const worker = new Worker('./workers/worker.js', {
            workerData: { uuid, settings }
        });

        this.runningJobs.set(uuid, { worker, settings });

        worker.on('message', (msg) => {
            if (msg.type === 'progress') logger.progress(msg.uuid, msg.progress);
            if (msg.type === 'done') {
                logger.done(msg.uuid);
                this.runningJobs.delete(uuid);
                this.queue.next(); // Start next job in queue
            }
        });

        worker.on('error', (err) => {
            console.error(`Worker error [${uuid}]:`, err);
            this.runningJobs.delete(uuid);
            this.queue.next();
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.log(`Worker [${uuid}] stopped with exit code ${code}`);
            }
        });
    }
}

export default JobManager;
