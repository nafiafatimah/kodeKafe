const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Model_Produk = require('../model/model_produk');
const Model_Kategori = require('../model/model_kategori');
const Model_Users = require('../model/model_users');

// Konfigurasi Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/upload') // Menyimpan file di folder public/uploads/
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Menyimpan file dengan nama unik
    }
})
const upload = multer({ storage: storage });

router.get('/', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_Users.getById(id);
        if (Data.length > 0) {
            let rows = await Model_Produk.getAll();
            res.render('produk/index', {
                data: rows
            });
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});

router.get('/create', async function (req, res, next) {
    try {
        let kategoriRows = await Model_Kategori.getAll(); // Ambil semua data kategori
        res.render("produk/create", {
            data: kategoriRows // Kirim data kategori ke view
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/store', upload.single("foto_produk"), async function(req, res, next) {
    try {
        let { nama_produk, harga_produk, id_kategori } = req.body;
        let foto_produk = req.file ? req.file.filename : null; // Foto produk
        let Data = {
            nama_produk: nama_produk,
            harga_produk: harga_produk,
            id_kategori: id_kategori,
            foto_produk: foto_produk
        };
        await Model_Produk.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal menyimpan data');
        res.redirect('/produk');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let kategoriRows = await Model_Kategori.getAll(); // Ambil semua data kategori
        let produkData = await Model_Produk.getById(id); // Data produk berdasarkan ID
        res.render('produk/edit', {
            data: kategoriRows, // Kirim data kategori ke view
            id: produkData[0].id_produk,
            nama_produk: produkData[0].nama_produk,
            harga_produk: produkData[0].harga_produk,
            foto_produk: produkData[0].foto_produk,
            id_kategori: produkData[0].id_kategori,
            nama_kategori: produkData[0].nama_kategori
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/update/:id', upload.single("foto_produk"), async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_produk, harga_produk, id_kategori } = req.body;
        let foto_produk = req.file ? req.file.filename : null; // Foto produk
        let Data = {
            nama_produk: nama_produk,
            harga_produk: harga_produk,
            id_kategori: id_kategori,
            foto_produk: foto_produk
        };
        await Model_Produk.Update(id, Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal menyimpan data');
        res.redirect('/produk');
    }
});

router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Produk.getById(id);
        const namaFileLama = rows[0].foto_produk;

        if (namaFileLama) {
            const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
            fs.unlinkSync(pathFileLama);
        }

        await Model_Produk.Delete(id);
        req.flash("success", "Berhasil menghapus data");
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash("error", "Gagal menghapus data");
        res.redirect('/produk');
    }
});

module.exports = router;
