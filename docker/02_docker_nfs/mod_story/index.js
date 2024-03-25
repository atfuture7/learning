/**
 * SQLite DB handler
 ****/
var bridge = require("./src/storyObj");

const storyMgr = bridge.storyTool();
module.exports = storyMgr;