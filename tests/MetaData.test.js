const Metadata = require('../models/Metadata');

// manager mac: EC64C990BF58
// worker mac:  550000000001

const validBinMetaData = Buffer.from([
    0x00, 0x00, // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58, // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01, // worker mac
    0x00, 0x00, 0x00, 0x00, // id: TODO
    0x00, // index packet
    0x01 // total packets
]);

let metadata;

test('Metadata should be created correctly', () => {
    metadata = Metadata.fromBin(validBinMetaData);

    expect(metadata).toBeInstanceOf(Metadata);
});

test('Metadata should have correct crc16', () => {
    expect(metadata.crc16).toBe(0);
});

test('Metadata should have correct manager mac', () => {
    expect(metadata.manager_mac).toBe('EC64C990BF58');
});

test('Metadata should have correct worker mac', () => {
    expect(metadata.worker_mac).toBe('550000000001');
});

test('Metadata should have correct id', () => {
    expect(metadata.id).toBe(0);
});

test('Metadata should have correct index packet', () => {
    expect(metadata.index_packet).toBe(0);
});

test('Metadata should have correct total packets', () => {
    expect(metadata.total_packet_s).toBe(1);
});
