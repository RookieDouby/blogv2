module.exports = {
    port: 3000,
    session: {
        secret: 'blogv2',
        key: 'blogv2',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/blogv2'
};
