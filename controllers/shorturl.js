const Url = require('../models/Url');

exports.createShortUrl = async (req, res) => {
    try {

        if (!req.body.url) return res.status(400).send('BAD REQUEST');

        let input_url = req.body.url;
        let responseObject = {};

        /**
         * @description      validation test
         */
        let urlRegex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
        if (!input_url.match(urlRegex)) return res.status(400).json({ error: 'invalid url' });

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
            orginal_url: input_url,
            short_url: short_url
        });
        const savedData = await newUrl.save();

        responseObject['orginal_url'] = savedData.orginal_url;
        responseObject['short_url'] = savedData.short_url;

        res.status(201).json(responseObject);
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
        if (!response) return res.status(404).json({ error: 'NOT FOUND' });
        res.status(302).redirect(response.orginal_url);

    } catch (err) {
        res
            .status(err.status || 500)
            .type("txt")
            .send(err.message || "SERVER ERROR");// research more on error handaling
    }
}









