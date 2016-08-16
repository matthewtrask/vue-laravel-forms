import { forIn } from 'lodash';
import { getFileExtension, isFile } from './helpers';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource)

export default function (Http = null) {
   return {
       /*
        * Helper method for submitting a form as a DELETE request.
        */
       deleteForm(uri, form) {
           return this.sendForm('delete', uri, form);
       },

       /*
        * Helper method for submitting a form as a POST request.
        */
       postForm(uri, form) {
           let formData = new FormData;

           forIn(form.fields, (value, key) => {
               if (isFile(value)) {
                   let ext = getFileExtension(value);
                   formData.append(key, value, `${key}.${ext}`);
               } else {
                   formData.append(key, value)
               }
           });

           return this.sendForm('post', uri, form, formData);
       },


       /*
        * Helper method for submitting a form as a PUT request.
        */
       putForm(uri, form) {
           return this.sendForm('put', uri, form);
       },

       /*
        * Helper method for submitting a form.
        */
       sendForm(method, uri, form, formData = null) {
           let submitter = Http || Vue.http;
           let data = formData ? formData : JSON.parse(JSON.stringify(form.fields));

           return new Promise((resolve, reject) => {
               form.startProcessing();

               submitter[method](uri, data)
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
}