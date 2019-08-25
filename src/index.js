import React, {Component,Fragment} from 'react'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './moment.js';
import './style.css';
import OptionsParent from './OptionsParent';
import Options from './Options';
import autocomplete,{initiate} from './scripts.js';
import styled,{createGlobalStyle} from 'styled-components';
import PropTypes from 'prop-types'
import axios from 'axios'

let countries = ["Afghanistan","Albania","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


export default Object.assign( class extends Component {

	state = {

		inputValue : "",
		currentActiveValue : "",
		data : [],
		searchData: [],
		urlData : [],
		searchPattern: "startsWith",
		placeholder : "Search",
		selectOnBlur : false,
		axiosConfig : false
	}

	currentFocus = -1;

	inputRef = React.createRef();



	componentDidMount() {

		// let countries = ["Afghanistan","Albania","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

		// this.autocomplete(this.inputRef.current,countries)

	}

static getDerivedStateFromProps(props, state) {

	// console.log(props,state,' props and state is here............')

	const propsToBeState = [
								'searchPattern',
								'data',
								'urlForData',
								'placeholder',
								'axiosConfig',
								'selectOnBlur'

							];
	let stateObj = {};

	Object.entries(props).forEach(([key,val])=>{

		if(propsToBeState.indexOf(key)>-1)
			stateObj[key] = val;



	})

	return stateObj;	
}


	optionRefs = [];

	setRef = (ref) => {
		this.optionRefs.push(ref);
	}
	closeAllLists = (elmnt) => {

				setTimeout(()=>{

        			this.setState({
						...this.state,
		    			searchData : []
		    		})
			    },1)
		 	
	}



	addClickEventListener = () => {

		for (var i = 0; i < this.optionRefs.length; i++) {

	      	this.optionRefs[i] && this.optionRefs[i].addEventListener('click',(e)=>{

		      	this.setState({
					...this.state,
					inputValue : e.target.textContent,
					searchData : []
				})

	      	});
	    }

	}

	onBlur = () => {

		let stateObj;

		if(this.state.selectOnBlur)
			stateObj = {
				inputValue : this.state.currentActiveValue,
				searchData : []
			};
		else
			stateObj = { searchData : [] };
			
			this.setState({
				...this.state,
				...stateObj
			})

	}

	onFocus = (elem) => {

		let event = new Event('input', {
    						'bubbles': true,
    						'cancelable': true
						});

		elem.target.dispatchEvent(event);

	}

	addActive = () => {

	    /*start by removing the "active" class on all items:*/
	    let currentActiveValue;

	    this.removeActive();
	    if (this.currentFocus > this.optionRefs.length) this.currentFocus = 0;
    	if (this.currentFocus < -1) this.currentFocus = (this.optionRefs.length - 1);
    	
    	if(this.currentFocus==-1 || this.currentFocus===this.optionRefs.length)
	    	currentActiveValue = this.state.inputValue;
	    else
	    	currentActiveValue = this.optionRefs[this.currentFocus].textContent;

	    	this.setState({
	    		...this.state,
	    		currentActiveValue

	    	})


		if(this.optionRefs[this.currentFocus]){

	    	this.optionRefs[this.currentFocus].classList.add("autocomplete-active");
		}
	}


	removeActive = (x) => {

	    /*a function to remove the "active" class from all autocomplete items:*/
	    for (var i = 0; i < this.optionRefs.length; i++) {
	      this.optionRefs[i] && this.optionRefs[i].classList.remove("autocomplete-active");
	    }
	}
	isSearched = () => {

	}

	makeAxiosRequest = () => {

		let axiosConfig = this.state.axiosConfig && this.state.axiosConfig();
			console.log(axiosConfig)
		if(axiosConfig instanceof Object)
			axios(axiosConfig).then((res)=>{

				console.log(JSON.parse(res.data),res,' axios responded data mmmmmmmmmmmmmmmmmmmmmmm');
			}).catch((err)=> {
				console.log(err,' error occured. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
			})

		return false;
	}
	onInput = () => {

			let inp = this.inputRef.current,optionsLimit=10;
		  	let storeInState = [],i,val=inp.value;
			this.setState({...this.state,inputValue: inp.value,currentActiveValue: inp.value});
	      	/*close any already open lists of autocompleted values*/
	      	this.closeAllLists();

	      	if (!val) { return false;}
	      	
	      	if(!this.makeAxiosRequest())
	      		return;

	      	/*for each item in the array...*/
		    for (i = 0; i<countries.length; i++) {
		        /*check if the item starts with the same letters as the text field value:*/
		        if (countries[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
		          	
		        	if(storeInState.length<optionsLimit)
			        {

			        	storeInState.push(countries[i]);
			        	// console.log(storeInState.length,optionsLimit)
			          
			        }
		        }
		    }

		    
		    setTimeout(()=>{

		    		// console.log(storeInState);
        			this.setState({
						...this.state,
		    			searchData : storeInState
		    		},()=>{

		    			// console.log(this.optionRefs[0]);

		    			this.addClickEventListener();
		    		})
			    },1)
	}


	onKeyDown = (e) => {

		let inp = this.inputRef.current;
		      let {currentFocus} = this.state; 
		      if (e.keyCode == 40) {
		        /*If the arrow DOWN key is pressed,
		        increase the currentFocus variable:*/
		        if(this.state.data.length>0)
			    {
		        	this.currentFocus++;
		        	this.addActive();
		      	}		      
		      } else if (e.keyCode == 38) { //up
		        /*If the arrow UP key is pressed,
		        decrease the currentFocus variable:*/
			        
	        	if(this.state.data.length>0)
	        	{
	        		this.currentFocus--;
	        		this.addActive();
	        	}		        
		      } else if (e.keyCode == 13) {
		        /*If the ENTER key is pressed, prevent the form from being submitted,*/
		        e.preventDefault();
		        // console.log(this.currentFocus,' currentFocus',this.state)
		        if (this.currentFocus > -1) {
		        	/*and simulate a click on the "active" item:*/
		          if (this.optionRefs.length>0) this.optionRefs[this.currentFocus].click();
		        }
		        else
		        	this.onBlur();
		      }
	}
	
	onChange = (e) => {
		
		let value = e.target.value;

		this.setState({
			...this.state,
			inputValue : value,
			currentActiveValue : value
		})

	}
  render() {	

  		console.log(this.state);
    return (
    	<Fragment>
    	
		<form autoComplete="off" >
		  <div className="autocomplete" >
		    <input ref={this.inputRef} onBlur={this.onBlur} onFocus={this.onFocus} onInput={this.onInput} value = {this.state.currentActiveValue} onChange={this.onChange} onKeyDown={this.onKeyDown}  id="myInput" type="text" name="myCountry" placeholder="Country"/>
		  	<OptionsParent >
		  		{ this.state.searchData.map((val,key) => {

		  			return	<Options ref={this.setRef} JSX={(value)=>value} key={key} value={val}  />
		  		})}
		  	</OptionsParent>
		  </div>		
		</form>

    </Fragment>)
  }
},

{propTypes: { searchPattern: PropTypes.oneOf(['startsWith','endsWith','containsWord','containsLetter']) }}
);
