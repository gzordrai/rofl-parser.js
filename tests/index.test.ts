import { readFileSync } from "fs";
import { ROFLParser } from "../src";

describe("ROFLParser", () => {
    test("should create a new instance of ROFLParser", () => {
        expect(() => new ROFLParser("./tests/assets/valid_file_test.rofl")).not.toThrow(Error);
    });

    test("should create a new instance of ROFLParser with buffer", () => {
        const buffer: Buffer = readFileSync("./tests/assets/valid_file_test.rofl");

        expect(() => new ROFLParser(buffer)).not.toThrow(Error);
    });

    test("should throw error if file does not exist", () => {
        expect(() => new ROFLParser("./tests/assets/nonexistent.rofl")).toThrow(Error);
    });

    test("should check the file extension", () => {
        expect(() => new ROFLParser("./tests/assets/random_file.txt")).toThrow(Error);
    });

    test("should correctly check signature", () => {
        expect(() => new ROFLParser("./tests/assets/invalid_signature_file_test.rofl")).toThrow(Error);
    });

    test("should check metadata", () => {
        expect(() => new ROFLParser("./tests/assets/invalid_metadata_file_test.rofl").parse()).toThrow(Error);
    });

    test("should find pattern in the file", () => {
        const metadata = new ROFLParser("./tests/assets/valid_file_test.rofl").parse();

        expect(metadata).toBeDefined();
        expect(metadata).toHaveProperty("gameLength");
        expect(metadata.gameLength).toBe(1258259)
        expect(metadata).toHaveProperty("lastGameChunkId");
        expect(metadata.lastGameChunkId).toBe(44)
        expect(metadata).toHaveProperty("lastKeyFrameId");
        expect(metadata.lastKeyFrameId).toBe(21)
        expect(metadata).toHaveProperty("statsJson");
    });
});