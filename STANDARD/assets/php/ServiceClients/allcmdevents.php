<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","pressing");
$output = array();
$query  = "SELECT DISTINCT c.ID_COMMANDE,DATE_FORMAT(c.DD_COMMANDE, '%Y') AS 'DD_COMMANDE_Y',
DATE_FORMAT(c.DD_COMMANDE, '%m') AS 'DD_COMMANDE_M',
DATE_FORMAT(c.DD_COMMANDE, '%d') AS 'DD_COMMANDE_D',
DATE_FORMAT(c.DD_COMMANDE, '%H') AS 'DD_COMMANDE_H',
DATE_FORMAT(c.DD_COMMANDE, '%i') AS 'DD_COMMANDE_I',
c.DD_COMMANDE,c.NBR_ARTICLES,c.LIVREUR_LIVRAISON,c.STATUS FROM commande c 
WHERE c.STATUS IN ('TO COLLECT','TO DELIVER')";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
echo json_encode($output);
}
?> 