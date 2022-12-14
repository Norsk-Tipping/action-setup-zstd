const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const exec = require('@actions/exec')

const zstdVersion = '1.5.2'

async function setup() {
    try {

        // debug stuff to find binary within action
        /* await exec.exec('pwd')
        await exec.exec('find / -name zstd') */

        let toolPath = tc.find('zstd', zstdVersion)
        if (toolPath) {
            core.info(`Found zstd in tool cache at ${toolPath}`)
        } else {
            core.info(`zstd not found in tool cache, adding file`)
            toolPath = await tc.cacheFile('/home/runner/_work/_actions/Norsk-Tipping/action-setup-zstd/main/dist/zstd', 'zstd', 'zstd', zstdVersion )
        }
        core.addPath(toolPath)
        core.info(`zstd available at ${toolPath}`)
    } catch (error) {
        core.setFailed(error)
    }
}
module.exports = setup

if (require.main === module) {
    setup();
}
