<?php

namespace App;

enum ReportStatus: int
{
    case Open = 1;
    case InProgress = 2;
    case Solved = 3;
    case Blocked = 4;
    case Closed = 5;
}
