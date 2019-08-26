import React, {Component,Fragment} from 'react';

export default class OptionsParent extends Component {

	
  render() {	

    return (

		  <div className="___optionsDiv___" >

		    {this.props.children}
		  
		  </div>
		  );
  }
}
