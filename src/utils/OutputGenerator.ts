import { createWriteStream } from "fs";
import { ILogEntry } from "../types/ILogEntry";
import { logger } from "./Logger";
import Constants from "./Constants";

export class OutputGenerator {
    //Generate output file with the given entries and file path
    generateOutputFile(entries: ILogEntry[], outputFilePath: string): void {
        try {
            logger.info(
                `${Constants.GENERATING_OUTPUT_FILE_INFO} ${outputFilePath}`
            );
            const outputStream = createWriteStream(outputFilePath);
            outputStream.write(JSON.stringify(entries));
            outputStream.end();
        } catch (error) {
            logger.error(Constants.GENERATING_OUTPUT_FILE_ERROR, error);
        }
    }
}
