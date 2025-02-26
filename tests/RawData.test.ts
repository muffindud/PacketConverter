import RawData, { InvalidRawDataStructure } from '../models/RawData';

// temperature: 21.10
// humidity: 48.10
// pressure: 761.63
// ppm: 542.77

const validBinRawData = Buffer.from([
    0x0E, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (temperature + 40) * 100
    0xCA, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // humidity * 100
    0x83, 0x29, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, // pressure * 100
    0x05, 0xD4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00  // ppm * 100
]);

const deformedBinRawData = Buffer.from([
    0x0E, 0x10, 0x00, 0x00,                         // (temperature + 40) * 100
    0xCA, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // humidity * 100
    0x83, 0x29, 0x01,                               // pressure * 100
    0x05, 0xD4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00  // ppm * 100
]);


describe('RawData', () => {
    let rawData: RawData;

    describe('fromBin', () => {
        test('should create RawData instance', () => {
            rawData = RawData.fromBin(validBinRawData);

            expect(rawData).toBeInstanceOf(RawData);
        });

        test('should throw error on invalid bin', () => {
            expect(() => RawData.fromBin(deformedBinRawData)).toThrow(InvalidRawDataStructure);
        });
    });

    describe('temperature', () => {
        test('should have correct temperature', () => {
            expect(rawData.temperature).toBe(21.10);
        });
    });

    describe('crc16', () => {
        test('should properly compute the crc16 from raw data', () => {
            expect(RawData.modbusCRC16(validBinRawData)).toBe(0x65C4);
        });
    });

    describe('pressure', () => {
        test('should have correct pressure', () => {
            expect(rawData.pressure).toBe(761.63);
        });
    });

    describe('ppm', () => {
        test('should have correct ppm', () => {
            expect(rawData.ppm).toBe(542.77);
        });
    });
});
