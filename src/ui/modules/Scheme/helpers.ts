export function generatePivotRelations(tables: any[]) {
    const pivots = []
    const pivotNames = new Set() // Set to track unique pivot names
    for (const table of tables) {
        if (table.relations)
            for (const relation of table?.relations) {
                if (relation.relationTable) {
                    const sortedSingularNames = [
                        table.apiIdSingular,
                        relation.relationTable.apiIdSingular,
                    ].sort()
                    // Create pivot name in alphabetical order
                    const pivotName = sortedSingularNames.join('_') // Join with underscore

                    // Only add pivot if the name is not already in the pivotNames set
                    if (!pivotNames.has(pivotName)) {
                        const pivot = {
                            name: pivotName,
                            fields: [
                                {
                                    type: 'foreignId',
                                    title: sortedSingularNames[0],
                                },
                                {
                                    type: 'foreignId',
                                    title: sortedSingularNames[1],
                                },
                                {
                                    type: 'primary',
                                    title: [
                                        sortedSingularNames[0] + '_id',
                                        sortedSingularNames[1] + '_id',
                                    ],
                                },
                            ],
                        }
                        if (relation.relationType?.code === 'many-to-many') {
                            pivots.push(pivot) // Add the pivot object to the array
                            pivotNames.add(pivotName) // Track the pivot name to prevent duplicates
                        }
                    }
                }
            }
    }

    return pivots
}
