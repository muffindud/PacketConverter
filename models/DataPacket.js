// struct DAT_T{
//     uint8_t type;
//     META_T meta;
//     uint8_t length;
//     uint8_t data[32];
// };

class DataPacket {
    constructor(type, meta, length, data) {
        this.type = type;
        this.meta = meta;
        this.length = length;
        this.data = data;
    }
}

module.exports = DataPacket;
