const Url = require('../models/Url');

exports.createShortUrl = async (req, res) => {
    try {

        if (!req.body.url) return res.status(400).json({ error: 'BAD REQUEST' });

        let input_url = req.body.url;
        let urlRegex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);

        // validation
        if (!input_url.match(urlRegex)) return res.status(406).json({ error: 'invalid url' });

        // duplication check
        const exists = await Url.findOne({ original_url: input_url });

        if (exists) return res.status(200).json({
            original_url: exists.original_url,
            short_url: exists.short_url
        });

        // random string generation
        function getrandom() {
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let random_string = "";
            for (let i = 0; i < 6; i++) {
                random_string += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return random_string;
        }
        const short_url = getrandom();

        //new record
        const newUrl = new Url({
            original_url: input_url,
            short_url: short_url
        });
        const savedData = await newUrl.save();

        res.status(201).json({
            original_url: savedData.original_url,
            short_url: savedData.short_url
        });

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
        res.status(302).redirect(response.original_url);

    } catch (err) {
        res
            .status(err.status || 500)
            .type("txt")
            .send(err.message || "SERVER ERROR");
    }
}








