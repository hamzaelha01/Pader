<?php

header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
$output = array();
$NOM_LIVREUR   = mysqli_real_escape_string($conn, $info->NOM_LIVREUR);


// $query  = "SELECT * FROM users";
$query  ="SELECT DISTINCT COMMANDE.ID_COMMANDE , COMMANDE.DF_COMMANDE, COMMANDE.NBR_ARTICLES , 
CLIENT.NOM_CLIENT, CLIENT.PRENOM_CLIENT , CLIENT.ID_CLIENT , CLIENT.TELEPHONE_CLIENT ,
 CLIENT.Email , LOCALISATION.Adresse_Complete_Livraison, SUM(PANIER.QUANITE) as QTE, SUM(PANIER.MONTANT)as MONTANT 
FROM COMMANDE , LOCALISATION , CLIENT , PANIER
WHERE COMMANDE.STATUS like '%TO DELIVER%' 
AND COMMANDE.ID_CLIENT = CLIENT.ID_CLIENT
AND COMMANDE.ID_COMMANDE = PANIER.ID_COMMANDE
AND COMMANDE.ID_LOCALISATION = LOCALISATION.ID_LOCALISATION
AND COMMANDE.LIVREUR_COLLECTE like '$NOM_LIVREUR' GROUP BY COMMANDE.ID_COMMANDE";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
echo json_encode($output);
}
?> 



