<?php

namespace App\Enums;

enum ReportStatus: int
{
    case OPEN = 1;
    case IN_PROGRESS = 2;
    case SOLVED = 3;
    case BLOCKED = 4;
    case CLOSED = 5;

    public static function getDescription(int $status): string
    {
        return match ($status) {
            self::OPEN => 'Abierto',
            self::IN_PROGRESS => 'En progreso',
            self::SOLVED => 'Resuelto',
            self::BLOCKED => 'Bloqueado',
            self::CLOSED => 'Cerrado',
        };
    }
}
