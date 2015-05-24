(function(){
  	var app = angular.module('NewsApp', []);
  
  	app.controller('NewsController', [ '$http', function($http){
	    var _that = this;

		this.cachedContent = {};   // cached objects from Ajax requests
		this.list = topicList;	  // static topic List	
		this.story = null;      // current topic content

		this.setTab = function(value){
	        this.tab = value;
	        
	        if(this.cachedContent[this.tab])   // if the request was already made load it from cache 
	        {
	        	_that.content = this.cachedContent[this.tab];
	        	return false;                  // exit
	        }

	        $http({         // start Ajax request 
			    url: 'http://localhost:8080/node',    // proxy server url
			    method: "POST",
			    data: _that.tab      // request this topic key from the proxy server
			})
			.then(function(response) {  // success
			        
			        _that.content = response.data.responseData.results;     // set current content
			        _that.cachedContent[_that.tab] = _that.content;            // cache the content
			    }, 
			    function(response) {  // failed
			    	console.log('Request failed !');
			    }
			);
		};
		// execute for first tab ::
		this.setTab('h');
	} ]);

	// static topic lists ::
	var topicList = [
		{link : 'h', index : 1, name:'Top Headlines'},
		{link : 'w', index : 2, name:'World'},
		{link : 'b', index : 3, name:'Business'},
		{link : 't', index : 4, name:'Science and Technology'},
		{link : 'el', index : 5, name:'Elections'},
		{link : 'e', index : 6, name:'Entertainment'},
		{link : 's', index : 7, name:'Sports'},
		{link : 'm', index : 8, name:'Health'},
		{link : 'n', index : 9, name:'Nation'},
		{link : 'p', index : 10, name:'Politics'}
	];

})();

$(document).ready(function(){
	$("#tabs").tabs();
})
