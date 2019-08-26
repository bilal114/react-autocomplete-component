import React, {Component,Fragment} from 'react'

import OptionsParent from './OptionsParent';
import Options from './Options';
import styled,{createGlobalStyle} from 'styled-components';
import PropTypes from 'prop-types'
import axios from 'axios'
import withForwardedRef from './withForwardedRef'

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
}

body {
  font: 16px Arial;  
  backgroundColor : 'black'
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

  ${props => props.globalStyle}
`;

export default Object.assign( withForwardedRef(class extends Component {

	state = {


		inputValue : "",
		currentActiveValue : "",
		itemsData : [],
		searchData: [],
		searchPattern: "containsString",
		placeholder : "Search",
		selectOnBlur : false,
		axiosConfig : false,
		onChange: false,
		onSelect : false,
		maxOptionsLimit : 10,
		getItemValue: false,
		ref: false,
		searchEnabled : false,
		optionsJSX : false,
		inputJSX : false
	}

	currentFocus = -1;

	inputRef = React.createRef();



	componentDidMount() {

		if(this.props.forwardedRef)
		this.inputRef = this.props.forwardedRef;

	}

static getDerivedStateFromProps(props, state) {

	const propsToBeState = [
								'searchPattern',
								'data',
								'placeholder',
								'axiosConfig',
								'selectOnBlur',
								'onChange',
								'onSelect',
								'getItemValue',
								'itemsData',
								'ref',
								'searchEnabled',
								'optionsJSX',
								'inputJSX',


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
	closeAllItems = (withObject={},toBeCalled=()=>{}) => {

				setTimeout(()=>{

        			this.setState({
						...this.state,
						...withObject,
		    			searchData : []
		    		},()=> {
		    			toBeCalled();
		    		})
			    },1)

			    this.optionRefs = [];
			    this.currentFocus = -1;
		 	
	}



	addClickEventListener = () => {

		for (var i = 0; i < this.optionRefs.length; i++) {

	      	this.optionRefs[i] && this.optionRefs[i].addEventListener('mousedown',(e)=>{

	      		
				this.closeAllItems({inputValue:e.target.textContent,currentActiveValue:e.target.textContent},this.onSelect);

	      	});
	    }

	}

	onBlur = () => {

		

		if(this.state.selectOnBlur)
			this.closeAllItems({inputValue:this.state.currentActiveValue},this.onSelect);
		else
			setTimeout(() => {
				this.closeAllItems({currentActiveValue:this.state.inputValue},this.onChange);
			},1)
			

	}

	onFocus = (elem) => {

		let event = new Event('input', {
    						'bubbles': true,
    						'cancelable': true
						});

		elem.target.dispatchEvent(event);

	}



	addActive = () => {

		/*remove null values*/
		this.optionRefs = this.optionRefs.filter((val)=>{
			return (val)?val:false
		});
	    /*start by removing the "active" class on all items:*/
	    let currentActiveValue;

	    this.removeActive();
	    if (this.currentFocus > this.optionRefs.length) this.currentFocus = 0;
    	if (this.currentFocus < -1) this.currentFocus = (this.optionRefs.length - 1);
    	
    	if(this.currentFocus==-1 || this.currentFocus===this.optionRefs.length)
	    	currentActiveValue = this.state.inputValue;
	    else
	    	currentActiveValue = (this.optionRefs[this.currentFocus] && this.optionRefs[this.currentFocus].textContent) || this.state.inputValue;

	    	this.setState({
	    		...this.state,
	    		currentActiveValue

	    	},()=> {
	    		/* now calling onChange method  */
	    		
	    			this.onChange();
	    	})


		if(this.optionRefs[this.currentFocus]){

	    	this.optionRefs[this.currentFocus].classList.add("autocomplete-active");
		}
	}

	/* handling user level methods*/

	onChange = () => {

		if(this.state.onChange)
			this.state.onChange(this.state.currentActiveValue);

	}

	onSelect = () => {

		if(this.state.onSelect)
			this.state.onSelect(this.state.inputValue);

		this.onChange();
	}

	removeActive = () => {

	    /*a function to remove the "active" class from all autocomplete items:*/
	    for (var i = 0; i < this.optionRefs.length; i++) {
	      this.optionRefs[i] && this.optionRefs[i].classList.remove("autocomplete-active");
	    }
	}
	isSearched = (value,inpValue) => {

				if(!value) return;
		value = value.toString().toUpperCase();
		inpValue = inpValue.toString().toUpperCase();

		if(this.state.searchPattern==='containsString' && value.indexOf(inpValue)>-1)
			return value;

		if(this.state.searchPattern==='containsLetter'){

			let letters = inpValue.split('');

			let response = value;
			for (let i = 0; i < letters.length; i++) {
				
				if(!(value.indexOf(letters[i])>-1))
				{
					response = false;
					break;
				}
				
			}
			
			return response;
		}

		if(this.state.searchPattern==='startsWith' && value.substr(0, inpValue.length) == inpValue)
			return value;

		if(this.state.searchPattern==='endsWith' && value.substr(-(inpValue.length) ) == inpValue)
			return value;

	}

	makeAxiosRequest = (inputValue) => {

		let axiosConfig = this.state.axiosConfig && this.state.axiosConfig(inputValue);
			
			let self = this;

		if(axiosConfig instanceof Object)
		{
			axios(axiosConfig).then((res)=>{

				this.setData(res.data,inputValue);
				

			}).catch((err)=> {
				console.log(err,' error occured.')
			})

			return true;
		}
		else
			return false;

	}
	onInput = () => {

			let inp = this.inputRef.current;

		  	let storeInState = [],i,val=inp.value;
			
			
	      	/*close any already open item of autocompleted values*/
	      	this.closeAllItems({inputValue: inp.value,currentActiveValue: inp.value},this.onChange);

	      	
	      	if(!val || (!this.makeAxiosRequest(val) && this.state.itemsData.length===0) )
	      		return;

	      	/*for each item in the array...*/

	      	this.setData(this.state.itemsData,val);

	}

	setData = (dataToMakeSearch,inpValue,type) => {

			let storeInState = [];
			if(type==='axios' && !this.state.searchEnabled );
			else
			storeInState = this.makeLocalSearch(dataToMakeSearch,inpValue);
	    
		    setTimeout(()=>{

					this.setState({
						...this.state,
		    			searchData : storeInState
		    		},()=>{

		    			

		    			this.addClickEventListener();
		    		})
			    },1)

	}

	makeLocalSearch = (dataToMakeSearch,inpValue,storeInState=[]) => {


				for (let i = 0; i<dataToMakeSearch.length; i++) {
			        /*check if the item starts with the same letters as the text field value:*/


			        if ( this.isSearched(this.state.getItemValue(dataToMakeSearch[i]),inpValue)) {
			          	
			        	if(storeInState.length<this.state.maxOptionsLimit)
				        {

				        	storeInState.push(dataToMakeSearch[i]);
				          
				        }
			        }
			    }

			    return storeInState;

	}

	onKeyDown = (e) => {

		
		let inp = this.inputRef.current;
		      // let {currentFocus} = this.state; 		      
		      if(this.optionRefs.length===0) return;
		      if (e.keyCode == 40) {
		        /*If the arrow DOWN key is pressed,
		        increase the currentFocus variable:*/
		        if(this.state.searchData.length>0)
			    {
		        	this.currentFocus++;
		        	this.addActive();
		      	}		      
		      } else if (e.keyCode == 38) { //up
		        /*If the arrow UP key is pressed,
		        decrease the currentFocus variable:*/
			        
	        	if(this.state.searchData.length>0)
	        	{
	        		this.currentFocus--;
	        		this.addActive();
	        	}		        
		      } else if (e.keyCode == 13) {
		        /*If the ENTER key is pressed, prevent the form from being submitted,*/
		        e.preventDefault();
		        
		        if (this.currentFocus > -1 && this.optionRefs.length>0 && this.optionRefs[this.currentFocus]) {
		        	/*and simulate a click on the "active" item:*/
		        	let event = new Event('mousedown');
		            this.optionRefs[this.currentFocus].dispatchEvent(event);
		        }
		        else
		        	this.closeAllItems({...this.state},this.onSelect);
		      }

	}
	
	handleChange = (e) => {
		
		let value = e.target.value;

		this.setState({
			...this.state,
			inputValue : value,
			currentActiveValue : value
		})

	}

	inputJSX = () => {

		let obj = {

			ref : this.props.forwardedRef || this.inputRef,
			onBlur : this.onBlur,
			onFocus : this.onFocus,
			onInput : this.onInput,
			value : this.state.currentActiveValue,
			onChange : this.handleChange,
			onKeyDown : this.onKeyDown,
			type : 'text',
			placeholder : this.state.placeholder

		}

		if(this.state.inputJSX)
			return this.state.inputJSX(obj);

		return (<input {...obj}/>);
	}

  render() {	

    return (
    	<Fragment>

		<form autoComplete="off" >
		  <div className="autocomplete"  >
		    {this.inputJSX()}
		  	<OptionsParent >
		  		{ this.state.searchData.map((val,key) => {

		  			return	 key<=this.state.maxOptionsLimit? <Options ref={this.setRef} JSX={this.state.optionsJSX || ((value)=>value) } key={key} value={this.state.getItemValue(val)}  /> : null
		  		})}
		  	</OptionsParent>
		  </div>		
		</form>
		<GlobalStyle globalStyle={this.props.globalStyle} />
    </Fragment>)
  }
}),

{propTypes: { 
				searchPattern: PropTypes.oneOf(['startsWith','endsWith','containsString','containsLetter']),
				getItemValue: PropTypes.func.isRequired ,
				itemsData: PropTypes.array.isRequired,
				inputJSX: PropTypes.func,
				optionsJSX: PropTypes.func,
				maxOptionsLimit: PropTypes.number,
				searchEnabled: PropTypes.bool,
				selectOnBlur: PropTypes.bool,
				ref: PropTypes.object,
				onChange: PropTypes.func,
				onSelect: PropTypes.func,
				axiosConfig: PropTypes.func,
				placeholder: PropTypes.string,

			}},
);
