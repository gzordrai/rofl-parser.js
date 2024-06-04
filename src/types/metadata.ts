interface IRawMetadata {
    gameLength: number;
    lastGameChunkId: number;
    lastKeyFrameId: number;
    statsJson: string | Record<string, string>;
}

export type RawMetadata = IRawMetadata;