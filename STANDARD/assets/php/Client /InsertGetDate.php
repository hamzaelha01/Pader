<?php
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {

$query  ="INSERT INTO `DATE` (`ID_DATE`, `DATE_C_RES`, `DATE_C_RC`, `DATE_C_RL`, `DATE_C_PL`, `DATE_C_RP`, `DATE_C_LP`, `DATE_C_VL`) VALUES (NULL, NOW(), NULL, NULL, NULL, NULL, NULL, NULL)";
if (mysqli_query($conn, $query)) {
// echo "Data Inserted Successfully...";
} else {
echo 'Failed';
}



$response = []; 
$query1  ="SELECT * FROM `DATE` ORDER BY `ID_DATE` DESC LIMIT 1";
$result = mysqli_query($conn, $query1);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
 $response['ID'] = $row['ID_DATE'];
//  echo $response['ID'];
}
echo json_encode($response);
}
}
?> 

