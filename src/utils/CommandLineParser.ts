import { option } from "yargs";
import { logger } from "./Logger";
import Constants from "./Constants";

//Parse command line arguments
export class CommandLineParser {
    private _argv: any;

    constructor() {
        this.parseCommandLineArgs();
    }

    parseCommandLineArgs = () => {
        try {
            this._argv = option("input", {
                alias: "i",
                description: Constants.INPUT_FILE_PATH,
                type: "string",
            })
                .option("output", {
                    alias: "o",
                    description: Constants.OUTPUT_FILE_PATH,
                    type: "string",
                })
                .parseSync();
        } catch (error) {
            logger.error(Constants.PARSING_CMD_LINE_ERROR, error);
            throw new Error(Constants.PARSING_CMD_LINE_ERROR);
        }
    };

    getInputFilePath() {
        return this._argv.input;
    }
    getOutputFilePath() {
        return this._argv.output;
    }
}
