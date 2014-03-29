import 'package:sqljocky/sqljocky.dart';
import 'dart:convert';
import 'dart:async';

class Organizations {
 
  static Future<String> getUser() {
    var pool = new ConnectionPool(host: 'localhost', port: 3306, user: 'pocket_change', password: 'p0ck3t c4@ng3', db: 'pocket_change', max:1);
    print("querying");
    return pool.query("SELECT * FROM Organizations").then((result) {
    	List<Map> json = new List();
    	return result.forEach((row){
    		Map<String, String> m = new Map();
    		m["OID"] = row[0];
    		m["Name"] = row[1];
    		m["Description"] = row[2];
    		m["Rating"] = row[3];
    		m["Logo"] = row[4];
    		m["Location"] = row[5];
    		m["Link"] = row[6];
    		m["Contact"] = row[7];
    		json.add(m);
    	}).then((e){
    		pool.close();
    		return JSON.encode(json);
    	});
    });
  }
  
}