import 'dart:io';
import 'dart:convert';
import 'package:sqljocky/sqljocky.dart';

/* A simple web server that responds to **ALL** GET requests by returning
 * the contents of data.json file, and responds to ALL **POST** requests
 * 
 * Browse to it using http://localhost:8080  
 * 
 * Provides CORS headers, so can be accessed from any other page
 */

final HOST = "127.0.0.1"; // eg: localhost 
final PORT = 8080;

// This is not the right way to do this... the documentation is confusing for this class.
class JsonEscaper implements HtmlEscapeMode {
  
  final escapeQuot = false;
  final escapeSlash = true;
  final escapeApos = true;
  final escapeLtGt = true;
 
}

JsonEscaper e = new JsonEscaper();
var sanitizer = new HtmlEscape(e);

void main() {
  
  HttpServer.bind(HOST, PORT).then((server) {
    server.listen((HttpRequest request) {
      switch (request.method) {
        case "GET": 
          handleGet(request);
          break;
        case "POST": 
          handlePost(request);
          break;
        case "OPTIONS": 
          handleOptions(request);
          break;
        default: defaultHandler(request);
      }
    }, 
    onError: printError);
    
    print("Listening for GET and POST on http://$HOST:$PORT");
  },
  onError: printError);
}

/**
 * Handle GET requests 
 */
void handleGet(HttpRequest req) {
  HttpResponse res = req.response;
  print("${req.method}: ${req.uri.path}");
  addCorsHeaders(res);
  
  var pool = new ConnectionPool(host: 'localhost', port: 3306, user: 'pocket_change', password: 'p0ck3t c4ng3 5t@rt up', db: 'pocket_change', max:1);
  print('conected');
  
  pool.prepare("SELECT * FROM Donations").then((query) {
  	
  	return query.execute();
  	
  }).then((results){
  	
  	results.forEach((row){
  		print(row[0]);
  	});
  	
  });
  
  res.write('Success!');
  res.close();
}

/**
 * Handle POST requests
 */
void handlePost(HttpRequest req) {
  HttpResponse res = req.response;
  print("${req.method}: ${req.uri.path}");
  
  addCorsHeaders(res);
  
  req.listen((List<int> buffer) {
    
    var jsonString = sanitizer.convert(new String.fromCharCodes(buffer));
    print('jsonString: ' + jsonString);
    Map json = JSON.decode(jsonString);
    
//    connect(uri).then((conn) {
//      
//      var type = json.keys.toList()[0];
//      
//      String query;
//      
//      switch(type) {
//        case "post":
//          query = "INSERT INTO gear.clients (client_name, comment, client_contact, wilson_account_rep) VALUES ('${json["post"]["client"]}', '${json["post"]["comment"]}', '${json["post"]["contact"]}', '${json["post"]["rep"]}')";
//          break;
//        case "delete":
//          query = "DELETE FROM gear.clients WHERE client_id='${json["delete"]}'";
//      }    
//      
//      conn.execute(query).then((rowsAffected) {
//        print(rowsAffected);
//        if(rowsAffected > 0) {
//          res.write('Success!');
//        } else {
//          res.write("Failure...");
//        }
//      
//        res.close();
//        conn.close();
//        
//      });
//    });
    
  },
  onError: printError);
}

/**
 * Add Cross-site headers to enable accessing this server from pages
 * not served by this server
 * 
 * See: http://www.html5rocks.com/en/tutorials/cors/ 
 * and http://enable-cors.org/server.html
 */
void addCorsHeaders(HttpResponse res) {
  res.headers.add("Access-Control-Allow-Origin", "*, ");
  res.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

void handleOptions(HttpRequest req) {
  HttpResponse res = req.response;
  addCorsHeaders(res);
  print("${req.method}: ${req.uri.path}");
  res.statusCode = HttpStatus.NO_CONTENT;
  res.close();
}

void defaultHandler(HttpRequest req) {
  HttpResponse res = req.response;
  addCorsHeaders(res);
  res.statusCode = HttpStatus.NOT_FOUND;
  res.write("Not found: ${req.method}, ${req.uri.path}");
  res.close();
}

void printError(error) => print(error);
