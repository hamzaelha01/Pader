<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
$IdUser = mysqli_real_escape_string($conn, $info->IdUser);
$IDCMD = mysqli_real_escape_string($conn, $info->IDCMD);
   // Get All  Baksets Informations For this Client And This Order
//    $query  = "SELECT
//    *,
//    r.ID_COMMANDE,
//    r.ID_PRODUIT,
//    CONCAT(l.NOM_CLIENT,l.PRENOM_CLIENT) AS Myname,
//    SUM(r.MONTANT) AS MyTotal,
//    (
//    SELECT
//        COUNT(*)
//    FROM
//        PANIER r,
//        COMMANDE c,
//        CLIENT l,
//        PRODUIT p
//    WHERE
//        c.ID_COMMANDE = r.ID_COMMANDE AND c.ID_CLIENT = l.ID_CLIENT AND r.ID_PRODUIT = p.ID_PRODUIT AND c.ID_COMMANDE = '$IDCMD' AND l.ID_CLIENT = '$IdUser'
// ) AS NbProduits
// FROM
//    PANIER r,
//    COMMANDE c,
//    CLIENT l,
//    PRODUIT p,
//    CATEGORIE e
// WHERE
//    c.ID_COMMANDE = r.ID_COMMANDE AND c.ID_CLIENT = l.ID_CLIENT AND r.ID_PRODUIT = p.ID_PRODUIT AND c.ID_COMMANDE = '$IDCMD' AND l.ID_CLIENT = '$IdUser'
//    AND e.ID_CATEGORIE=p.ID_CATEGORIE
// GROUP BY
//    r.ID_PRODUIT"; //For the Specific Client and Oder 

$query = "SELECT
   *,
   r.ID_COMMANDE,
   r.ID_PRODUIT,
   CONCAT(l.NOM_CLIENT,l.PRENOM_CLIENT) AS Myname,
   SUM(r.MONTANT) AS MyTotal,
   (
   SELECT
       COUNT(*)
   FROM
       PANIER r,
       COMMANDE c,
       CLIENT l,
       PRODUIT p
   WHERE
       c.ID_COMMANDE = r.ID_COMMANDE AND c.ID_CLIENT = l.ID_CLIENT AND r.ID_PRODUIT = p.ID_PRODUIT AND c.ID_COMMANDE = '$IDCMD' AND l.ID_CLIENT = '$IdUser'
) AS NbProduits, 
   (
   SELECT
       SUM(r.MONTANT)
   FROM
       PANIER r,
       COMMANDE c,
       CLIENT l,
       PRODUIT p
   WHERE
       c.ID_COMMANDE = r.ID_COMMANDE AND c.ID_CLIENT = l.ID_CLIENT AND r.ID_PRODUIT = p.ID_PRODUIT AND c.ID_COMMANDE = '$IDCMD' AND l.ID_CLIENT = '$IdUser'
) AS SUMNEW
FROM
   PANIER r,
   COMMANDE c,
   CLIENT l,
   PRODUIT p,
   CATEGORIE e
WHERE
   c.ID_COMMANDE = r.ID_COMMANDE AND c.ID_CLIENT = l.ID_CLIENT AND r.ID_PRODUIT = p.ID_PRODUIT AND c.ID_COMMANDE = '$IDCMD' AND l.ID_CLIENT = '$IdUser'
   AND e.ID_CATEGORIE=p.ID_CATEGORIE
GROUP BY
   r.ID_PRODUIT
";





$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_array($result)) {
$output[] = $row;
}
echo json_encode($output);
}else{echo "Empty Rows!!" .mysqli_error($conn) ;}

?> 