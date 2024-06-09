import { RawMetadata } from "../../types";
import { Metadata } from "../../core";
import { Parser } from "../Parser";

/**
 * `NewROFLParser` is a class that extends the `Parser` abstract base class.
 * It is used to parse a ROFL file and extract its metadata.
 * This class is specifically designed to handle the new format of ROFL files.
 * 
 * @property {number} metadataSizeLength - The length of the metadata size field in bytes.
 */
export class NewROFLParser extends Parser {
    private readonly metadataSizeLength: number = 4;

    /**
     * Creates a new instance of the NewROFLParser.
     * 
     * @param {Buffer} data - The data to be parsed.
     */
    public constructor(data: Buffer) {
        super(data);
    }

    /**
     * Parses the data and returns the metadata of the ROFL file.
     * It locates the metadata in the data by calculating its position based on the metadata size field.
     * It then extracts the metadata, parses it as JSON, and returns it as a `Metadata` object.
     *
     * @returns {Metadata} The metadata of the ROFL file.
     */
    public parse(): Metadata {
        const metadataLengthPosition: number = this.data.length - this.metadataSizeLength;
        const metadataLength: number = this.data.subarray(metadataLengthPosition, this.data.length).readUInt32LE(0);
        const metadataPosition: number = (this.data.length - metadataLength) - this.metadataSizeLength;
        const rawMetadata: Buffer = this.data.subarray(metadataPosition, this.data.length - this.metadataSizeLength);
        const metadata: RawMetadata = JSON.parse(rawMetadata.toString());

        return new Metadata(metadata);
    }
}