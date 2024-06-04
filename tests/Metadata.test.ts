import { Metadata, RawMetadata } from "../src";

describe("Metadata", () => {
    const rawMetadata: RawMetadata = {
        gameLength: 1258259,
        lastGameChunkId: 44,
        lastKeyFrameId: 21,
        statsJson: "{}"
    };

    test("should create a new instance of Metadata", () => {
        const metadata: Metadata = new Metadata(rawMetadata);

        expect(metadata).toBeInstanceOf(Metadata);
        expect(metadata.gameLength).toBe(rawMetadata.gameLength);
        expect(metadata.lastGameChunkId).toBe(rawMetadata.lastGameChunkId);
        expect(metadata.lastKeyFrameId).toBe(rawMetadata.lastKeyFrameId);
        expect(metadata.statsJson).toBe(rawMetadata.statsJson);
    });

    test("should correctly convert to string", () => {
        const metadata: Metadata = new Metadata(rawMetadata);
        const expectedString: string = JSON.stringify(rawMetadata);

        expect(metadata.toString()).toBe(expectedString);
    });

    test("should correctly convert to buffer", () => {
        const metadata: Metadata = new Metadata(rawMetadata);
        const expectedBuffer: Buffer = Buffer.from(JSON.stringify(rawMetadata));

        expect(metadata.toBuffer()).toEqual(expectedBuffer);
    });
});