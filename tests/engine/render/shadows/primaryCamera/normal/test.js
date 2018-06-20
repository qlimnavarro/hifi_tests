Script.include("https://github.com/highfidelity/hifi_tests/blob/RC69/tests/utils/branchUtils.js?raw=true");
var autoTester = createAutoTester(Script.resolvePath("."));

autoTester.perform("Shadow - light on top", Script.resolvePath("."), "primary", function(testType) {
    // Test material matrix
    Script.include("../../setup.js?raw=true")

    // Add the test Cases
    var createdEntities = [];
    autoTester.addStep("Set up test case", function () {
        createdEntities = setup(80.0, -60.0, autoTester.getOriginFrame());
    });

    autoTester.addStepSnapshot("Light source altitude: 80.0, azimuth: -60.0");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});