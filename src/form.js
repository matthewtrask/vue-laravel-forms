import FormErrors from './form-errors';
import { assignIn, forIn, keys, pick } from 'lodash';

class Form
{
    /*
     * Create a new Form instance.
     */
    constructor(fields) {
        this.busy = false;
        this.errors = new FormErrors();
        this.initialFields = fields;
        this.successful = false;
        assignIn(this, fields);
    }

    /*
     * Get the form's fields.
     */
    get fields() {
        let fields = pick(this, keys(this.initialFields));

        // Here we unset null fields.
        forIn(fields, function (value, key) {
            if (value == null) {
                delete fields[key];
            }
        })

        return fields;
    }

    /*
     * Get the html/css class for the given field.
     */
    fieldClass(field, defaultClass = '', errorClass = '') {
        let defaultClassString = typeof defaultClass == 'function' ? defaultClass(field) : defaultClass;
        let errorClassString = typeof errorClass == 'function' ? errorClass(field) : errorClass;

        return this.errors.has(field) ? `${defaultClassString} ${errorClassString}` : defaultClassString;
    }

    /*
     * Finish processing the form.
     */
    finishProcessing() {
        this.busy = false;
        this.successful = true;
    }

    /*
     * Completely reset the form.
     */
    reset() {
        this.resetFields();
        this.resetStatus();
    }

    /*
     * Reset the fields to their initial state..
     */
    resetFields() {
        keys(this.initialFields).forEach((key) => this[key] = this.initialFields[key]);
    }

    /*
     * Reset the errors and other state for the form.
     */
    resetStatus() {
        this.busy = false;
        this.errors.forget();
        this.successful = false;
    }

    /*
     * Set the errors on the form.
     */
    setErrors(errors) {
        this.busy = false;
        this.errors.set(errors);
    }

    /*
     * Start processing the form.
     */
    startProcessing() {
        this.errors.forget();
        this.busy = true;
        this.successful = false;
    }

}

export default Form;