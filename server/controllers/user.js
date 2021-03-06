const {
	User
} = require('../models');
const Joi = require('@hapi/joi');

exports.getUser = async (req, res) => {
	try {
		const user = await User.findAll({
			attributes: {
				exclude: ['password']
			}
		});

		if (user) {
			return res.send({
				data: user
			});
		} else {
			return res.status(500).send({
				message: 'Server Error'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				id
			}
		});
		if (user) {
			const deleteUser = await User.destroy({
				where: {
					id
				}
			});
			return res.send({
				data: {
					id
				}
			});
		} else {
			return res.status(400).send({
				error: {
					message: 'User Not Found'
				}
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}

};

exports.editsubs = async (req, res) => {
	try{
		const { id } = req.params;
		const { status, idUser } = req.body;
		const transaction = await User.update(req.body, {
			where: {
				id
			}
		});
		let update = {};
		if (status <= '0' ) {
			update.subscribe = false;
		}
		if (transaction) {await User.update(update, {			
				where: {
					id: idUser
				}
			});
		}
	}catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
}
