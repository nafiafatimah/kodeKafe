const connection = require('../config/database');

class OrderModel {
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT pesanan.*, produk.nama_produk, produk.harga_produk, produk.foto_produk FROM pesanan INNER JOIN produk ON pesanan.id_produk = produk.id_produk', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT pesanan.*, produk.nama_produk, produk.harga_produk, produk.foto_produk FROM pesanan INNER JOIN produk ON pesanan.id_produk = produk.id_produk WHERE pesanan.id_pesanan = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO pesanan SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE pesanan SET ? WHERE id_pesanan = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM pesanan WHERE id_pesanan = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = OrderModel;
