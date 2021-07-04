var root = null;
var useHash = true; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash);


router.on('/home', function() {
    document.getElementById('app').innerHTML = `<home-page></home-page>`;
}).resolve();

router.on('/collection', function() {
    document.getElementById('app').innerHTML = `<collection-page></collection-page>`;
}).resolve();

router.on('/comic', function() {
    document.getElementById('app').innerHTML = `<comic-page></comic-page>`;
}).resolve();


window.router = router;