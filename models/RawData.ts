// struct RAW_DATA_T{
//     uint64_t temperature;
//     uint64_t humidity;
//     uint64_t pressure;
//     uint64_t ppm;
// };


class InvalidRawDataStructure extends Error {
    constructor() {
        super('Invalid raw data structure');
    }
};

class RawData {
    public temperature: number;
    public humidity: number;
    public pressure: number;
    public ppm: number;

    private constructor(
        temperature: number,
        humidity: number,
        pressure: number,
        ppm: number
    ) {
        this.temperature = temperature / 100 - 40;
        this.humidity = humidity / 100;
        this.pressure = pressure / 100;
        this.ppm = ppm / 100;
    }

    static fromBin(bin: Buffer): RawData {
        if (bin.length !== 32) {
            throw new InvalidRawDataStructure();
        }

        function readBuffer(offset: number): number {
            const low = bin.readUInt32LE(offset);
            const high = bin.readUInt32LE(offset + 4);

            return high * 2 ** 32 + low;
        }

        return new RawData(
            readBuffer(0),
            readBuffer(8),
            readBuffer(16),
            readBuffer(24)
        );
    }

    toBuffer(): Buffer {
        const buffer = Buffer.alloc(32);

        function writeBuffer(offset: number, value: number): void {
            const low = value % 2 ** 32;
            const high = (value - low) / 2 ** 32;

            buffer.writeUInt32LE(low, offset);
            buffer.writeUInt32LE(high, offset + 4);
        }

        writeBuffer(0, (this.temperature + 40) * 100);
        writeBuffer(8, this.humidity * 100);
        writeBuffer(16, this.pressure * 100);
        writeBuffer(24, this.ppm * 100);

        return buffer;
    }

    static modbusCRC16(data: Buffer | RawData): number {
        const buffer = data instanceof RawData ? data.toBuffer() : data;
        let crc = 0xFFFF;

        for (let i = 0; i < buffer.length; i++) {
            crc ^= buffer[i];

            for (let j = 0; j < 8; j++) {
                if (crc & 1) {
                    crc = (crc >> 1) ^ 0xA001;
                } else {
                    crc = crc >> 1;
                }
            }
        }

        return crc;
    }
}

export default RawData;
export { InvalidRawDataStructure };
