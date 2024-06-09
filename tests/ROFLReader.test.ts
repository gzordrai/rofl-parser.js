import { readFileSync } from "fs";
import { Metadata, ROFLReader } from "../src";

describe("ROFLParser", () => {
    test("should create a new instance of ROFLParser", () => {
        expect(() => new ROFLReader("./tests/assets/valid_file_test.rofl")).not.toThrow(Error);
    });

    test("should create a new instance of ROFLParser with buffer", () => {
        const buffer: Buffer = readFileSync("./tests/assets/valid_file_test.rofl");

        expect(() => new ROFLReader(buffer)).not.toThrow(Error);
    });

    test("should throw error if file does not exist", () => {
        expect(() => new ROFLReader("./tests/assets/nonexistent.rofl")).toThrow(Error);
    });

    test("should check the file extension", () => {
        expect(() => new ROFLReader("./tests/assets/random_file.txt")).toThrow(Error);
    });

    test("should check metadata", () => {
        expect(() => new ROFLReader("./tests/assets/invalid_metadata_file_test.rofl").getMetadata()).toThrow(Error);
    });

    test("should return a Metadata instance", () => {
        const parser: ROFLReader = new ROFLReader("./tests/assets/valid_file_test.rofl");
        const metadata: Metadata = parser.getMetadata();
    
        expect(metadata).toBeInstanceOf(Metadata);
    });

    test("should find pattern in the file", () => {
        const metadata = new ROFLReader("./tests/assets/valid_file_test.rofl").getMetadata();

        expect(metadata).toBeDefined();
        expect(metadata).toHaveProperty("gameLength");
        expect(metadata.gameLength).toBe(1258259)
        expect(metadata).toHaveProperty("lastGameChunkId");
        expect(metadata.lastGameChunkId).toBe(44)
        expect(metadata).toHaveProperty("lastKeyFrameId");
        expect(metadata.lastKeyFrameId).toBe(21)
        expect(metadata).toHaveProperty("statsJson");
    });

    test("should support old metadata format", () => {
        const parser: ROFLReader = new ROFLReader("./tests/assets/old_valid_file_test.rofl");
        const metadata: Metadata = parser.getMetadata();
    
        expect(metadata).toBeInstanceOf(Metadata);
        expect(metadata).toHaveProperty("gameLength");
        expect(metadata.gameLength).toBeGreaterThan(0);
        expect(metadata).toHaveProperty("lastGameChunkId");
        expect(metadata.lastGameChunkId).toBeGreaterThan(0);
        expect(metadata).toHaveProperty("lastKeyFrameId");
        expect(metadata.lastKeyFrameId).toBeGreaterThan(0);
        expect(metadata).toHaveProperty("statsJson");
    });
});