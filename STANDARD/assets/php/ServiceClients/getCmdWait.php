<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$output = array();
// $query  = "SELECT * FROM users";
// COMMANDE.ID_COMMANDE , COMMANDE.NBR_ARTICLES , COMMANDE.DD_COMMANDE , COMMANDE.DF_COMMANDE
$query  ="SELECT CLIENT.ID_CLIENT ,COMMANDE.NBR_ARTICLES , COMMANDE.ID_COMMANDE, CLIENT.NOM_CLIENT , CLIENT.PRENOM_CLIENT  ,CLIENT.TELEPHONE_CLIENT , COMMANDE.DD_COMMANDE , LOCALISATION.Adresse_Complete_Collect , DATE.DATE_C_RES
FROM  COMMANDE , CLIENT, LOCALISATION , DATE
WHERE COMMANDE.ID_CLIENT = CLIENT.ID_CLIENT
AND DATE.ID_DATE = COMMANDE.ID_DATE
AND LOCALISATION.ID_LOCALISATION = COMMANDE.ID_LOCALISATION
AND COMMANDE.STATUS  LIKE '%EN ATTENTE%'";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
}
echo json_encode($output);

?> 