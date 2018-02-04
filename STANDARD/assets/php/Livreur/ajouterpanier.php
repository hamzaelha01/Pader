<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
    $produit = array();
    $data    = $info->cart;
    $produit    = $data->produiti;
    $total    = $data->totali;
    $quantite    = $data->quantitei;
    // $idClient = $data->idClient;
    $idCmd = $data->idCmd;
    echo 'Les Infos du produit'.$produit->ID_PRODUIT.' et son total '.$total.' avec une quantite de '.$quantite.'id commande '.$idCmd;
     $query = "INSERT INTO PANIER (ID_PRODUIT, QUANITE, MONTANT , ID_COMMANDE) VALUES ('$produit->ID_PRODUIT','$quantite','$total','$idCmd')";
    if (mysqli_query($conn, $query)) {
    echo 'La Commande est bien Ajoutee ...';
    }else {
        echo 'la commande nest pas ajouté ' .mysqli_error($conn); ;
    }
    // INSERT INTO `PANIER` (`ID_COMMANDE`, `ID_PRODUIT`, `QUANITE`, `MONTANT`, `COMMENTAIRE`) VALUES ('$idCmd', '$produit->ID_PRODUIT', '$quantite', '$total','BLANK')
    // $sql = array(); 
    // foreach( $data as $row ) {
    //     $idcmd[] = '("'.mysql_real_escape_string($row['ID_COMMANDE']).'")';
    //     $quantite[] = '("'.mysql_real_escape_string($row['quantite']).'")';
    //     $total[] = '("'.mysql_real_escape_string($row['total']).'")';
    // }
    // mysql_query('INSERT INTO table (field) VALUES '.implode(',', $sql));


   $query1 = "UPDATE COMMANDE SET STATUS = 'COLLECTED' WHERE ID_COMMANDE = '$idCmd'";
    if (mysqli_query($conn, $query1)) {
    echo 'La Commande est bien confirmée ...';
        
} else {
    echo 'Le status nest pas modifié ';
    }
        
}
 else {
    echo 'Erreur'.mysqli_error($conn);
    }
// }else echo 'On a rien recu comme infos!Merci!';
?>