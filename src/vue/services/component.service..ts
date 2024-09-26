import fs from "fs";
import path from "path";
import { ensureDirectoryExists } from "../../utils/folder";
export function generateVueComponent(entityName: string, projectPath: string, groupName: string, apiIdSingular: string, apiIdPlural: string, fields: any[]) {
  // component path
  const componentFolderPath = path.join(projectPath, "resources", "js", "modules", groupName, `${entityName}`);
  // home page
  const indexTemplate = `
  <script setup lang="ts">
  import { ref, onMounted} from "vue";
  import axios from "axios";
  import {AxiosResponse} from "axios";
  import {Table} from "ant-design-vue";
  const isLoading = ref(false);
  const data = ref<any[]>([]);
  const page = ref(1);
  const limit = ref(50);
  const fields = ${JSON.stringify(fields, null, 2)};
  const columns = ref(${JSON.stringify(fields.map((el) => {
    return {
      title: el.name,
      dataIndex: el.name,
      key: el.name
    }
  }), null, 2)});
  // get ${apiIdPlural}
  async function get${apiIdPlural.slice(0).toUpperCase()}() {
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

  onMounted(() => {
    get${apiIdPlural.slice(0).toUpperCase()}();
  })
  </script>
  <template>
    <div class="">
      <Table :loading="isLoading" :columns :dataSource="data"></Table>
    </div>
  </template>
  `;

  const addOrUpdateTemplate = `
  <script setup lang="ts">
  import {ref, reactive,onMounted} from "vue";
  import type { UnwrapRef } from "vue";
  import axios, {AxiosResponse} from "axios";
  import { useRouter, useRoute } from "vue-router";
  import {Form,FormItem, message,Input,Button} from "ant-design-vue";
  import type { Rule } from 'ant-design-vue/es/form';
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const formRef = ref();
  const formState:UnwrapRef<any> = reactive({
  ${fields.map((el: any) => {
    return `${el.name} : null`
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
    catch(e) {
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
    catch(e) {
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
  isLoading.value = false;
  }

  catch(e) {
  isLoading.value = false;
  console.log(e)
  }
   }

  onMounted(() => {
  getById();
  })
  </script>
  <template>
  <div>
  <h1>${entityName}</h1>
  <Form @finish="route.params.id ? update${entityName}() : create${entityName}()"  ref="formRef" :model="formState" >
  <div class="grid grid-cols-12 gap-4 px-5 mt-6 w-full">
  ${fields.map((el) => {
    return `<div class="col-span-4 max-md:max-w-full">
          <FormItem ref="${el.name}" name="${el.name}">
            <p class="text-sm  max-md:max-w-full font-regular">
              ${el.name}
            </p>
            <Input v-model:value="formState.${el.name}" class="mt-2" placeholder=""></Input>
          </FormItem>
        </div>`
  })}
    
  </div>
  <div class="flex items-center justify-end gap-1">
    <Button>Cancel</Button>
    <Button html-type="submit" type="primary">{{route.params.id ? "Update" : "Create"}}</Button>
  </div>
  </Form>
  
  </div>
  </template>
  `

  const indexComponentPath = path.join(componentFolderPath, 'Index.vue');
  // Ensure the components directory exists
  ensureDirectoryExists(indexComponentPath);


  fs.writeFileSync(indexComponentPath, indexTemplate, "utf8");
  // log to console that component was created successfully with green color
  console.log(`\x1b[32m${componentFolderPath}\Index.vue component created successfully!\x1b[0m`);

  // add or update page 
  const addOrUpdateComponentPath = path.join(componentFolderPath, "AddOrUpdate.vue");
  ensureDirectoryExists(addOrUpdateComponentPath);
  fs.writeFileSync(addOrUpdateComponentPath, addOrUpdateTemplate, "utf8");
  // log to console that component was created successfully with green color
  console.log(`\x1b[32m${componentFolderPath}\AddOrUpdate.vue component created successfully!\x1b[0m`);

}
