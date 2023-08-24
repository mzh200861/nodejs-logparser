import { ILogEntry } from "./ILogEntry";
export interface ILogParser {
    parseLogFile(filePath: string): Promise<ILogEntry[]>;
    parseLine(line: string): ILogEntry;
    filterErrorEntries(logEntries: ILogEntry[]): ILogEntry[];
}
