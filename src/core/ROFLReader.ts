import { existsSync, readFileSync } from "fs";
import { NewROFLParser, OldRoflParser, Parser } from "../parsers";
import { Metadata } from "./Metadata";

/**
 * `ROFLReader` is a class that reads and parses a ROFL file.
 * It determines the appropriate parser to use based on the file version.
 * 
 * @property {Buffer} file - The ROFL file to be parsed.
 * @property {Parser} parser - The parser to be used.
 */
export class ROFLReader {
    private file: Buffer;
    private parser: Parser;

    /**
     * Creates a new instance of the ROFLReader.
     * 
     * @param {string | Buffer} pathOrBuffer - The path to the ROFL file or the file as a Buffer.
     * @throws {Error} If the file does not exist or is not a valid ROFL file.
     */
    public constructor(pathOrBuffer: string | Buffer) {
        if (Buffer.isBuffer(pathOrBuffer)) {
            this.file = pathOrBuffer;
        } else {
            if (!existsSync(pathOrBuffer))
                throw new Error(`File ${pathOrBuffer} does not exist`);

            if (!pathOrBuffer.endsWith(".rofl"))
                throw new Error(`File is not a ROFL file`);

            this.file = readFileSync(pathOrBuffer);
        }

        if (this.file.subarray(0, 4).toString() !== "RIOT")
            throw new Error(`This file is not a valid ROFL file`);

        this.parser = this.determineParser();
    }

    /**
     * Determines the appropriate parser to use based on the file version.
     * 
     * @returns {Parser} The appropriate parser.
     */
    private determineParser(): Parser {
        const pattern: RegExp = /^\d{2}\.\d{2}$/;
        const isNewParser: boolean = pattern.test(this.file.subarray(15, 20).toString());

        if (isNewParser)
            return new NewROFLParser(this.file);

        return new OldRoflParser(this.file);
    }

    /**
     * Returns the metadata of the ROFL file.
     * 
     * @returns {Metadata} The metadata of the ROFL file.
     */
    public getMetadata(): Metadata {
        return this.parser.parse();
    }
}