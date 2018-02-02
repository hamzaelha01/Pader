<?php


header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$idLocal    = mysqli_real_escape_string($conn, $info->idLocal);
$AdresseCompleteCollect = mysqli_real_escape_string($conn, $info->AdresseCompleteCollect);
//$btn_name = $info->btnName;
// echo $ID;
// echo $DD;
// echo $HT; 
echo "//////";
$query="UPDATE LOCALISATION SET LOCALISATION.Adresse_Complete_Collect = '$AdresseCompleteCollect' WHERE LOCALISATION.ID_LOCALISATION  ='$idLocal'";

// //$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
// $query  ="UPDATE LOCALISATION SET COMMANDE.DD_COMMANDE = '$combine' WHERE COMMANDE.ID_COMMANDE = '$ID'";
if (mysqli_query($conn, $query)) {
echo "Updated...";
} else {
echo 'Failed';
}
}

// $query  ="UPDATE COMMANDE SET COMMANDE.DD_COMMANDE = '$combine' WHERE COMMANDE.ID_COMMANDE = '$ID'";

?>