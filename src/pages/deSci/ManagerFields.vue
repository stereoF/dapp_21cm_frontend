<template>
    <div class="form-group">
        <label for="Editors">Editors:</label>
        <div v-for="(field, index) in fields" :key="index" class="row align-items-center">
        <div class="col-10 pr-1">
            <input type="text" v-model="field.field" placeholder="Editor" class="form-control" />
        </div>
        <div class="col-1 item-buttons">
            <div>
            <button type="button" @click="addField(index)" class="btn btn-success btn-sm">+</button>
            </div>
            <div>
            <button type="button" @click="removeField(index)" class="btn btn-danger btn-sm">-</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue';

    export default defineComponent({
        name: 'ManagerFields',
        props: {
            fieldName: {
                type: String,
                required: true
            }
        },
        setup(props) {
            const fields = reactive([{ field: '' }]);

            function addField(index: number) {
                fields.splice(index + 1, 0, { field: '' })
            }

            function removeField(index: number) {
                fields.splice(index, 1)
            }

            return {
                fields,
                addField,
                removeField
            }
        }
    })
    

</script>

<style>
.item-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-buttons button {
  margin-left: 8px;
}
</style>