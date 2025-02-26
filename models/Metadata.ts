// struct META_T{
//     uint16_t crc16;
//     uint8_t manager_mac[6];
//     uint8_t worker_mac[6];
//     uint32_t id;
//     uint8_t index_packet;
//     uint8_t total_packet_s;
// };

class InvalidMetadataStructure extends Error {
    constructor() {
        super('Invalid metadata structure');
    }
}

class Metadata {
    public crc16: number;
    public manager_mac: string;
    public worker_mac: string;
    public id: number;
    public index_packet: number;
    public total_packet_s: number;

    private constructor(
        crc16: number,
        manager_mac: string,
        worker_mac: string,
        id: number,
        index_packet: number,
        total_packet_s: number
    ) {
        this.crc16 = crc16;
        this.manager_mac = manager_mac;
        this.worker_mac = worker_mac;
        this.id = id;
        this.index_packet = index_packet;
        this.total_packet_s = total_packet_s;
    }

    static fromBin(bin: Buffer): Metadata {
        if (bin.length !== 20) {
            throw new InvalidMetadataStructure();
        }

        return new Metadata(
            bin.readUInt16LE(0),
            bin.slice(2, 8).toString('hex').toUpperCase(),
            bin.slice(8, 14).toString('hex').toUpperCase(),
            bin.readUInt32LE(14),
            bin.readUInt8(18),
            bin.readUInt8(19)
        );
    }
}

export default Metadata;
export { InvalidMetadataStructure };
