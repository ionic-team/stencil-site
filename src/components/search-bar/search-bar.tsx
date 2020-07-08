import { Component, ComponentInterface, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'search-bar',
  styleUrl: 'search-bar.css',
})
export class SearchBar implements ComponentInterface {
  @Prop() placeholder?: string = 'Search';
  @Prop() searchTerm?: string = '';
  @Prop() handleInput?: (ev: any) => void;
  @Prop() debounce?: number = 0;

  timer: any = undefined;

  onHandleInput(ev: any) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.handleInput) {
        this.handleInput(ev)
      }
    }, this.debounce);
  }

  render() {
    const {
      placeholder,
      searchTerm,
    } = this;

    return (
      <Host id="algolia-search">
        <div class="form-group">
          <input
            name="search"
            type="search"
            autocomplete="off"
            value={searchTerm}
            onInput={this.onHandleInput.bind(this)}
            onChange={this.onHandleInput.bind(this)}
            placeholder={placeholder}
            aria-label="Search"
            required
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.48776 6.4556C7.19995 6.16779 6.74338 6.16779 6.47995 6.4556C5.49557 7.43999 4.94434 8.75999 4.94434 10.1756C4.94434 11.5678 5.49653 12.8878 6.47995 13.8956C6.62433 14.04 6.81557 14.1112 6.98434 14.1112C7.15215 14.1112 7.34433 14.039 7.48872 13.8956C7.77653 13.6078 7.77653 13.1512 7.48872 12.8878C6.76872 12.1678 6.36091 11.2078 6.36091 10.2C6.36091 9.19227 6.76872 8.23223 7.48872 7.51227C7.75217 7.20008 7.75217 6.74447 7.48778 6.45572L7.48776 6.4556Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M21.12 20.1123L15.9844 14.9523C16.4644 14.3523 16.8722 13.7045 17.1601 13.0079C17.5201 12.0958 17.7122 11.1601 17.7122 10.1757C17.7122 9.19132 17.5201 8.2557 17.1601 7.34346C16.7757 6.40785 16.2244 5.56785 15.5044 4.84794C14.7844 4.12804 13.9444 3.57575 13.0089 3.19233C12.0967 2.83233 11.1611 2.64014 10.1767 2.64014C9.1923 2.64014 8.25668 2.83232 7.34444 3.19233C6.40882 3.57671 5.56883 4.12794 4.84892 4.84794C4.12902 5.56794 3.57673 6.40794 3.19331 7.34346C2.83331 8.25566 2.64111 9.19127 2.64111 10.1757C2.64111 11.1601 2.8333 12.0957 3.19331 13.0079C3.57769 13.9436 4.12892 14.7836 4.84892 15.5035C5.56892 16.2234 6.40892 16.7757 7.34444 17.1591C8.25663 17.5191 9.19225 17.7113 10.1767 17.7113C11.1611 17.7113 12.0967 17.5191 13.0089 17.1591C13.7289 16.8713 14.3767 16.4869 14.9533 15.9835L20.1123 21.1199C20.2567 21.2643 20.448 21.3356 20.6167 21.3356C20.8089 21.3356 20.9767 21.2634 21.1211 21.1199C21.408 20.8556 21.408 20.3999 21.1202 20.1121L21.12 20.1123ZM10.1755 16.2478C8.54329 16.2478 7.031 15.6235 5.87996 14.4722C3.50435 12.0966 3.50435 8.25671 5.87996 5.87999C7.05558 4.70438 8.61548 4.10438 10.1755 4.10438C11.7355 4.10438 13.2955 4.70438 14.471 5.87999C16.8466 8.25561 16.8466 12.0955 14.471 14.4722C13.3197 15.6244 11.8075 16.2478 10.1755 16.2478Z"
              fill="black"
              fill-opacity="0.5"
            />
          </svg>
        </div>
      </Host>
    );
  }
}
