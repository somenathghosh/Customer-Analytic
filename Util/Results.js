
function Results  () {
	
}



Results.prototype.addPersons = function(persons) {

	this.persons = persons;
	return this;
};


Results.prototype.addKeywords = function(keywords) {

	//console.log(keywords);
	this.keywords = keywords;
	//console.log(this);
	return this;
};

Results.prototype.getKeyWords = function(first_argument) {
	return this.keywords;
};

Results.prototype.searchScore = function(searchString) {
	var results = [];
	//console.log(searchString);
	this.keywords.forEach(function function_name (element, index, array) {
		//console.log(element);
		if( searchString.search(element) > 0) {

			results.push(element);
		}

	})

	return results;

};


Results.prototype.run = function(results, callback) {

	//console.log(results);
	

	score = [];

	

	var that = this;
	results.forEach(function function_name (element, index, array) {
		var rank = that.searchScore(element.description.toUpperCase());
		if(rank.length !== 0) {
			var temp = {};
			temp.name = element.name;
			temp.date = new Date(element.date);
			//temp.rank = that.searchScore(element.description.toUpperCase());
			//console.log(temp);
			temp.rank = rank
			score.push(temp);

		}
	});

	callback(score);
		



};






module.exports = new Results();