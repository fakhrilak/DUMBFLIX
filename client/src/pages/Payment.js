import React,{useState} from 'react';

import { postpayment} from "../actions/payment";
import './Payment.css'
import { connect } from "react-redux";

const Payment = ({postpayment, auth: { user }}) => {
	const [formData, setFormData] = useState({
		attache:"",
	  });
	
	  const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	
	  const {attache} = formData;
	
	  const onSubmit = (e) => {
		const userId = user.id;
		e.preventDefault();
		postpayment(
			attache,
			userId,
		);
		setFormData({
			attache:"",
		})
	  };
	return (
		<div className= "inputpayment" style={{paddingBottom:300}}>
			<h2>PREMIUM</h2>
			<p>
				Bayar sekarang dan nikmati streaming film-film yang kekinian dari{' '}
				<span className="red">DUMBFLIX </span> <br />{' '}
				<span className="red">DUMBFLIX </span> : 0981312323
			</p>
			<form className="formpayment" onSubmit={(e) => onSubmit(e)}>
				<div className= "container-payment">
					<div className="form-container">
						<input
							type="text"
							placeholder="attache"
							value={attache}
							name="attache"
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-container">
						<button className ="buttonsend">
							Send
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

  const mapStateToProps = (state) => ({
	payment: state.payment,
	auth: state.auth,
  });
  
  export default connect(mapStateToProps, { postpayment})(Payment);
