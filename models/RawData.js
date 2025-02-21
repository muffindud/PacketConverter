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

module.exports = RawData;
