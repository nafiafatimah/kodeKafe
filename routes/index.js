var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var Model_Users = require('../model/model_users');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
    res.render('auth/register');
});

router.get('/login', function (req, res, next) {
    res.render('auth/login');
});

router.post('/saveusers', async (req, res) => {
  let { email, password, level_users } = req.body;
  let enkripsi = await bcrypt.hash(password, 10);
  let data = {
      email,
      password: enkripsi,
      level_users
  };
  try {
      await Model_Users.Store(data);
      req.flash('success', 'Berhasil mendaftar');
      res.redirect('/login');
  } catch (err) {
      console.error("Error saving user:", err);
      req.flash('error', 'Gagal mendaftar');
      res.redirect('/register');
  }
});

router.post('/log', async (req, res) => {
    let { email, password } = req.body;
    try {
        let Data = await Model_Users.Login(email);
        if (Data.length > 0) {
            let enkripsi = Data[0].password;
            let cek = await bcrypt.compare(password, enkripsi);
            if (cek) {
                req.session.userId = Data[0].id_users;
                // Tambahkan kondisi pengecekan level pada user yang login
                if (Data[0].level_users == 1) {
                    req.flash('success', 'Berhasil login');
                    res.redirect('/superusers');
                } else if (Data[0].level_users == 2) {
                    req.flash('success', 'Berhasil login');
                    res.redirect('/users');
                } else {
                    res.redirect('/login');
                }
                // Akhir kondisi
            } else {
                req.flash('error', 'Email atau password salah');
                res.redirect('/login');
            }
        } else {
            req.flash('error', 'Akun tidak ditemukan');
            res.redirect('/login');
        }
    } catch (err) {
        req.flash('error', 'Error pada fungsi');
        res.redirect('/login');
    }
});

// Rute untuk logout
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
            res.redirect("/"); // Redirect ke halaman utama jika terjadi kesalahan
        } else {
            res.redirect("/login"); // Redirect ke halaman login setelah logout berhasil
        }
    });
});

module.exports = router;
