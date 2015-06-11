<?php
$domain=$_GET["domain"];
$metricCode=$_GET["metricCode"];
$latest=$_GET["latest"];
$start_date=$_GET["start_date"];
$end_date=$_GET["end_date"];
$options="";
if($start_date!="" && $end_date!="")
{
	$options="start_date=".$start_date."&end_date=".$end_date;
}
elseif($latest !="")
{
	$options="latest=".$latest;
}

$jsonurl = "https://apps.compete.com/sites/".$domain."/trended/".$metricCode."/?apikey=29d097f7ef019ceed97f29332345fb8d&".$options;
$json = file_get_contents($jsonurl,0,null,null);
echo $json;
?>
