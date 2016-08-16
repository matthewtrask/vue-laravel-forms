import Http from './http';
import Form from './form';
import FormErrors from './form-errors';
import { has } from 'lodash';

function FormHelpers (Vue) {

    if (typeof Vue.http == 'undefined') {
        console.error('Please install vue-resource before using vue-laravel-forms')
        return;
    }

    let formHelper = new Http(Vue.http);

    Object.defineProperty(Vue.prototype, '$forms', {
        get() {
            return {
                /*
                 * Create a new Form instance.
                 */
                create(fields) {
                    return new Form(fields);
                },

                /*
                 * Create a new FormErrors instance.
                 */
                errors() {
                    return new FormErrors();
                },

                /*
                 * Submit the given Form to the given URI via a DELETE request.
                 */
                delete(uri, form) {
                    return formHelper.deleteForm(uri, form);
                },

                /*
                 * Submit the given Form to the given URI via a POST request.
                 */
                post(uri, form) {
                    return formHelper.postForm(uri, form);
                },

                /*
                 * Submit the given Form to the given URI via a PUT request
                 */
                put(uri, form) {
                    return formHelper.putForm(uri, form);
                },

                /*
                 * Submit the given Form to the given URI using the given HTTP method.
                 */
                submit(method, uri, form, formData = null) {
                    return formHelper.sendForm(method, uri, form, formData);
                }
            }
        }
    });

    Vue.mixin({

        /*
         * The 'beforeCreate' life-cycle hook for Vue 2.0.
         */
        beforeCreate() {
            registerForms(this);
        },

        /*
         * The 'init' life-cycle hook for Vue 1.0.
         */
        init() {
            registerForms(this);
        }

    });
}

/*
 * Register the forms in the forms option.
 */
function registerForms(vm) {
    let forms = vm.$options.forms;

    if (typeof forms == 'object') {
        let dataIsFunction = typeof vm.$options.data == 'function';
        let data = dataIsFunction ? vm.$options.data() : vm.$options.data;

        console.log('before:', data);

        if (typeof data == 'undefined') {
            data = {};
        }

        for (var form in forms) {
            if (has(data, form)) {
                throw new Error(`The form, ${form}, has a name which is colliding with another form or data property!`)
            }
            data[form] = new Form(forms[form]);
        }

        console.log('after:', data);

        vm.$options.data = function () { return data };
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(FormHelpers);
}

export { FormHelpers, Form, FormErrors }
