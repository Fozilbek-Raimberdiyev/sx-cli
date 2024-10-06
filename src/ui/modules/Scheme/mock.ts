export const relationModes = [
    {
        name: 'Child',
        code: 'child',
    },
    {
        name: 'Parent',
        code: 'parent',
    },
    {
        name: 'Both',
        code: 'both',
    },
]

export const relationTypes = [
    {
        name: 'One to Many',
        code: 'one-to-many',
    },
    {
        name: 'Many to Many',
        code: 'many-to-many',
    },
]

export const tablesMock = [
    {
        name: 'Developer',
        apiIdSingular: 'developer',
        apiIdPlural: 'developers',
        groupName: '',
        relations: [],
        fields: [
            {
                name: 'fullName',
                type: 'string',
                validationRules: 'required',
                isNullable: false,
            },
        ],
    },
    {
        name: 'Skill',
        apiIdSingular: 'skill',
        apiIdPlural: 'skills',
        groupName: '',
        relations: [],
        fields: [
            {
                name: 'title',
                type: 'string',
                validationRules: 'required',
                isNullable: false,
            },
        ],
        gropName: '',
    },
]
