import { Metadata } from "../../core";
import { Parser } from "../Parser";
import { FileInfo } from "./FileInfo";

/**
 * `OldRoflParser` is a class that extends the `Parser` abstract base class.
 * It is used to parse a ROFL file and extract its metadata.
 * 
 * @property {number} fileInfosPosition - The position in the data where the file information starts.
 * @property {number} fileInfosLength - The length of the file information in the data.
 */
export class OldRoflParser extends Parser {
    private readonly fileInfosPosition: number = 262;
    private readonly fileInfosLength: number = 26;

    /**
     * Creates a new instance of the OldRoflParser.
     * 
     * @param {Buffer} data - The data to be parsed.
     */
    public constructor(data: Buffer) {
        super(data);
    }

    /**
     * Parses the data and returns the metadata of the ROFL file.
     * It first extracts the file information from the data, then uses this information to extract the metadata.
     *
     * @returns {Metadata} The metadata of the ROFL file.
     */
    public parse(): Metadata {
        const rawFileInfos: Buffer = this.data.subarray(this.fileInfosPosition, this.fileInfosPosition + this.fileInfosLength);
        const fileInfos: FileInfo = new FileInfo(rawFileInfos);

        const rawMetadata = this.data.subarray(fileInfos.metadataOffset, fileInfos.payloadHeaderOffset);
        const metadata = JSON.parse(rawMetadata.toString());

        return new Metadata(metadata);
    }
}