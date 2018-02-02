<?php

header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("phpmyadmin.ctjo7qihl13z.us-east-2.rds.amazonaws.com","phpMyAdmin","phpMyAdmin","pressing");
$info = json_decode(file_get_contents("php://input"));
$output = array();
$IdUser   = mysqli_real_escape_string($conn, $info->IdUser);


// $output = array();
// $query  = "SELECT * FROM `COMMANDE`";
$query  ="SELECT SUM(PANIER.QUANITE) as QUANTITE , SUM(PANIER.MONTANT) as MONTANT , COMMANDE.ID_COMMANDE , COMMANDE.DD_COMMANDE , COMMANDE.DF_COMMANDE  
FROM PANIER , COMMANDE
 WHERE PANIER.ID_COMMANDE = COMMANDE.ID_COMMANDE and COMMANDE.ID_CLIENT = '$IdUser'
AND  COMMANDE.STATUS like '%LIVRE%'
GROUP BY COMMANDE.ID_COMMANDE";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
// echo json_encode($output);
}

echo json_encode($output);
?> 

