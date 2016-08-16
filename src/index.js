import Http from './http';
import Form from './form';
import FormErrors from './form-errors';

function FormHelpers (Vue) {

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
                    return Http.deleteForm(uri, form);
                },

                /*
                 * Submit the given Form to the given URI via a POST request.
                 */
                post(uri, form) {
                    return Http.postForm(uri, form);
                },

                /*
                 * Submit the given Form to the given URI via a PUT request
                 */
                put(uri, form) {
                    return Http.putForm(uri, form);
                },

                /*
                 * Submit the given Form to the given URI using the given HTTP method.
                 */
                submit(method, uri, form, formData = null) {
                    return Http.sendForm(method, uri, form, formData);
                }
            }
        }
    });

    Vue.mixin({

        /*
         * The 'beforeCreate' life-cycle hook.
         */
        beforeCreate() {
            if (typeof this.$options.forms == 'object') {
                registerForms(this.$options.forms).bind(this);
            }
        }

    });
}

function registerForms(forms) {
    for (var form in forms) {
        Object.defineProperty(this._data, form, forms[form]);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(FormHelpers);
}

export { FormHelpers, Http, Form, FormErrors }
