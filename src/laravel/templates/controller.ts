export const controllerStoreTemplate = {
    // one to many and child
    oneToManyAndChild: function (rel: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return ``
    },
    // one to many and parent
    oneToManyAndParent: function (relation: any, entityName: string) {
        // const lowerCasedEntityName = entityName.toLowerCase()
        return ``
    },
    // many to many
    manyToMany: function (relation: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return `$${lowerCasedEntityName}->${relation.relationTable?.apiIdPlural}()->attach($request->input("${relation.relationTable?.apiIdPlural}"));`
    },
    default: function (entityName: string) {
        return ``
    },
}

export const controllerUpdateTemplate = {
    default: function (entityName: string) {
        return ``
    },
    oneToManyAndChild: function (rel: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return `

        `
    },
    manyToMany: function (relation: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return `$${lowerCasedEntityName}->${relation.relationTable?.apiIdPlural}()->sync($request->input("${relation.relationTable?.apiIdPlural}"));`
    },
    oneToManyAndParent: function (relation: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return ``
    },
}
