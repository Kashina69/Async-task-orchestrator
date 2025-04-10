class Queue {
    constructor(limit) {
        this.limit = limit;
        this.queue = [];
        this.runningCount = 0;
    }

    enqueue(job, onRun) {
        this.queue.push({ job, onRun });
        this.next();
    }

    next() {
        if (this.runningCount >= this.limit || this.queue.length === 0) return;

        const { job, onRun } = this.queue.shift();
        this.runningCount++;
        onRun(job);
    }

    dequeue() {
        this.runningCount = Math.max(0, this.runningCount - 1);
        this.next();
    }
}

export default Queue;
