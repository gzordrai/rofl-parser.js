import { ProcessedMetadata, RawMetadata, JSONStats } from "../types";

export class Metadata implements ProcessedMetadata {
    public readonly gameLength: number;
    public readonly lastGameChunkId: number;
    public readonly lastKeyFrameId: number;
    public readonly statsJson: JSONStats;

    public constructor(metadata: RawMetadata) {
        this.gameLength = metadata.gameLength;
        this.lastGameChunkId = metadata.lastGameChunkId;
        this.lastKeyFrameId = metadata.lastKeyFrameId;
        this.statsJson = JSON.parse(metadata.statsJson);
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public toBuffer(): Buffer {
        return Buffer.from(this.toString());
    }
}