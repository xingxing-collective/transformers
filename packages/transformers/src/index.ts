import yargs from 'yargs'
import { hideBin } from "yargs/helpers"


const cli = yargs(hideBin(process.argv))
  .parserConfiguration({ "populate--": true })
  .scriptName("transformers")
  .wrap(100)
  .help("help", "show help")
  .alias("help", "h")

try {
  await cli.parse()
} catch (error) {
  process.exitCode = 1
} finally {
  // Some subprocesses don't react properly to SIGTERM and similar signals.
  // Most notably, some docker-container-based MCP servers don't handle such signals unless
  // run using `docker run --init`.
  // Explicitly exit to avoid any hanging subprocesses.
  process.exit()
}
