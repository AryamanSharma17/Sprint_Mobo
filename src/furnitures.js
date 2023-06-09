import * as THREE from 'three';

export function createFurniture(x, y, z, furniture_category, scene){
    var color_table = "blue";
    var color_chair = "red";
    var color_unknown = "green";
    if (furniture_category == "1"){
        createTable(x, y, z, scene, color_table)
    }
    else if (furniture_category == "0"){
        createChair(x, y, z, scene, color_chair)
    }
    else {
        createUnknown(x, y, z, scene, color_unknown)
    }
}

function createChair(x, y, z, scene, color_r){
    const back_mesh = addSolidGeometry(0.55+x, 0.55+y, 0.55+z, new THREE.BoxGeometry(12, 18, 4), scene, color_r, texture);
    const sit_mesh = addSolidGeometry(0, 0, 0.5, new THREE.BoxGeometry(12, 4, 12), back_mesh, color_r, texture);
    const leg_l_mesh = addSolidGeometry(0.4, -0.15, 0.8, new THREE.BoxGeometry(2, 12, 2), back_mesh, color_r, texture);
    const leg_r_mesh = addSolidGeometry(-0.4, -0.15, 0.8, new THREE.BoxGeometry(2, 12, 2), back_mesh, color_r, texture);
    return back_mesh;
}

function createTable(x, y, z, scene, color_r){
    const desk_mesh = addSolidGeometry(0.55+x, 0.75+y, 0.55+z, new THREE.BoxGeometry(28, 4, 18), scene, color_r, texture);
    const leg_l_mesh = addSolidGeometry(0.7, -0.28, 0.4, new THREE.BoxGeometry(2, 12, 2), desk_mesh, color_r, texture);
    const leg_r_mesh = addSolidGeometry(-0.7, -0.28, 0.4, new THREE.BoxGeometry(2, 12, 2), desk_mesh, color_r, texture);
    const leg_l_back_mesh = addSolidGeometry(0.7, -0.28, -0.4, new THREE.BoxGeometry(2, 12, 2), desk_mesh, color_r, texture);
    const leg_r_back_mesh = addSolidGeometry(-0.7, -0.28, -0.4, new THREE.BoxGeometry(2, 12, 2), desk_mesh, color_r, texture);
    return desk_mesh;
}

function createUnknown(x, y, z, scene, color_r){
    const cube_mesh = addSolidGeometry(0.55+x, 0.55+y, 0.55+z, new THREE.BoxGeometry(12, 12, 12), scene, color_r, texture);
    return cube_mesh;
}

const loader = new THREE.TextureLoader();
const texture = [];
const spread = 15;

function createMaterial(color, texture) {
    const material = new THREE.MeshPhongMaterial({ color: color});
    return material;
}

function addSolidGeometry(x, y, z, geometry, main_mesh, color, texture) {
    const mesh = new THREE.Mesh(geometry, createMaterial(color, texture));
    mesh.position.x = x * spread;
    mesh.position.y = y * spread;
    mesh.position.z = z * spread;
    main_mesh.add(mesh);
    return mesh
}