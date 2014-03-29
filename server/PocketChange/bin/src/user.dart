import 'package:sqljocky/sqljocky.dart';
import 'dart:convert';
import 'dart:async';

class User {
 
  static Future<String> getUser({int UID, String name}) {
    var pool = new ConnectionPool(host: 'localhost', port: 3306, user: 'pocket_change', password: 'p0ck3t c4@ng3', db: 'pocket_change', max:1);
    print("querying");
    return pool.query("SELECT * FROM Users").then((result) {
    	List<Map> json = new List();
    	return result.forEach((row){
    		Map<String, String> m = new Map();
    		m["UID"] = row[0];
    		m["Name"] = row[1];
    		m["Email"] = row[2];
    		m["Password"] = row[3];
    		m["Monthly_Amount"] = row[4];
    		m["Monthly_Swipe"] = row[5];
    		json.add(m);
    	}).then((e){
    		pool.close();
    		return JSON.encode(json);
    	});
    });
  }
  
}
