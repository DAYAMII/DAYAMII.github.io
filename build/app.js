
var scene;
var camera;
var renderer;

function init() {
    var div = document.getElementById("scene");
    var width  = div.offsetWidth;
    var height = div.offsetHeight;

    /* Setup our scene */
    scene = new THREE.Scene();

    /* Setup our camera */
    camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(0, 5, 5);
    camera.lookAt(scene.position);

    /* Setup our renderer */
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    div.appendChild(renderer.domElement);

    /* Setup controls */
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    /* Setup lighting */
    var spotLight = new THREE.SpotLight( 0xffffff, 4 );
    spotLight.position.set( 0.75, 7.5, 1.5 );
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add( spotLight );

    /* Import our model */
    var loader = new THREE.JSONLoader();
    loader.load('models/visualicious/Dynamic_Dayami.obj', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
        mesh.rotation.x = - Math.PI / 6;
        mesh.rotation.y = Math.PI / 4;
        mesh.translation = geometry.center();
        scene.add(mesh);
    });

    render();
}

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

window.onload = init();