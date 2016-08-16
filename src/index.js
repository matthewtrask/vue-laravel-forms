import Http from './http';
import Form from './form';
import FormErrors from './form-errors';

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
         * The 'beforeCreate' life-cycle hook.
         */
        beforeCreate() {
            let forms = this.$options.forms;

            if (typeof forms == 'object') {
                let dataIsFunction = typeof this.$options.data == 'function';
                let data = dataIsFunction ? this.$options.data() : this.$options.data || {};

                for (var form in forms) {
                    data[form] = forms[form];
                }

                this.$options.data = dataIsFunction ? function () { return data } : data;
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(FormHelpers);
}

export { FormHelpers, Form, FormErrors }
