<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$adr     = mysqli_real_escape_string($conn, $info->adr);

$query  ="INSERT INTO `LOCALISATION` (`ID_LOCALISATION`, `Adresse_Complete_Collect`, `TYPE_DOMICILE`, `Adresse_Complete_Livraison`) VALUES (NULL, '$adr', 'Home', '')";
if (mysqli_query($conn, $query)) {
// echo "Data Inserted Successfully...";
} else {
echo 'Failed'.mysqli_error($conn);
}



$response = []; 
$query1  ="SELECT * FROM `LOCALISATION` ORDER BY LOCALISATION.ID_LOCALISATION DESC LIMIT 1";
$result = mysqli_query($conn, $query1);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
 $response['ID'] = $row['ID_LOCALISATION'];
//  echo $response['ID'];
}
echo json_encode($response);
}
}
?> 

