# Kinesis Logger

Read from the specified Kinesis stream and log messages to the console.

## Usage

```txt
kinesis-logger <name> [options]

read from the specified kinesis stream

Positionals:
  name  the name of the kinesis stream                                  [string]

Options:
  --version  Show version number                                       [boolean]
  --region   AWS region of kinesis stream
                                      [string] [required] [default: "us-west-2"]
  --offset   number of seconds back in time to start reading from
                                                [number] [required] [default: 0]
  --help     Show help                                                 [boolean]
```
