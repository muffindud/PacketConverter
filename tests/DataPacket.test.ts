import DataPacket, { InvalidPacketStructure, InvalidPacketType, InvalidDataLength, InvalidDataIndex } from '../models/DataPacket';

const validBinDataPacket = Buffer.from([
    0xDD,                                           // packet type
    0x00, 0x00,                                     // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58,             // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01,             // worker mac
    0x00, 0x00, 0x00, 0x00,                         // id: TODO
    0x00,                                           // index packet
    0x01,                                           // total packets
    0x20,                                           // length
    0x0E, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (temperature + 40) * 100
    0xCA, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // humidity * 100
    0x83, 0x29, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, // pressure * 100
    0x05, 0xD4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00  // ppm * 100
]);

const invalidAckBinDataPacket = Buffer.from([
    0xAA,                                           // packet type
    0x00, 0x00,                                     // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58,             // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01,             // worker mac
    0x00, 0x00, 0x00, 0x00,                         // id: TODO
    0x00,                                           // index packet
    0x01,                                           // total packets
    0x20,                                           // length
    0x0E, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (temperature + 40) * 100
    0xCA, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // humidity * 100
    0x83, 0x29, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, // pressure * 100
    0x05, 0xD4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00  // ppm * 100
]);

const invalidLenDataPacket = Buffer.from([
    0xDD,                                           // packet type
    0x00, 0x00,                                     // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58,             // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01,             // worker mac
    0x00, 0x00, 0x00, 0x00,                         // id: TODO
    0x00,                                           // index packet
    0x01,                                           // total packets
    0x21,                                           // length
    0x0E, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (temperature + 40) * 100
    0xCA, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // humidity * 100
    0x83, 0x29, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, // pressure * 100
    0x05, 0xD4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00  // ppm * 100
]);

const invalidIdxDataPacket = Buffer.from([
    0xDD,                                           // packet type
    0x00, 0x00,                                     // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58,             // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01,             // worker mac
    0x00, 0x00, 0x00, 0x00,                         // id: TODO
    0x05,                                           // index packet
    0x01,                                           // total packets
    0x21,                                           // length
    0x0E, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (temperature + 40) * 100
    0xCA, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // humidity * 100
    0x83, 0x29, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, // pressure * 100
    0x05, 0xD4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00  // ppm * 100
]);

const deformedDataPacket = Buffer.from([
    0xDD,                                           // packet type
    0x00, 0x00,                                     // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58,             // manager mac
    0x55, 0x00, 0x00,                               // worker mac
    0x00, 0x00, 0x00, 0x00,                         // id: TODO
    0x05,                                           // index packet
    0x01,                                           // total packets
    0x20,                                           // length
    0x0E, 0x00, 0x00, 0x00, 0x00,                   // (temperature + 40) * 100
    0xCA, 0x12, 0x00, 0x00, 0x00,                   // humidity * 100
    0x83, 0x29, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, // pressure * 100
    0x05, 0xD4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00  // ppm * 100
]);

describe('DataPacket', () => {
    let dataPacket;

    describe('fromBin', () => {
        test('should create DataPacket instance', () => {
            dataPacket = DataPacket.fromBin(validBinDataPacket);

            expect(dataPacket).toBeInstanceOf(DataPacket);
        });

        test('should throw error on invalid data packet type', () => {
            expect(() => DataPacket.fromBin(invalidAckBinDataPacket)).toThrow(InvalidPacketType);
        });

        test('should throw error on invalid raw data lenght', () => {
            expect(() => DataPacket.fromBin(invalidLenDataPacket)).toThrow(InvalidDataLength);
        });

        test('should throw error on invalid index packet', () => {
            expect(() => DataPacket.fromBin(invalidIdxDataPacket)).toThrow(InvalidDataIndex);
        });

        test('should throw error on deformed bin', () => {
            expect(() => DataPacket.fromBin(deformedDataPacket)).toThrow(InvalidPacketStructure);
        });
    });
});
