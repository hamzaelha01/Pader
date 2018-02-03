


<?php 
header('Access-Control-Allow-Origin: *');
// header('Content-Type:application/json');




$response= [];
if(count($_POST)>0) {
$conn = mysqli_connect("localhost","root","root","pressing");	$result = mysqli_query($conn,"SELECT DISTINCT COMMANDE.ID_COMMANDE , COMMANDE.DD_COMMANDE ,COMMANDE.STATUS, COMMANDE.DF_COMMANDE , SUM(PANIER.QUANITE) as QUANTITE , SUM(PANIER.MONTANT)as MONTANT , LOCALISATION.Adresse_Complete_Collect 
		FROM COMMANDE , PANIER , LOCALISATION
		WHERE COMMANDE.ID_COMMANDE = PANIER.ID_COMMANDE 
		AND COMMANDE.ID_LOCALISATION = LOCALISATION.ID_LOCALISATION
		AND COMMANDE.STATUS IN ('COLLECTED','PRETE','CONFIRMED','EN PREPARATION','TO DELIVER') 
		AND COMMANDE.ID_CLIENT = ".$_POST["Iduser"]."  GROUP BY COMMANDE.ID_COMMANDE ");
    if(mysqli_num_rows($result)>0){
    while($row = $result->fetch_assoc()){
         // $response['status']= "loggedin";   
        $response[] = $row;
        // $response['status']=$row['STATUS'];	

        //  $_SESSION['']= $row['TELEPHONE_CLIENT'];
    //      echo "connected";
    // echo $row['ID_CLIENT'];
   
    }
    
    }
    }
    
echo json_encode($response);
?>



