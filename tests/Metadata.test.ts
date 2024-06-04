import { JSONStats, Metadata, RawMetadata } from "../src";

describe("Metadata", () => {
    const rawMetadata: RawMetadata = {
        gameLength: 1258259,
        lastGameChunkId: 44,
        lastKeyFrameId: 21,
        statsJson: "{}"
    };

    let metadata: Metadata;

    beforeAll(() => {
        metadata = new Metadata(rawMetadata);
    });

    test("should create a new instance of Metadata", () => {
        const statsJson: JSONStats = JSON.parse(rawMetadata.statsJson);

        expect(metadata).toBeInstanceOf(Metadata);
        expect(metadata.gameLength).toBe(rawMetadata.gameLength);
        expect(metadata.lastGameChunkId).toBe(rawMetadata.lastGameChunkId);
        expect(metadata.lastKeyFrameId).toBe(rawMetadata.lastKeyFrameId);
        expect(metadata.statsJson).toStrictEqual(statsJson);
    });

    test("should correctly convert to string", () => {
        const expectedObject = {...rawMetadata, statsJson: JSON.parse(rawMetadata.statsJson)};
        const expectedString: string = JSON.stringify(expectedObject);

        expect(metadata.toString()).toBe(expectedString);
    });

    test("should correctly convert to buffer", () => {
        const expectedObject = {...rawMetadata, statsJson: JSON.parse(rawMetadata.statsJson)};
         const expectedBuffer: Buffer = Buffer.from(JSON.stringify(expectedObject));

        expect(metadata.toBuffer()).toEqual(expectedBuffer);
    });
});