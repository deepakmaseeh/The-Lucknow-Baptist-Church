import fs from 'fs';
try {
    fs.writeFileSync('debug-output.txt', 'Node is working\n' + process.version);
    console.log('Debug file written');
} catch (err) {
    console.error(err);
}
