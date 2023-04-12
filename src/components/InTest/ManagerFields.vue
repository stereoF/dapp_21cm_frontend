<template>
    <a-form :model="form" @submit-success="handleSubmit" @submit-failed="handleSubmitFailed">
        <a-space direction="vertical">
            <a-form-item v-for="(field, index) in form.fields" field="field" :label="$props.fieldName" :key="index">
                <a-input v-model="field.field" :placeholder="$props.fieldName" />
                <a-button @click="deleteField(index)" :style="{ marginLeft: '10px' }">Delete</a-button>
            </a-form-item>
            <a-col :offset="10">
                <a-button @click="addField">Add {{ $props.fieldName }}</a-button>
            </a-col>
        </a-space>
        <a-divider />
        <a-col :offset="16">
            <a-form-item extra="click to comfirm the editors">
                <a-button html-type="submit">Submit</a-button>
            </a-form-item>
        </a-col>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Notification } from '@arco-design/web-vue';


export default defineComponent({
    name: 'ManagerFields',
    props: {
        fieldName: {
            type: String,
            required: true
        },
        fields: {
            type: Array<{ field: string }>,
            required: false,
            // default: () => [{ field: '' }],
            // validator: (arr: {field: string}[]) => {
            //     return arr.every(item => typeof item.field === 'string');
            // }
        }
    },
    emits: {
        submit: (data: any) => true
    },
    setup(props, context) {
        const form = reactive({
            fields: props.fields || [{ field: '' }]
        });

        const addField = () => {
            form.fields.push({
                field: ''
            })
        };
        const deleteField = (index: number) => {
            form.fields.splice(index, 1)
        }

        const handleSubmit = (data: any) => {
            context.emit('submit', data)
        }

        const handleSubmitFailed = (data: any) => {
            Notification.warning({
                title: 'warning',
                content: 'Please check your input'
            })
        }

        return {
            form,
            addField,
            deleteField,
            handleSubmit,
            handleSubmitFailed
        }
    },
})


</script>
