import fs from 'fs';
import dotenv from 'dotenv';
import util from 'util';

const logFile = fs.createWriteStream('server-console.log', { flags: 'a' });
const logStdout = process.stdout;
const logStderr = process.stderr;

console.log = function (...args) {
    logFile.write(util.format.apply(null, args) + '\n');
    logStdout.write(util.format.apply(null, args) + '\n');
};
console.error = function (...args) {
    logFile.write(util.format.apply(null, args) + '\n');
    logStderr.write(util.format.apply(null, args) + '\n');
};

// Log errors to file
const logError = (error) => {
    const errorMsg = `[${new Date().toISOString()}] Error: ${error.stack || error}\n`;
    fs.appendFileSync('server-error.log', errorMsg);
    console.error(errorMsg);
};

process.on('uncaughtException', (err) => {
    logError(err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logError(reason);
    process.exit(1);
});

console.log('Starting server wrapper...');
dotenv.config();
console.log('Wrapper loaded PORT:', process.env.PORT);

try {
    await import('./index.js');
} catch (error) {
    logError(error);
    process.exit(1);
}
