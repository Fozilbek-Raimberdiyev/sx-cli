import fs from 'fs'
import path from 'path'
import { capitalizeFirstLetter } from '../../utils/formatter'
import { ensureDirectoryExists } from '../../utils/folder'
import { formatVueFile } from '../../utils/prettier'
export function generateVueComponent(
    entityName: string,
    projectPath: string,
    groupName: string,
    apiIdSingular: string,
    apiIdPlural: string,
    fields: any[],
    relations?: any[]
) {
    const related: any[] = []
    if (relations) {
        relations?.forEach((item) => {
            if (item.isManyToMany || (item.isOneToMany && item.isParent)) {
                related.push({
                    name: item.relationTable.apiIdPlural,
                    isParent: item.isParent,
                    isChild: item.isChild,
                    apiIdPlural: item.relationTable.apiIdPlural,
                    isManyToMany: item.isManyToMany,
                })
            } else if (item.isOneToMany && item.isChild) {
                related.push({
                    name: item.parent.apiIdSingular,
                    isParent: item.isParent,
                    isChild: item.isChild,
                    apiIdPlural: item.parent.apiIdPlural,
                    isManyToMany: item.isManyToMany,
                })
            }
        })
    }
    const tempFields = [
        ...fields,
        { name: 'actions', width: '200px' },
        ...related.map((el) => ({ name: el.name, width: '200px' })),
    ]
    // component path
    const componentFolderPath = path.join(
        projectPath,
        'resources',
        'vue',
        'modules',
        groupName.toLocaleLowerCase(),
        `${apiIdPlural}`
    )
    // home page
    const indexTemplate = `
  <script setup lang="ts">
  import { ref, onMounted} from "vue";
  import {useRouter} from "vue-router";
  import {Button} from "ant-design-vue";
  import axios from "axios";
  import {AxiosResponse} from "axios";
  import {Table} from "ant-design-vue";
  const router = useRouter();
  const isLoading = ref(false);
  const data = ref<any[]>([]);
  const page = ref(1);
  const limit = ref(50);
  const columns = ref(${JSON.stringify(
      (tempFields as any).map((el: any) => {
          return {
              title: el.name,
              dataIndex: el.name,
              key: el.name,
              width: el.width,
          }
      }),
      null,
      2
  )});
  // get ${apiIdPlural}
  async function get${capitalizeFirstLetter(apiIdPlural)}() {
  try {
  isLoading.value = true;
  const res:AxiosResponse = await axios.get("/api${groupName.toLocaleLowerCase()}/${apiIdPlural}?page=" +page.value + "&limit="+limit.value);
  data.value = res.data.data;
  isLoading.value = false;
  }
  catch(e) {
  isLoading.value = false;
  console.error(e);
  }
  }

  // delete ${apiIdSingular}
async function delete${capitalizeFirstLetter(apiIdSingular)}(id: number) {
    try {
        isLoading.value = true;
        const res: AxiosResponse = await axios.delete("/api${groupName.toLocaleLowerCase()}/${apiIdPlural}/" + id);
        get${capitalizeFirstLetter(apiIdPlural)}();
        isLoading.value = false;
    } catch (e) {
        isLoading.value = false;
        console.error(e);
    }
}

  onMounted(() => {
    get${capitalizeFirstLetter(apiIdPlural)}();
  })
  </script>
  <template>
    <div class="m-2">
    <div class="flex justify-end">
        <Button
          @click="router.push('${groupName.toLocaleLowerCase()}/${apiIdPlural}/create')"
          type="primary"
          >Create</Button
        >
      </div>
      <Table :loading="isLoading" :columns :dataSource="data">
      <template #bodyCell="{ column, text, record }">
                <div class="flex items-center gap-1" v-if="column.dataIndex === 'actions'">
                    <Button @click="router.push('${groupName.toLocaleLowerCase()}/${apiIdPlural}/' + record.id+'/update')" type="primary">Edit</Button>
                    <Button @click="delete${capitalizeFirstLetter(apiIdSingular)}(record.id)" danger>Delete</Button>
                </div>
            </template>
      </Table>
    </div>
  </template>
  `
    const addOrUpdateOptionsMethods: string[] = []
    const addOrUpdateFields = [
        ...fields,
        ...related?.map((el) => ({
            name: el.name,
            value: el.isParent ? '[]' : '{}',
            isManyToMany: el.isManyToMany,
            options: el.apiIdPlural,
        })),
    ]
    const addOrUpdateTemplate = `
  <script setup lang="ts">
  import {ref, reactive,onMounted} from "vue";
  import type { UnwrapRef } from "vue";
  import axios, {AxiosResponse} from "axios";
  import { useRouter, useRoute } from "vue-router";
  import {Form,FormItem, message,Input,Button,Select} from "ant-design-vue";
  import type { Rule } from 'ant-design-vue/es/form';
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const formRef = ref();
  const formState:UnwrapRef<any> = reactive({
  ${addOrUpdateFields.map((el: any) => {
      return `${el.name} : ${el.value || 'null'}`
  })}
  });

  // create ${entityName}
  async function create${entityName}() {
    try {
    isLoading.value = true;
  const res:AxiosResponse = await axios.post("/api${groupName.toLocaleLowerCase()}/${apiIdPlural}", formState);
  message.success("Успешно добавлено", 3, () => {
      router.go(-1)
    });
isLoading.value = false;
    }
    catch(e:any) {
    isLoading.value = false;
    if (e.status == 422) return message.error(e.response.data.message);
    message.error("Произошла ошибка");
    }
  }

  // update ${entityName}
  async function update${entityName}() {
    try {
    isLoading.value = true;
  const res:AxiosResponse = await axios.put("/api${groupName.toLocaleLowerCase()}/${apiIdPlural}/"  + route.params.id, formState);
  message.success("Успешно обновлено", 3, () => {
      router.go(-1)
    });
    isLoading.value = false;
    }
    catch(e:any) {
    isLoading.value = false;
    if (e.status == 422) return message.error(e.response.data.message);
    message.error("Произошла ошибка");
    }
  }


  // get by id
  async function getById() {
  if(!route.params.id) return;
  try {
  isLoading.value = true;
  const res:AxiosResponse = await axios.get("/api${groupName.toLocaleLowerCase()}/${apiIdPlural}/"+route.params.id);
  for(const key in res.data) {
  formState[key] = res.data[key];
  }
  ${
      relations
          ? relations?.map((rel) => {
                if (rel.isOneToMany && rel.isChild) {
                    return `formState.${rel.parent.apiIdSingular} = res.data['${rel.parent.apiIdSingular}']?.id || res.data.${rel.parent.apiIdSingular}_id`
                }
                if (rel.isOneToMany && rel.isParent) {
                    return `formState.${rel.child.apiIdPlural} = res.data?.${rel.relationTable.apiIdPlural}?.map((el: any) => el.id) || res.data.${rel.relationTable.apiIdPlural}_ids`
                }
                if (rel.isManyToMany) {
                    return `formState.${rel.relationTable.apiIdPlural} = res.data?.${rel.relationTable.apiIdPlural}?.map((el: any) => el.id) || res.data.${rel.relationTable.apiIdPlural}_ids`
                }
            })
          : ''
  }
  isLoading.value = false;
  }

  catch(e:any) {
  isLoading.value = false;
  console.error(e)
  }
   }

  ${addOrUpdateFields
      ?.filter((el: any) => el.options)
      .map((el: any) => {
          addOrUpdateOptionsMethods.push(
              'get' + capitalizeFirstLetter(el.options) + '()'
          )
          return `
    const ${el.options}List  = ref<any[]>([]);
    // get ${el.options}
    async function get${capitalizeFirstLetter(el.options)}() {
    const res:AxiosResponse = await axios.get("/api${groupName.toLocaleLowerCase()}/${el.options}");
    ${el.options}List.value = res.data.data || [];
    }
    `
      })}
  onMounted(() => {
  getById();
  ${addOrUpdateOptionsMethods.join('\n')}
  })
  </script>
  <template>
  <div class="m-2">
  <h1>${entityName}</h1>
  <Form @finish="route.params.id ? update${entityName}() : create${entityName}()"  ref="formRef" :model="formState" >
  <div class="grid grid-cols-12 gap-4 px-5 mt-6 w-full">
  ${addOrUpdateFields
      .map((el) => {
          return `<div class="col-span-4 max-md:max-w-full">
          <FormItem ref="${el.name}" name="${el.name}">
            <p class="text-sm  max-md:max-w-full font-regular capitalize">
              ${capitalizeFirstLetter(el.name)}
            </p>
            ${el.value === '{}' ? `<Select :field-names="{value: 'id', label: 'title'}" :options="${el.options}List" v-model:value="formState.${el.name}" class="mt-2" placeholder="Select ${el.name}"></Select>` : el.value === '[]' || el.isManyToMany ? `<Select :field-names="{value: 'id', label: 'title'}" mode="multiple" :options="${el.options}List" v-model:value="formState.${el.name}" class="mt-2" placeholder="Select ${el.name}"></Select>` : `<Input v-model:value="formState.${el.name}" class="mt-2" placeholder=""></Input>`}
          </FormItem>
        </div>`
      })
      .join('')}
  </div>
  <div class="flex items-center justify-end gap-1">
    <Button>Cancel</Button>
    <Button :loading="isLoading" html-type="submit" type="primary">{{route.params.id ? "Update" : "Create"}}</Button>
  </div>
  </Form>
  </div>
  </template>
  `

    const indexComponentPath = path.join(componentFolderPath, 'Index.vue')
    // Ensure the components directory exists
    ensureDirectoryExists(indexComponentPath)

    fs.writeFileSync(indexComponentPath, indexTemplate, 'utf8')
    formatVueFile(indexComponentPath)
    // log to console that component was created successfully with green color
    console.log(
        `\x1b[32m${componentFolderPath}\Index.vue component created successfully!\x1b[0m`
    )

    // add or update page
    const addOrUpdateComponentPath = path.join(
        componentFolderPath,
        'AddOrUpdate.vue'
    )
    ensureDirectoryExists(addOrUpdateComponentPath)
    fs.writeFileSync(addOrUpdateComponentPath, addOrUpdateTemplate, 'utf8')
    formatVueFile(addOrUpdateComponentPath)
    // log to console that component was created successfully with green color
    console.log(
        `\x1b[32m${componentFolderPath}\AddOrUpdate.vue component created successfully!\x1b[0m`
    )
    // import ${entityName}AddOrUpdate from "@/modules/${groupName}/${apiIdPlural}/AddOrUpdate.vue";
    // generate pages
    const pagesIndex = `
  <script setup lang="ts">
  import ${entityName}Index from "@/modules${groupName}/${apiIdPlural}/Index.vue";
  </script>
  <template>
  <${entityName}Index/>
  </template>
  `
    ensureDirectoryExists(
        projectPath +
            `/resources/vue/pages${groupName.toLocaleLowerCase()}/${apiIdPlural}/Index.vue`
    )
    fs.writeFileSync(
        projectPath +
            `/resources/vue/pages${groupName.toLocaleLowerCase()}/${apiIdPlural}/Index.vue`,
        pagesIndex,
        'utf8'
    )
    formatVueFile(
        projectPath +
            `/resources/vue/pages${groupName.toLocaleLowerCase()}/${apiIdPlural}/Index.vue`
    )

    const pagesAddOrUpdate = `
  <script setup lang="ts">
  import ${entityName}AddOrUpdate from "@/modules${groupName}/${apiIdPlural}/AddOrUpdate.vue";
  </script>
  <template>
  <${entityName}AddOrUpdate/>
  </template>
  `
    ensureDirectoryExists(
        projectPath +
            `/resources/vue/pages${groupName.toLocaleLowerCase()}/${apiIdPlural}/AddOrUpdate.vue`
    )
    fs.writeFileSync(
        projectPath +
            `/resources/vue/pages${groupName.toLocaleLowerCase()}/${apiIdPlural}/AddOrUpdate.vue`,
        pagesAddOrUpdate,
        'utf8'
    )
    formatVueFile(
        projectPath +
            `/resources/vue/pages${groupName.toLocaleLowerCase()}/${apiIdPlural}/AddOrUpdate.vue`
    )
}
