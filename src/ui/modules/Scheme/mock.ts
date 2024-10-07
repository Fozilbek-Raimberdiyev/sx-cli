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
        "name": "Post",
        "apiIdSingular": "post",
        "apiIdPlural": "posts",
        "groupName": "",
        "relations": [
            {
                "relationType": {
                    "name": "One to Many",
                    "code": "one-to-many"
                },
                "relationTable": {
                    "name": "Comment",
                    "apiIdSingular": "comment",
                    "apiIdPlural": "comments",
                    "groupName": "",
                    "relations": [
                        {
                            "relationType": {
                                "name": "One to Many",
                                "code": "one-to-many"
                            },
                            "relationTable": {
                                "name": "Post",
                                "apiIdSingular": "post",
                                "apiIdPlural": "posts",
                                "groupName": ""
                            },
                            "relationMode": {
                                "name": "Child",
                                "code": "child"
                            },
                            "isOneToMany": true,
                            "isManyToMany": false,
                            "isChild": true,
                            "isParent": false,
                            "parent": {
                                "name": "Post",
                                "apiIdSingular": "post",
                                "apiIdPlural": "posts",
                                "groupName": ""
                            },
                            "child": {
                                "name": "Comment",
                                "apiIdSingular": "comment",
                                "apiIdPlural": "comments",
                                "groupName": "",
                                "relations": [],
                                "fields": [
                                    {
                                        "name": "content",
                                        "type": "longText",
                                        "validationRules": "required",
                                        "isNullable": true
                                    }
                                ],
                                "gropName": ""
                            }
                        }
                    ],
                    "fields": [
                        {
                            "name": "content",
                            "type": "longText",
                            "validationRules": "required",
                            "isNullable": true
                        }
                    ],
                    "gropName": ""
                },
                "relationMode": {
                    "name": "Parent",
                    "code": "parent"
                },
                "isOneToMany": true,
                "isManyToMany": false,
                "isParent": true,
                "isChild": false,
                "parent": {
                    "name": "Post",
                    "apiIdSingular": "post",
                    "apiIdPlural": "posts",
                    "groupName": ""
                },
                "child": {
                    "name": "Comment",
                    "apiIdSingular": "comment",
                    "apiIdPlural": "comments",
                    "groupName": "",
                    "relations": [],
                    "fields": [
                        {
                            "name": "content",
                            "type": "longText",
                            "validationRules": "required",
                            "isNullable": true
                        }
                    ],
                    "gropName": ""
                }
            }
        ],
        "fields": [
            {
                "name": "content",
                "type": "longText",
                "validationRules": "required",
                "isNullable": true
            }
        ],
        "gropName": ""
    },
    {
        "name": "Comment",
        "apiIdSingular": "comment",
        "apiIdPlural": "comments",
        "groupName": "",
        "relations": [
            {
                "relationType": {
                    "name": "One to Many",
                    "code": "one-to-many"
                },
                "relationTable": {
                    "name": "Post",
                    "apiIdSingular": "post",
                    "apiIdPlural": "posts",
                    "groupName": ""
                },
                "relationMode": {
                    "name": "Child",
                    "code": "child"
                },
                "isOneToMany": true,
                "isManyToMany": false,
                "isChild": true,
                "isParent": false,
                "parent": {
                    "name": "Post",
                    "apiIdSingular": "post",
                    "apiIdPlural": "posts",
                    "groupName": ""
                },
                "child": {
                    "name": "Comment",
                    "apiIdSingular": "comment",
                    "apiIdPlural": "comments",
                    "groupName": "",
                    "relations": [],
                    "fields": [
                        {
                            "name": "content",
                            "type": "longText",
                            "validationRules": "required",
                            "isNullable": true
                        }
                    ],
                    "gropName": ""
                }
            }
        ],
        "fields": [
            {
                "name": "content",
                "type": "longText",
                "validationRules": "required",
                "isNullable": true
            }
        ],
        "gropName": ""
    }
]
