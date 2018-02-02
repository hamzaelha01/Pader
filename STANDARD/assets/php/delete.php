<?php
$conn = mysqli_connect("localhost", "root", "", "Pressing");
$data    = json_decode(file_get_contents("php://input"));
if (count($data) > 0) {
$id    = $data->id;
$query = "DELETE FROM users WHERE id='$id'";
if (mysqli_query($conn, $query)) {
echo 'Data Deleted Successfully...';
} else {
echo 'Failed';
}
}
?>






// $conn   = mysqli_connect("localhost", "root", "", "Pressing");
// $output = array();
// $query  = "SELECT * FROM users";
// $result = mysqli_query($conn, $query);
// if (mysqli_num_rows($result) > 0) {
// while ($row = mysqli_fetch_array($result)) {
// $output[] = $row;
// }
// echo json_encode($output);
// }


<!-- 
if ($btn_name == 'Update') {
$id    = $info->id;
$query = "UPDATE user SET name = '$name', email = '$email', age = '$age' WHERE id = '$id'";
if (mysqli_query($conn, $query)) {
echo 'Data Updated Successfully...';
} else {
echo 'Failed';
}
}
} -->