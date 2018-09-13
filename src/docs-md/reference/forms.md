# Forms

### Basic forms

Here is an example of a component with a basic form:

```typescript
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
          <input type="text" value={this.value} onInput={(event) => this.handleChange(event)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Let's go over what is happening here. First we bind the value of the input to a state variable, in this case `this.value`. We then set our state variable to the new value of the input with the `handleChange` method we have bound to `onInput`. `onInput` will fire every keystroke that the user types into the input.


### Advanced forms

Here is an example of a component with a more advanced form:

```typescript
@Component({
  tag: 'my-name',
  styleUrl: 'my-name.scss'
})
export class MyName {

  @State() value: string;
  @State() selectValue: string;
  @State() secondSelectValue: string;
  @State() avOptions: any[];

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

  handleSecondSelect(event) {
    console.log(event.target.value);
    this.secondSelectValue = event.target.value;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Email:
          <input type="email" value={this.value} onInput={(e) => this.handleChange(e)} />
        </label>

        <select onInput={(event) => this.handleSelect(event)}>
          <option value="volvo" selected={this.selectValue === 'volvo'}>Volvo</option>
          <option value="saab" selected={this.selectValue === 'saab'}>Saab</option>
          <option value="mercedes" selected={this.selectValue === 'mercedes'}>Mercedes</option>
          <option value="audi" selected={this.selectValue === 'audi'}>Audi</option>
        </select>

        <select onInput={(event) => this.handleSecondSelect(event)}>
          {this.avOptions.map(recipient => (
            <option value={recipient.id} selected={this.selectedReceiverIds.indexOf(recipient.id) !== -1}>{recipient.name}</option>
          ))}
        </select>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

This form is a little more advanced in that it has two select inputs along with an email input. We also do validity checking of our email input in the `handleChange` method. We handle the `select` element in a very similar manner to how we handle text inputs.

For the validity checking, we are #usingtheplatform and are using the [constraint validation api](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) that is built right into the browser to check if the user is actually entering an email or not.

<stencil-route-link url="/docs/styling" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/config" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
