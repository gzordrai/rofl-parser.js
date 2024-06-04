interface IRawMetadata {
    readonly gameLength: number;
    readonly lastGameChunkId: number;
    readonly lastKeyFrameId: number;
    readonly statsJson: string;
}

interface IJSONStat {
    [key: string]: string;
}

interface IProcessedMetadata {
    readonly gameLength: number;
    readonly lastGameChunkId: number;
    readonly lastKeyFrameId: number;
    readonly statsJson: Array<IJSONStat>;
}

export type RawMetadata = IRawMetadata;
export type ProcessedMetadata = IProcessedMetadata;
export type JSONStats = Array<IJSONStat>;