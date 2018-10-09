const User = require('../models/user');

// Display list of all Users.
exports.user_list = (req, res) => {
	User.find().populate('club').exec((err, list_users) => {
		console.log(list_users);
		if (err) {
			return next(err);
		}
		// Successful, render view
		res.render('user_list', { title: 'Users', user_list: list_users });
	});
};

// Display detail page for a specific User.
exports.user_detail = (req, res) => {
	res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Display User create form on GET.
exports.user_create_get = (req, res) => {
	res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST.
exports.user_create_post = (req, res) => {
	res.send('NOT IMPLEMENTED: User create POST');
};

// Display User delete form on GET.
exports.user_delete_get = (req, res) => {
	res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
exports.user_delete_post = (req, res) => {
	res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
exports.user_update_get = (req, res) => {
	res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = (req, res) => {
	res.send('NOT IMPLEMENTED: User update POST');
};
