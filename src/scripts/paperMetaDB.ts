import { useAxios } from '@/scripts/httpclient';
const { axiosInstance } = useAxios();

export async function usePaperMeta(address: string, paperCID: string) {

    let authorsData: any[] = [];
    let fieldList: any = [];
    let abstractData = '';

    try {
        let res = await axiosInstance.get("/article/info/cid", { params: { journal_addr: address, cid: paperCID } });
        let descreption = JSON.parse(res.data.descs);
        let authors = descreption.authors;
        let fields = descreption.fields;
        let abstract = descreption.abstract;

        fieldList = fields.map((field: { field: string; }) => {
            return field.field;
        });

        authorsData = authors.map((author: { name: string; email: string; affiliation: string; }) => {
            return [
                {
                    label: 'name',
                    value: author.name,
                },
                {
                    label: 'email',
                    value: author.email,
                },
                {
                    label: 'affiliation',
                    value: author.affiliation,
                },
            ]
        });

        abstractData = abstract;

    } catch (error) {
        console.log(error);
    }

    return { authorsData, fieldList, abstractData}
};