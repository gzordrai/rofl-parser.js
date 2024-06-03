export interface IMetaData {
    gameLength: number;
    lastGameChunkId: number;
    lastKeyFrameId: number;
    statsJson: string | Record<string, string>;
}

export type Metadata = IMetaData;