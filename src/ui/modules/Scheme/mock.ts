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
        name: 'Post',
        apiIdSingular: 'post',
        apiIdPlural: 'posts',
        groupName: '',
        relations: [
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Comment',
                    apiIdSingular: 'comment',
                    apiIdPlural: 'comments',
                    groupName: '',
                    relations: [
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Post',
                                apiIdSingular: 'post',
                                apiIdPlural: 'posts',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Child',
                                code: 'child',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isChild: true,
                            isParent: false,
                            parent: {
                                name: 'Post',
                                apiIdSingular: 'post',
                                apiIdPlural: 'posts',
                                groupName: '',
                            },
                            child: {
                                name: 'Comment',
                                apiIdSingular: 'comment',
                                apiIdPlural: 'comments',
                                groupName: '',
                                relations: [],
                                fields: [
                                    {
                                        name: 'content',
                                        type: 'longText',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                        },
                    ],
                    fields: [
                        {
                            name: 'content',
                            type: 'longText',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
                relationMode: {
                    name: 'Parent',
                    code: 'parent',
                },
                isOneToMany: true,
                isManyToMany: false,
                isParent: true,
                isChild: false,
                parent: {
                    name: 'Post',
                    apiIdSingular: 'post',
                    apiIdPlural: 'posts',
                    groupName: '',
                },
                child: {
                    name: 'Comment',
                    apiIdSingular: 'comment',
                    apiIdPlural: 'comments',
                    groupName: '',
                    relations: [],
                    fields: [
                        {
                            name: 'content',
                            type: 'longText',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
            },
        ],
        fields: [
            {
                name: 'content',
                type: 'longText',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
    {
        name: 'Comment',
        apiIdSingular: 'comment',
        apiIdPlural: 'comments',
        groupName: '',
        relations: [
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Post',
                    apiIdSingular: 'post',
                    apiIdPlural: 'posts',
                    groupName: '',
                },
                relationMode: {
                    name: 'Child',
                    code: 'child',
                },
                isOneToMany: true,
                isManyToMany: false,
                isChild: true,
                isParent: false,
                parent: {
                    name: 'Post',
                    apiIdSingular: 'post',
                    apiIdPlural: 'posts',
                    groupName: '',
                },
                child: {
                    name: 'Comment',
                    apiIdSingular: 'comment',
                    apiIdPlural: 'comments',
                    groupName: '',
                    relations: [],
                    fields: [
                        {
                            name: 'content',
                            type: 'longText',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
            },
        ],
        fields: [
            {
                name: 'content',
                type: 'longText',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
    {
        name: 'Country',
        apiIdSingular: 'country',
        apiIdPlural: 'countries',
        groupName: '',
        relations: [
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Region',
                    apiIdSingular: 'region',
                    apiIdPlural: 'regions',
                    groupName: '',
                    relations: [
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Child',
                                code: 'child',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isChild: true,
                            isParent: false,
                            parent: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            child: {
                                name: 'Region',
                                apiIdSingular: 'region',
                                apiIdPlural: 'regions',
                                groupName: '',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'District',
                                apiIdSingular: 'district',
                                apiIdPlural: 'districts',
                                groupName: '',
                                relations: [
                                    {
                                        relationType: {
                                            name: 'One to Many',
                                            code: 'one-to-many',
                                        },
                                        relationTable: {
                                            name: 'Country',
                                            apiIdSingular: 'country',
                                            apiIdPlural: 'countries',
                                            groupName: '',
                                        },
                                        relationMode: {
                                            name: 'Child',
                                            code: 'child',
                                        },
                                        isOneToMany: true,
                                        isManyToMany: false,
                                        isChild: true,
                                        isParent: false,
                                        parent: {
                                            name: 'Country',
                                            apiIdSingular: 'country',
                                            apiIdPlural: 'countries',
                                            groupName: '',
                                        },
                                        child: {
                                            name: 'District',
                                            apiIdSingular: 'district',
                                            apiIdPlural: 'districts',
                                            groupName: '',
                                            relations: [],
                                            fields: [
                                                {
                                                    name: 'title',
                                                    type: 'string',
                                                    validationRules: 'required',
                                                    isNullable: true,
                                                },
                                            ],
                                            gropName: '',
                                        },
                                    },
                                    {
                                        relationType: {
                                            name: 'One to Many',
                                            code: 'one-to-many',
                                        },
                                        relationTable: {
                                            name: 'Region',
                                            apiIdSingular: 'region',
                                            apiIdPlural: 'regions',
                                            groupName: '',
                                        },
                                        relationMode: {
                                            name: 'Child',
                                            code: 'child',
                                        },
                                        isOneToMany: true,
                                        isManyToMany: false,
                                        isChild: true,
                                        isParent: false,
                                        parent: {
                                            name: 'Region',
                                            apiIdSingular: 'region',
                                            apiIdPlural: 'regions',
                                            groupName: '',
                                        },
                                        child: {
                                            name: 'District',
                                            apiIdSingular: 'district',
                                            apiIdPlural: 'districts',
                                            groupName: '',
                                            relations: [
                                                {
                                                    relationType: {
                                                        name: 'One to Many',
                                                        code: 'one-to-many',
                                                    },
                                                    relationTable: {
                                                        name: 'Country',
                                                        apiIdSingular:
                                                            'country',
                                                        apiIdPlural:
                                                            'countries',
                                                        groupName: '',
                                                    },
                                                    relationMode: {
                                                        name: 'Child',
                                                        code: 'child',
                                                    },
                                                    isOneToMany: true,
                                                    isManyToMany: false,
                                                    isChild: true,
                                                    isParent: false,
                                                    parent: {
                                                        name: 'Country',
                                                        apiIdSingular:
                                                            'country',
                                                        apiIdPlural:
                                                            'countries',
                                                        groupName: '',
                                                    },
                                                    child: {
                                                        name: 'District',
                                                        apiIdSingular:
                                                            'district',
                                                        apiIdPlural:
                                                            'districts',
                                                        groupName: '',
                                                        relations: [],
                                                        fields: [
                                                            {
                                                                name: 'title',
                                                                type: 'string',
                                                                validationRules:
                                                                    'required',
                                                                isNullable:
                                                                    true,
                                                            },
                                                        ],
                                                        gropName: '',
                                                    },
                                                },
                                            ],
                                            fields: [
                                                {
                                                    name: 'title',
                                                    type: 'string',
                                                    validationRules: 'required',
                                                    isNullable: true,
                                                },
                                            ],
                                            gropName: '',
                                        },
                                    },
                                ],
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'string',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                            relationMode: {
                                name: 'Parent',
                                code: 'parent',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isParent: true,
                            isChild: false,
                            parent: {
                                name: 'Region',
                                apiIdSingular: 'region',
                                apiIdPlural: 'regions',
                                groupName: '',
                            },
                            child: {
                                name: 'District',
                                apiIdSingular: 'district',
                                apiIdPlural: 'districts',
                                groupName: '',
                                relations: [
                                    {
                                        relationType: {
                                            name: 'One to Many',
                                            code: 'one-to-many',
                                        },
                                        relationTable: {
                                            name: 'Country',
                                            apiIdSingular: 'country',
                                            apiIdPlural: 'countries',
                                            groupName: '',
                                        },
                                        relationMode: {
                                            name: 'Child',
                                            code: 'child',
                                        },
                                        isOneToMany: true,
                                        isManyToMany: false,
                                        isChild: true,
                                        isParent: false,
                                        parent: {
                                            name: 'Country',
                                            apiIdSingular: 'country',
                                            apiIdPlural: 'countries',
                                            groupName: '',
                                        },
                                        child: {
                                            name: 'District',
                                            apiIdSingular: 'district',
                                            apiIdPlural: 'districts',
                                            groupName: '',
                                            relations: [],
                                            fields: [
                                                {
                                                    name: 'title',
                                                    type: 'string',
                                                    validationRules: 'required',
                                                    isNullable: true,
                                                },
                                            ],
                                            gropName: '',
                                        },
                                    },
                                ],
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'string',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                        },
                    ],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
                relationMode: {
                    name: 'Parent',
                    code: 'parent',
                },
                isOneToMany: true,
                isManyToMany: false,
                isParent: true,
                isChild: false,
                parent: {
                    name: 'Country',
                    apiIdSingular: 'country',
                    apiIdPlural: 'countries',
                    groupName: '',
                },
                child: {
                    name: 'Region',
                    apiIdSingular: 'region',
                    apiIdPlural: 'regions',
                    groupName: '',
                    relations: [],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
            },
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'District',
                    apiIdSingular: 'district',
                    apiIdPlural: 'districts',
                    groupName: '',
                    relations: [
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Child',
                                code: 'child',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isChild: true,
                            isParent: false,
                            parent: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            child: {
                                name: 'District',
                                apiIdSingular: 'district',
                                apiIdPlural: 'districts',
                                groupName: '',
                                relations: [],
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'string',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Region',
                                apiIdSingular: 'region',
                                apiIdPlural: 'regions',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Child',
                                code: 'child',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isChild: true,
                            isParent: false,
                            parent: {
                                name: 'Region',
                                apiIdSingular: 'region',
                                apiIdPlural: 'regions',
                                groupName: '',
                            },
                            child: {
                                name: 'District',
                                apiIdSingular: 'district',
                                apiIdPlural: 'districts',
                                groupName: '',
                                relations: [
                                    {
                                        relationType: {
                                            name: 'One to Many',
                                            code: 'one-to-many',
                                        },
                                        relationTable: {
                                            name: 'Country',
                                            apiIdSingular: 'country',
                                            apiIdPlural: 'countries',
                                            groupName: '',
                                        },
                                        relationMode: {
                                            name: 'Child',
                                            code: 'child',
                                        },
                                        isOneToMany: true,
                                        isManyToMany: false,
                                        isChild: true,
                                        isParent: false,
                                        parent: {
                                            name: 'Country',
                                            apiIdSingular: 'country',
                                            apiIdPlural: 'countries',
                                            groupName: '',
                                        },
                                        child: {
                                            name: 'District',
                                            apiIdSingular: 'district',
                                            apiIdPlural: 'districts',
                                            groupName: '',
                                            relations: [],
                                            fields: [
                                                {
                                                    name: 'title',
                                                    type: 'string',
                                                    validationRules: 'required',
                                                    isNullable: true,
                                                },
                                            ],
                                            gropName: '',
                                        },
                                    },
                                ],
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'string',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                        },
                    ],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
                relationMode: {
                    name: 'Parent',
                    code: 'parent',
                },
                isOneToMany: true,
                isManyToMany: false,
                isParent: true,
                isChild: false,
                parent: {
                    name: 'Country',
                    apiIdSingular: 'country',
                    apiIdPlural: 'countries',
                    groupName: '',
                },
                child: {
                    name: 'District',
                    apiIdSingular: 'district',
                    apiIdPlural: 'districts',
                    groupName: '',
                    relations: [],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
            },
        ],
        fields: [
            {
                name: 'title',
                type: 'string',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
    {
        name: 'Region',
        apiIdSingular: 'region',
        apiIdPlural: 'regions',
        groupName: '',
        relations: [
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Country',
                    apiIdSingular: 'country',
                    apiIdPlural: 'countries',
                    groupName: '',
                },
                relationMode: {
                    name: 'Child',
                    code: 'child',
                },
                isOneToMany: true,
                isManyToMany: false,
                isChild: true,
                isParent: false,
                parent: {
                    name: 'Country',
                    apiIdSingular: 'country',
                    apiIdPlural: 'countries',
                    groupName: '',
                },
                child: {
                    name: 'Region',
                    apiIdSingular: 'region',
                    apiIdPlural: 'regions',
                    groupName: '',
                },
            },
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'District',
                    apiIdSingular: 'district',
                    apiIdPlural: 'districts',
                    groupName: '',
                    relations: [
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Child',
                                code: 'child',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isChild: true,
                            isParent: false,
                            parent: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            child: {
                                name: 'District',
                                apiIdSingular: 'district',
                                apiIdPlural: 'districts',
                                groupName: '',
                                relations: [],
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'string',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                        },
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Region',
                                apiIdSingular: 'region',
                                apiIdPlural: 'regions',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Child',
                                code: 'child',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isChild: true,
                            isParent: false,
                            parent: {
                                name: 'Region',
                                apiIdSingular: 'region',
                                apiIdPlural: 'regions',
                                groupName: '',
                            },
                            child: {
                                name: 'District',
                                apiIdSingular: 'district',
                                apiIdPlural: 'districts',
                                groupName: '',
                                relations: [
                                    {
                                        relationType: {
                                            name: 'One to Many',
                                            code: 'one-to-many',
                                        },
                                        relationTable: {
                                            name: 'Country',
                                            apiIdSingular: 'country',
                                            apiIdPlural: 'countries',
                                            groupName: '',
                                        },
                                        relationMode: {
                                            name: 'Child',
                                            code: 'child',
                                        },
                                        isOneToMany: true,
                                        isManyToMany: false,
                                        isChild: true,
                                        isParent: false,
                                        parent: {
                                            name: 'Country',
                                            apiIdSingular: 'country',
                                            apiIdPlural: 'countries',
                                            groupName: '',
                                        },
                                        child: {
                                            name: 'District',
                                            apiIdSingular: 'district',
                                            apiIdPlural: 'districts',
                                            groupName: '',
                                            relations: [],
                                            fields: [
                                                {
                                                    name: 'title',
                                                    type: 'string',
                                                    validationRules: 'required',
                                                    isNullable: true,
                                                },
                                            ],
                                            gropName: '',
                                        },
                                    },
                                ],
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'string',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                        },
                    ],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
                relationMode: {
                    name: 'Parent',
                    code: 'parent',
                },
                isOneToMany: true,
                isManyToMany: false,
                isParent: true,
                isChild: false,
                parent: {
                    name: 'Region',
                    apiIdSingular: 'region',
                    apiIdPlural: 'regions',
                    groupName: '',
                },
                child: {
                    name: 'District',
                    apiIdSingular: 'district',
                    apiIdPlural: 'districts',
                    groupName: '',
                    relations: [
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Child',
                                code: 'child',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isChild: true,
                            isParent: false,
                            parent: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            child: {
                                name: 'District',
                                apiIdSingular: 'district',
                                apiIdPlural: 'districts',
                                groupName: '',
                                relations: [],
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'string',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                        },
                    ],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
            },
        ],
        fields: [
            {
                name: 'title',
                type: 'string',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
    {
        name: 'District',
        apiIdSingular: 'district',
        apiIdPlural: 'districts',
        groupName: '',
        relations: [
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Country',
                    apiIdSingular: 'country',
                    apiIdPlural: 'countries',
                    groupName: '',
                },
                relationMode: {
                    name: 'Child',
                    code: 'child',
                },
                isOneToMany: true,
                isManyToMany: false,
                isChild: true,
                isParent: false,
                parent: {
                    name: 'Country',
                    apiIdSingular: 'country',
                    apiIdPlural: 'countries',
                    groupName: '',
                },
                child: {
                    name: 'District',
                    apiIdSingular: 'district',
                    apiIdPlural: 'districts',
                    groupName: '',
                    relations: [],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
            },
            {
                relationType: {
                    name: 'One to Many',
                    code: 'one-to-many',
                },
                relationTable: {
                    name: 'Region',
                    apiIdSingular: 'region',
                    apiIdPlural: 'regions',
                    groupName: '',
                },
                relationMode: {
                    name: 'Child',
                    code: 'child',
                },
                isOneToMany: true,
                isManyToMany: false,
                isChild: true,
                isParent: false,
                parent: {
                    name: 'Region',
                    apiIdSingular: 'region',
                    apiIdPlural: 'regions',
                    groupName: '',
                },
                child: {
                    name: 'District',
                    apiIdSingular: 'district',
                    apiIdPlural: 'districts',
                    groupName: '',
                    relations: [
                        {
                            relationType: {
                                name: 'One to Many',
                                code: 'one-to-many',
                            },
                            relationTable: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Child',
                                code: 'child',
                            },
                            isOneToMany: true,
                            isManyToMany: false,
                            isChild: true,
                            isParent: false,
                            parent: {
                                name: 'Country',
                                apiIdSingular: 'country',
                                apiIdPlural: 'countries',
                                groupName: '',
                            },
                            child: {
                                name: 'District',
                                apiIdSingular: 'district',
                                apiIdPlural: 'districts',
                                groupName: '',
                                relations: [],
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'string',
                                        validationRules: 'required',
                                        isNullable: true,
                                    },
                                ],
                                gropName: '',
                            },
                        },
                    ],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
            },
        ],
        fields: [
            {
                name: 'title',
                type: 'string',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
    {
        name: 'Developer',
        apiIdSingular: 'developer',
        apiIdPlural: 'developers',
        groupName: '',
        relations: [
            {
                relationType: {
                    name: 'Many to Many',
                    code: 'many-to-many',
                },
                relationTable: {
                    name: 'Skill',
                    apiIdSingular: 'skill',
                    apiIdPlural: 'skills',
                    groupName: '',
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
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Both',
                                code: 'both',
                            },
                            isOneToMany: false,
                            isManyToMany: true,
                            isChild: null,
                            isParent: null,
                            parent: null,
                            child: null,
                        },
                    ],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
                relationMode: {
                    name: 'Both',
                    code: 'both',
                },
                isOneToMany: false,
                isManyToMany: true,
                isParent: null,
                isChild: null,
                parent: null,
                child: null,
            },
        ],
        fields: [
            {
                name: 'title',
                type: 'string',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
    {
        name: 'Skill',
        apiIdSingular: 'skill',
        apiIdPlural: 'skills',
        groupName: '',
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
                    groupName: '',
                },
                relationMode: {
                    name: 'Both',
                    code: 'both',
                },
                isOneToMany: false,
                isManyToMany: true,
                isChild: null,
                isParent: null,
                parent: null,
                child: null,
            },
        ],
        fields: [
            {
                name: 'title',
                type: 'string',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
    {
        name: 'Role',
        apiIdSingular: 'role',
        apiIdPlural: 'roles',
        groupName: '',
        relations: [
            {
                relationType: {
                    name: 'Many to Many',
                    code: 'many-to-many',
                },
                relationTable: {
                    name: 'Permission',
                    apiIdSingular: 'permission',
                    apiIdPlural: 'permissions',
                    groupName: '',
                    relations: [
                        {
                            relationType: {
                                name: 'Many to Many',
                                code: 'many-to-many',
                            },
                            relationTable: {
                                name: 'Role',
                                apiIdSingular: 'role',
                                apiIdPlural: 'roles',
                                groupName: '',
                            },
                            relationMode: {
                                name: 'Both',
                                code: 'both',
                            },
                            isOneToMany: false,
                            isManyToMany: true,
                            isChild: null,
                            isParent: null,
                            parent: null,
                            child: null,
                        },
                    ],
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            validationRules: 'required',
                            isNullable: true,
                        },
                    ],
                    gropName: '',
                },
                relationMode: {
                    name: 'Both',
                    code: 'both',
                },
                isOneToMany: false,
                isManyToMany: true,
                isParent: null,
                isChild: null,
                parent: null,
                child: null,
            },
        ],
        fields: [
            {
                name: 'title',
                type: 'string',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
    {
        name: 'Permission',
        apiIdSingular: 'permission',
        apiIdPlural: 'permissions',
        groupName: '',
        relations: [
            {
                relationType: {
                    name: 'Many to Many',
                    code: 'many-to-many',
                },
                relationTable: {
                    name: 'Role',
                    apiIdSingular: 'role',
                    apiIdPlural: 'roles',
                    groupName: '',
                },
                relationMode: {
                    name: 'Both',
                    code: 'both',
                },
                isOneToMany: false,
                isManyToMany: true,
                isChild: null,
                isParent: null,
                parent: null,
                child: null,
            },
        ],
        fields: [
            {
                name: 'title',
                type: 'string',
                validationRules: 'required',
                isNullable: true,
            },
        ],
        gropName: '',
    },
]
