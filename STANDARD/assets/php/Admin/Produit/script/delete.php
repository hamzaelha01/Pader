<?php

$data = json_decode(file_get_contents('php://input'), TRUE);

if (isset($data['produit'])) {

    require __DIR__ . '/library.php';

    $produit_id = (isset($data['produit']['ID_PRODUIT']) ? $data['produit']['ID_PRODUIT'] : NULL);

    // Delete the Task
    $produit = new Produit();

    $produit->Delete($produit_id);
}

?>