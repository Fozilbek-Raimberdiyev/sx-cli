<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useToast } from '../../services/toast.service'
const { showError, showSuccess } = useToast()
import _ from 'lodash'
import PButton from 'primevue/button'
import PColumn from 'primevue/column'
import PTag from 'primevue/tag'
import PTable from 'primevue/datatable'
import PInput from 'primevue/inputtext'
import PSelect from 'primevue/select'
import PDivider from 'primevue/divider'
import PToggleSwitch from 'primevue/toggleswitch'
import PDialog from 'primevue/dialog'
import axios from 'axios'
import { generatePivotRelations } from './helpers'
import { relationModes, relationTypes, tablesMock } from './mock'
import CRadio from '@/components/CRadio.vue'
// const tables = ref<any[]>(tablesMock)
const tables = ref<any[]>([])
const isLoading = ref<boolean>(false)
const projectPath = new URLSearchParams(window.location.search).get(
    'projectPath'
)
const isVisibleTableModal = ref(false)
const isClickedUpdateTable = ref(false)
const currentTableIndex = ref(0)
const tableFormState = reactive<any>({
    name: '',
    apiIdSingular: '',
    apiIdPlural: '',
    groupName: '',
    deleteMode: '',
    relations: [],
    fields: [],
})
const deleteModes = ref([
    {
        name: 'Soft delete',
        code: 'soft',
    },
    {
        name: 'Hard delete',
        code: 'hard',
    },
])
const migrationTypes = ref([])
function toggleTableModal() {
    isVisibleTableModal.value = !isVisibleTableModal.value
    isClickedUpdateTable.value = false
    tableFormState.name = ''
    tableFormState.apiIdSingular = ''
    tableFormState.apiIdPlural = ''
    tableFormState.groupName = ''
    tableFormState.relations = []
    tableFormState.fields = []
}

async function getMigrationTypes() {
    try {
        const res = await axios.get('/api/laravel/migration-types')
        migrationTypes.value = res.data
    } catch (e: any) {
        showError('Error', e)
        console.error(e)
    }
}

function createField() {
    tableFormState.fields.push({
        name: '',
        type: null,
        validationRules: '',
        isNullable: false,
    })
}

function resetField(index: number) {
    tableFormState.fields[index].name = ''
    tableFormState.fields[index].type = null
    tableFormState.fields[index].validationRules = ''
    tableFormState.fields[index].isNullable = false
}

function deleteField(index: number) {
    tableFormState.fields.splice(index, 1)
}

function addTable() {
    tables.value.push({ ...tableFormState })
    for (const relation of tableFormState.relations) {
        if (
            !relation.relationTable?.relations.some(
                (item: any) => item.relationTable?.name === tableFormState.name
            )
        ) {
            relation.relationTable?.relations.push({
                relationType: relation.relationType,
                relationTable: {
                    name: tableFormState.name,
                    apiIdSingular: tableFormState.apiIdSingular,
                    apiIdPlural: tableFormState.apiIdPlural,
                    groupName: tableFormState.groupName,
                    labelField: tableFormState.labelField,
                },
            })
        }
    }
    isVisibleTableModal.value = false
    Object.assign(tableFormState, {
        name: '',
        apiIdSingular: '',
        apiIdPlural: '',
        gropName: '',
        relations: [],
        fields: [],
    })
}
function toggleUpdateTable(index: number) {
    isClickedUpdateTable.value = true
    isVisibleTableModal.value = true
    currentTableIndex.value = index
    tableFormState.name = tables.value[index].name
    tableFormState.apiIdSingular = tables.value[index].apiIdSingular
    tableFormState.apiIdPlural = tables.value[index].apiIdPlural
    tableFormState.groupName = tables.value[index].groupName
    tableFormState.fields = tables.value[index].fields
    tableFormState.relations = tables.value[index].relations || []
}

function updateTable() {
    try {
        for (const relation of tableFormState.relations) {
            relation.isOneToMany = relation.relationType?.code === 'one-to-many'
            relation.isManyToMany =
                relation.relationType?.code === 'many-to-many'
            relation.isParent = relation.isOneToMany
                ? relation.relationMode.code === 'parent'
                : null
            relation.isChild = relation.isOneToMany
                ? relation.relationMode.code === 'child'
                : null

            relation.parent = relation.isOneToMany
                ? relation.isParent
                    ? {
                          name: tableFormState.name,
                          apiIdSingular: tableFormState.apiIdSingular,
                          apiIdPlural: tableFormState.apiIdPlural,
                          groupName: tableFormState.groupName,
                          labelField: tableFormState.labelField,
                      }
                    : _.cloneDeep(relation.relationTable)
                : null
            relation.child = relation.isOneToMany
                ? relation.isChild
                    ? {
                          name: tableFormState.name,
                          apiIdSingular: tableFormState.apiIdSingular,
                          apiIdPlural: tableFormState.apiIdPlural,
                          groupName: tableFormState.groupName,
                          labelField: tableFormState.labelField,
                      }
                    : _.cloneDeep(relation.relationTable)
                : null
            const relationIndex = tables.value?.findIndex(
                (item) => item.name === relation.relationTable?.name
            )
            if (
                !tables.value[relationIndex]?.relations?.some((item: any) => {
                    return item.relationTable?.name === tableFormState.name
                })
            ) {
                if (tables.value[relationIndex]?.relations) {
                    tables.value[relationIndex]?.relations?.push({
                        relationType: _.cloneDeep(relation.relationType),
                        relationTable: {
                            name: tableFormState.name,
                            apiIdSingular: tableFormState.apiIdSingular,
                            apiIdPlural: tableFormState.apiIdPlural,
                            groupName: tableFormState.groupName,
                            labelField: tableFormState.labelField,
                        },
                        relationMode: relation.isOneToMany
                            ? relation.relationMode.code === 'parent'
                                ? {
                                      name: 'Child',
                                      code: 'child',
                                  }
                                : {
                                      name: 'Parent',
                                      code: 'parent',
                                  }
                            : {
                                  name: 'Both',
                                  code: 'both',
                              },
                        isOneToMany: relation.isOneToMany,
                        isManyToMany: relation.isManyToMany,
                        isChild: relation.isOneToMany
                            ? relation.relationMode.code === 'parent'
                                ? true
                                : false
                            : null,
                        isParent: relation.isOneToMany
                            ? relation.relationMode.code === 'child'
                                ? true
                                : false
                            : null,
                        parent: relation.isOneToMany
                            ? relation.isParent
                                ? {
                                      name: tableFormState.name,
                                      apiIdSingular:
                                          tableFormState.apiIdSingular,
                                      apiIdPlural: tableFormState.apiIdPlural,
                                      groupName: tableFormState.groupName,
                                      labelField: tableFormState.labelField,
                                  }
                                : _.cloneDeep(relation.relationTable)
                            : null,
                        child: relation.isOneToMany
                            ? relation.isChild
                                ? {
                                      name: tableFormState.name,
                                      apiIdSingular:
                                          tableFormState.apiIdSingular,
                                      apiIdPlural: tableFormState.apiIdPlural,
                                      groupName: tableFormState.groupName,
                                      labelField: tableFormState.labelField,
                                  }
                                : _.cloneDeep(relation.relationTable)
                            : null,
                    })
                } else {
                    tables.value[relationIndex]['relations'] = [
                        {
                            relationType: _.cloneDeep(relation.relationType),
                            relationTable: {
                                name: tableFormState.name,
                                apiIdSingular: tableFormState.apiIdSingular,
                                apiIdPlural: tableFormState.apiIdPlural,
                                groupName: tableFormState.groupName,
                                labelField: tableFormState.labelField,
                            },
                            relationMode: relation.isOneToMany
                                ? relation.relationMode.code === 'parent'
                                    ? {
                                          name: 'Child',
                                          code: 'child',
                                      }
                                    : {
                                          name: 'Parent',
                                          code: 'parent',
                                      }
                                : { name: 'Both', code: 'both' },
                            isOneToMany: relation.isOneToMany,
                            isManyToMany: relation.isManyToMany,
                            isChild: relation.isOneToMany
                                ? relation.relationMode.code === 'parent'
                                    ? true
                                    : false
                                : null,
                            isParent: relation.isOneToMany
                                ? relation.relationMode.code === 'child'
                                    ? true
                                    : false
                                : null,
                            parent: relation.isOneToMany
                                ? relation.isParent
                                    ? {
                                          name: tableFormState.name,
                                          apiIdSingular:
                                              tableFormState.apiIdSingular,
                                          apiIdPlural:
                                              tableFormState.apiIdPlural,
                                          groupName: tableFormState.groupName,
                                          labelField: tableFormState.labelField,
                                      }
                                    : _.cloneDeep(relation.relationTable)
                                : null,
                            child: relation.isOneToMany
                                ? relation.isChild
                                    ? {
                                          name: tableFormState.name,
                                          apiIdSingular:
                                              tableFormState.apiIdSingular,
                                          apiIdPlural:
                                              tableFormState.apiIdPlural,
                                          groupName: tableFormState.groupName,
                                          labelField: tableFormState.labelField,
                                      }
                                    : _.cloneDeep(relation.relationTable)
                                : null,
                        },
                    ]
                }
            }
        }

        // update other tables
        for (const table of tables.value) {
            const labelField = table.fields.find((item: any) => item.isLabel)
            table.labelField = labelField?.name
            if (
                table?.relations?.some(
                    (item: any) =>
                        item.relationTable?.name === tableFormState.name
                ) &&
                !tableFormState?.relations?.some(
                    (item: any) => item.relationTable?.name === table?.name
                )
            ) {
                const filtered = [...table?.relations]
                    ?.filter(
                        (item) =>
                            item.relationTable?.name !== tableFormState.name
                    )
                    ?.filter((item) => item.relationTable)
                table.relations = [...filtered]
            }
        }

        isVisibleTableModal.value = false
        tables.value[currentTableIndex.value] = {
            ...tableFormState,
        }
        Object.assign(tableFormState, {
            name: '',
            apiIdSingular: '',
            apiIdPlural: '',
            gropName: '',
            relations: [],
            fields: [],
        })
    } catch (e) {
        console.error(e)
    }
}

function deleteTable(index: number) {
    // delete from other table relations
    for (const table of tables.value) {
        if (
            table.relations?.some(
                (item: any) =>
                    item.relationTable?.name === tables.value[index]?.name
            )
        ) {
            const filtered = table.relations?.filter(
                (item: any) =>
                    item.relationTable?.name !== tables.value[index]?.name
            )
            table.relations = filtered
        }
    }
    tables.value.splice(index, 1)
}

async function sendTables() {
    try {
        isLoading.value = true
        const pivots = generatePivotRelations(_.cloneDeep(tables.value))
        const body = {
            tables: _.cloneDeep(tables.value),
            pivots: pivots,
            projectPath,
        }
        const res = await axios.post('/api/laravel/build-scheme', body)
        isLoading.value = false
        tables.value = []
        showSuccess('Success', 'Application successfully configured')
    } catch (e: any) {
        isLoading.value = false
        console.error(e)
        showError('Error', e.response.data.message)
    }
}

function handleRelationTypeChange(e: any, index: number) {
    if (e.value?.code === 'many-to-many') {
        tableFormState.relations[index].relationMode = {
            name: 'Both',
            code: 'both',
        }
    } else if (e.value?.code === 'one-to-many') {
        tableFormState.relations[index].relationMode = null
    }
}
function handleRelationModeChange(e: any, index: number) {
    if (e.value?.code === 'both') {
        tableFormState.relations[index].relationType = {
            name: 'Many to Many',
            code: 'many-to-many',
        }
    } else if (e.value?.code === 'parent' || e.value?.code === 'child') {
        tableFormState.relations[index].relationType = {
            name: 'One to Many',
            code: 'one-to-many',
        }
    }
}

function handleChangeLabel(index: number) {
    const value = tableFormState.fields[index].isLabel
    for (const field of tableFormState.fields) {
        field.isLabel = false
    }
    tableFormState.fields[index].isLabel = value
    tableFormState.labelField = tableFormState.fields[index].name
}

onMounted(() => {
    getMigrationTypes()
})
</script>
<template>
    <div>
        <Transition name="slide-fade" mode="out-in">
            <Teleport to="body" v-if="isLoading">
                <div
                    v-if="isLoading"
                    class="fixed h-screen inset-0 flex flex-col justify-center items-center z-50 bg-[rgba(0,0,0,0.2)]"
                >
                    <i
                        class="bx bx-loader-alt text-lg animate-spin fixed top-1/2 left-1/2 z-50"
                    ></i>
                </div>
            </Teleport>
        </Transition>

        <div class="card">
            <div class="flex justify-end">
                <p-button
                    type="button"
                    label="Add table"
                    @click="toggleTableModal"
                >
                    <template #icon>
                        <i class="bx bx-plus"></i>
                    </template>
                </p-button>
            </div>
            <PTable
                highlight
                removableSort
                :value="tables"
                tableStyle="min-width: 50rem"
            >
                <template #empty>
                    <div
                        class="text-center flex justify-center items-center gap-2"
                    >
                        <i class="bx bx-search-alt"></i>
                        <span>No tables found.</span>
                    </div>
                </template>
                <!-- № -->
                <p-column header="No.">
                    <template #body="{ index }"> {{ index + 1 }} </template>
                </p-column>
                <p-column sortable field="name" header="Name"></p-column>
                <p-column
                    sortable
                    field="apiIdSingular"
                    header="Singular"
                ></p-column>
                <p-column
                    sortable
                    field="apiIdPlural"
                    header="Plural"
                ></p-column>
                <p-column sortable field="groupName" header="Group"></p-column>
                <p-column sortable field="relations" header="Relations">
                    <template #body="slotProps">
                        <div
                            v-if="
                                slotProps.data.relations?.filter(
                                    (relation: any) => relation.relationTable
                                )?.length
                            "
                        >
                            <div
                                class="flex items-center gap-1 mt-1"
                                v-for="relation in slotProps.data.relations?.filter(
                                    (relation: any) =>
                                        relation.relationTable ||
                                        relation.relationType
                                )"
                            >
                                <p-tag
                                    :value="relation.relationType?.name"
                                    severity="info"
                                ></p-tag>
                                <i
                                    v-if="relation.relationTable"
                                    class="bx bx-right-arrow-alt"
                                ></i>
                                <p-tag
                                    :value="relation.relationTable?.name"
                                    severity="info"
                                ></p-tag>
                            </div>
                        </div>
                        <div v-else>
                            <p-tag
                                value="No relations"
                                severity="warning"
                            ></p-tag>
                        </div>
                    </template>
                </p-column>
                <p-column style="width: 4rem" field="actions" header="Actions">
                    <template #body="{ item, index }">
                        <div class="flex items-center gap-2">
                            <p-button
                                style="width: 100px"
                                @click="deleteTable(index)"
                                size="small"
                                label="Delete"
                                severity="danger"
                                rounded
                            >
                                <template #icon>
                                    <i class="bx bx-trash"></i>
                                </template>
                            </p-button>
                            <p-button
                                style="width: 100px"
                                @click="toggleUpdateTable(index)"
                                size="small"
                                label="Edit"
                                severity="success"
                                rounded
                            >
                                <template #icon>
                                    <i class="bx bx-edit"></i>
                                </template>
                            </p-button>
                        </div>
                    </template>
                </p-column>
            </PTable>
            <div class="flex justify-end mt-8 gap-1" v-if="tables?.length">
                <p-button
                    label="Reset"
                    @click=""
                    size="small"
                    severity="secondary"
                >
                    <template #icon>
                        <i class="bx bx-reset"></i>
                    </template>
                </p-button>
                <p-button
                    label="Generate scheme"
                    size="small"
                    :loading="isLoading"
                    severity="info"
                    @click="sendTables"
                >
                    <template #icon>
                        <i class="bx bx-save"></i>
                    </template>
                </p-button>
            </div>
        </div>

        <!-- table modal -->
        <p-dialog
            v-model:visible="isVisibleTableModal"
            modal
            :header="isClickedUpdateTable ? 'Update table' : 'Create table'"
            :style="{ width: '85rem' }"
        >
            <div class="mt-6">
                <div class="grid grid-cols-12 gap-5 mb-6">
                    <div class="col-span-6">
                        <div class="flex flex-col gap-2">
                            <label class="font-regular" for="tablename"
                                >Table name</label
                            >
                            <p-input
                                size="small"
                                id="tablename"
                                v-model="tableFormState.name"
                                aria-describedby="tablename"
                            />
                        </div>
                    </div>

                    <div class="col-span-6">
                        <div class="flex flex-col gap-2">
                            <label class="font-regular" for="apiidsingular"
                                >Api ID (singular)</label
                            >
                            <p-input
                                size="small"
                                id="apiidsingular"
                                v-model="tableFormState.apiIdSingular"
                                aria-describedby="apiidsingular-table"
                            />
                        </div>
                    </div>
                    <div class="col-span-6">
                        <div class="flex flex-col gap-2">
                            <label class="font-regular" for="apiidplural"
                                >Api ID (plural)</label
                            >
                            <p-input
                                size="small"
                                id="apiidplural"
                                v-model="tableFormState.apiIdPlural"
                                aria-describedby="apiidplural-table"
                            />
                        </div>
                    </div>
                    <div class="col-span-6">
                        <div class="flex flex-col gap-2">
                            <label class="font-regular" for="groupname"
                                >Group name(path)</label
                            >
                            <p-input
                                placeholder="ex: /admin/users"
                                size="small"
                                id="groupName"
                                v-model="tableFormState.groupName"
                                aria-describedby="groupname"
                            />
                        </div>
                    </div>
                    <!-- delete mode -->
                    <!-- <div class="col-span-6">
                        <div class="flex flex-col gap-2">
                            <label class="font-regular" for="groupname">Delete mode</label>
                            <p-select id="deleteMode" size="small" v-model="tableFormState.deleteMode" checkmark :options="deleteModes" :optionLabel="(mode: any) => mode.name"
                                    :optionValue="(mode: any) => mode" placeholder="Select delete mode"
                                    aria-describedby="deleteMode">
                                </p-select>
                        </div>
                    </div> -->
                    <div class="col-span-12"></div>
                    <div
                        v-show="isClickedUpdateTable"
                        class="col-span-12 grid grid-cols-12 gap-5 bg-gray-100 p-5 rounded-md relative pb-10"
                        v-for="(relation, index) in tableFormState.relations"
                        :key="index"
                    >
                        <div class="col-span-4">
                            <div class="flex flex-col gap-2">
                                <label class="font-regular" for="relation"
                                    >Relation type</label
                                >
                                <p-select
                                    id="relation"
                                    size="small"
                                    v-model="relation.relationType"
                                    checkmark
                                    @change="
                                        handleRelationTypeChange($event, index)
                                    "
                                    :options="relationTypes"
                                    :optionLabel="
                                        (relation: any) => relation.name
                                    "
                                    :optionValue="(relation: any) => relation"
                                    placeholder="Select relation type"
                                    aria-describedby="relation"
                                >
                                </p-select>
                            </div>
                        </div>
                        <div class="col-span-4">
                            <div class="flex flex-col gap-2">
                                <label class="font-regular" for="tablename"
                                    >Relation table</label
                                >
                                <p-select
                                    checkmark
                                    id="tablename"
                                    :optionLabel="(option: any) => option.name"
                                    :optionValue="(option: any) => option"
                                    size="small"
                                    v-model="relation.relationTable"
                                    :options="
                                        tables?.filter(
                                            (table) =>
                                                table.apiIdSingular !==
                                                tableFormState.apiIdSingular
                                        )
                                    "
                                    placeholder="Select table"
                                    aria-describedby="tablename"
                                >
                                </p-select>
                            </div>
                        </div>
                        <div class="col-span-3">
                            <div class="flex flex-col gap-2">
                                <label class="font-regular" for="tablename"
                                    >Relation mode</label
                                >
                                <p-select
                                    @change="
                                        handleRelationModeChange($event, index)
                                    "
                                    checkmark
                                    id="relationMode"
                                    size="small"
                                    v-model="relation.relationMode"
                                    :options="
                                        relationModes?.filter((mode) =>
                                            relation.relationType?.code ===
                                            'one-to-many'
                                                ? mode?.code !== 'both'
                                                : mode
                                        )
                                    "
                                    placeholder="Select relation mode"
                                    aria-describedby="relation mode"
                                    :optionLabel="(option: any) => option.name"
                                    :optionValue="(option: any) => option"
                                >
                                </p-select>
                            </div>
                        </div>
                        <div class="add-button absolute right-1 top-1">
                            <button
                                class="p-1 bg-gray-100 rounded-md"
                                @click="
                                    tableFormState.relations.splice(index, 1)
                                "
                                type="button"
                            >
                                <i
                                    class="bx bx-x cursor-pointer text-lg text-red-500"
                                ></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-span-12" v-show="isClickedUpdateTable">
                        <div class="flex justify-end">
                            <button
                                class="p-1 bg-gray-100 rounded-md"
                                @click="
                                    tableFormState.relations.push({
                                        relationType: null,
                                        relationTable: null,
                                    })
                                "
                                type="button"
                            >
                                <i
                                    class="bx bx-plus cursor-pointer text-lg text-green-500"
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>
                <PDivider></PDivider>
                <div class="flex justify-end sticky top-10 z-10">
                    <p-button
                        @click="createField"
                        severity="contrast"
                        type="button"
                        label="Create field"
                    >
                        <template #icon>
                            <i class="bx bx-plus"></i>
                        </template>
                    </p-button>
                </div>
                <div class="flex flex-col gap-5 mt-5">
                    <div
                        class="grid grid-cols-12 gap-5"
                        v-for="(field, index) in tableFormState.fields"
                        :key="index"
                    >
                        <div class="col-span-2">
                            <div class="flex flex-col gap-2">
                                <label class="font-regular" for="fieldname"
                                    >Field name</label
                                >
                                <p-input
                                    size="small"
                                    id="fieldname"
                                    v-model="field.name"
                                    aria-describedby="fieldname"
                                />
                            </div>
                        </div>
                        <div class="col-span-3">
                            <div class="flex flex-col gap-2">
                                <label for="fieldname"
                                    >Select the type of the field</label
                                >
                                <p-select
                                    editable
                                    :options="migrationTypes"
                                    placeholder="Select field type"
                                    style="height: 40px"
                                    v-model="field.type"
                                    aria-describedby="field type"
                                >
                                </p-select>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="flex flex-col gap-2">
                                <label for="nullable">Nullable</label>
                                <p-toggle-switch
                                    type="text"
                                    id="nullable"
                                    v-model="field.isNullable"
                                    aria-describedby="isNullable"
                                />
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="flex flex-col gap-2">
                                <span>Label</span>
                                <CRadio
                                    @change="handleChangeLabel(index)"
                                    :value="true"
                                    label="Label"
                                    :id="'field' + index"
                                    v-model="field.isLabel"
                                    name="isLabel"
                                >
                                </CRadio>
                            </div>
                        </div>
                        <div class="col-span-3">
                            <div class="flex flex-col gap-2">
                                <label
                                    class="font-regular"
                                    for="validationRules"
                                    >Validation rules</label
                                >
                                <p-input
                                    size="small"
                                    id="validationRules"
                                    v-model="field.validationRules"
                                    aria-describedby="validation rules"
                                />
                            </div>
                        </div>
                        <div class="col-span-2">
                            <div class="flex flex-col gap-2">
                                <label class="font-regular">Actions</label>
                                <div class="flex gap-1">
                                    <p-button
                                        @click="deleteField(index)"
                                        class="w-full"
                                        type="button"
                                        label="Delete"
                                        severity="danger"
                                    >
                                        <template #icon>
                                            <i class="bx bx-trash"></i>
                                        </template>
                                    </p-button>
                                    <p-button
                                        @click="resetField(index)"
                                        class="w-full"
                                        type="button"
                                        label="Reset"
                                        severity="warning"
                                    >
                                        <template #icon>
                                            <i class="bx bx-refresh"></i>
                                        </template>
                                    </p-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                    <p-button
                        size="small"
                        type="button"
                        severity="secondary"
                        label="Reset"
                    >
                        <template #icon>
                            <i class="bx bx-reset"></i>
                        </template>
                    </p-button>
                    <p-button
                        v-if="isClickedUpdateTable"
                        size="small"
                        type="button"
                        label="Update"
                        @click="updateTable"
                    >
                        <template #icon>
                            <i class="bx bx-save"></i>
                        </template>
                    </p-button>
                    <p-button
                        @click="addTable"
                        severity="info"
                        v-else
                        size="small"
                        type="button"
                        label="Save"
                    >
                        <template #icon>
                            <i class="bx bx-save"></i>
                        </template>
                    </p-button>
                </div>
            </div>
        </p-dialog>
    </div>
</template>

<style scoped>
/* we will explain what these classes do next! */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(20px) perspective(50px) translate3d(0, 0, 0);
}
</style>
