import { flatten, has, isEmpty, toArray } from 'lodash'

class FormErrors
{
    /*
     * Create a new FormErrors instance.
     */
    constructor() {
        this.errors = {};
    }

    /*
     * Get all of the raw errors for the collection.
     */
    all() {
        return this.errors;
    }

    /*
     * Determine if the collection has any errors.
     */
    hasErrors() {
        return ! isEmpty(this.errors);
    }

    /*
     * Get all of the errors for the collection in a flat array.
     */
    flatten() {
        return flatten(toArray(this.errors));
    }

    /*
     * Forget all of the errors currently in the collection.
     */
    forget() {
        this.errors = {};
    }

    /*
     * Get the first error for the given field.
     */
    get(field) {
        if (this.has(field)) {
            return this.errors[field][0];
        }
    }

    /*
     * Determine if the collection has any errors for the given field.
     */
    has(field) {
        return has(this.errors, field);
    }

    /*
     * Set the raw errors for the collection.
     */
    set(errors) {
        if (typeof errors === 'object') {
            this.errors = errors;
        } else {
            this.errors = {
                form: ['Something went wrong. Please try again or contact customer support.']
            }
        }
    }
}

export default FormErrors;