import FormErrors from './form-errors';

class Form
{
    /*
     * Create a new Form instance.
     */
    constructor(fields) {
        this.busy = false;
        this.errors = new FormErrors();
        this.fields = fields;
        this.success = false;
    }

    /*
     * Get the html/css class for the given field.
     */
    fieldClass(field, defaultClass = null, errorClass = null) {
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