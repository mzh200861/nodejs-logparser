import { CommandLineParser } from "../../src/utils/CommandLineParser";

// Mocking the "option" function from "yargs" module
jest.mock("yargs", () => ({
    option: jest.fn(() => ({
        option: jest.fn(() => {
            return {
                parseSync: jest.fn(() => ({
                    input: "inputFilePath",
                    output: "outputFilePath",
                })),
            };
        }),
    })),
}));

describe("CommandLineParser", () => {
    let commandLineParser: CommandLineParser;

    beforeEach(() => {
        commandLineParser = new CommandLineParser();
    });

    describe("parseCommandLineArgs", () => {
        it("should parse command line arguments and set _argv", () => {
            commandLineParser.parseCommandLineArgs();
            expect(commandLineParser["_argv"]).toEqual({
                input: "inputFilePath",
                output: "outputFilePath",
            });
        });
    });

    describe("getInputFilePath", () => {
        it("should return input file path", () => {
            expect(commandLineParser.getInputFilePath()).toBe("inputFilePath");
        });
    });

    describe("getOutputFilePath", () => {
        it("should return output file path", () => {
            expect(commandLineParser.getOutputFilePath()).toBe(
                "outputFilePath"
            );
        });
    });
});
