const AmitPandey = require('../models/User')
const { get: _get } = require('lodash');

const getPagination = (page, size) => {
    const limit = size ? +size : 100;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: Data } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, Data, totalPages, currentPage };
};

const formatUserRes = (data) => {
	data = JSON.parse(JSON.stringify(data));
	return data;
};
const formatUserCrudReq = (data) => {
    const userKeys = [
        'name',
        'email',
        'phone'
    ];

    const userObject = {};

    userKeys.forEach((currKey) => {
        if (data[currKey] !== undefined) {
            userObject[currKey] = data[currKey];
        }
    });

    return userObject;
};

module.exports = {
    saveUser: (req, res) => {
        const userData = formatUserCrudReq(req.body);
        console.log(userData);
        AmitPandey.create(userData)
            .then((value) => {
                res.status(200).json({
                    message: 'User Details Saved successfully',
                    data: value,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message || 'Error in Saving Data',
                });
            });
    },
    
	getUserById: (req, res) => {
		const { id } = req.params;
        console.log(req.params);
		AmitPandey.findByPk(id, {
		
		})
			.then((value) => {
				if (!value) {
					throw new Error('Invalid User Id');
				}
				res.status(200).json({
					message: 'User Fetched successfully',
					data: formatUserRes(value),
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: err.message || 'Error in Fetching Data',
				});
			});
	},

    
	updateUserById: async (req, res) => {
		const { id } = req.params;
       console.log(req.params);
		AmitPandey.findByPk(id)
			.then((currUser) => {
				if (!currUser) {
					return res.status(404).json({
						message: 'User Details Id not Found',
					});
				}

				currUser
					.update({
						...currUser,
						...formatUserRes(req.body),
					})
					.then((updatedUser) =>
						res.status(200).json({
							message: 'User Details Updated Successfully',
							userdetails: formatUserRes(updatedUser),
						})
					)
					.catch((err) =>
						res.status(500).json({
							message: err.message || 'Error in Updating Data',
						})
					);
			})
			.catch((err) =>
				res.status(500).json({
					message: err.message || 'Error in Fetching Data',
				})
			);
	},
    deleteUserById: async (req, res) => {
		const { id } = req.params;

		AmitPandey.findByPk(id)
			.then((currUser) => {
				if (!currUser) {
					return res.status(404).json({
						message: 'User Id not Found',
					});
				}

				currUser
					.destroy()
					.then(() =>
						res.status(200).json({
							message: 'User Deleted Successfully',
						})
					)
					.catch((err) =>
						res.status(500).json({
							message: err.message || 'Error in Deleting Data',
						})
					);
			})
			.catch((err) =>
				res.status(500).json({
					message: err.message || 'Error in Fetching Data',
				})
			);
	},
};
