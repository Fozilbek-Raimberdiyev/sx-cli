export const data = [
    {
        name: 'Developer',
        apiIdSingular: 'developer',
        apiIdPlural: 'developers',
        gropName: '',
        relations: [
            {
                relationType: null,
                relationTable: null,
            },
            {
                relationType: {
                    name: 'Many to Many',
                    code: 'many-to-many',
                },
                relationTable: {
                    name: 'Skill',
                    apiIdSingular: 'skill',
                    apiIdPlural: 'skills',
                },
            },
            {
                relationType: {
                    name: 'Many to Many',
                    code: 'many-to-many',
                },
                relationTable: {
                    name: 'Project',
                    apiIdSingular: 'project',
                    apiIdPlural: 'projects',
                },
            },
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Image',
                    apiIdSingular: 'image',
                    apiIdPlural: 'images',
                },
            },
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Address',
                    apiIdSingular: 'address',
                    apiIdPlural: 'addresses',
                },
            },
        ],
        fields: [],
        groupName: '',
    },
    {
        name: 'Skill',
        apiIdSingular: 'skill',
        apiIdPlural: 'skills',
        gropName: '',
        relations: [
            {
                relationType: {
                    name: 'Many to Many',
                    code: 'many-to-many',
                },
                relationTable: {
                    name: 'Developer',
                    apiIdSingular: 'developer',
                    apiIdPlural: 'developers',
                    gropName: '',
                    relations: [
                        {
                            relationType: null,
                            relationTable: null,
                        },
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Skill',
                                apiIdSingular: 'skill',
                                apiIdPlural: 'skills',
                            },
                        },
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Project',
                                apiIdSingular: 'project',
                                apiIdPlural: 'projects',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Image',
                                apiIdSingular: 'image',
                                apiIdPlural: 'images',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Address',
                                apiIdSingular: 'address',
                                apiIdPlural: 'addresses',
                            },
                        },
                    ],
                    fields: [],
                    groupName: '',
                },
            },
        ],
        fields: [],
        groupName: '',
    },
    {
        name: 'Project',
        apiIdSingular: 'project',
        apiIdPlural: 'projects',
        gropName: '',
        relations: [
            {
                relationType: {
                    name: 'Many to Many',
                    code: 'many-to-many',
                },
                relationTable: {
                    name: 'Developer',
                    apiIdSingular: 'developer',
                    apiIdPlural: 'developers',
                    gropName: '',
                    relations: [
                        {
                            relationType: null,
                            relationTable: null,
                        },
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Skill',
                                apiIdSingular: 'skill',
                                apiIdPlural: 'skills',
                            },
                        },
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Project',
                                apiIdSingular: 'project',
                                apiIdPlural: 'projects',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Image',
                                apiIdSingular: 'image',
                                apiIdPlural: 'images',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Address',
                                apiIdSingular: 'address',
                                apiIdPlural: 'addresses',
                            },
                        },
                    ],
                    fields: [],
                    groupName: '',
                },
            },
        ],
        fields: [],
        groupName: '',
    },
    {
        name: 'Image',
        apiIdSingular: 'image',
        apiIdPlural: 'images',
        gropName: '',
        relations: [
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Developer',
                    apiIdSingular: 'developer',
                    apiIdPlural: 'developers',
                    gropName: '',
                    relations: [
                        {
                            relationType: null,
                            relationTable: null,
                        },
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Skill',
                                apiIdSingular: 'skill',
                                apiIdPlural: 'skills',
                            },
                        },
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Project',
                                apiIdSingular: 'project',
                                apiIdPlural: 'projects',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Image',
                                apiIdSingular: 'image',
                                apiIdPlural: 'images',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Address',
                                apiIdSingular: 'address',
                                apiIdPlural: 'addresses',
                            },
                        },
                    ],
                    fields: [],
                    groupName: '',
                },
            },
        ],
        fields: [],
        groupName: '',
    },
    {
        name: 'Address',
        apiIdSingular: 'address',
        apiIdPlural: 'addresses',
        gropName: '',
        relations: [
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Developer',
                    apiIdSingular: 'developer',
                    apiIdPlural: 'developers',
                    gropName: '',
                    relations: [
                        {
                            relationType: null,
                            relationTable: null,
                        },
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Skill',
                                apiIdSingular: 'skill',
                                apiIdPlural: 'skills',
                            },
                        },
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Project',
                                apiIdSingular: 'project',
                                apiIdPlural: 'projects',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Image',
                                apiIdSingular: 'image',
                                apiIdPlural: 'images',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Address',
                                apiIdSingular: 'address',
                                apiIdPlural: 'addresses',
                            },
                        },
                    ],
                    fields: [],
                    groupName: '',
                },
            },
        ],
        fields: [],
        groupName: '',
    },
]