exports.setup = function(db) {
    var Url = new db.Schema({
        sourceUrl: {
            type: String,
            unique: false,
            required: true,
            index: true
        },
        destinationUrl: {
            type: String,
            unique: false,
            required: true,
            index: true
        }
    }); 
    db.model('Url', Url);
};
