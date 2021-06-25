var root = null;
var useHash = true; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router.on('/home', function() {
    document.getElementById('app').innerHTML = <home-page></home-page>;
}).resolve();



window.router = router;