// This is an automatically generated file, created by auto-tester on Jul 2 2018, 19:22

PATH_TO_THE_REPO_PATH_UTILS_FILE = "https://raw.githubusercontent.com/highfidelity/hifi_tests/master/tests/utils/branchUtils.js";
Script.include(PATH_TO_THE_REPO_PATH_UTILS_FILE);
var autoTester = createAutoTester(Script.resolvePath("."));

var testsRootPath = autoTester.getTestsRootPath();

if (typeof Test !== 'undefined') {
    Test.wait(10000);
};

autoTester.enableRecursive();
autoTester.enableAuto();


autoTester.runRecursive();
