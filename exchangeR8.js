﻿(function( $ ){

	 $.fn.xchangeR8 = function(options) {
		
		var opt= $.extend( {
					      'curency':'EUR'
					    }, options);
		var container = $(this);
	
	if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (elt /*, from*/) {
                var len = this.length >>> 0;

                var from = Number(arguments[1]) || 0;
                from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
                if (from < 0)
                    from += len;

                for (; from < len; from++) {
                    if (from in this &&
          this[from] === elt)
                        return from;
                }
                return -1;
            };
        }
		//Load RSS Feed 
		var currencies = {
			"ZAR":{
					"flag":"SA.png",
					"wording":"South African Rand",
					"symbol":"ZAR (R)"
				  },
			"USD":{
				"flag":"US.png",
				"wording":"United States Dollar",
				"symbol":"USD ($)"
		
			},
			"EUR":{
				"flag":"Europe.png",
				"wording":"Euro",
				"symbol":"EUR (€)"
			},
			"GBP":{
				"flag":"UK.png",
				"wording":"British Pound Sterling",
				"symbol":"GBP (£)"
			}
		
		};
		function getWording(abr){
			return currencies[abr].wording;
		}
		function getFlag(abr){
			return currencies[abr].flag;
		}
		function getSymbols(code){
			return currencies[abr].symbol;
		}
		
		
		
		var displayCurencies =[
				"GBP",
				"EUR",
				"USD"	
		]
		
		//Test if the option currency is part of the display currencies
		var tfrxCurency = opt.curency;
		var frx = new RegExp(tfrxCurency ,"g");
		if(frx.test(displayCurencies) != false){
			var indexToRemove = displayCurencies.indexOf(opt.curency);
			var numberToRemove = displayCurencies[indexToRemove];
			var remove = displayCurencies.splice(indexToRemove,1, "ZAR");		
		}
		
		var currencyResult = [];
		var foundItems = [];
		function roundNumber(num, dec) {
			var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
			return result;
		}
		function getConversion(wording,resultArray){
			//$symbol
			//alert(wording);
			
			for(key in resultArray){
				
				var str = resultArray[key];
				var re = new RegExp(wording,"g");
				if(re.test(str) != false){	
					//alert(re.test(str) );
					
					 var conversion = resultArray[key].split("=",2);						
					 return roundNumber(conversion[1].slice(0,6),2);

				}
			}
		
		
		}
		
		$.getJSON("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json&q=http://themoneyconverter.com/rss-feed/"+opt.curency+"/rss.xml&num=-1&callback=?", function(feed_data){
		    //loop the foreign currency results
		   // currencyResult = feed_data.responseData.feed.entries;  
		
		    $(feed_data.responseData.feed.entries).each(function(i,feed_v){         	
		    	
		    	currencyResult.push(feed_v.contentSnippet);    	
				
		    });
			for(key in displayCurencies){
				var curABR = displayCurencies[key]; //Currency Abreviation
				var displayName = getWording(curABR); //Get wording from abreviation Currency Abreviation
				var flag = getFlag(curABR); //Get flag from abreviation Currency Abreviation
				var conversion = getConversion(displayName,currencyResult);
				$('#xchange-loader').hide();
				var RateHtml = "<tr>\
			          <td width='60'>"+opt.curency+" 1.0</td>\
			          <td width='20' align='right'><img src='"+flag+"'></td>\
			          <td valign='middle' style='padding-left:10px'>\
			          <span>"+curABR+" "+conversion+"</span></td>\
			        </tr>";
			        container.append(RateHtml);
			}
		});
		};
})( jQuery );