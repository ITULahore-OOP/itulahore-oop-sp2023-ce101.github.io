---
layout: page
title: Schedule
nav_order: 3
description: The weekly event schedule.
---

# Weekly Schedule

{% for schedule in site.schedules %}
{{ schedule }}
{% endfor %}


[Book UBS Appointment](){: .btn .btn-outline .h6}
[Book TA Appointment](){: .btn .btn-outline .h6}