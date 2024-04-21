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
            self::OPEN->value => 'Abierto',
            self::IN_PROGRESS->value => 'En progreso',
            self::SOLVED->value => 'Resuelto',
            self::BLOCKED->value => 'Bloqueado',
            self::CLOSED->value => 'Cerrado',
        };
    }
}
