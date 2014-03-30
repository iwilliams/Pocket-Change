<?php 

$con = mysqli_connect("localhost","pocket_change","p0ck3t c4@ng3","pocket_change");

$entityBody = file_get_contents('php://input');

$vars = explode(',', $entityBody);
$uid = explode(':' , $vars[0]);
$oid = explode(':' , $vars[1]);
$rating = explode(':' , $vars[2]);

mysqli_query($con,"UPDATE Organizations SET Rating = Rating + 1 WHERE OID=$oid[1]");


mysqli_close($con);