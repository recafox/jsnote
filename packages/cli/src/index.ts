#!/usr/bin/env node
import { program } from 'commander';
import { serveCommand } from './commands/serve';

program.addCommand(serveCommand);

// the arguments of command
// lerna add "--scope=cli" <- this is an argument
program.parse(process.argv);
