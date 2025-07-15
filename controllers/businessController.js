const express = require('express');
const router = express.Router();
const Business = require('../models/business');

router.get('/', async (req, res) => {
    const allBusinesses = await Business.find();
    // console.log(`allBusinesses: `, allBusinesses);
    res.render('businesses/index.ejs', { businesses: allBusinesses })
})

router.get('/new', (req, res) => {
    res.render("businesses/new.ejs");
})

router.post('/', async (req, res) => {
    if(req.body.isVerified === 'on') {
        req.body.isVerified = true;
    } else {
        req.body.isVerified = false;
    }
    console.log(req.body);
    await Business.create(req.body)
    res.redirect('/businesses/');
})

// SHOW ONE BUSINESS
router.get('/:businessId', async (req, res) => {
	const foundBusiness = await Business.findById(req.params.businessId);
	res.render('businesses/show.ejs', { business: foundBusiness });
});

router.delete('/:businessId', async (req, res) => {
	await Business.findByIdAndDelete(req.params.businessId);
	res.redirect('/businesses');
});

router.get('/:businessId/edit', async (req, res) => {
	const foundBusiness = await Business.findById(req.params.businessId);
	res.render('businesses/edit.ejs', { business: foundBusiness });
});

module.exports = router;