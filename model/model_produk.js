const connection = require('../config/database');

class Model_Produk {
    // Method untuk mengambil semua data dari tabel Produk beserta kategorinya.
// Method untuk mengambil semua data dari tabel Produk beserta kategorinya.
static async getAll() {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT p.id_produk, p.nama_produk, p.harga_produk, p.foto_produk, k.nama_kategori ' +
            'FROM Produk p ' +
            'INNER JOIN Kategori k ON p.id_kategori = k.id_kategori ' +
            'ORDER BY p.id_produk DESC',
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}


    // Method untuk menyimpan data ke dalam tabel Produk.
    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Produk SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk mengambil data berdasarkan ID dari tabel Produk.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT p.*, k.nama_kategori FROM Produk p INNER JOIN Kategori k ON p.id_kategori = k.id_kategori WHERE p.id_produk = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel Produk.
    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Produk SET ? WHERE id_produk = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel Produk berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Produk WHERE id_produk = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Produk;
