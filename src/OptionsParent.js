import React, {Component,Fragment} from 'react';
import './style.css';
export default class OptionsParent extends Component {

	
  render() {	

    return (

		  <div className="___optionsDiv___" >

		    {this.props.children}
		  
		  </div>
		  );
  }
}
