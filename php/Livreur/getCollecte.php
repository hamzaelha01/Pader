<?php


header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");
$info = json_decode(file_get_contents("php://input"));
$output = array();
$NOM_LIVREUR   = mysqli_real_escape_string($conn, $info->NOM_LIVREUR);


// $query  = "SELECT * FROM users";
$query  ="SELECT COMMANDE.ID_COMMANDE , COMMANDE.DD_COMMANDE, COMMANDE.NBR_ARTICLES , 
CLIENT.NOM_CLIENT, CLIENT.PRENOM_CLIENT , CLIENT.ID_CLIENT , CLIENT.TELEPHONE_CLIENT ,
 CLIENT.Email , LOCALISATION.Adresse_Complete_Collect	
from COMMANDE , LOCALISATION , CLIENT
WHERE COMMANDE.STATUS like '%TO COLLECT%' 
AND COMMANDE.ID_CLIENT = CLIENT.ID_CLIENT
AND COMMANDE.ID_LOCALISATION = LOCALISATION.ID_LOCALISATION
AND COMMANDE.LIVREUR_COLLECTE like '$NOM_LIVREUR'";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
echo json_encode($output);
}
?> 



