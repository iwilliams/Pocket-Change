import 'package:sqljocky/sqljocky.dart';
import 'dart:convert';
import 'dart:async';

class User {
	
	static Future<String> getUser({int UID, String name}) {
		var pool = new ConnectionPool(host: 'localhost', port: 3306, user: 'pocket_change', password: 'p0ck3t c4@ng3', db: 'pocket_change', max:1);
      print('conected');
      
      return pool.prepare("SELECT * FROM Users").then((query) {
      	
      	return query.execute();
      	
      }).then((results){
      	
      	List<Map> json = new List();
      	
      	for (var row in results) {
      		Map<String, String> map = new Map();
      		map['UID'] = row[0];
      		map['Name'] = row[1];
      		map['Email'] = row[2];
      		map['Password'] = row[3];
      		map['Monthly_Amount'] = row[4];
      		map['Monthly_Swipe'] = row[5];
      		json.add(map);
      	}
      	
      	return JSON.encode(json);
      	
      });
	}
	
}