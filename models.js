exports.setup = function(db) {
    console.log('models setup');
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
