<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$ID     = mysqli_real_escape_string($conn, $info->ID);
$DD    = mysqli_real_escape_string($conn, $info->DD);
$HT    = mysqli_real_escape_string($conn, $info->HT);
//$btn_name = $info->btnName;
// echo $ID;
// echo $DD;
// echo $HT; 
echo "//////";


  $time = date("H:i:s",strtotime($HT)-3600);
//   echo $time;

  $day = date("Y-m-d",strtotime($DD));
//   echo $day ;


  $combine = date('Y-m-d H:i:s', strtotime("$day $time"));
  echo $combine;



//$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
$query  ="UPDATE COMMANDE SET COMMANDE.DF_COMMANDE = '$combine' WHERE COMMANDE.ID_COMMANDE = '$ID'";
if (mysqli_query($conn, $query)) {
echo "Data Inserted Successfully...";
} else {
echo 'Failed';
}
}

// $query  ="UPDATE COMMANDE SET COMMANDE.DD_COMMANDE = '$combine' WHERE COMMANDE.ID_COMMANDE = '$ID'";

?>