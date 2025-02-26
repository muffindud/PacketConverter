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
        ppm:number
    ) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.ppm = ppm;
    }

    static fromBin(bin: Buffer): RawData {
        throw new Error('Not implemented');
    }

    static modbusCRC16(data: Buffer | RawData): number {
        throw new Error('Not implemented');
    }
}

export default RawData;
export { InvalidRawDataStructure };
