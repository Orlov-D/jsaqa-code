Feature: Booking ticket
    Scenario: Should booking 1 ticket
        Given Пользователь находится на странице 'http://qamid.tmweb.ru/client/index.php'
        When Пользователь бронирует 1 место в зале
        Then Пользователь получил qr-code

    Scenario: Should booking 2 tickets
        Given Пользователь находится на странице 'http://qamid.tmweb.ru/client/index.php'
        When Пользователь бронирует 2 места в зале
        Then Пользователь получил qr-code

    Scenario: Should not booking ticket
        Given Пользователь находится на странице 'http://qamid.tmweb.ru/client/index.php'
        When Пользователь бронирует 1 место в зале дважды
        Then Пользователь не может забронировать уже забронированное место