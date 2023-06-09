import * as THREE from 'three';

 function addGround(scene) {
    // add cross marks on the ground
    const points = [];
    points.push( new THREE.Vector3( 1, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( -1, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 0, 1 ) );
    points.push( new THREE.Vector3( 0, 0, 0) );
    points.push( new THREE.Vector3( 0, 0, -1) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var x = 0;
    var z = 0;
    const spread = 4.5;
    var r = 0;
    const th1 = 50;
    var counter = 0;
    for  ( var i = -30 ; i < 30 ; i++ ) { 
        for ( var j = -30 ; j < 30 ; j++ ) {
            var material1 = new THREE.LineBasicMaterial();
            x = spread*i;
            z = spread*j;
            r = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
            if (r<th1){
                material1.transparent = true;
                material1.opacity = 0.5;
            }
            else{
                material1.transparent = true;
                material1.opacity = 0.5-((r-th1)/100);
            }
            var line23 = new THREE.Line( geometry, material1 );
            line23.position.x = x;
            line23.position.z = z;
            scene.add(line23);
        }
    }

}

function addLineGeometry(x, y, z, geometry, floor_objects) {
    const material = new THREE.LineBasicMaterial({ color: "0x000000" });
    const mesh = new THREE.LineSegments(geometry, material);
    mesh.position.x = x * spread;
    mesh.position.y = y * spread;
    mesh.position.z = z * spread;
    scene.add(mesh);
    floor_objects.push(obj);
}

function addWall(scene, material, width, height, x, y, z, rotation_x, rotation_y, receivesShadow){
    const geometry = new THREE.PlaneGeometry( width, height ); // width, height
    var plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    //plane.receiveShadow = receivesShadow;
    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
    plane.rotation.x = rotation_x;
    plane.rotation.y = rotation_y;
    return plane
}

export function CreateRoom(scene){
    const width = 200;
    const height = 80;
    addWall(scene, new THREE.MeshLambertMaterial({color: "white", side: THREE.DoubleSide}), width,      height,     0,    height/2, -100,  0,           0, false); // back
    addWall(scene, new THREE.MeshLambertMaterial({color: "white", side: THREE.DoubleSide}), width,      height,     100,   height/2,    0, 0,           Math.PI/2, false); // right
    addWall(scene, new THREE.MeshLambertMaterial({color: "white", side: THREE.DoubleSide}), width,    height*2.5,      0,   0,    0, Math.PI/2,   0, true); // floor
    addWall(scene, new THREE.MeshLambertMaterial({color: "white", side: THREE.DoubleSide}), width,      height,     -100,  height/2,    0, 0,   Math.PI/2, false); // left
}
