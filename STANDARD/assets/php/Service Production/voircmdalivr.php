<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$output = array();
// $query  = "SELECT c.ID_COMMANDE,c.DD_COMMANDE,c.ID_CLIENT,c.NBR_ARTICLES,c.LIVREUR_LIVRAISON , SUM(p.QUANITE) as QTE FROM COMMANDE c , PANIER p  WHERE c.ID_COMMANDE = p.ID_COMMANDE AND  c.STATUS ='EN PREPARATION' GROUP BY c.ID_COMMANDE";
$query  = "SELECT cl.NOM_CLIENT , cl.PRENOM_CLIENT , c.ID_COMMANDE,c.DD_COMMANDE,c.ID_CLIENT,c.NBR_ARTICLES,c.LIVREUR_LIVRAISON , SUM(p.QUANITE) as QTE FROM COMMANDE c , CLIENT cl , PANIER p WHERE cl.ID_CLIENT = c.ID_CLIENT AND c.ID_COMMANDE = p.ID_COMMANDE AND c.STATUS ='EN PREPARATION' GROUP BY c.ID_COMMANDE";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
}
echo json_encode($output);

?> 