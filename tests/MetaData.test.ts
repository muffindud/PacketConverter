import Metadata, { InvalidMetadataStructure } from '../models/Metadata';

// manager mac: EC64C990BF58
// worker mac:  550000000001

const validBinMetadata = Buffer.from([
    0x00, 0x00, // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58, // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01, // worker mac
    0x00, 0x00, 0x00, 0x00, // id: TODO
    0x00, // index packet
    0x01 // total packets
]);

const deformedBinMetadata = Buffer.from([
    0x00, 0x00, // crc16: TODO
    0xEC, 0x64, 0xC9, 0x90, 0xBF, 0x58, // manager mac
    0x55, 0x00, 0x00, 0x00, 0x00, 0x01, // worker mac
    0x00, 0x00, 0x00, 0x00, // id: TODO
    0x00 // index packet
]);

describe('Metadata', () => {
    let metadata: Metadata;

    describe('fromBin', () => {
        test('should create Metadata instance', () => {
            metadata = Metadata.fromBin(validBinMetadata);

            expect(metadata).toBeInstanceOf(Metadata);
        });

        test('should throw error on invalid bin', () => {
            expect(() => Metadata.fromBin(deformedBinMetadata)).toThrow(InvalidMetadataStructure);
        });
    });

    describe('crc16', () => {
        test('should have correct crc16', () => {
            expect(metadata.crc16).toBe(0);
        });
    });

    describe('manager_mac', () => {
        test('should have correct manager mac', () => {
            expect(metadata.manager_mac).toBe('EC64C990BF58');
        });
    });

    describe('worker_mac', () => {
        test('should have correct worker mac', () => {
            expect(metadata.worker_mac).toBe('550000000001');
        });
    });

    describe('id', () => {
        test('should have correct id', () => {
            expect(metadata.id).toBe(0);
        });
    });

    describe('index_packet', () => {
        test('should have correct index packet', () => {
            expect(metadata.index_packet).toBe(0);
        });
    });

    describe('total_packet_s', () => {
        test('should have correct total packets', () => {
            expect(metadata.total_packet_s).toBe(1);
        });
    });
});
