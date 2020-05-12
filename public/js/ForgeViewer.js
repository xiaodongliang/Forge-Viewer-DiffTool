/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

var viewer;


function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId,  onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
  });
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      console.log(data.access_token)
      callback(data.access_token, data.expires_in);
    });
  });
}

function setTextureMaterial (viewer,material_guid, dbId) { 

  var fragIds = []
  viewer.model.getInstanceTree().enumNodeFragments(dbId,i=>fragIds.push(i))
  const material = viewer.impl.getMaterials()._materials[material_guid]

  fragIds.forEach((fragId) => {
    viewer.model.getFragmentList().setMaterial(
      fragId, material)
  })

  viewer.impl.sceneUpdated(true)
}

function createTexMaterial (viewer,texture) {
  //const tex = THREE.ImageUtils.loadTexture(texture)

  var image = document.createElement( 'img' );
  image.src = texture;
  //document.body.appendChild(image)
 
  var tex = new THREE.Texture( image );

  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping

  tex.repeat.set(1, 1)
  tex.needsUpdate = true;

  var material = new THREE.MeshBasicMaterial({
    specular: new THREE.Color(0x111111),
    side: THREE.DoubleSide,
    reflectivity: 0.0,
    map: tex
  })

  const materials = viewer.impl.getMaterials()
  const material_guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  console.log(material_guid)
  materials.addMaterial(
    material_guid,
    material,
    true)

  material.name = 'brick.jpg'

  return material
}