const RawData = require('../models/RawData');

// temperature: 21.10
// humidity: 48.10
// pressure: 761.63
// ppm: 542.77

const validBinRawData = Buffer.from([
    0x0E, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (temperature + 40) * 100
    0xCA, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // humidity * 100
    0x83, 0x29, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, // pressure * 100
    0x05, 0xD4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // ppm * 100
]);

let rawData;

test('RawData should be created correctly', () => {
    rawData = RawData.fromBin(validBinRawData);

    expect(rawData).toBeInstanceOf(RawData);
});

test('RawData should have correct temperature', () => {
    expect(rawData.temperature).toBe(21.10);
});

test('RawData should have correct humidity', () => {
    expect(rawData.humidity).toBe(48.10);
});

test('RawData should have correct pressure', () => {
    expect(rawData.pressure).toBe(761.63);
});

test('RawData should have correct ppm', () => {
    expect(rawData.ppm).toBe(542.77);
});
