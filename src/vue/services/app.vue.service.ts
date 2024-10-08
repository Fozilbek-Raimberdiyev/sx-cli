import { appVueContent } from '../mock/app.vue'
import path from 'path'
import fs from 'fs'
import { ensureDirectoryExists } from '../../utils/folder'
export function generateAppVueContent(
    entities: { name: string; groupName: string }[],
    projectPath: string
) {
    const content = appVueContent(entities)
    const appVuePath = path.join(projectPath, 'resources', 'vue', 'App.vue')
    ensureDirectoryExists(appVuePath)
    fs.writeFileSync(appVuePath, content)
}
