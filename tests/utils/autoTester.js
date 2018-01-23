
var currentTestName = "";
var currentTestRunning = false;
var currentSteps = [];
var currentStepIndex = 0;

TestCase = function (name, path, func) {
    this.name = name;
    this.path = path;
    this.func = func;
}

var currentTestCase = null;

module.exports.setupTest = function () {
    if (currentTestCase === null) {
        return;
    }

    // Clear the test case steps
    currentSteps = [];
    currentStepIndex = 0;
    currentTestName = currentTestCase.name;

    print("Setup test" + currentTestName);        
    
    // Hide the avatar
    MyAvatar.setEnableMeshVisible(false);
    
    // Zero the head position
    MyAvatar.bodyYaw =   0.0;
    MyAvatar.bodyPitch = 0.0;
    MyAvatar.bodyRoll =  0.0;
    MyAvatar.headYaw =   0.0;
    MyAvatar.headPitch = 0.0;
    MyAvatar.headRoll =  0.0;
    
    // resolvePath(".") returns a string that looks like "file:/" + <current folder>
    // We need the current folder
    var path = currentTestCase.path.substring(currentTestCase.path.indexOf(":") + 4);
    Snapshot.setSnapshotsLocation(path);

    var spectatorCameraConfig = Render.getConfig("SecondaryCamera");
    spectatorCameraConfig.enableSecondaryCameraRenderConfigs(true);
    spectatorCameraConfig.resetSizeSpectatorCamera(1920, 1080);
    spectatorCameraConfig.vFoV = 45;
    Render.getConfig("SecondaryCameraJob.ToneMapping").curve = 0;
    spectatorCameraConfig.orientation = MyAvatar.orientation;
    
    
    // Configure the camera
    spectatorCameraConfig.position = {x: MyAvatar.position.x, y: MyAvatar.position.y + 0.6, z: MyAvatar.position.z};

    return spectatorCameraConfig;
}

var runOneStep = function (stepFunctor, stepIndex) {
    print("Running step " + (stepIndex + 1) + "/" + (currentSteps.length) +": " + stepFunctor.name);
    Window.displayAnnouncement("Running step " + (stepIndex + 1) + "/" + (currentSteps.length) +": " + stepFunctor.name);

    if (stepFunctor.func !== undefined) {
        stepFunctor.func();
    }

    // Not quite sure this is the definitive solution here because of the snapshot bug latency issue.
    // but this seems to work ok if the snapshot is a spearate step
    if (stepFunctor.snap !== undefined && stepFunctor.snap) {
        print("Taking snapshot" + (stepIndex + 1) + "/" + (currentSteps.length));
        Window.takeSecondaryCameraSnapshot();
    }
}

var runNextStep = function () {
    // Run next step and increment only if there is one more
    if (currentStepIndex < currentSteps.length) {
        runOneStep(currentSteps[currentStepIndex], currentStepIndex);
        currentStepIndex++;
    }
    
    // Return true to go on or false if done
    return (currentStepIndex < currentSteps.length)
}

var testOver = function() {
    if (runningManual) {
        Controller.keyPressEvent.disconnect(onKeyPressEventNextStep);
        Window.displayAnnouncement("Test " + currentTestName + " have been completed");
    }
    //Window.message("Test " + currentTestName + " over");
    print("Test over " + currentTestName); 
    
    currentSteps = [];
    currentStepIndex = 0;
    currentTestName = "";      
    currentTestRunning = false;    
    currentTestCase = null;
   // maybe not...
    Script.stop();
}


var onRunAutoNext = function() {  
    // run the step...
    if (!runNextStep()) {
        testOver();       
    }

    // and call itself after next timer
    var STEP_TIME = 2000;   
    Script.setTimeout(
        onRunAutoNext,
        STEP_TIME
    );
}

var onRunAuto = function() {  
    // run the next step after next timer
    var STEP_TIME = 2000;   
    Script.setTimeout(
        onRunAutoNext,
        STEP_TIME
    );
}

var onKeyPressEventNextStep = function (event) {
    if (event.key == 32) {
        if (!runNextStep()) {
            testOver();       
        }
    }
}

var onRunStepByStep = function() {
    Window.displayAnnouncement(
            "Ready to run test " + currentTestName + "\n"
         + currentSteps.length + " steps\nPress [SPACE] for next steps");
    Controller.keyPressEvent.connect( onKeyPressEventNextStep );
}

// Steps is an array of functions; each function being a test step
module.exports.runTest = function (testType) {
    if (testType  == "auto") {
        onRunAuto();
    } else { 
        onRunStepByStep();       
    }
}

// Add Steps to the test case
var doAddStep = function (name, stepFunction, snapshot) {
    currentSteps.push({"index": currentSteps.length, "name": name, "func": stepFunction, "snap": snapshot })
}

// Add Steps to the test case
module.exports.addStep = function (name, stepFunction, snapshot) {
    doAddStep(name, stepFunction, snapshot);
}

module.exports.addStepSnapshot = function (name, stepFunction) {
    doAddStep(name, stepFunction, true);
}


var runningManual = true;

module.exports.runManual = function () {
    return runningManual;
}

module.exports.enableAuto = function () {
    runningManual = false;
}


module.exports.perform = function (testName, testPath, testMain) {
    currentTestRunning = true;
    
    currentTestCase = new TestCase(testName, testPath, testMain);
    
    if (runningManual) {     
        print("Begin manual test:" + testName);        
        currentTestCase.func("stepbystep");
    } else {
        print("Begin auto test:" + testName);        
        currentTestCase.func("auto");
    }
}

module.exports.testRunning = function () {
    return currentTestRunning;
}