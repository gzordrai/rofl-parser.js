import { existsSync, readFileSync } from "fs";
import { Metadata } from "../types";

/**
 * This class is used to parse a ROFL file
 */
export class ROFLParser {
    private static readonly signature: number[] = [ 0x52, 0x49, 0x4F, 0x54, 0x02, 0x00, 0x75, 0x1C, 0x08, 0xCD, 0x20, 0x99, 0xF8, 0x1C, 0x0E ];
    private static readonly pattern: number[] = [ 0x7B, 0x22, 0x67, 0x61, 0x6D, 0x65, 0x4C, 0x65, 0x6E, 0x67, 0x74, 0x68, 0x22 ];
    private file: Buffer;

    /**
     * This constructor is used to create a new instance of the ROFLParser class
     * 
     * @param path The path to the ROFL file
     */
    public constructor(path: string) {
        if (!existsSync(path))
            throw new Error(`File ${path} does not exist`);

        if (!path.endsWith(".rofl"))
            throw new Error(`File is not a ROFL file`);

        this.file = readFileSync(path);

        if (!this.checkSignature())
            throw new Error(`This file is not a valid ROFL file`);
    }

    /**
     * This method is used to check if the file is a ROFL file
     * 
     * @returns boolean True if the file is a ROFL file, false otherwise
     */
    private checkSignature(): boolean {
        const fileSignature: Buffer = this.file.subarray(0, ROFLParser.signature.length);

        for (let i = 0; i < ROFLParser.signature.length; i++) {
            if (fileSignature[i] !== ROFLParser.signature[i])
                return false;
        }

        return true;
    }

    /**
     * This method is used to parse the metadata from the ROFL file
     * 
     * @returns Metadata The metadata of the ROFL file
     */
    public parse(): Metadata {
        const pattern: Buffer = Buffer.from(ROFLParser.pattern);
        const position: number = this.file.indexOf(pattern);

        if (position === -1)
            throw new Error(`Metadata not found in the file`);

        const rowMetadata: Buffer = this.file.subarray(position, this.file.length - 4);
        const metadata: Metadata = JSON.parse(rowMetadata.toString());

        metadata.statsJson = JSON.parse(metadata.statsJson as string);

        return metadata;
    }
}