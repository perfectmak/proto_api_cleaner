const fs = require('fs');

// This regex searches for occurrences of annotations.proto and google.api.http options and removes them
const apiAnnotationRegex = new RegExp(`(import "google/api/annotations.proto";|(option \\(google.api.http\\) = \\{(\\n){0,1}(.*: .*|\\n)*.*\\};))`, 'g');

const argv = require('yargs')
  .usage('Usage: $0 -p [protoPath] -o [outputPath]')
  .demandOption(['proto'])
  .alias('p', 'proto')
  .alias('o', 'out')
  .describe('p', 'Input path to Protocol Buffer file')
  .describe('o', 'Optional path to output converted file or else it overwrites input file')
  .argv

const protoPath = argv.proto;
const outputPath = argv.out || protoPath;

const protoContent = fs.readFileSync(protoPath);
const updatedProtoContent = protoContent.toString('utf-8').replace(apiAnnotationRegex, '');

fs.writeFileSync(outputPath, updatedProtoContent)

console.log(`Cleaning Complete. File output to: ${outputPath}`)
