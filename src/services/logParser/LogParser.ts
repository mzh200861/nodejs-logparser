import { createReadStream } from "fs";
import { createInterface } from "readline";
import { ILogEntry } from "../../types/ILogEntry";
import { ILogParser } from "../../types/ILogParser";
import { logger } from "../../utils/Logger";
import Constants from "../../utils/Constants";

export class LogParser implements ILogParser {
    // Parses a log file and returns an array of log entries
    async parseLogFile(filePath: string): Promise<ILogEntry[]> {
        try {
            const logEntries: ILogEntry[] = [];
            logger.info(`${Constants.PARSING_LOG_FILE_INFO} ${filePath}`);
            const inputStream = createReadStream(filePath);
            const readLine = createInterface({
                input: inputStream,
                crlfDelay: Infinity,
            });
            for await (let line of readLine) {
                logEntries.push(this.parseLine(line));
            }
            return logEntries;
        } catch (error) {
            logger.error(Constants.PARSING_LOG_FILE_ERROR, error);
            throw new Error(Constants.PARSING_LOG_FILE_ERROR);
        }
    }
    // Parses a single log line and returns a log entry
    parseLine(line: string): ILogEntry {
        try {
            const [timeStampStr, loglevel, detailObject] = line.split(" - ");
            const timestamp = Date.parse(timeStampStr);
            const { transactionId, err } = JSON.parse(detailObject);
            return { timestamp, transactionId, loglevel, err };
        } catch (error) {
            logger.error(`${Constants.PARSING_LOG_LINE_ERROR} ${line}`, error);
        }
    }
    // Filters and returns an array of error log entries
    filterErrorEntries(logEntries: ILogEntry[]): ILogEntry[] {
        try {
            logger.info(Constants.FILTERING_ERROR_ENTRIES_INFO);
            return logEntries.filter(
                (entry) => entry?.loglevel?.toLowerCase() === "error"
            );
        } catch (error) {
            logger.error(Constants.FILTERING_ERROR_ENTRIES_ERROR, error);
        }
    }
}
