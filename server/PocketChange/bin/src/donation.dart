import 'package:sqljocky/sqljocky.dart';
import 'dart:convert';
import 'dart:async';

class Donation {
 
  static Future<String> getDonations() {
    var pool = new ConnectionPool(host: 'localhost', port: 3306, user: 'pocket_change', password: 'p0ck3t c4@ng3', db: 'pocket_change', max:1);
    print("querying");
    return pool.query("SELECT * FROM Donations").then((result) {
    	List<Map> json = new List();
    	return result.forEach((row){
    		Map<String, String> m = new Map();
    		m["DID"] = "${row[0]}";
    		m["Timestamp"] = "${row[1]}";
    		m["UID"] = "${row[2]}";
    		m["CID"] = "${row[3]}";
    		m["Amount"] = "${row[4]}";
    		json.add(m);
    	}).then((e){
    		pool.close();
    		return JSON.encode(json);
    	});
    });
  }
  
  static Future<String> postDonation({int UID, int OID}) {
      var pool = new ConnectionPool(host: 'localhost', port: 3306, user: 'pocket_change', password: 'p0ck3t c4@ng3', db: 'pocket_change', max:1);
      print("querying");
      return pool.query("SELECT * FROM Donations").then((result) {
      	List<Map> json = new List();
      	return result.forEach((row){
      		Map<String, String> m = new Map();
      		m["DID"] = "${row[0]}";
      		m["Timestamp"] = "${row[1]}";
      		m["UID"] = "${row[2]}";
      		m["CID"] = "${row[3]}";
      		m["Amount"] = "${row[4]}";
      		json.add(m);
      	}).then((e){
      		pool.close();
      		return JSON.encode(json);
      	});
      });
    }
  
}