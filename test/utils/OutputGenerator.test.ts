import * as fs from "fs";
import { OutputGenerator } from "../../src/utils/OutputGenerator";

describe("Tests for OutputGenerator", () => {
    let outputGenerator: OutputGenerator;
    beforeEach(() => {
        outputGenerator = new OutputGenerator();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should generate output file", () => {
        const mockWriteStream = {
            write: jest.fn(),
            end: jest.fn(),
        };
        jest.spyOn(fs, "createWriteStream").mockImplementation(() => {
            return mockWriteStream as any;
        });
        outputGenerator.generateOutputFile([], "outputFilePath");
        expect(mockWriteStream.write).toBeCalled();
        expect(mockWriteStream.end).toBeCalled();
    });
});
