var express = require('express');
var router = express.Router();
const Model_Kategori = require('../model/model_kategori');

router.get('/', async function(req, res, next){
    try {
        let rows = await Model_Kategori.getAll(); // Mengambil semua data kategori
        res.render('kategori/index', { 
            data: rows
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal memuat data kategori');
        res.redirect('/kategori');
    }
});

router.get('/create', function(req, res, next){
    res.render('kategori/create', { 
        id_kategori: '',
        nama_kategori: ''
    });
});

router.post('/store', async function(req, res, next){
    try {
        let {
            nama_kategori
        } = req.body;
        
        let Data = { 
            nama_kategori
        };
        
        await Model_Kategori.Store(Data);
        req.flash('success', 'Berhasil menyimpan data kategori');
        res.redirect('/kategori');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan data kategori');
        res.redirect('/kategori');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Kategori.getById(id);
        res.render('kategori/edit', { 
            id_kategori: rows[0].id_kategori,
            nama_kategori: rows[0].nama_kategori
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/update/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        let {
            nama_kategori
        } = req.body;
        
        let Data = {
            nama_kategori
        };
        
        await Model_Kategori.Update(id, Data); 
        req.flash('success', 'Berhasil menyimpan perubahan data kategori');
        res.redirect('/kategori');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan perubahan data kategori');
        res.redirect('/kategori');
    }
});

router.get('/delete/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_Kategori.Delete(id); 
        req.flash('success', 'Berhasil menghapus data kategori');
        res.redirect('/kategori');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menghapus data kategori');
        res.redirect('/kategori');
    }
});

module.exports = router;
