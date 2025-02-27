import { given, then, binding } from 'cucumber-tsflow';
import { expect } from 'chai';

import Metadata, { InvalidMetadataStructure } from '../models/Metadata';

// manager mac: EC64C990BF58
// worker mac:  550000000001

const validBinMetadata = Buffer.from([
    0x00, 0x00, // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58, // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01, // worker mac
    0x00, 0x00, 0x00, 0x00, // id: TODO
    0x00, // index packet
    0x01 // total packets
]);

const deformedBinMetadata = Buffer.from([
    0x00, 0x00, // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58, // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01, // worker mac
    0x00, 0x00, 0x00, 0x00, // id: TODO
    0x00 // index packet
]);

@binding()
class MetadataSteps {
    private metadata: any;
    private error: Error | null = null;

    @given('a valid binary metadata input')
    public givenValidBinaryMetadataInput() {
        this.metadata = Metadata.fromBin(validBinMetadata);
    }

    @then('it should be an instance of Metadata')
    public thenItShouldBeAnInstanceOfMetadata() {
        if (!(this.metadata instanceof Metadata)) {
            throw new Error('Metadata is not an instance of Metadata');
        }
    }

    @given('an invalid binary metadata input')
    public givenInvalidBinaryMetadataInput() {
        try {
            this.metadata = Metadata.fromBin(deformedBinMetadata);
        } catch (err: any) {
            this.error = err;
        }
    }

    @then('an InvalidMetadataStructure error should be thrown')
    public thenAnInvalidMetadataStructureErrorShouldBeThrown() {
        if (!(this.error instanceof InvalidMetadataStructure)) {
            throw new Error('Metadata is not an instance of InvalidMetadataStructure');
        }
    }
}

export = MetadataSteps;
