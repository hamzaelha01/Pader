<?php

$data = json_decode(file_get_contents('php://input'), TRUE);

if (isset($data['personnel'])) {

    require __DIR__ . '/library.php';

    $personnel_id = (isset($data['personnel']['ID_PERSONNEL']) ? $data['personnel']['ID_PERSONNEL'] : NULL);

    // Delete the Task
    $personnel = new Personnel();

    $personnel->Delete($personnel_id);
}

?>