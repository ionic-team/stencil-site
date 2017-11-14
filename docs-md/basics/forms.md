# Forms

### Basic forms

Here is an example of a component with a basic form: 

```
@Component({
  tag: 'my-name',
  styleUrl: 'my-name.scss'
})
export class MyName {

  @State() value: string;

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.value);
    // send data to our backend
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Name:
          <input type="text" value={this.value} onInput={() => this.handleChange(event)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Lets go over what is happening here. First we bind the value of the input to a state variable, in this case `this.value`. We then set our state variable to the new value of the input with the `handleChange` method we have bound to `onInput`. `onInput` will fire every keystroke that the user types into the input.


### Advanced forms

Here is an example of a component with a more advanced form:

```
@Component({
  tag: 'my-name',
  styleUrl: 'my-name.scss'
})
export class MyName {

  @State() value: string;
  @State() selectValue: string;

  handleSubmit() {
    console.log(this.value);
  }

  handleChange(event) {
    this.value = event.target.value;

    if (event.target.validity.typeMismatch) {
      console.log('this element is not valid')
    }
  }

  handleSelect(event) {
    console.log(event.target.value);
    this.selectValue = event.target.value;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Email:
          <input type="email" value={this.value} onInput={(e) => this.handleChange(e)} />
        </label>

        <select value={this.selectValue} onInput={() => this.handleSelect(event)}>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

As you can see, this form is a little more advanced in that it has a select input along with an email input. We also do validity checking of our email input in the `handleChange` method. As you can see, we handle the `select` element exactly how we handle text inputs.

For the validity checking, we are #usingtheplatform and are using the [constraint validation api](https://www.w3.org/TR/html5/forms.html#the-constraint-validation-api) that is built right into the browser to check if the user is actually entering an email or not.

<stencil-route-link url="/docs/component-lifecycle" router="#router" custom="true">
  <button class="backButton">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/handling-arrays" custom="true">
  <button class="nextButton">
    Next
  </button>
</stencil-route-link>