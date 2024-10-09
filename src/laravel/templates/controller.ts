export const controllerStoreTemplate = {
    // one to many and child
    oneToManyAndChild: function (rel: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return `
    $${rel.parent.apiIdSingular}Id = $request->input('${rel.parent.apiIdSingular}');
    $${lowerCasedEntityName} = new ${entityName}($request->validated());
  $${lowerCasedEntityName}->${rel.parent.apiIdSingular}_id = $${rel.parent.apiIdSingular}Id;
  $${lowerCasedEntityName}->save();
    `
    },
    // one to many and parent
    oneToManyAndParent: function (relation: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return `
        // Assuming '${relation.child.apiIdPlural}' is an array of comment data
        if ($${relation.child.apiIdPlural} = $request->input('${relation.child.apiIdPlural}')) {
            foreach ($${relation.child.apiIdPlural} as $${relation.child.apiIdSingular}Data) {
                $${lowerCasedEntityName}->${relation.child.apiIdPlural}()->create($${relation.child.apiIdSingular}Data);
            }
        }`
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
        $${rel.parent.apiIdSingular}Id = $request->input('${rel.parent.apiIdSingular}');
        $${lowerCasedEntityName}->update($request->validated());
        $${lowerCasedEntityName}->${rel.parent.apiIdSingular}_id = $${rel.parent.apiIdSingular}Id;
        $${lowerCasedEntityName}->save();
        `
    },
    manyToMany: function (relation: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return `$${lowerCasedEntityName}->${relation.relationTable?.apiIdPlural}()->sync($request->input("${relation.relationTable?.apiIdPlural}"));`
    },
    oneToManyAndParent: function (relation: any, entityName: string) {
        const lowerCasedEntityName = entityName.toLowerCase()
        return `
        // Assuming '${relation.child.apiIdPlural}' is an array of comment data
        if ($${relation.child.apiIdPlural} = $request->input('${relation.child.apiIdPlural}')) {
            foreach ($${relation.child.apiIdPlural} as $${relation.child.apiIdSingular}Data) {
                $${lowerCasedEntityName}->${relation.child.apiIdPlural}()->attach($${relation.child.apiIdSingular}Data);
            }
        }`
    },
}
