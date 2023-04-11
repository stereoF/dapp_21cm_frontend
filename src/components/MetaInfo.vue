<template>
    <a-form :model="form" @submit-success="handleSubmit" @submit-failed="handleSubmitFailed">
        <a-row>
            <a-form-item field="cid" label="CID" required>
                <a-input v-model="form.cid" placeholder="Select directory to get CID" />
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item field="title" label="Title" required>
                <a-input v-model="form.title" placeholder="The title of this paper" />
            </a-form-item>
        </a-row>
        <a-space direction="vertical">
            <a-form-item v-for="(author, index) in form.authors" field="author" label="author">
                <a-space direction="horizontal">
                    <a-space direction="vertical">
                        <a-row>
                            <a-form-item field="name" label="Name">
                                <a-input v-model="author.name" placeholder="Name" />
                            </a-form-item>
                            <a-form-item :field="`authors[${index}].email`" label="E-mail" :rules="[{ type: 'email' }]">
                                <a-input v-model="author.email" placeholder="E-mail" />
                            </a-form-item>
                            <a-form-item field="affiliation" label="Affiliation">
                                <a-input v-model="author.affiliation" placeholder="Affiliation" />
                            </a-form-item>
                        </a-row>
                    </a-space>
                    <a-col>
                        <a-button @click="deleteAuthor(index)" :style="{ marginLeft: '10px' }">Delete</a-button>
                    </a-col>
                </a-space>
            </a-form-item>
            <a-row>
                <a-col :offset="6">
                    <a-button @click="addAuthor">Add Author</a-button>
                </a-col>
            </a-row>
        </a-space>
        <br />
        <a-space direction="vertical">
            <a-form-item v-for="(field, index) in form.fields" field="field" label="Field" :key="index"
                extra="The academic field of this paper, such as: Astrophysics">
                <a-input v-model="field.field" placeholder="Field" />
                <a-button @click="deleteField(index)" :style="{ marginLeft: '10px' }">Delete</a-button>
            </a-form-item>
            <a-col :offset="6">
                <a-button @click="addField">Add Field</a-button>
            </a-col>
        </a-space>
        <br />
        <a-form-item field="abstract" label="Abstract">
            <a-textarea v-model="form.abstract" placeholder="The abstract of this paper" allow-clear />
        </a-form-item>
        <br />
        <div v-if="contractType === 'desci'">
            <a-row>
                <a-form-item field="form.donate" label="Donate" extra="Donate to editors and reviewers">
                    <a-input-number v-model="form.donate" precision:Number="0.000001" :step="0.0001" :min="$props.donate" :max="100000" />
                </a-form-item>
                <a-form-item field="form.gas" label="Gas" extra="Pay gas fee to editors and reviewers">
                    <a-input-number v-model="form.gas" precision:Number="0.0001" :step="0.0001" :min="$props.donate" :max="100000" />
                </a-form-item>
            </a-row>
        </div>
        <a-form-item>
            <a-col :offset="8">
                <a-button html-type="submit">Submit</a-button>
            </a-col>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useUploadStore } from '@/store/upload';
import { Notification } from '@arco-design/web-vue';

const props = defineProps(
    {
        contractType: {
            type: String,
            required: true
        },
        donate: {
            type: Number,
            required: false
        },
        gas: {
            type: Number,
            required: false
        },
    }
);

const emit = defineEmits(["submit"]);

const store = useUploadStore();
const { cid } = storeToRefs(store);

const form = reactive({
    cid: cid,
    title: '',
    authors: [{
        name: '',
        email: '',
        affiliation: ''
    }],
    fields: [{ field: '' }],
    abstract: '',
    donate: props.donate,
    gas: props.gas,
})


const addAuthor = () => {
    form.authors.push({
        name: '',
        email: '',
        affiliation: ''
    })
};

const deleteAuthor = (index: number) => {
    form.authors.splice(index, 1)
}

const addField = () => {
    form.fields.push({
        field: ''
    })
};
const deleteField = (index: number) => {
    form.fields.splice(index, 1)
}

const handleSubmit = (data: any) => {
    emit('submit', data)
}

const handleSubmitFailed = (data: any) => {
    Notification.warning({
        title: 'warning',
        content: 'Please check your input'
    })
}

</script>