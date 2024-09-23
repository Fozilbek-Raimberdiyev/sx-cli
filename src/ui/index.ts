import { DefineComponent, defineComponent, ref } from "vue"

export default defineComponent<DefineComponent>({
    setup() {
        const count = ref(0);

        return {
            count
        }
    },
    template: `
    <button @click="count++">Increase count<button/>
    `
})