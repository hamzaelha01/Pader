


<?php 
header('Access-Control-Allow-Origin: *');
// header('Content-Type:application/json');




$response= [];
if(count($_POST)>0) {
$conn = mysqli_connect("localhost","root","root","Pressing");
	$result = mysqli_query($conn,"SELECT DISTINCT COMMANDE.ID_COMMANDE , DATE_FORMAT(COMMANDE.DD_COMMANDE, '%Y-%m-%d %H:%i') as DATECOMMANDE  , COMMANDE.STATUS ,COMMANDE.NBR_ARTICLES , COMMANDE.DF_COMMANDE FROM COMMANDE WHERE COMMANDE.STATUS IN ('EN ATTENTE','CONFIRME','TO COLLECT') , COMMANDE.STATUS ,COMMANDE.NBR_ARTICLES , COMMANDE.DF_COMMANDE FROM COMMANDE WHERE COMMANDE.STATUS IN ('EN ATTENTE','CONFIRME','TO COLLECT') AND COMMANDE.ID_CLIENT = ".$_POST["Iduser"]."");
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



