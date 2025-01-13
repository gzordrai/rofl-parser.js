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
        const pattern: RegExp = /^(\d{2})\.(\d{1,2})$/;
        const versionString: string = this.file.subarray(15, 20).toString();
        const version: string = versionString.endsWith(".") ? versionString.slice(0, -1) : versionString;
        const match: RegExpExecArray | null = pattern.exec(version);

        if (!match) {
            console.error(`Version string does not match the expected pattern: ${versionString}`);

            return new OldRoflParser(this.file);
        }

        const majorVersion: number = parseInt(match[1], 10);
        const minorVersion: number = parseInt(match[2], 10);

        if (majorVersion === 14 && minorVersion === 10) {
            console.error(`This version of ROFL files is not supported: ${versionString}. Riot removed metadata in version 14.10 and reintroduced it in version 14.11.`);

            throw new Error(`Unsupported ROFL version: ${versionString}`);
        }

        if (majorVersion > 14 || (majorVersion == 14 && minorVersion >= 11))
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