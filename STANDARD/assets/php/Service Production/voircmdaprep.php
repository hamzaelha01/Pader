<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$output = array();
$query  = "SELECT  COMMANDE.ID_COMMANDE,COMMANDE.DD_COMMANDE,COMMANDE.NBR_ARTICLES,COMMANDE.LIVREUR_LIVRAISON , COMMANDE.ID_CLIENT , SUM(PANIER.QUANITE) as QTE FROM COMMANDE , PANIER WHERE COMMANDE.STATUS ='COLLECTED' AND PANIER.ID_COMMANDE = COMMANDE.ID_COMMANDE GROUP BY COMMANDE.ID_COMMANDE";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
}
echo json_encode($output);

?> 