# AHOCHI-server
The server part of AHOCHI

AHOCHI-server provides a RESTful API for interacting with a MongoDB database of social service providers.

## Database Design
AHOCHI-server assumes a MongoDB called "ahochiMEAN" installed locally in the default location. It has one collection, which is called "providers". If your installation is different, it is easy enough to change these names in the route files.

An example document in the "providers" collection:

```javascript
    {
        "_id" : ObjectId("5701c56d79b222305ac04d91"),
   	    "name" : "Bethany House"
        "phone" : "555.555.1234",
        "street" : "1841 Fairmont Avenue",
        "city" : "Cincinnati",
        "state" : "OH",
        "zip" : "45214",
        "services" : [ 
            "Emergency Shelters - Families", 
            "Emergency Shelters - Individuals"
        ],
        "countiesServed" : [ 
            "Hamilton", 
            "Warren"
        ],
        "website" : "http://www.bethanyhouseservices.org/",
        "description" : "Single women with and without children (female children any age and male children 12 years old and younger) Must look for jobs and housing on a daily basis; Case management services",
        "location" : {
        	"type" : "Point",
        	"coordinates" : [ 
            	-84.510899, 
            	39.125362
        	]
    	}
    }
```

## RESTful API
The AHOCHI-server API provides the following endpoints:

* **Show All Providers**
	* URL - /api/providers/ 
	* Method - GET 
* **Add New Provider**
	* URL - /api/providers/ 
	* Method - POST
	* *Checks for duplicate based on name field*
* **Show a Provider**
	* URL - /api/providers/:id 
	* Method - GET
	* URL Param - Required: id=[ObjectId] - example: /api/providers/5701c56d79b222305ac04d91 
* **Update a Provider**
	* URL - /api/providers/:id 
	* Method - PUT
	* URL Param - Required: id=[ObjectId] - example: /api/providers/5701c56d79b222305ac04d91
* **Delete a Provider**
	* URL - /api/providers/:id 
	* Method - DELETE
	* URL Param - Required: id=[ObjectId] - example: /api/providers/5701c56d79b222305ac04d91
* **Search All Providers**
	* URL - /api/providers/search/:search_string 
	* METHOD – GET 
	* URL Param - Required: search_string=[string] - example: /api/providers/search/shelters
* **Show All Providers in a City**
	* URL - /api/providers/by_city/:city 
	* METHOD – GET 
	* URL Param - Required: city=[string] - example: /api/providers/by_city/Cincinnati
* **Show All Providers in a City by Service**
	* URL - /api/providers/by_city/:city/by_service/:service 
	* METHOD – GET 
	* URL Param - Required: city=[string], service=[string] - example: /api/providers/by_city/Cincinnati/by_service/DENTAL%20ASSISTANCE
* **Search All Providers in a City**
	* URL - /api/providers/by_city/:city/:search_string 
	* METHOD – GET 
	* URL Param - Required: city=[string], search_string=[string] - example: /api/providers/by_city/Cincinnati/shelters
* **Search All Providers in a City by Service**
	* URL - /api/providers/by_city/:city/by_service/:service/:search_string 
	* METHOD – GET 
	* URL Param - Required: city=[string], service=[string], search_string=[string] - example: /api/providers/by_city/Cincinnati/by_service/DENTAL%20ASSISTANCE/auburn
* **Show All Providers in a Zip Code**
	* URL - /api/providers/by_zip/:zip 
	* METHOD – GET 
	* URL Param - Required: zip=[string] - example: /api/providers/by_zip/45214
* **Show All Providers in a Zip Code by Service**
	* URL - /api/providers/by_zip/:zip/by_service/:service 
	* METHOD – GET 
	* URL Param - Required: zip=[string], service=[string] - example: /api/providers/by_zip/45214/by_service/DENTAL%20ASSISTANCE
* **Search All Providers in a Zip Code**
	* URL - /api/providers/by_zip/:zip/:search_string 
	* METHOD – GET 
	* URL Param - Required: zip=[string], search_string=[string] - example: /api/providers/by_zip/45214/shelters
* **Search All Providers in a Zip Code by Service**
	* URL - /api/providers/by_zip/:zip/by_service/:service/:search_string 
	* METHOD – GET 
	* URL Param - Required: zip=[string], service=[string], search_string=[string] - example: /api/providers/by_zip/45214/by_service/FOOD%20ASSISTANCE/pantry
* **Show All Providers in a State**
	* URL - /api/providers/by_state/:state 
	* METHOD – GET 
	* URL Param - Required: state=[string] - example: /api/providers/by_state/OHIO
* **Show All Providers in a State by Service**
	* URL - /api/providers/by_state/:state/by_service/:service 
	* METHOD – GET 
	* URL Param - Required: state=[string], service=[string] - example: /api/providers/by_state/OHIO/by_service/DENTAL%20ASSISTANCE
* **Search All Providers in a State**
	* URL - /api/providers/by_state/:state/:search_string 
	* METHOD – GET 
	* URL Param - Required: state=[string], search_string=[string] - example: /api/providers/by_state/OH/shelters
* **Search All Providers in a State by Service**
	* URL - /api/providers/by_state/:state/by_service/:service/:search_string 
	* METHOD – GET 
	* URL Param - Required: state=[string], service=[string], search_string=[string] - example: /api/providers/by_state/KENTUCKY/by_service/FOOD%20ASSISTANCE/pantry
* **Show All Providers which offer services in a County**
	* URL - /api/providers/by_county/:county 
	* METHOD – GET 
	* URL Param - Required: county=[string] - example: /api/providers/by_state/Hamilton
* **Show All Providers which offer services in a County by Service**
	* URL - /api/provider/by_county/:county/by_service/:service 
	* METHOD – GET 
	* URL Param - Required: county=[string], service=[string] - example: /api/providers/by_county/Hamilton/by_service/DENTAL%20ASSISTANCE
* **Search All Providers which offer services in a County**
	* URL - /api/providers/by_county/:county/:search_string 
	* METHOD – GET 
	* URL Param - Required: county=[string], search_string=[string] - example: /api/providers/by_county/Hamilton/shelters
* **Search All Providers in a County by Service**
	* URL - /api/providers/by_county/:county/by_service/:service/:search_string 
	* METHOD – GET 
	* URL Param - Required: state=[string], service=[string], search_string=[string] - example: /api/providers/by_county/HAMILTON/by_service/FOOD%20ASSISTANCE/pantry
* **Show All Providers which offer a specific service**
	* URL - /api/providers/by_service/:service 
	* METHOD – GET 
	* URL Param - Required: service=[string] - example: /api/providers/by_service/CLOTHING%20ASSISTANCE/
* **Show All Providers which offer a specific service near an address**
	* URL - /api/providers/by_service/:service/near/:address/:max_dist_miles 
	* METHOD – GET 
	* URL Param - Required: service=[string], address=[string], max_dist_miles=[number] - example: /api/providers/by_service/CLOTHING%20ASSISTANCE/near/405%20e%205th%20st%20newport%20ky/1
* **Show All Distinct Cities**
	* URL - /api/cities/ 
	* Method - GET 
* **Show All Distinct Cities By State**
	* URL - /api/cities/:state 
	* Method - GET 
	* URL Param - Required: state=[string] - example: /api/cities/OH
* **Show All Distinct Zip Codes**
	* URL - /api/zips/ 
	* Method - GET 
* **Show All Distinct Zip Codes By State**
	* URL - /api/zips/:state 
	* Method - GET 
	* URL Param - Required: state=[string] - example: /api/zips/OH
* **Show All Distinct Counties**
	* URL - /api/counties/ 
	* Method - GET 
* **Show All Distinct Counties By State**
	* URL - /api/counties/:state 
	* Method - GET 
	* URL Param - Required: state=[string] - example: /api/counties/OH
* **Show All Distinct States**
	* URL - /api/states/ 
	* Method - GET 
* **Show All Distinct Services**
	* URL - /api/services/ 
	* Method - GET 

## Development setup
1. Clone this repo
2. Run "npm install" from the package.json directory
3. If you are not running a database locally you will need to set the "AHOCHI_PROXY" environment variable to the external server you would like to connect to.  For example:
	"set AHOCHI_PROXY=192.168.1.120"
4. If you have nodemon installed you can just run "nodemon" from the package.json directory.  Otherwise you will need to run "npm start" and restart the process manually after server changes.
