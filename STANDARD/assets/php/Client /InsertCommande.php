<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "root", "Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$DD     = mysqli_real_escape_string($conn, $info->DD);
$IDCMD    = mysqli_real_escape_string($conn, $info->IDCMD);
$HT      = mysqli_real_escape_string($conn, $info->HT);
$nbrd      = mysqli_real_escape_string($conn, $info->nbrd);
$IDDATE     = mysqli_real_escape_string($conn, $info->IDDATE);
$IDCLIENT = mysqli_real_escape_string($conn,$info->IDCLIENT);
$idLocal = mysqli_real_escape_string($conn,$info->idLocal);


echo "//////";


  $time = date("H:i:s",strtotime($HT));
//   echo $time;

  $day = date("Y-m-d",strtotime($DD));
//   echo $day ;


  $combine = date('Y-m-d H:i:s', strtotime("$day $time"));
  echo $combine;

   echo $idLocal;


  $response ;

//$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
$query  ="INSERT INTO `COMMANDE` (`ID_COMMANDE`, `DD_COMMANDE`, `DF_COMMANDE`, `STATUS`, `NBR_ARTICLES`, `ID_LOCALISATION`, `COMMENTAIRE`, `LIVREUR_COLLECTE`, `LIVREUR_LIVRAISON`, `ID_DATE` , `ID_CLIENT`) VALUES ('$IDCMD', '$combine', NULL, 'EN ATTENTE', '$nbrd', '$idLocal', NULL, NULL, NULL, '$IDDATE','$IDCLIENT')";
if (mysqli_query($conn, $query)) {
        
    $response = "Inserted";
} else {
  $response = "Failed".mysqli_error($conn);
  // echo 'Failed';
}

//         $reponse = []; 

//  if($one ==1)
//  {

// $query1  ="SELECT  COMMANDE.ID_COMMANDE  FROM COMMANDE , DATE WHERE COMMANDE.ID_DATE = DATE.ID_DATE ORDER BY DATE.DATE_C_RES DESC LIMIT 1";
//         $result = mysqli_query($conn, $query1);
//         if (mysqli_num_rows($result) > 0) {
//         while ($row = mysqli_fetch_array($result)) {
//         $reponse['ID'] = $row['ID_COMMANDE'];
//          echo $reponse['ID'];

//         }

//         }
//     }
//     else 
//     {
//         echo "nothing";
//     }

             echo json_encode($response);

}
?>