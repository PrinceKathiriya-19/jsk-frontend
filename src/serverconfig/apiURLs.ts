const APIs = {
	NO_HEADERS: {
		health: 'api/common/health',
	},
	PARTIAL_HEADERS: {
		login: 'api/auth/login',
		adminLogin: 'api/auth/admin/login',
		register: 'api/auth/register',
	},
	FULL_HEADERS: {
		logout: 'api/auth/logout',
		getProfile: 'api/auth/profile',
		updateProfile: 'api/auth/profile/update',
		createInquiry: 'api/inquiries',
		getAllInquiries: 'api/inquiries',
		getUserInquiries: 'api/inquiries/user',
		approveInquiry: 'api/inquiries/approve',
		deleteInquiry: 'api/inquiries/delete',
	},
};

export default APIs;
