#!/usr/bin/env node

const AWS = require('aws-sdk');
const { KinesisReadable } = require('kinesis-streams');
const { subSeconds } = require('date-fns');
const yargs = require('yargs');

const readStream = async args => {
  const client = new AWS.Kinesis({ region: args.region });
  const timestamp = subSeconds(new Date(), args.offset);
  const reader = new KinesisReadable(client, args.name, {
    logger: console,
    parser: JSON.parse,
    restartOnClose: true,
    ShardIteratorType: 'AT_TIMESTAMP',
    Timestamp: timestamp
  });

  reader.on('data', data => {
    console.log(data);
  });
};

yargs
  .scriptName('kinesis-logger')
  .usage('$0 name [args]')
  .command({
    command: '$0 <name> [options]',
    describe: 'read from the specified kinesis stream',
    builder: yargs =>
      yargs.positional('name', {
        demandOption: true,
        describe: 'the name of the kinesis stream',
        type: 'string'
      }),
    handler: readStream
  })
  .demandCommand(1)
  .option('region', {
    demandOption: true,
    default: 'us-west-2',
    describe: 'AWS region of kinesis stream',
    type: 'string'
  })
  .option('offset', {
    demandOption: true,
    default: 0,
    describe: 'number of seconds back in time to start reading from',
    type: 'number'
  })
  .help().argv;
