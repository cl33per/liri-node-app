// This is a commented out for keys been loaded. only needed for troubleshooting.
console.log('keys loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};
exports.band = {
    id: process.env.BAND
};

exports.movies = {
    id: process.env.OMDB_KEY
};