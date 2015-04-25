module.exports = {
    build: {
        auth: {
        host: 'fellipe.com',
        port: 21,
        authKey: 'key'},
    src: 'app/',
    dest: '/public_html/apps/im-coder/',
    exclusions: ['.DS_Store',
        'package.json',
        'Gruntfile.js',
        'node_modules'],
    simple: true,
    useList: false
    }
};
