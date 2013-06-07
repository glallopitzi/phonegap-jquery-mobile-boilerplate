var app = {
		
		
		baseWebsiteRestUrl : 'http://it.jobrapido.com/fo/api/v1/search/',
		
		initialize : function(){

			console.log("begin");
		  
			var xhr = new XMLHttpRequest();
			 xhr.open('GET', 'https://api.github.com/legacy/repos/search/javascript', true);
			  // Response handlers.
			  xhr.onload = function () {
			     var repos = JSON.parse(xhr.response), i, reposHTML = "";
			     for (i = 0; i < repos.repositories.length; i++) {
			       reposHTML += "<p><a href='https://github.com/" + repos.repositories[i].username + "/" + repos.repositories[i].name + "'>" + repos.repositories[i].name + "</a><br>" + repos.repositories[i].description + "</p>";
			     }
			     document.getElementById("allRepos").innerHTML = reposHTML;
			  };

			  xhr.onerror = function () {
			     alert('error making the request.');
			  };

			xhr.send();
		}
};

$(document).ready(function(){
	
	$('#searchFormSubmit').click(function(){
		console.log("submitted");
		$('#searchForm').submit();
	});
	
});