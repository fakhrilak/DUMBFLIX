import React,{useEffect, useState}from 'react';
import './Transaction.css';
import {connect} from 'react-redux'
import {getalltransaction,edittransaction,editsubs} from '../actions/payment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs'

const IncomingTransaction = ({
	getalltransaction,
	editsubs,
	edittransaction,
	payment: {alltransaction, loading }
}) => {
	let dateNow = dayjs();
	let now = dateNow.format('YYYY-MM-DD');
	
	useEffect(() => {
			getalltransaction();
		},
		[ getalltransaction ]
	);
	const handleUpdate = (status, idTransaction, idUser) => {
		edittransaction(status, idTransaction, idUser);
	};

	const data = alltransaction .map((data, index) => {
		let due_Date = dayjs(data.user.dueDate);
		editsubs(due_Date.diff(now, 'day'),data.user.id)
		console.log(due_Date.diff(now, 'day'),data.user.id)
		return loading || alltransaction === null ? (<div>loading..</div>) : (
			<tr key={data.id}>
				<td>{index + 1}</td>
				<td>{data.user.fullName}</td>
				<td>
					<img style={{ width: '200px' }} src={data.attachment}/>
				</td>
				<td>
					{due_Date.diff(now, 'day') > 0 ? due_Date.diff(now, 'day') : 0} Days
				</td>
				<td
					style={{color: data.user.subscribe && due_Date.diff(now, 'day') != 0? '#0ACF83' : '#FF0742'}}
				>
					{data.user.subscribe  && due_Date.diff(now, 'day') != 0 ?  'Active' : 'Not Active'}
				</td>
				<td
					style={{color:data.status == 'Approved'? '#0ACF83'
					: data.status == 'Pending' ? '#F7941E' : '#FF0742'
					}}
				>
					{data.status}
				</td>
				<td>
					<span
						style={{fontSize: '20px',cursor: 'pointer',color: '#1C9CD2'}}	
					>
						{data.status === 'Approved' || data.status === 'Reject' ? null : (
							<div className="dropdown">
								<div className="dropdown-content">
									<label htmlFor="">
										<ul>
											<li style={{ color: '#0ACF83' }}
												onClick={() =>
													handleUpdate('Approved',data.id,data.user.id)}														
											>
												Aktifasi
											</li>
											<li style={{ color: 'red' }}
												onClick={() =>handleUpdate('Reject',data.id,data.user.id)}		
											>
												Reject
											</li>
										</ul>
									</label>
								</div>
								<FontAwesomeIcon icon={faCaretDown} />
							</div>
						)}
					</span>
				</td>
			</tr>
		);
	});
	return (
		<div className="transcation-container">
			<h1>Incoming Transcation</h1>
			<table className="transcation-table">
				<thead>
					<tr>
						<th>No</th>
						<th>Users</th>
						<th>Bukti Transfer</th>
						<th>Remaining Aktif</th>
						<th>Status User</th>
						<th>Status Payment</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>{data}</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = (state) => ({
	payment: state.payment
});

export default connect(mapStateToProps, { getalltransaction, edittransaction,editsubs })(
	IncomingTransaction
);