const express = require('express');
const router = express.Router();
const OrderModel = require('../model/model_pesanan');
const Model_Produk = require('../model/model_produk');

// Menampilkan semua pesanan
router.get('/', async (req, res) => {
    try {
        const orders = await OrderModel.getAll();
        res.render('pesanan/index', { orders }); // Render halaman index dengan data pesanan
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Menampilkan halaman pembuatan pesanan baru
router.get('/create', async (req, res) => {
    try {
        const products = await Model_Produk.getAll(); // Ambil semua produk
        res.render('pesanan/create', { products }); // Render halaman create.ejs untuk membuat pesanan baru dengan data produk
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Menyimpan pesanan baru
router.post('/store', async (req, res) => {
    try {
        const { nama_pelanggan, produk } = req.body; // Ambil data pesanan dari body request
        
        // Hitung total harga berdasarkan harga produk dan jumlahnya
        let total_harga = 0;
        produk.forEach(item => {
            total_harga += item.harga_produk * item.jumlah_produk;
        });

        // Ambil hanya ID produk dari array produk
        const idProdukArray = produk.map(item => item.id_produk);

        // Buat objek pesanan baru dengan hanya menyimpan ID produk
        const orderData = {
            nama_pelanggan: nama_pelanggan,
            total_harga: total_harga,
            id_produk: produk.map(item => item.id_produk) // Hanya menyimpan ID produk
        };
        // Simpan pesanan ke dalam database
        await OrderModel.Store(orderData); 
        res.status(200).json({ message: 'Pesanan berhasil disimpan' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan pesanan' });
    }
});


// Menampilkan halaman edit pesanan
router.get('/edit/:id', async (req, res) => {
    try {
        const id_pesanan = req.params.id;
        const order = await OrderModel.getById(id_pesanan);
        const products = await Model_Produk.getAll(); // Ambil semua produk
        res.render('pesanan/edit', { order, products }); // Render halaman edit.ejs dengan data pesanan yang dipilih dan semua produk
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Memperbarui pesanan
router.post('/edit/:id', async (req, res) => {
    try {
        const id_pesanan = req.params.id;
        const { nama_pelanggan, total_harga } = req.body;
        const orderData = { nama_pelanggan, total_harga };
        await OrderModel.Update(id_pesanan, orderData); 
        res.redirect('/pesanan'); // Redirect ke halaman index setelah update berhasil
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Menghapus pesanan
router.get('/delete/:id', async (req, res) => {
    try {
        const id_pesanan = req.params.id;
        await OrderModel.Delete(id_pesanan); 
        res.redirect('/pesanan'); // Redirect ke halaman index setelah hapus berhasil
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
