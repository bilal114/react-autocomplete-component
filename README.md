# react-autocomplete-select

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

React Autocomplete for input field, all styles are fully customizable.
In which you coould modify or customize the options JSX and any of the css you want.
	

### Functional Guide
| Property Name | Description | Type| Short Example |
| ------ | ------ | ------ | ------ |
| onSelect | this method is called, when user selects the option from the dropdown | function| <Autocomplete onSelect= (selectedValue) => { // do whatever you want to do } | 
|onChange | called whenever input value changes | Array | <Autocomplete onChange= (changedValue) => { // do whatever you want to do }|
|itemsData| data from which we will make search when user will type something in the input field| Array<Object,Object> |`<Autocomplete itemsData=  [ {country:'USA',country:'UK'} ] />`|
|axiosConfig | If you provide axiosConfig data then itemsData will be ignored| function:Object |`<Autocomplete axiosConfig= {inputValue => ({ url: `http://locahost/yourfile.php?query=${inputValue}` // you can provide here any of axios config parameters }) }` |
|getItemValue | getItemValue method returns the value that we will use to search and show in the dropdown options | function:Any |`<Autocomplete getItemValue={(item)=>{ return item.name }}` |
|selectOnBlur | selectOnBlur decides whether to select the active option or not when input is blured | boolean |`<Autocomplete selectOnBlur = {false} />` |
|searchPattern | searchPattern decides the method of search | string< startsWith, endsWith, containsString, containsLetter> |`<Autocomplete |searchPattern={'containsString'} />` |
|placeholder | placeholder for input field | string |`<Autocomplete placeholder = "Type to Search" />` |
|ref | you can pass the ref prop to handle the input field like focus etc etc | Object<React.createRef> |`<Autocomplete ref={this.inputRef} />` |

### Style Guide

| globalStyle : String |
| ------ | 

##### Default Value :   
``` css
* {
  box-sizing: border-box;
}

body {
  font: 16px Arial;  
}

/*the container must be positioned relative:*/
.autocomplete {
  position: relative;
  display: inline-block;
  width:300px;
}

input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}

input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}


/*Dropdown options container css*/
.___optionsDiv___ {

    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;
}


/*Dropdown options each div css*/
.___optionsDiv___ div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff; 
  border-bottom: 1px solid #d4d4d4; 
}

/*Dropdown options each div on hover css*/

.___optionsDiv___ div:hover {
    background-color: #e9e9e9; 
}


/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: DodgerBlue !important; 
  color: #ffffff; 
}
```

##### Description  <globalStyle> : 
        you could modify or override any of the above default provided css....
[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://github.com/bilal114/react-select-date-range-calendar