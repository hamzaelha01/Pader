<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {

    echo $info->nbrd;
//$idcmd     = mysqli_real_escape_string($conn, $info->idcmd);
//$date1    = mysqli_real_escape_string($conn, $info->date1);
//$dates      = mysqli_real_escape_string($conn, $info->dates);
$nbrd  = mysqli_real_escape_string($conn, $info->nbrd);
//$combinedDT = date('Y-m-d H:i:s', strtotime("$date $time"));
$datecmd  = mysqli_real_escape_string($conn, $info->datecmd);

//$btn_name = $info->btnName;
//$output = array();
// $query  = "SELECT * FROM users";
 echo $datecmd;
$query1  ="SELECT * FROM `DATE` ORDER BY `ID_DATE` DESC LIMIT 1";
$result = mysqli_query($conn, $query1);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$dated = $row["ID_DATE"];
}
//echo json_encode($output);
//$dated = "$output";
echo $dated;

}

//$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
//$query  ="INSERT INTO `CLIENT` (`ID_CLIENT`, `NOM_CLIENT`, `PRENOM_CLIENT`, `TELEPHONE_CLIENT`, `Email`,  `Password`) VALUES (NULL, '$nom', '$prenom', '$tel', '$email', '$mdp')";
//$query ="INSERT INTO `COMMANDE` (`ID_COMMANDE`, `DD_COMMANDE`, `DF_COMMANDE`, `STATUS`, `NBR_ARTICLES` , `ID_LOCALISATION`, `COMMENTAIRE`, `LIVREUR_COLLECTE`, `LIVREUR_LIVRAISON`, `ID_DATE`) VALUES ('11111', date('Y-m-d H:i:s'), NULL, 'EN COURS','$nbrd', '11', NULL, NULL, NULL, '$dated')";
$query ="INSERT INTO `COMMANDE` (`ID_COMMANDE`, `DD_COMMANDE`, `DF_COMMANDE`, `STATUS`, `NBR_ARTICLES`, `ID_LOCALISATION`, `COMMENTAIRE`, `LIVREUR_COLLECTE`, `LIVREUR_LIVRAISON`, `ID_DATE`) VALUES ('056', '2019-05-05 23:59:59', NULL, 'EN COURS', '$nbrd', '11', 'TATATA', 'Hassan', 'hamid', '$dated')";
if (mysqli_query($conn, $query)) {
echo "Data Inserted Successfully...";
} else {
echo 'Failed';
}
}



?>