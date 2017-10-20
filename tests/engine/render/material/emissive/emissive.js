// Test material matrix
Script.include("../matrix.js")

// List here all the entries of the Material Matrix tested in this test
var TEST_CASES = [
    {name:"hifi_emissiveV_albedoV_ao",  a:0, b:0},
    {name:"hifi_emissiveM_albedoV_ao",  a:0, b:1},  
];

// Add the test Cases
var createdEntities = addCases(TEST_CASES)

// clean up after test
Script.scriptEnding.connect(function () {
    for (var i = 0; i < createdEntities.length; i++) {
        Entities.deleteEntity(createdEntities[i]);
    }
});