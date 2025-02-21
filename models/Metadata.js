// struct META_T{
//     uint16_t crc16;
//     uint8_t manager_mac[6];
//     uint8_t worker_mac[6];
//     uint32_t id;
//     uint8_t index_packet;
//     uint8_t total_packet_s;
// };

class Metadata {
    constructor(crc16, manager_mac, worker_mac, id, index_packet, total_packet_s) {
        this.crc16 = crc16;
        this.manager_mac = manager_mac;
        this.worker_mac = worker_mac;
        this.id = id;
        this.index_packet = index_packet;
        this.total_packet_s = total_packet_s;
    }
}

module.exports = Metadata;