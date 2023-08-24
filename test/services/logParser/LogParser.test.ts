import * as readline from "readline";
import { LogParser } from "../../../src/services/logParser/LogParser";

describe("Tests for LogParser", () => {
    let logParser: LogParser;
    const mockReadStream = {
        on: jest.fn(),
        pipe: jest.fn(),
    };
    jest.mock("fs", () => ({
        createReadStream: jest.fn(() => mockReadStream),
    }));

    beforeEach(() => {
        logParser = new LogParser();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    test("should parse log file", async () => {
        jest.spyOn(readline, "createInterface").mockImplementationOnce(() => {
            return ["text1"] as any;
        });
        jest.spyOn(logParser, "parseLine").mockImplementation((line) => {
            return {
                timestamp: 1609459200000,
                transactionId: "123",
                loglevel: "INFO",
                details: "Some info",
            };
        });
        const entries = await logParser.parseLogFile("./app.log");
        expect(entries.length).toBe(1);
    });

    test("should throw error on file read failure", async () => {
        const filePath = "invalid.log"; // Non-existent path
        await expect(logParser.parseLogFile(filePath)).rejects.toThrowError(
            "Error parsing log file"
        );
    });

    test("should parse log entries", () => {
        const logEntries = logParser.parseLine(
            '2021-01-01T00:00:00.000Z - INFO - {"transactionId": "123", "err": "Error"}'
        );
        expect(logEntries).toEqual({
            timestamp: 1609459200000,
            transactionId: "123",
            loglevel: "INFO",
            err: "Error",
        });
    });

    test("should filter error entries", () => {
        const logEntries = [
            {
                timestamp: 1609459200000,
                transactionId: "123",
                loglevel: "INFO",
                details: "Some info",
            },
            {
                timestamp: 1609459200000,
                transactionId: "123",
                loglevel: "ERROR",
                err: "Error",
            },
        ];
        const errorEntries = logParser.filterErrorEntries(logEntries);
        expect(errorEntries).toEqual([
            {
                timestamp: 1609459200000,
                transactionId: "123",
                loglevel: "ERROR",
                err: "Error",
            },
        ]);
    });
});
