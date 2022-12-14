const core = require('@actions/core')
const tc = require('@actions/tool-cache')

const zstdVersion = '1.5.2'
const tools = ['zstd', 'zstdmt']

async function setup() {

    // debug stuff to find binary within action
    /*
    const exec = require('@actions/exec')
    await exec.exec('pwd')
    await exec.exec('find /home/runner -name zstd')
    */

    tools.forEach(async function (toolName) {
        try {
            let toolPath = tc.find(toolName, zstdVersion)
            if (toolPath) {
                core.info(`Found ${toolName} in tool cache at ${toolPath}`)
            } else {
                core.info(`${toolName} not found in tool cache, adding file`)
                toolPath = await tc.cacheFile(`/home/runner/_work/_actions/Norsk-Tipping/action-setup-zstd/main/dist/${toolName}`, toolName, toolName, zstdVersion )
            }
            core.addPath(toolPath)
            core.info(`${toolName} available at ${toolPath}`)
        } catch (error) {
            core.setFailed(error)
        }
    })
}
module.exports = setup

if (require.main === module) {
    setup();
}
