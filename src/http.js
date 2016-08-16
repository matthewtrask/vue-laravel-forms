import { forIn } from 'lodash';

export default {
    /*
     * Helper method for submitting a form as a DELETE request.
     */
    deleteForm(uri, form) {
        return this.$sendForm('delete', uri, form);
    },

    /*
     * Helper method for submitting a form as a POST request.
     */
    postForm(uri, form) {

        let formData = new FormData;

        forIn(form.fields, (value, key) => formData.append(key, value));

        return sendForm('post', uri, form, formData);
    },


    /*
     * Helper method for submitting a form as a PUT request.
     */
    putForm(uri, form) {
        return sendForm('put', uri, form);
    },

    /*
     * Helper method for submitting a form.
     */
    sendForm(method, uri, form, formData = null) {
        let data = formData ? formData : JSON.parse(JSON.stringify(form.fields));

        return new Promise((resolve, reject) => {
            form.startProcessing();

            Vue.http[method](uri, data)
                .then(response => {
                    form.finishProcessing();
                    resolve(response.data);
                })
                .catch(errors => {
                    form.setErrors(errors.data);
                    form.busy = false;

                    reject(errors.data);
                });
        });
    }
}