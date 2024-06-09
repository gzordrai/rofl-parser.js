import { RawMetadata } from "../../types";
import { Metadata } from "../../core/Metadata";
import { Parser } from "../Parser";

/**
 * `NewROFLParser` is a class that extends the `Parser` abstract base class.
 * It is used to parse a ROFL file and extract its metadata.
 * 
 * @property {number[]} signature - The signature of the ROFL file.
 * @property {number[]} pattern - The pattern used to locate the metadata in the ROFL file.
 */
export class NewROFLParser extends Parser {
    private static readonly signature: number[] = [0x52, 0x49, 0x4F, 0x54, 0x02, 0x00, 0x75, 0x1C, 0x08, 0xCD, 0x20, 0x99, 0xF8, 0x1C, 0x0E];
    private static readonly pattern: number[] = [0x7B, 0x22, 0x67, 0x61, 0x6D, 0x65, 0x4C, 0x65, 0x6E, 0x67, 0x74, 0x68, 0x22];

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
     * It locates the metadata in the data using the pattern, then parses the metadata.
     *
     * @returns {Metadata} The metadata of the ROFL file.
     */
    public parse(): Metadata {
        const pattern: Buffer = Buffer.from(NewROFLParser.pattern);
        const position: number = this.data.indexOf(pattern);

        if (position === -1)
            throw new Error(`Metadata not found in the file`);

        const rawMetadata: Buffer = this.data.subarray(position, this.data.length - 4);
        const metadata: RawMetadata = JSON.parse(rawMetadata.toString());

        return new Metadata(metadata);
    }
}