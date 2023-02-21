---
layout: page
title: Student Position
nav_order: 6
description: Individual Student Position.
---
<!-- <link rel="stylesheet" href="/assets/css/StudentProgressReport.css">
 -->
 <link rel="stylesheet" href="/assets/css/attendance.css">

# Get Your Position
<div class="mt-4"> 
    <label for="rollNumber">Your Roll no:</label><input type="text" id="rollNumber" class="inputFieldStyle ml-3"/>
    <button onClick="getInput()" class="btn btn-outline h6" 
    style="box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 3px 10px rgb(0 0 0 / 8%);">Search</button>
    <p id="errorMsg"></p>
</div>
<div id="loader"></div>
<div class="announcement" id="card_container">
</div>
<script src="/assets/js/stdPosition.js">
</script>
