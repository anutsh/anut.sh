exports.setup = function(db) {
    var Url = new db.Schema({
        sourceUrl: {
            type: String,
            unique: true,
            required: true,
            index: true
        },
        contextualUrl: {
            type: String,
            unique: true,
            required: true,
            index: true
        }
    }); 
    db.model('Url', Url);
};
