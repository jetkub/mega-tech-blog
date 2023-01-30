const Handlebars = require('handlebars');

module.exports = {
	format_date: (date) => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
	},
	format_timestamp: (timestamp) => {
		// format time as HH:MM:SS
		return timestamp.toLocaleTimeString();
	},
	truncate: (str, len) => {
		if (str.length > len && str.length > 0) {
			var new_str = str + ' ';
			new_str = str.substr(0, len);
			new_str = str.substr(0, new_str.lastIndexOf(' '));
			new_str = new_str.length > 0 ? new_str : str.substr(0, len);

			return new Handlebars.SafeString(new_str + '...');
		}
		return str;
	},
};
