# Forge-Viewer-DiffTool
Practice with DiffTool Extension of Forge Viewer

This is based on [learnForge tutorial](https://github.com/Autodesk-Forge/learn.forge.viewmodels/tree/nodejs). 

## Step

1. Follow the steps of [learnForge tutorial](https://github.com/Autodesk-Forge/learn.forge.viewmodels/tree/nodejs) to setup the sample.
2. Start to run the sample by
    node start.js
3. Open the browser: [http://localhost:3000](http://localhost:3000).
4. In one bucket, upload two versions of one model. Two demo models are available at [testmodels](/test models) folder.
5. After the models are uploaded, single click them one by one, a message on  the right panel will shown up: click **Start Translation**
6. Keep single clicking the models node until the translation is done. 
7. Single click one model. Forge Viewer will load it.
8. Tick another model, click **Append Models**. Forge Viewer will append another model
9. Click **Diff Tool**, the DiffTool extension will be loaded. The menus of this extension will be also shown up. Please check [this blog](https://forge.autodesk.com/blog/difference-3d-models-autodeskdifftool-extension) for more details. The sample of DiffTool options hard-coded the primary model, diff model and version number. Change them with your requirement. 

