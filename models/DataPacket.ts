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
        if (bin.length != 54) {
            throw new InvalidPacketStructure();
        }

        if (bin.readUInt8(19) >= bin.readUInt8(20)) {
            throw new InvalidDataIndex();
        }

        if (bin.readUInt8(21) !== 0x20) {
            throw new InvalidDataLength();
        }

        if (bin.readUInt8(0) !== 0xDD) {
            throw new InvalidPacketType();
        }

        return new DataPacket(
            bin.readUInt8(0),
            Metadata.fromBin(bin.slice(1, 21)),
            bin.readUInt8(21),
            RawData.fromBin(bin.slice(22, 55))
        )
    }
}

export default DataPacket;
export { InvalidPacketStructure, InvalidPacketType, InvalidDataLength, InvalidDataIndex };
