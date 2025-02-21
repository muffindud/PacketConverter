// struct RAW_DATA_T{
//     uint64_t temperature;
//     uint64_t humidity;
//     uint64_t pressure;
//     uint64_t ppm;
// };

class RawData {
    constructor(temperature, humidity, pressure, ppm) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.ppm = ppm;
    }
}

RawData.fromBin = (bin) => {
    throw new Error('Not implemented');
}

DataPacket.modbusCRC16 = (this) => {
    throw new Error('Not implemented');
}

module.exports = RawData;
