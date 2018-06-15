var config = {
	db: {
		address: 'mongodb://localhost:27017/task-board',
		collections: ['tasks']
	},
	fileStore: {
		location: 'C:\\project\\taskboard\\tasks\\uploads'
	}
};

module.exports = config;
