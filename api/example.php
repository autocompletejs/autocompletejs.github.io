<?php

$return = [];

$json = file_get_contents("./countries.json");
$json = json_decode($json, true);

$pattern = "";
if (array_key_exists("q", $_GET)) {
	$pattern = "/".$_GET["q"]."/i";
}

foreach ($json as $abr => $name) {
	if ($pattern == "" || preg_match($pattern, $abr) === 1 || preg_match($pattern, $name) === 1) {
		$return[] = $name;
	}
}

echo json_encode($return);
