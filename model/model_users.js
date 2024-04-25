const connection = require('../config/database');

class Model_Users {
    // Method untuk mengambil semua data dari tabel Users.
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users ORDER BY id_users desc', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk menyimpan data ke dalam tabel Users.
    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', Data, function (err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method menangani login users,
    static async Login(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    // Method untuk mengambil data berdasarkan ID dari tabel Users.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id_users = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel Users.
    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE id_users = ', + id, Data, function(err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel Users berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id_users = ', + id, function(err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Users;
