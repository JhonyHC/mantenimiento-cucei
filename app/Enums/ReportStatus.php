<?php

namespace App;

enum ReportStatus: int
{
    case OPEN = 1;
    case IN_PROGRESS = 2;
    case SOLVED = 3;
    case BLOCKED = 4;
    case CLOSED = 5;
}
