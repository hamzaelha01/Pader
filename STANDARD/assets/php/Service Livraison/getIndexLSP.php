<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");
$output = array();
// $query  = "SELECT * FROM users";
// $query  ="SELECT COMMANDE.ID_COMMANDE , COMMANDE.NBR_ARTICLES ,COMMANDE.LIVREUR_COLLECTE, COMMANDE.DD_COMMANDE , COMMANDE.DF_COMMANDE
// FROM COMMANDE
//   WHERE COMMANDE.STATUS  LIKE '%CONFIRMED%'";

$query ="SELECT COMMANDE.ID_COMMANDE , CLIENT.NOM_CLIENT , CLIENT.PRENOM_CLIENT , COMMANDE.DF_COMMANDE , LOCALISATION.Adresse_Complete_Livraison , COMMANDE.NBR_ARTICLES , COMMANDE.LIVREUR_LIVRAISON , SUM(PANIER.QUANITE) as QUANTITE
FROM COMMANDE , CLIENT , LOCALISATION , PANIER
WHERE COMMANDE.ID_CLIENT = CLIENT.ID_CLIENT AND COMMANDE.ID_COMMANDE = PANIER.ID_COMMANDE 
AND COMMANDE.ID_LOCALISATION = LOCALISATION.ID_LOCALISATION AND COMMANDE.STATUS LIKE '%CONFIRMED%'



";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
echo json_encode($output);
}
?> 