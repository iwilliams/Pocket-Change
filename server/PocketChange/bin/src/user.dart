import 'package:sqljocky/sqljocky.dart';
import 'dart:convert';
import 'dart:async';

class Example {
  ConnectionPool pool;
  
  Example(this.pool);
  
  Future run() {
    var completer = new Completer();
    // drop the tables if they already exist
  	readData().then((_) {
      completer.complete(null);
    });
    return completer.future;
  }
  
  Future readData() {
    var completer = new Completer();
    print("querying");
    return pool.query("SELECT * FROM Users").then((result) {
      print("got results");
      return result.forEach((row) {
        if (row[3] == null) {
          print("ID: ${row[0]}, Name: ${row[1]}, Age: ${row[2]}, No Pets");
        } else {
          print("ID: ${row[0]}, Name: ${row[1]}, Age: ${row[2]}, Pet Name: ${row[3]}, Pet Species ${row[4]}");
        }
      });
    });
  }
  
}



//class User {
//	
//	static Future<String> getUser({int UID, String name}) {
//		var pool = new ConnectionPool(host: 'localhost', port: 3306, user: 'pocket_change', password: 'p0ck3t c4@ng3', db: 'pocket_change', max:1);
//      print('conected');
//      
//      return pool.query("SELECT * FROM Users").then((result) {
//      	return result.forEach((row) {
//        	print(row[0]);     
//        }).then((){
//        	return 'Test';
//        });
//      });
      
      
//      return pool.prepare("SELECT * FROM Users").then((query) {
//      	
//      	return query.execute();
//      	
//      }).then((results){
//
//       Map<String, String> map = new Map();
//       
//       print(results.length);
//       
//       return results.forEach((row) {
//       		
//       });
      	
//       results.forEach((row) {
//      		map['UID'] = row[0];
//      		map['Name'] = row[1];
//      		map['Email'] = row[2];
//      		map['Password'] = row[3];
//      		map['Monthly_Amount'] = row[4];
//      		map['Monthly_Swipe'] = row[5];
//      	});
       
//       return map;
  
//	}
//	
//}