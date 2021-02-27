const Url = require('../models/Url');

exports.createShortUrl = async (req, res) => {
    try {

        if (!req.body.url) return res.status(400).send('BAD REQUEST');

        /**
         * @description      validation test
         */
        const isValid = req.body.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (!isValid) return res.status(406).send('NOT ACCEPTABLE');


        /**
         * @description      duplication check
         */

        const exists = await Url.findOne({ orginal_url: req.body.url });
        if (exists) return res.status(200).json(exists);


        /**
         * @method           getrandom()
         * @description      genrate random string
         */

        function getrandom() {
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let random_string = "";
            for (let i = 0; i < 6; i++) {
                random_string += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return random_string;
        }
        const short_url = getrandom();


        /**
         * @description     create new record
         */

        const newUrl = new Url({
            orginal_url: req.body.url,
            short_url: short_url
        });
        const savedData = await newUrl.save();

        res.status(201).json(savedData);
    } catch (err) {
        res
            .status(err.status || 500)
            .type("txt")
            .send(err.message || "SERVER ERROR");
    }
}


exports.redirectToUrl = async (req, res) => {
    try {
        const response = await Url.findOne({ short_url: req.params.url });
        if (!response) return res.status(404).json({ error: 'invalid url' });
        res.status(302).redirect(response.orginal_url);

    } catch (err) {
        res
            .status(err.status || 500)
            .type("txt")
            .send(err.message || "SERVER ERROR");// research more on error handaling
    }
}








