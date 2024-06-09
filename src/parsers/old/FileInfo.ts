/**
 * `FileInfo` is a class that represents the structure of a ROFL file.
 * It provides properties to access different parts of the file.
 * 
 * @property {number} header - The header of the ROFL file.
 * @property {number} file - The file identifier of the ROFL file.
 * @property {number} metadataOffset - The offset to the metadata in the ROFL file.
 * @property {number} metadata - The metadata of the ROFL file.
 * @property {number} payloadHeaderOffset - The offset to the payload header in the ROFL file.
 * @property {number} payloadHeader - The payload header of the ROFL file.
 * @property {number} payloadOffset - The offset to the payload in the ROFL file.
 */
export class FileInfo {
    public readonly header: number;
    public readonly file: number;
    public readonly metadataOffset: number;
    public readonly metadata: number;
    public readonly payloadHeaderOffset: number;
    public readonly payloadHeader: number;
    public readonly payloadOffset: number;

    /**
     * Creates a new instance of the FileInfo.
     * 
     * @param {Buffer} data - The data to be parsed.
     */
    public constructor(data: Buffer) {
        this.header = data.readUInt16LE(0);
        this.file = data.readUInt32LE(2);
        this.metadataOffset = data.readUInt32LE(6);
        this.metadata = data.readUInt32LE(10);
        this.payloadHeaderOffset = data.readUInt32LE(14);
        this.payloadHeader = data.readUInt32LE(18);
        this.payloadOffset = data.readUInt32LE(22);
    }
}