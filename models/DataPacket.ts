import Metadata from './Metadata';
import RawData from './RawData';

// struct DAT_T{
//     uint8_t type;
//     META_T meta;
//     uint8_t length;
//     uint8_t data[32];
// };

class InvalidPacketType extends Error {
    constructor() {
        super('Invalid packet type');
    }
};

class InvalidDataLength extends Error {
    constructor() {
        super('Invalid packet data length');
    }
}

class InvalidDataIndex extends Error {
    constructor() {
        super('Invalid packet index');
    }
}

class InvalidPacketStructure extends Error {
    constructor() {
        super('Invalid packet structure');
    }
}

class DataPacket {
    public type: number;
    public meta: Metadata;
    public length: number;
    public data: RawData;

    private constructor(
        type: number,
        meta: Metadata,
        length: number,
        data: RawData
    ) {
        this.type = type;
        this.meta = meta;
        this.length = length;
        this.data = data;
    }

    static fromBin(bin: Buffer): DataPacket {
        throw new Error('Not implemented');
    }
}

export default DataPacket;
export { InvalidPacketStructure, InvalidPacketType, InvalidDataLength, InvalidDataIndex };
