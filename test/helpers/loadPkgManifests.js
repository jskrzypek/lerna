"use strict";

const globby = require("globby");
const loadJsonFile = require("load-json-file");

module.exports = loadPkgManifests;

async function loadPkgManifests(cwd) {
  const files = await globby(
    [
      // all child packages, at any level
      "**/package.json",
      // but not the root
      "!package.json",
      // and not installed
      "!**/node_modules",
    ],
    {
      cwd,
      absolute: true,
      followSymlinkedDirectories: false,
    }
  );

  return Promise.all(files.sort().map(fp => loadJsonFile(fp)));
}
