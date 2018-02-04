<?php

$data = json_decode(file_get_contents('php://input'), TRUE);

if (isset($data['produit'])) {

    require __DIR__ . '/library.php';

    $designation = (isset($data['produit']['DESIGNATION']) ? $data['produit']['DESIGNATION'] : NULL);
    $prix = (isset($data['produit']['PRIX']) ? $data['produit']['PRIX'] : NULL);
    $categorie = (isset($data['produit']['CATEGORIE']) ? $data['produit']['CATEGORIE'] : NULL);
    // $categorie_name = (isset($data['produit']['DESGINATION_CAT']) ? $data['produit']['DESGINATION_CAT'] : NULL);
    


    
    // validated the request
    if ($designation == NULL) {
        http_response_code(400);
        echo json_encode(['errors' => ["Name Field is required"]]);

    } else {
        // echo 'Myname is  '.$designation.' '.$prix.' '.$categorieid;
        // Add the produit
        $produit = new Produit();

        echo $produit->Create($designation,$categorie,$prix);
        
    }
}
?>