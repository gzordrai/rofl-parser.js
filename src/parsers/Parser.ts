import { Metadata } from "../core";

/**
 * `Parser` is an abstract base class that provides a structure for parsing data from a ROFL file.
 * It should be extended by any class that needs to parse a specific part of the ROFL file.
 * 
 * @property {Buffer} data - The data to be parsed.
 */
export abstract class Parser {
    protected data: Buffer;

    /**
     * Creates a new instance of the Parser.
     * 
     * @param {Buffer} data - The data to be parsed.
     */
    public constructor(data: Buffer) {
        this.data = data;
    }

    /**
     * This abstract method should be implemented by any class that extends `Parser`.
     * It should parse the data and return the metadata of the ROFL file.
     *
     * @returns {Metadata} The metadata of the ROFL file.
     */
    public abstract parse(): Metadata;
}