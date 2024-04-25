var express = require('express');
const Model_Users = require('../model/model_users');
const Model_Produk = require('../model/model_produk');
var router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let userData = await Model_Users.getById(id);
        if (userData.length > 0) {
            if (userData[0].level_users != 1) {
                res.redirect('/logout');
            } else {
                let products = await Model_Produk.getAll();
                let categorizedProducts = {};
                products.forEach(product => {
                    if (!categorizedProducts[product.id_kategori]) {
                        categorizedProducts[product.id_kategori] = [];
                    }
                    categorizedProducts[product.id_kategori].push(product);
                });
                
                res.render('users/super', {
                    title: "Users Home",
                    email: userData[0].email,
                    categorizedProducts: categorizedProducts
                });
            }
        } else {
            res.status(401).json({ error: "user tidak ada" });
        }
    } catch (error) {
        res.status(501).json('Butuh akses login');
    }
});

module.exports = router;
