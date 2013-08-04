exports.setup = function(db) {
    var Url = new db.Schema({
        sourceUrl: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            index: true
        },
        destinationUrl: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            index: true
        }
    }); 
    db.model('Url', Url);
};
