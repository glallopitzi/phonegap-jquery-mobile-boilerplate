var DEBUG = false;

var app = {
		
		debug : DEBUG,
		
		theWhat : '',
		theWhere : '',
		theRadius : '_empty',
		theCountry : 'it',
		theProtocol : 'http://',
		theDomain : '.jobrapido.com/',
		theDo : 'api.feed',
		theLogin : 'Sn0Wb411',
		thePassword : 'suspended25102012',
		theFormat : 'json',
		
		initialize : function(){
			app.log( "initialize" );
			
		  	app.theWhat = 'java';
		  	app.theWhere = 'milano',
			app.makeSearch();
		},
		
		log : function ( msg ){
			if ( this.debug ){
				console.log( msg );
			}
		},
		
		buildRequestUrl : function(){
			app.log( "buildRequestUrl" );
			
			var _result = "";
			_result = _result + this.theProtocol + this.theCountry + this.theDomain;
			_result = _result + '?do=' + this.theDo + '&login=' + this.theLogin + '&password=' + this.thePassword + '&format=' + this.theFormat;
			_result = _result + '&w=' + this.theWhat + '&l=' + this.theWhere;
			
			app.log( "buildRequestUrl, _result: " + _result );
			return _result;
		},
		
		showResult : function ( data ){
			var advertsContainer = $("#allRepos");
			var advertsList = $("<ul data-role=\"listview\"></ul>");
			
			$.each( data.searchResults.results, function(i, item){
				advertsList.append("<li><a href=\"" + item.url + "\">" + item.title + "</a></li>");
			});
			
			advertsContainer.append(advertsList);
			$.mobile.navigate("#result");
		},
		
		makeSearch : function(){
			app.log( "makeSearch" );
			
			var _url = this.buildRequestUrl();
			$.ajax({
				url : _url,
				dataType: 'jsonp',
			}).done( function( data ) {
				console.log('data: ' + data, data);
				app.showResult(data);
			});
		}

};



if (! DEBUG){
	//*********************************************************
	// Wait for Cordova to Load
	//*********************************************************
	var deviceReadyDeferred = $.Deferred();
	var jqmReadyDeferred = $.Deferred();

	document.addEventListener("deviceReady", deviceReady, false);

	function deviceReady() {
	  deviceReadyDeferred.resolve();
	}

	$(document).on("mobileinit", function () {
	  jqmReadyDeferred.resolve();
	});

	$.when(deviceReadyDeferred, jqmReadyDeferred).then(doWhenBothFrameworksLoaded);

	function doWhenBothFrameworksLoaded() {
	  app.initialize();
	}



} else {
	console.log('DEBUG enabled');
	app.initialize();
}


$(document).ready( function() {
	$('#searchFormSubmit').click( function( e ) {
		app.theWhat = $('#what').val() !== '' ? $('#what').val() : '_empty';
		app.theWhere = $('#where').val() !== '' ? $('#where').val() : '_empty';
		app.makeSearch();
	});
});