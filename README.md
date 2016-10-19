# vue-laravel-forms
Form helpers for [Laravel](https://laravel.com) backed [Vue.js](https://vuejs.org) projects.

**Disclaimer: This plugin is still in a BETA state**

## Installation
**Install package via NPM**
```
npm install vue-laravel-forms
```

## Setup
**Install plugin within project**
```
import Vue from 'vue'
import { FormHelpers } from 'vue-laravel-forms'

Vue.use(FormHelpers);
```

or 

```
window.Vue = require('vue');
require('vue-laravel-forms');
```

Alternatively, you may import the various components of this plugin separately.
```
import { Form, FormErrors, Http } from 'vue-laravel-forms'

window.AppForm = Form;
window.AppFormErrors = FormErrors;

_.extend(App, new Http()) // Vue.http config not needed
_.extend(App, new Http(Vue.http)) // Vue.http config needed
```

## Usage
### Creating a Form
_Components installed via Vue_
```
Vue.component('user-registration-form', {
    forms: {
        userRegistrationForm: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }
}
```

_Components installed separately_
```
Vue.component('user-registration-form', {
    data() {
        return { 
            userRegistrationForm: new AppForm({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            });
        }
    }
});
```

### Submitting a Form
_Via a POST request (Components installed via Vue)_
```
Vue.component('user-registration-form', {

    // Create your form using one of the techniques described above.
    
    methods: {
        registerUser() {
            this.$forms.post('api/users', this.userRegistrationForm)
                .then(respose => console.log(response.data))
                .catch(errors => console.log(errors));
        }
    }
```

_Via a POST request (Components installed separately)_
```
Vue.component('user-registration-form', {

    // Create your form using one of the techniques described above.
    
    methods: {
        registerUser() {
            App.postForm('api/users', this.userRegistrationForm)
                .then(respose => console.log(response.data))
                .catch(errors => console.log(errors));
        }
    }
```

##### Available methods for submitting a form
_Components installed via Vue_
* `vm.$form.delete(uri, form)`
* `vm.$form.post(uri, form)`
* `vm.$form.put(uri, form)`
* `vm.$form.submit(method, uri, form)`

_Components installed Separately_
* `App.deleteForm(uri, form)`
* `App.postForm(uri, form)`
* `App.putForm(uri, form)`
* `App.sendForm(method, uri, form)`


### Template Helpers
##### Check a field for errors
```
Vue.component('user-registration-form', {

    methods: {
        checkFieldForError(field) {
            return this.userRegistrationForm.errors.has('field');
        }
    }

});
```

##### Use the `fieldClass` helper method

`formInstance.fieldClass(field, defaultClass, errorClass)`

```
<div :class="userRegistrationForm.fieldClass('email', 'form-group', 'has-error')">
    // Truncated for brevity
</div>
```

Alternatively, pass callbacks for `defaultClass` and `errorClass`.
```
<div :class="userRegistrationForm.fieldClass('email', getFieldClass, getFieldErrorClass)">
    // Truncated for brevity
</div>
```
```
Vue.component('user-registration-form', {

    methods: {
        getFieldClass(field) {
            return `form-group ${field}`;
        },
        
        getFieldErrorClass(field) {
            return `has-error ${field}-error`;
        }
    }

});
```

##### Get the error message for a field
```
<p class="help-block">
    {{ userRegistrationForm.errors.get('email') }}
</p>
```

## Contributing
If you have any questions, feedback or would like to make improvements, **please** open an issue or pull request. 

## Credits
* [Taylor Otwell](https://github.com/taylorotwell) - This project is heavily based on the form helpers that were
included in the alpha release of [laravel/spark](https://spark.laravel.com).

## License
[MIT](https://opensource.org/licenses/MIT)
