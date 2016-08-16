# vue-laravel-forms (NOT READY FOR USE)
Form helpers for Laravel backed Vue.js projects.


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
reqiure('vue-laravel-forms');
```

Alternatively, you may import the various components of this plugin separately.
```
import { Form, FormErrors, Http } from 'vue-laravel-forms'

window.AppForm = Form;
window.AppFormErrors = FormErrors;

_.extend(App, Http)
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
<div class="form-group {{ userRegistrationForm.errors.has('email') ? 'has-error' : '' }}">
    // Truncated for brevity
</div>
```

or

```
<div :class="userRegistrationForm.field('email', 'form-group', 'has-error')">
    // Truncated for brevity
</div>
```

##### Get the error message for a field
```
<p class="help-block">
    {{ userRegistrationForm.errors.get('email') }}
</p>
```

