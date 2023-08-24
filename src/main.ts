import { LogParser } from "./services/logParser/LogParser";
import { OutputGenerator } from "./utils/OutputGenerator";
import { CommandLineParser } from "./utils/CommandLineParser";
import { logger } from "./utils/Logger";
import { ILogEntry } from "./types/ILogEntry";
import Constants from "./utils/Constants";

export class ParserApp {
    constructor(
        private LogParser: LogParser,
        private OutputGenerator: OutputGenerator,
        private CommandLineParser: CommandLineParser
    ) {
        this.LogParser = LogParser;
        this.OutputGenerator = OutputGenerator;
        this.CommandLineParser = CommandLineParser;
    }

    async main(): Promise<void> {
        try {
            const inputFilePath: string =
                this.CommandLineParser.getInputFilePath();
            const outputFilePath: string =
                this.CommandLineParser.getOutputFilePath();

            if (!inputFilePath || !outputFilePath) {
                logger.error(Constants.FILE_PATH_NOT_PROVIDED_ERROR);
                return;
            }

            let logEntries: ILogEntry[] = await this.LogParser.parseLogFile(
                inputFilePath
            );
            let errorEntries: ILogEntry[] = [];
            if (logEntries && logEntries.length > 0) {
                errorEntries = this.LogParser.filterErrorEntries(logEntries);
            }

            if (errorEntries && errorEntries.length > 0) {
                this.OutputGenerator.generateOutputFile(
                    errorEntries,
                    outputFilePath
                );
            }
        } catch (error) {
            logger.error(Constants.MAIN_FUNCTION_ERROR, error);
        }
    }
}
