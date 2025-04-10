import chalk from "chalk"

export default {
    progress(uuid, progress) {
        console.log(chalk.blue(`[WORKER ${uuid}] Progress: ${progress}%`));
    },
    done(uuid) {
        console.log(chalk.green(`[WORKER ${uuid}] Done ✅`));
    },
    cancel(uuid) {
        console.log(chalk.red(`[WORKER ${uuid}] Cancelled 🚫`));
    },
    skip(uuid) {
        console.log(chalk.yellow(`[WORKER ${uuid}] Skipped (duplicate)`));
    }
};
