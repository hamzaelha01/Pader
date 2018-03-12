<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$idClient    = mysqli_real_escape_string($conn, $info->idClient);
 
echo "//////";


$query = "DELETE FROM CLIENT WHERE CLIENT.ID_CLIENT = '$idClient'";

if (mysqli_query($conn, $query)) {
echo "Removed...";
} else {
echo 'Failed';
}
}


?>