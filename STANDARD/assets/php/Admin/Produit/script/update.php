<?php

$data = json_decode(file_get_contents('php://input'), TRUE);

if (isset($data['produit'])) {

    require __DIR__ .'/library.php';

    $designation = (isset($data['produit']['DESIGNATION']) ? $data['produit']['DESIGNATION'] : NULL);
    $prix = (isset($data['produit']['PRIX']) ? $data['produit']['PRIX'] : NULL);
    $categorie = (isset($data['produit']['CATEGORIE']) ? $data['produit']['CATEGORIE'] : NULL);
    $produit_id = (isset($data['produit']['ID_PRODUIT']) ? $data['produit']['ID_PRODUIT'] : NULL);
    // echo ' '.$nom.' '.$prenom.' '.$phone.' '.$sexe.' '.$cnss.' '.$ddembauche.' '.$contrat.' '.$poste.' '.$pass.' '. $personnel_id;
    // validations
    if ($produit_id == NULL) {
        http_response_code(400);
        echo json_encode(['errors' => ["Name Field is required"]]);

    } else {

        // Update the Task
        $produit = new Produit();

        $produit->Update($designation,$categorie,$prix,$produit_id);
    }
}else{
    echo "Aucune Data";
}

?>