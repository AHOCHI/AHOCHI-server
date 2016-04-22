# AHOCHI-server
The server part of AHOCHI

AHOCHI-server provides a RESTful API for interacting with a MongoDB database of social service providers.

## Database Design
AHOCHI-server assumes a MongoDB called "ahochiMEAN" installed locally in the default location. It has one collection, which is called "providers". If your installation is different, it is easy enough to change these names in the route files.

An example document in the the "providers" collection:

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
        "description" : "Single women with and without children (female children any age and male children 12 years old and younger) Must look for jobs and housing on a daily basis; Case management services"
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
* **Search All Providers in a City**
	* URL - /api/providers/by_city/:city/:search_string 
	* METHOD – GET 
	* URL Param - Required: city=[string], search_string=[string] - example: /api/providers/by_city/Cincinnati/shelters
* **Show All Providers in a Zip Code**
	* URL - /api/providers/by_zip/:zip 
	* METHOD – GET 
	* URL Param - Required: zip=[string] - example: /api/providers/by_zip/45214
* **Search All Providers in a Zip Code**
	* URL - /api/providers/by_zip/:zip/:search_string 
	* METHOD – GET 
	* URL Param - Required: zip=[string], search_string=[string] - example: /api/providers/by_zip/45214/shelters
* **Show All Providers in a State**
	* URL - /api/providers/by_state/:state 
	* METHOD – GET 
	* URL Param - Required: state=[string] - example: /api/providers/by_state/OH
* **Search All Providers in a State**
	* URL - /api/providers/by_state/:state/:search_string 
	* METHOD – GET 
	* URL Param - Required: state=[string], search_string=[string] - example: /api/providers/by_state/OH/shelters
* **Show All Providers which offer services in a County**
	* URL - /api/providers/by_county/:county 
	* METHOD – GET 
	* URL Param - Required: county=[string] - example: /api/providers/by_state/Hamilton
* **Search All Providers which offer services in a County**
	* URL - /api/providers/by_county/:county/:search_string 
	* METHOD – GET 
	* URL Param - Required: county=[string], search_string=[string] - example: /api/providers/by_county/Hamilton/shelters
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
2. If you are not running a database locally you will need to set the "AHOCHI_PROXY" environment variable to the external server you would like to connect to.  For example:
	"set AHOCHI_PROXY=192.168.1.120"
3. If you have nodemon installed you can just run "nodemon" from the package.json directory.  Otherwise you will need to run "npm start" and restart the process manually after server changes.
