import { RawMetadata } from "../types";

export class Metadata implements RawMetadata {
    public readonly gameLength: number;
    public readonly lastGameChunkId: number;
    public readonly lastKeyFrameId: number;
    public readonly statsJson: string | Record<string, string>;

    public constructor(metadata: RawMetadata) {
        this.gameLength = metadata.gameLength;
        this.lastGameChunkId = metadata.lastGameChunkId;
        this.lastKeyFrameId = metadata.lastKeyFrameId;
        this.statsJson = metadata.statsJson;
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public toBuffer(): Buffer {
        return Buffer.from(this.toString());
    }
}