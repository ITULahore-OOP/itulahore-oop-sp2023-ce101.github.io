---
layout: page
title: Student Progress
nav_order: 5
description: Listing of course modules and topics.
---
<link rel="stylesheet" href="/assets/css/StudentProgressReport.css">

# Get Student Progress Chart
<div class="mt-4"> 
    <label for="rollNumber">Your Roll no:</label><input type="text" id="rollNumber" class="inputFieldStyle ml-3"/>
    <p id="errorMsg"></p>
</div>
<p>Select options to add on chart.</p>
<div id="options" class="d-flex mt-2">
    <div class="mr-4">
        <input type="checkbox" id="quiz1" name="Quiz 1" onChange="setCheckBox('quiz1')"> <label for="quiz1">Quiz 1</label>
    </div>
    <div class="mr-4">
        <input type="checkbox" id="quiz2" name="Quiz 2" onChange="setCheckBox('quiz2')"> <label for="quiz2">Quiz 2</label>
    </div>
    <div class="mr-4">
        <input type="checkbox" id="assignment" name="Assignment" onChange="setCheckBox('assignment')"> <label for="assignment">Assignment</label>
    </div>
    <div class="mr-4">
        <input type="checkbox" id="labA" name="Lab A" onChange="setCheckBox('labA')"> <label for="labA">Lab A</label>
    </div>
    <div class="mr-4">
        <input type="checkbox" id="labB" name="Lab B" onChange="setCheckBox('labB')"> <label for="labB">Lab B</label>
    </div>
</div>
<div class="mt-4">
    <button onClick="getInput()" class="btn btn-outline h6" 
    style="box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 3px 10px rgb(0 0 0 / 8%);">Request record</button>
</div>
<div id="loader"></div>
<script src="/assets/js/StudentProgressReport.js">
</script>
