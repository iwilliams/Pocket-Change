<?php 

$con = mysqli_connect("localhost","pocket_change","p0ck3t c4@ng3","pocket_change");

mysqli_query($con,'INSERT INTO Organizations (Name, Description, Rating, Logo, Location, Link) VALUES("UNICEF", "The United Nations Children’s Fund (UNICEF) works in more than 190 countries and territories to save and improve children\'s lives by providing health care and immunizations, clean water and sanitation, nutrition, education, emergency relief and more.", 0, "http://www.unicefusa.org/assets/cssimages/LogoBadge_webShort.png", "USA", "http://www.unicefusa.org/")');


mysqli_close($con);