import { cmd } from "@/cli/cmd/cmd"
import { tui } from "./app"

export const TuiThreadCommand = cmd({
  command: "$0 [project]",
  describe: "start transformers tui",
  builder: (yargs) =>
    yargs
      .positional("project", {
        type: "string",
        describe: "path to start transformers in",
      }),
  handler: async (args) => {
    await tui()
  }
})