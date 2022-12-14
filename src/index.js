const core = require('@actions/core')
const tc = require('@actions/tool-cache')

const zstdVersion = '1.5.2'

async function setup() {
    try {
        let toolPath = tc.find('zstd', zstdVersion)
        if (toolPath) {
            core.info(`Found zstd in tool cache at ${toolPath}`)
        } else {
            toolPath = await tc.cacheFile('dist/zstd', 'zstd', zstdVersion)
        }
        core.addPath(toolPath)
        core.info(`zstd installed to ${toolPath}`)
    } catch (error) {
        core.setFailed(error.message)
    }
}
module.exports = setup

if (require.main === module) {
    setup();
}
